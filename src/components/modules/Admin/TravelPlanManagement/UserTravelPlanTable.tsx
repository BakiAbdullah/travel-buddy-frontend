"use client";

import DeleteConfirmationDialog from "@/components/shared/DashboardComponents/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/DashboardComponents/ManagementTable";
import { deleteTravelPlan } from "@/services/travelPlans/deleteTravelPlan";
import { ITravelPlan } from "@/types/user.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import UserTravelPlanFormDialog from "./UserTravelPlanFormDialog";
import { UserTravelPlansColumns } from "./UserTravelPlansColumns";
import UserTravelPlanViewDetailDialog from "./UserTravelPlanViewDetailDialog";

interface IUserTravelPlanTableProps {
  usersTravelPlan: ITravelPlan[];
}

const UserTravelPlanTable = ({
  usersTravelPlan,
}: IUserTravelPlanTableProps) => {

  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTravelPlan, setDeletingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [viewingTravelPlan, setViewingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [editingTravelPlan, setEditingTravelPlan] =
    useState<ITravelPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (travelPlan: ITravelPlan) => {
    setViewingTravelPlan(travelPlan);
  };

  const handleEdit = (travelPlan: ITravelPlan) => {
    setEditingTravelPlan(travelPlan);
  };

  const handleDelete = (travelPlan: ITravelPlan) => {
    setDeletingTravelPlan(travelPlan);
  };

  const confirmDelete = async () => {
    if (!deletingTravelPlan) return;

    setIsDeleting(true);
    const result = await deleteTravelPlan(deletingTravelPlan.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Travel Plan deleted successfully");
      setDeletingTravelPlan(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete Travel Plan");
    }
  };

  return (
    <>
      <ManagementTable
        data={usersTravelPlan}
        columns={UserTravelPlansColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(travelPlan) => travelPlan.id!}
        emptyMessage="No travel Plans found"
      />

      {/* Edit Travel Plan Form Dialog */}
      <UserTravelPlanFormDialog
        open={!!editingTravelPlan}
        onClose={() => setEditingTravelPlan(null)}
        travelPlan={editingTravelPlan!}
        onSuccess={() => {
          setEditingTravelPlan(null);
          handleRefresh();
        }}
      />

      {/* View Travel Plan Detail Dialog */}
      <UserTravelPlanViewDetailDialog
        open={!!viewingTravelPlan}
        onClose={() => setViewingTravelPlan(null)}
        travelPlan={viewingTravelPlan}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingTravelPlan}
        onOpenChange={(open) => !open && setDeletingTravelPlan(null)}
        onConfirm={confirmDelete}
        title="Delete Travel Plan"
        description={`Are you sure you want to delete ${deletingTravelPlan?.destination}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTravelPlanTable;
