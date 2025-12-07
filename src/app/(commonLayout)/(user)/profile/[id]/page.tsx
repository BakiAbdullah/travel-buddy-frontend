import UserProfile from "@/components/modules/UserProfile/UserProfile";
import { getSingleUser } from "@/services/user/getSingleUser";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const user = await getSingleUser(id);
  const userData = user?.data;
  return (
    <UserProfile userData={userData}/>
  )
}

export default UserDetailsPage