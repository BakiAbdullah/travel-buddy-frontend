"use client";

import DeleteConfirmationDialog from "@/components/shared/DashboardComponents/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/DashboardComponents/ManagementTable";
import { IUserInfo } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { UsersManagementColumns } from "./UsersManagementColumns";
import UsersManagementFormDialog from "./UsersManagementFormDialog";
import UsersManagementViewDetailDialog from "./UsersManagementViewDetailDialog";
import { softDeleteUser } from "@/services/user/getAllUsers";
import { toast } from "sonner";


interface UsersManagementTableProps {
  users: IUserInfo[];
}

const UsersManagementTable = ({ users }: UsersManagementTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingUsers, setDeletingUsers] =
    useState<IUserInfo | null>(null);
  const [viewingUsers, setViewingUsers] = useState<IUserInfo | null>(
    null
  );
  const [editingUsers, setEditingUsers] = useState<IUserInfo | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (user: IUserInfo) => {
    setViewingUsers(user);
  };

  const handleEdit = (user: IUserInfo) => {
    setEditingUsers(user);
  };

  const handleDelete = (user: IUserInfo) => {
    setDeletingUsers(user);
  };

  const confirmDelete = async () => {
    if (!deletingUsers) return;

    setIsDeleting(true);
    const result = await softDeleteUser(deletingUsers.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUsers(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete User");
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={UsersManagementColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(users) => users.id!}
        emptyMessage="No Users found"
      />

      {/* Edit Users Form Dialog */}
      <UsersManagementFormDialog
        open={!!editingUsers}
        onClose={() => setEditingUsers(null)}
        users={editingUsers!}
        onSuccess={() => {
          setEditingUsers(null);
          handleRefresh();
        }}
      />

      {/* View Users Detail Dialog */}
      <UsersManagementViewDetailDialog
        open={!!viewingUsers}
        onClose={() => setViewingUsers(null)}
        users={viewingUsers}
      />

      {/* Delete Users Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUsers}
        onOpenChange={(open) => !open && setDeletingUsers(null)}
        onConfirm={confirmDelete}
        title="Delete User!"
        description={`Are you sure you want to delete ${deletingUsers?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UsersManagementTable;
