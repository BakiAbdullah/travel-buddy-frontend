"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import TravelPlanFormDialog from "./UserTravelPlanFormDialog";
import ManagementPageHeader from "@/components/shared/DashboardComponents/ManagementPageHeader";

const UserTravelPlanManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <TravelPlanFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Travel Plan Management"
        description="Manage Travel Plans information and details"
        action={{
          label: "Add Travel Plan",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default UserTravelPlanManagementHeader;
