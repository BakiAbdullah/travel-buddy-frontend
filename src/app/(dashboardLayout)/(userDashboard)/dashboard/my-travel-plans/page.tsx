import TravelPlanFilter from "@/components/modules/User/TravelPlanFilter";
import TravelPlanManagementHeader from "@/components/modules/User/TravelPlanManagementHeader";
import TravelPlanTable from "@/components/modules/User/TravelPlanTable";
import TablePagination from "@/components/shared/DashboardComponents/TablePagination";
import { TableSkeleton } from "@/components/shared/DashboardComponents/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyTravelPlans } from "@/services/travelPlans/getTravelPlans";
import { Suspense } from "react";

const UserTravelPlanManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const travelPlansResult = await getMyTravelPlans(queryString);

  console.log({travelPlansResult})

  const totalPages = Math.ceil(
    (travelPlansResult?.meta?.total || 1) /
      (travelPlansResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      {/* <ManagementPageHeader
        title="Travel Plan Management"
        description="Manage Travel Plans information and details"
      /> */}
      <TravelPlanManagementHeader/>

      {/* Search, Filters */}
      <TravelPlanFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <TravelPlanTable
          travelPlans={
            Array.isArray(travelPlansResult?.data)
              ? travelPlansResult.data
              : Object.values(travelPlansResult?.data || {})
          }
        />
        <TablePagination
          currentPage={travelPlansResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default UserTravelPlanManagementPage;
