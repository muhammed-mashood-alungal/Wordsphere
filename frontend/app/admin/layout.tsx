"use client";

import { useEffect, useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import BlogManagement from "./blogs/page";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import UserManagement from "./users/page";
import { useAuth } from "@/context/auth.context";

const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState<"users" | "blogs">(
    "users"
  );
  const router = useRouter();
  const pathname = usePathname();
  const { user, authLoading } = useAuth();
  
  useEffect(() => {
    if (authLoading) return; 

    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/home");
    }
  }, [authLoading, user, router]);


  useEffect(() => {
    if (pathname.includes("users")) {
      setActiveSection("users");
    } else {
      setActiveSection("blogs");
    }
  }, [pathname]);

  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "users" | "blogs") => {
    setActiveSection(section);
    router.push(`/admin/${section}`);
  };

  const handleAdminClick = () => router.push("/home");

  return (
    <Box position="relative" minH="100vh">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onAdminClick={handleAdminClick}
      />
      <Box
        ml={isMobile ? 0 : `${sidebarWidth}px`}
        transition="margin-left 0.2s"
        pt={isMobile ? "60px" : 0}
      >
        {activeSection === "users" && <UserManagement />}

        {activeSection === "blogs" && <BlogManagement />}
      </Box>
    </Box>
  );
};

export default AdminLayout;
