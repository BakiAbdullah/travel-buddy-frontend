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
import { updateUser } from "@/services/user/updateUser";
import { IUserInfo } from "@/types/user.interface";
import {
  Sparkles
} from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface IUsersManagementFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  users?: IUserInfo;
}

const UsersManagementFormDialog = ({
  open,
  onClose,
  onSuccess,
  users,
}: IUsersManagementFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(updateUser, null);

  // Handle success / error from server
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
                <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                <p className="text-sm text-gray-600 mt-0.5">Update user info</p>
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
            <input type="hidden" name="id" value={users?.id || ""} />

            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                defaultValue={state?.formData?.name || users?.name || ""}
              />
              <InputFieldError field="name" state={state} />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                defaultValue={state?.formData?.email || users?.email || ""}
              />
              <InputFieldError field="email" state={state} />
            </Field>

            {/* Contact Number */}
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                placeholder="017XXXXXXXX"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                defaultValue={
                  state?.formData?.contactNumber || users?.contactNumber || ""
                }
              />
              <InputFieldError field="contactNumber" state={state} />
            </Field>

            {/* Travel Interests */}
            <Field>
              <FieldLabel htmlFor="travelInterests">
                Travel Interests (comma separated)
              </FieldLabel>
              <Input
                id="travelInterests"
                name="travelInterests"
                placeholder="Hiking, Food, Photography"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                defaultValue={
                  state?.formData?.travelInterests ||
                  users?.travelInterests?.join(", ") ||
                  ""
                }
              />
              <InputFieldError field="travelInterests" state={state} />
            </Field>

            {/* Visited Countries */}
            <Field>
              <FieldLabel htmlFor="visitedCountries">
                Visited Countries (comma separated)
              </FieldLabel>
              <Input
                id="visitedCountries"
                name="visitedCountries"
                placeholder="Bangladesh, India, Thailand"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                defaultValue={
                  state?.formData?.visitedCountries ||
                  users?.visitedCountries?.join(", ") ||
                  ""
                }
              />
              <InputFieldError field="visitedCountries" state={state} />
            </Field>

        
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="px-4 py-3 font-medium disabled:opacity-50"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition font-medium shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsersManagementFormDialog;
