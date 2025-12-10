
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IUserInfo } from "@/types/user.interface";
import Image from "next/image";

interface IUsersViewDialogProps {
  open: boolean;
  onClose: () => void;
  users: IUserInfo | null;
}

const UsersManagementViewDetailDialog = ({
  open,
  onClose,
  users,
}: IUsersViewDialogProps) => {
  if (!users) {
    return null;
  }

  console.log(users.travelPlans, 'travel plans')


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Section */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border border-indigo-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-50"></div>

                {users?.profileImage ? (
                  <Image
                    height={150}
                    width={150}
                    src={users.profileImage}
                    alt={users.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                  />
                ) : (
                  <div className="relative w-32 h-32 rounded-full bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold">
                    {users?.name?.charAt(0)}
                  </div>
                )}

                <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {users?.name}
                </h2>

                <p className="text-sm text-gray-600 mb-3 flex items-center justify-center md:justify-start gap-2">
                  {users?.email}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1.5 text-xs rounded-full bg-green-500 text-white">
                    ✓ {users?.status}
                  </span>
                  <span className="px-4 py-1.5 text-xs rounded-full bg-indigo-500 text-white">
                    👤 {users?.role}
                  </span>
                  <span className="px-4 py-1.5 text-xs rounded-full bg-orange-500 text-white">
                    ⭐ {users?.rating || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <p className="text-xs text-gray-500 uppercase">Contact Number</p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {users?.contactNumber}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <p className="text-xs text-gray-500 uppercase">Email</p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {users?.email}
              </p>
            </div>
          </div>

          {/* Travel Interests */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-4">Travel Interests</h3>

            {users?.travelInterests?.length ? (
              <div className="flex flex-wrap gap-3">
                {users.travelInterests.map((interest: string, i: number) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No interests added</p>
            )}
          </div>

          {/* Travel Plans Count */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-4">Travel Plans</h3>
            <div className="text-5xl font-bold text-orange-600 text-center">
              {users?.travelPlans?.length || 0}
            </div>
            <p className="text-center text-sm text-gray-600">Active Plans</p>
          </div>

          {/* Visited Countries */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-4">Visited Places</h3>

            {users?.visitedCountries?.length ? (
              <div className="flex flex-wrap gap-3">
                {users.visitedCountries.map((place: string, i: number) => (
                  <span
                    key={i}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-semibold"
                  >
                    {place}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No travel history</p>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-6 text-center rounded-xl">
                <p className="text-sm">Total Reviews</p>
                <p className="text-4xl font-bold text-indigo-600">
                  {users?.reviewsReceived?.length || 0}
                </p>
              </div>

              <div className="bg-orange-50 p-6 text-center rounded-xl">
                <p className="text-sm">Rating</p>
                <p className="text-4xl font-bold text-orange-600">
                  {users?.rating || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Meta Info */}
          <div className="bg-gray-50 rounded-2xl p-6 border">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Account Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-500">Created At</p>
                <p className="font-semibold">
                  {new Date(users?.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-500">Updated At</p>
                <p className="font-semibold">
                  {new Date(users?.updatedAt).toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-500">User ID</p>
                <p className="font-mono truncate">{users?.id}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white border text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
            >
              Close
            </button>

            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UsersManagementViewDetailDialog;
