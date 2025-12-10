import UsersManagementTable from "@/components/modules/Admin/UsersManagement/UsersManagementTable";
import TravelPlanFilter from "@/components/modules/User/TravelPlanManagement.tsx/TravelPlanFilter";
import ManagementPageHeader from "@/components/shared/DashboardComponents/ManagementPageHeader";
import TablePagination from "@/components/shared/DashboardComponents/TablePagination";
import { TableSkeleton } from "@/components/shared/DashboardComponents/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/user/getAllUsers";
import { Suspense } from "react";

const UserTravelPlanManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const allUsersData = await getAllUsers(queryString);

  console.log({ allUsersData });

  const totalPages = Math.ceil(
    (allUsersData?.meta?.total || 1) / (allUsersData?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Users Management"
        description="Manage Users information and details!"
      />

      {/* Search, Filters */}
      <TravelPlanFilter />

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <UsersManagementTable users={allUsersData?.data || {}} />
        <TablePagination
          currentPage={allUsersData?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default UserTravelPlanManagementPage;
