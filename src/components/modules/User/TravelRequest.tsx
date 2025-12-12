/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { changeRequestStatus } from "@/services/travelRequests/travelRequestActions";
import { TravelRequestType } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type RequestItem = {
  id: string;
  requester?: {
    id?: string;
    name?: string;
    email?: string;
    profileImage?: string;
  } | null;
  receiver?: { id?: string; name?: string } | null;
  plan?: { id?: string; destination?: string } | null;
  status?: string;
  createdAt?: string | null;
  [key: string]: any;
};

interface Props {
  receivedRequests?: RequestItem[] | null;
  sentRequests?: RequestItem[] | null;
  travelPlans?: any[];
}

const TravelRequestClient = ({
  receivedRequests = [],
  sentRequests = [],
}: Props) => {
  const router = useRouter();
  console.log(receivedRequests, "receivedRequests");

  // loading state per request id
  const [loadingMap, setLoadingMap] = React.useState<Record<string, boolean>>(
    {}
  );

  const setLoading = (id: string, val: boolean) =>
    setLoadingMap((s) => ({ ...s, [id]: val }));

  const handleUpdate = async (
    requestId: string,
    status: "ACCEPTED" | "REJECTED" | "CANCELLED"
  ) => {
    try {
      setLoading(requestId, true);

      // NOTE: changeRequestStatus expects payload object (it JSON.stringify's payload)
      const payload = { status };
      const result = await changeRequestStatus(
        requestId,
        payload as unknown as TravelRequestType
      );

      if (result?.success) {
        toast.success(result.message || "Request updated");
        // force server component to re-fetch
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update request");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(requestId, false);
    }
  };

  return (
    <div className="space-y-10 py-6">
      {/* RECEIVED REQUESTS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Received Travel Requests
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!receivedRequests || receivedRequests.length === 0 ? (
            <p className="text-gray-500">No requests received yet.</p>
          ) : (
            receivedRequests.map((req) => (
              <div
                key={req.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div className="space-y-1">
                  <p className="font-semibold">
                    Request from: {req.requester?.name ?? "Unknown"}
                  </p>

                  <p className="text-sm text-gray-600">
                    For Trip:{" "}
                    <span className="font-medium">
                      {req.plan?.destination ?? "Unknown trip"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    Status:
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        req.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>

                  {req.createdAt && (
                    <p className="text-xs text-gray-400">
                      Requested on {new Date(req.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* ACTION BUTTONS */}
                {req.status === "PENDING" ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleUpdate(req.id, "ACCEPTED")}
                      disabled={!!loadingMap[req.id]}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {loadingMap[req.id] ? "..." : "Accept"}
                    </Button>

                    <Button
                      onClick={() => handleUpdate(req.id, "REJECTED")}
                      disabled={!!loadingMap[req.id]}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {loadingMap[req.id] ? "..." : "Reject"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">{req.status}</div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* SENT REQUESTS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            My Sent Requests
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {!sentRequests || sentRequests.length === 0 ? (
            <p className="text-gray-500">You have not sent any requests yet.</p>
          ) : (
            sentRequests.map((req) => (
              <div
                key={req.id}
                className="border rounded-lg p-4 flex justify-between items-start"
              >
                <div className="space-y-1">
                  <p className="font-semibold">
                    Sent To: {req.receiver?.name ?? "User"}
                  </p>

                  <p className="text-sm text-gray-600">
                    For Trip:{" "}
                    <span className="font-medium">
                      {req.plan?.destination ?? "Unknown"}
                    </span>
                  </p>

                  <p className="text-sm text-gray-600">
                    Status:
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        req.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>

                  {req.createdAt && (
                    <p className="text-xs text-gray-400">
                      Requested on {new Date(req.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* CANCEL BUTTON ONLY IF PENDING */}
                {req.status === "PENDING" ? (
                  <Button
                    onClick={() => handleUpdate(req.id, "CANCELLED")}
                    disabled={!!loadingMap[req.id]}
                    className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    {loadingMap[req.id] ? "..." : "Cancel"}
                  </Button>
                ) : (
                  <div className="text-sm text-gray-500">{req.status}</div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelRequestClient;
