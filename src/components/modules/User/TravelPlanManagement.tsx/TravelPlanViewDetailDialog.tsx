/* eslint-disable @typescript-eslint/no-explicit-any */

// import InfoRow from "@/components/shared/DashboardComponents/InfoRow";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDateTime } from "@/lib/formatters";
import { ITravelPlan } from "@/types/user.interface";
import { formatDate } from "@/utils/formatDate";
import { calculateDuration, getTravelTypeColor } from "@/utils/getTravelTypeColors";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Lock,
  Clock,
  FileText,
  Eye,
  MessageSquare,
  AlertCircle,
  X,
} from "lucide-react";

interface ITravelPlanViewDialogProps {
  open: boolean;
  onClose: () => void;
  travelPlan: ITravelPlan | null;
}

const TravelPlanViewDetailDialog = ({
  open,
  onClose,
  travelPlan,
}: ITravelPlanViewDialogProps) => {

  
  if (!travelPlan) {
    return null;
  }

  // const travelPlanData = travelPlan;
   const getTravelTypeIcon = (type:any) => {
     return <Users className="w-4 h-4" />;
   };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Travel Plan Details</DialogTitle>
        </DialogHeader>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="relative p-6 border-b border-gray-200">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <MapPin className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {travelPlan.destination}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getTravelTypeColor(
                        travelPlan.travelType
                      )}`}
                    >
                      {getTravelTypeIcon(travelPlan.travelType)}
                      {travelPlan.travelType}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700">
                      {travelPlan.visibility === "PRIVATE" ? (
                        <>
                          <Lock className="w-3 h-3" />
                          Private
                        </>
                      ) : (
                        <>
                          <Globe className="w-3 h-3" />
                          Public
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Travel Dates Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Travel Dates
                    </h3>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1 font-medium">
                          Departure
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatDate(travelPlan.startDateTime)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatDateTime(travelPlan.startDateTime)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1 font-medium">
                          Return
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatDate(travelPlan.endDateTime)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {formatDateTime(travelPlan.endDateTime)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          Duration:{" "}
                          {calculateDuration(
                            travelPlan.startDateTime,
                            travelPlan.endDateTime
                          )}{" "}
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Budget Range
                    </h3>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-green-600" />
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          ${travelPlan.budgetRange}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Estimated cost per person
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itinerary Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Itinerary
                    </h3>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {travelPlan.itinerary}
                    </p>
                  </div>
                </div>

                {/* Travel Requests Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Travel Requests
                    </h3>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4">
                    {travelPlan.travelRequests &&
                    travelPlan.travelRequests.length > 0 ? (
                      <div className="space-y-3">
                        {travelPlan.travelRequests.map((request, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-white rounded-lg"
                          >
                            <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
                              <Users className="w-5 h-5 text-orange-700" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                Request #{index + 1}
                              </div>
                              <div className="text-xs text-gray-600">
                                Pending approval
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">No travel requests yet</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reviews Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Reviews
                    </h3>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4">
                    {travelPlan.reviews && travelPlan.reviews.length > 0 ? (
                      <div className="space-y-3">
                        No reviews yet!
                        {/* {travelPlan.reviews.map((review, index) => (
                          <div key={index} className="p-3 bg-white rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
                                <span className="text-xs font-bold text-indigo-700">
                                  {review.name?.charAt(0) || "U"}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-sm text-gray-900">
                                  {review.name || "Anonymous"}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {review.date}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              {review.comment}
                            </p>
                          </div>
                        ))} */}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">No reviews yet</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Plan ID */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span>Plan ID: {travelPlan.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                Edit Plan
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TravelPlanViewDetailDialog;
