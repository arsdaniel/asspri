"use client";
import "./globals.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import Provider from "./components/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);

  const disableNavbar = ["/signin", "/signup"];
  const pathname = usePathname();
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                {!disableNavbar.includes(pathname) && (
                  <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                )}
                <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
                  {!disableNavbar.includes(pathname) && (
                    <Header
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                  )}
                  <main>
                    <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
            )}
          </div>
        </Provider>
      </body>
    </html>
  );
}
