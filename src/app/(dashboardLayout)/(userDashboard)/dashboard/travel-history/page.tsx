/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelHistoryWithReview from "@/components/modules/TravelHistoryWithReview/TravelHistoryWithReview";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getMyTravelPlans } from "@/services/travelPlans/getTravelPlans";

const TravelHistoryPage = async () => {
  const userTravelPlan = await getMyTravelPlans("isCompleted=true");
  const currentUser = await getUserInfo();

  const plansRaw = userTravelPlan?.data ?? [];

  // Ensure each plan has `user` object
  const plans = plansRaw.map((plan: any) => ({
    ...plan,
    user: plan.user || { id: plan.id }, // fallback if user object not included
  }));

  console.log(plans, 'plans')

  const currentUserId = currentUser.id;

  return (
    <TravelHistoryWithReview plans={plans} currentUserId={currentUserId} />
  );
};

export default TravelHistoryPage;
