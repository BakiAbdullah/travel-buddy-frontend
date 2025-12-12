"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {  travelPlansColumns } from "./travelPlansColumns";
import ManagementTable from "@/components/shared/DashboardComponents/ManagementTable";
import { ITravelPlan } from "@/types/user.interface";
import DeleteConfirmationDialog from "@/components/shared/DashboardComponents/DeleteConfirmationDialog";
import { deleteTravelPlan } from "@/services/travelPlans/deleteTravelPlan";
import TravelPlanViewDetailDialog from "./TravelPlanViewDetailDialog";
import TravelPlanFormDialog from "./TravelPlanFormDialog";

interface TravelPlanTableProps {
  travelPlans: ITravelPlan[];
}

const TravelPlanTable = ({ travelPlans }: TravelPlanTableProps) => {
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

  console.log(travelPlans, 'from travel table');

  return (
    <>
      <ManagementTable
        data={travelPlans}
        columns={travelPlansColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(travelPlan) => travelPlan.id!}
        emptyMessage="No travel Plans found"
      />

      {/* Edit Travel Plan Form Dialog */}
      <TravelPlanFormDialog
        open={!!editingTravelPlan}
        onClose={() => setEditingTravelPlan(null)}
        travelPlan={editingTravelPlan!}
        onSuccess={() => {
          setEditingTravelPlan(null);
          handleRefresh();
        }}
      />

      {/* View Travel Plan Detail Dialog */}
      <TravelPlanViewDetailDialog
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

export default TravelPlanTable;
