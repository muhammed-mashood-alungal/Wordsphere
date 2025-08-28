"use client";

import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Sidebar } from "@/components/layout/sidebat";
import MainHome from "./home/page";
import ProfileSection from "./profile/page";
import { usePathname, useRouter } from "next/navigation";

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState<"home" | "profile">(
    "home"
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("profile")) {
      setActiveSection("profile");
    } else {
      setActiveSection("home");
    }
  }, [pathname]);

  
  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "home" | "profile") => {
    setActiveSection(section);
    router.push(`/${section}`);
  };

  const handleAdminClick = () => router.push("/admin");

  return (
    <Box position="relative" minH="100vh">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onAdminClick={handleAdminClick}
      />

      {/* Main Content */}
      <Box
        ml={isMobile ? 0 : `${sidebarWidth}px`}
        transition="margin-left 0.2s"
        pt={isMobile ? "60px" : 0}
      >
        {activeSection === "home" && <MainHome />}

        {activeSection === "profile" && <ProfileSection />}
      </Box>
    </Box>
  );
};

export default MainLayout;
