
import TravelPlans from "@/components/modules/Home/TravelPlans";
import { getAllTravelPlans } from "@/services/travelPlans/getTravelPlans";

const TravelPlansPpage =  async () => {
  const allTravelPlans = await getAllTravelPlans("");

  return <TravelPlans allTravelPlans={allTravelPlans?.data || []} />;
}

export default TravelPlansPpage