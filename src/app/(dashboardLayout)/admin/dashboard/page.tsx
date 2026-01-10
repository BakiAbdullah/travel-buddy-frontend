import { getAllUsers } from "@/services/user/getAllUsers";
import { getAllTravelPlans } from "@/services/travelPlans/getTravelPlans";
import { getTestimonialsFromDB } from "@/services/reviews/review";
import AdminDashboardContent from "@/components/modules/Dashboard/AdminDashboardContent";

const AdminDashboardPage = async () => {
  // Fetch all data in parallel
  const [usersData, travelPlansData, reviewsData] = await Promise.all([
    getAllUsers(''),
    getAllTravelPlans(''),
    getTestimonialsFromDB()
  ]);

  return (
    <AdminDashboardContent 
      users={usersData?.data || []}
      travelPlans={travelPlansData?.data || []}
      reviews={reviewsData?.data || []}
    />
  );
};

export default AdminDashboardPage;
