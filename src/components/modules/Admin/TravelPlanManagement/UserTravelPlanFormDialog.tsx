import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTravelPlan } from "@/services/travelPlans/createTravelPlans";
import { updateTravelPlan } from "@/services/travelPlans/updateTravelPlan";
import { ITravelPlan } from "@/types/user.interface";
import {
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
  Users
} from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface ITravelPlanFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  travelPlan?: ITravelPlan;
}

const UserTravelPlanFormDialog = ({
  open,
  onClose,
  onSuccess,
  travelPlan,
}: ITravelPlanFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const isEdit = !!travelPlan?.id;

  const [state, formAction, isPending] = useActionState(
    isEdit ? updateTravelPlan : createTravelPlan,
    null
  );

  // Handle success/error from server
  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Operation successful");
      if (formRef.current) {
        formRef.current.reset();
      }
      onSuccess();
      onClose();
    } else if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);

  const handleClose = () => {
    formRef.current?.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isEdit ? "Edit Travel Plan" : "Add Travel Plan"}
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {isEdit
                    ? "Update your adventure details"
                    : "Add new adventure!"}
                </p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          className="flex-1 overflow-y-auto px-2 py-6 space-y-6"
        >
          <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
            {/* Destination */}
            <Field>
              <FieldLabel htmlFor="destination">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Destination
              </FieldLabel>
              <Input
                id="destination"
                name="destination"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                placeholder="Cox's Bazar, Bangladesh"
                defaultValue={
                  state?.formData?.destination || travelPlan?.destination || ""
                }
              />
              <InputFieldError field="destination" state={state} />
            </Field>

            <input type="hidden" name="id" value={travelPlan?.id || ""} />

            {/* Start Date */}
            <Field>
              <FieldLabel
                htmlFor="startDateTime"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                <Calendar className="w-4 h-4 text-green-600" />
                Start Date
              </FieldLabel>
              <Input
                id="startDateTime"
                name="startDateTime"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                type="date"
                defaultValue={
                  state?.formData?.startDateTime ||
                  travelPlan?.startDateTime?.slice(0, 10) ||
                  ""
                }
              />
              <InputFieldError field="startDateTime" state={state} />
            </Field>

            {/* End Date */}
            <Field>
              <FieldLabel
                htmlFor="endDateTime"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                <Calendar className="w-4 h-4 text-red-600" />
                End Date
              </FieldLabel>
              <Input
                id="endDateTime"
                name="endDateTime"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                type="date"
                defaultValue={
                  state?.formData?.endDateTime ||
                  travelPlan?.endDateTime?.slice(0, 10) ||
                  ""
                }
              />
              <InputFieldError field="endDateTime" state={state} />
            </Field>

            {/* Budget Range */}
            <Field>
              <FieldLabel
                htmlFor="budgetRange"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                {" "}
                <DollarSign className="w-4 h-4 text-emerald-600" />
                Budget Range
              </FieldLabel>
              <Input
                id="budgetRange"
                name="budgetRange"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                placeholder="500 - 1000 USD"
                defaultValue={
                  state?.formData?.budgetRange || travelPlan?.budgetRange || ""
                }
              />
              <InputFieldError field="budgetRange" state={state} />
            </Field>

            {/* Travel Type */}
            <Field>
              <FieldLabel
                htmlFor="travelType"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                <Users className="w-4 h-4 text-blue-600" />
                Travel Type
              </FieldLabel>
              <select
                id="travelType"
                name="travelType"
                defaultValue={
                  state?.formData?.travelType || travelPlan?.travelType || ""
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white appearance-none cursor-pointer"
              >
                <option value="">Select type</option>
                <option value="SOLO">🧳 Solo</option>
                <option value="FRIENDS">👥 Friends</option>
                <option value="FAMILY">👨‍👩‍👧‍👦 Family</option>
              </select>
              <InputFieldError field="travelType" state={state} />
            </Field>

            {/* Visibility */}
            <Field>
              <FieldLabel
                htmlFor="visibility"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                Visibility
              </FieldLabel>
              <select
                id="visibility"
                name="visibility"
                defaultValue={
                  state?.formData?.visibility ||
                  travelPlan?.visibility ||
                  "PUBLIC"
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-gray-50 hover:bg-white appearance-none cursor-pointer"
              >
                <option value="PUBLIC">🌍 Public</option>
                <option value="PRIVATE">🔒 Private</option>
              </select>
              <InputFieldError field="visibility" state={state} />
            </Field>

            {/* Itinerary */}
            <Field>
              <FieldLabel
                htmlFor="itinerary"
                className="flex items-center gap-2 text-sm font-semibold text-gray-900"
              >
                {" "}
                <FileText className="w-4 h-4 text-orange-600" />
                Itinerary
              </FieldLabel>
              <textarea
                id="itinerary"
                name="itinerary"
                placeholder="Write your trip plan details..."
                defaultValue={
                  state?.formData?.itinerary || travelPlan?.itinerary || ""
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition bg-gray-50 hover:bg-white appearance-none cursor-pointer"
              />
              <InputFieldError field="itinerary" state={state} />
            </Field>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              className="px-4 py-3  font-medium shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              disabled={isPending}
            >
              {isPending
                ? "Saving..."
                : isEdit
                ? "Save Changes"
                : "Create Travel Plan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserTravelPlanFormDialog;
