import UserTravelPlanFilter from "@/components/modules/Admin/TravelPlanManagement/UserTravelPlanFilter";
import UserTravelPlanTable from "@/components/modules/Admin/TravelPlanManagement/UserTravelPlanTable";
import ManagementPageHeader from "@/components/shared/DashboardComponents/ManagementPageHeader";
import TablePagination from "@/components/shared/DashboardComponents/TablePagination";
import { TableSkeleton } from "@/components/shared/DashboardComponents/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTravelPlans } from "@/services/travelPlans/getTravelPlans";
import { Suspense } from "react";

const ManageUserTravelPlans = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const userTravelPlanData = await getAllTravelPlans(queryString);

  console.log({ userTravelPlanData });

  const totalPages = Math.ceil(
    (userTravelPlanData?.meta?.total || 1) /
      (userTravelPlanData?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Users Travel Plan Management"
        description="Manage Users Travel Plan information and details!"
      />

      {/* Search, Filters */}
      <UserTravelPlanFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UserTravelPlanTable usersTravelPlan={userTravelPlanData.data || []} />
        <TablePagination
          currentPage={userTravelPlanData?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default ManageUserTravelPlans;
