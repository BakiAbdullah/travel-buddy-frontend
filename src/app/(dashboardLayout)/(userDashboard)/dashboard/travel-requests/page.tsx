/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelRequest from "@/components/modules/User/TravelRequest";
import { getMyTravelPlans } from "@/services/travelPlans/getTravelPlans";
import { getMyTravelRequest } from "@/services/travelRequests/travelRequestActions";

const TravelRequestPage = async () => {
  // fetch received & sent requests (server-side)
  const myTravelRequest = await getMyTravelRequest(); // may be { data } or array
  const myTravelPlansRes = await getMyTravelPlans(""); // plans owned by me (each has travelRequests)

  // Normalize travelPlans array
  const travelPlans: any[] =
    myTravelPlansRes?.data ?? myTravelPlansRes ?? [];

  // Build receivedRequests by flattening travelRequests from each plan
  const receivedRequests = travelPlans.flatMap((plan: any) => {
    const requests = Array.isArray(plan.travelRequests) ? plan.travelRequests : [];
    return requests.map((r: any) => ({
      ...r,
      plan: {
        id: plan.id,
        destination: plan.destination,
        startDateTime: plan.startDateTime,
        endDateTime: plan.endDateTime,
      },
      receiver: plan.user ?? { id: plan.userId }, // plan owner
    }));
  });

  // Try to get sentRequests from myTravelRequest response if present
  const sentRequests =
    myTravelRequest?.data?.sentRequests ??
    myTravelRequest?.sentRequests ??
    (Array.isArray(myTravelRequest) ? myTravelRequest : []) ??
    [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Travel Requests</h1>

      <TravelRequest
        receivedRequests={receivedRequests}
        sentRequests={sentRequests}
        travelPlans={travelPlans}
      />
    </div>
  );
};


export default TravelRequestPage;
