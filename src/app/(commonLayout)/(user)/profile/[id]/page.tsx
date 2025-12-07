const UserDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  console.log(id)
  return <div>User Details Page</div>;
};

export default UserDetailsPage;
