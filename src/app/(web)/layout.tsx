import { Navigation } from "./_Components/Navigation";
import { SideBar } from "./_Components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div><Navigation/></div>
      <div className="flex px-[80px] py-[44px] h-screen">
        <SideBar />
        <div className="overflow-y-scroll px-[76px] w-full h-[calc(100vh - 44px)]">{children}</div>
      </div>
    </div>
  );
}
