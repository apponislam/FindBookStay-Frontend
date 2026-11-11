import Header from "@/components/Header";

const RootGroupLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RootGroupLayout;
