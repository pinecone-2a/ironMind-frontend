


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
   
      <div className="flex px-[80px] py-[44px] h-screen">
   
        <div className="overflow-y-scroll px-[76px] w-full h-[calc(100vh - 44px)]">{children}</div>
      </div>
    </div>
  );
}
