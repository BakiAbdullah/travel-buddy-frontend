import { ManagementPageLoading } from "@/components/shared/DashboardComponents/ManagementPageLoader";


const AdminsManagementLoading = () => {
  return (
    <ManagementPageLoading
      columns={2}
      filterWidths={["w-48", "w-32", "w-40", "w-24", "w-36"]}
    />
  );
};

export default AdminsManagementLoading;
