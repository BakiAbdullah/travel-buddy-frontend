import UserMatchedTravelPlan from "@/components/modules/Dashboard/UserMatchedTravelPlan";
import { getMatchedTravelersForLoggedInUser } from "@/services/travelPlans/getTravelPlans"

const UserDashboardPage = async () => {

  const matchedTravelPlans = await getMatchedTravelersForLoggedInUser();

  console.log({matchedTravelPlans});

  return <UserMatchedTravelPlan matchedTravelPlans={matchedTravelPlans} />;
}

export default UserDashboardPage