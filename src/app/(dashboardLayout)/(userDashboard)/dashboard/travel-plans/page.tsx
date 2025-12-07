import TravelPlansTable from "@/components/modules/TravelPlansTable/TravelPlansTable";
import { getMyTravelPlans } from "@/services/travelPlans/getTravelPlans";


const TravelPlanPage = async () => {
  const allTravelPlans = await getMyTravelPlans();

  console.log(allTravelPlans);
  return <TravelPlansTable allTravelPlans={allTravelPlans} />;
}

export default TravelPlanPage