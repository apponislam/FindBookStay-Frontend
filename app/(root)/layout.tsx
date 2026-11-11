import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingPostButton from "@/components/FloatingPostButton";

const RootGroupLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingPostButton />
    </>
  );
};

export default RootGroupLayout;
