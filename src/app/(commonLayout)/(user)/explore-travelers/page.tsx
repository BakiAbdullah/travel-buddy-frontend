import ExploreTravelers from "@/components/modules/Home/ExploreTravelers";
import { getAllUsers } from "@/services/user/getAllUsers";


const ExploreTravelersPage = async () => {
    const allUsers = await getAllUsers();
    return <ExploreTravelers allUsers={allUsers?.data || []} />;
}

export default ExploreTravelersPage