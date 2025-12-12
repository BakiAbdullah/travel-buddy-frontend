import Footer from "@/components/shared/Footer";
import PublicNavbar from "@/components/shared/PublicNavbar";

export const dynamic = "force-dynamic";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
