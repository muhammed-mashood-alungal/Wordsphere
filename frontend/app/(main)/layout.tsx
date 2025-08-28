"use client";

import { useState } from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import { Sidebar } from "@/components/layout/sidebat";
import MainHome from "./home/page";
import ProfileSection from "./profile/page";

interface MainLayoutProps {
  user?: {
    username: string;
    email: string;
    joinedDate: string;
    totalBlogs: number;
    isAdmin?: boolean;
  };
}

const mockUser = {
  username: "john_doe",
  email: "john.doe@example.com",
  joinedDate: "January 15, 2024",
  totalBlogs: 12,
  isAdmin: true,
};

 const MainLayout = ({ user = mockUser }: MainLayoutProps) => {
  const [activeSection, setActiveSection] = useState<"home" | "profile">(
    "home"
  );
  const [currentPage, setCurrentPage] = useState(1);

  const sidebarWidth = useBreakpointValue({ base: 0, md: 280 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSectionChange = (section: "home" | "profile") => {
    setActiveSection(section);
    if (section === "home") setCurrentPage(1); // reset pagination
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleAdminClick = () => console.log("Navigate to admin panel");
  const handleChangePassword = () => console.log("Change password");
  const handleEditBlog = (blogId: number) => console.log("Edit blog:", blogId);

  return (
    <Box position="relative" minH="100vh">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isAdmin={user?.isAdmin}
        onAdminClick={handleAdminClick}
      />

      {/* Main Content */}
      <Box
        ml={isMobile ? 0 : `${sidebarWidth}px`}
        transition="margin-left 0.2s"
        pt={isMobile ? "60px" : 0} // spacing for mobile hamburger menu
      >
        {activeSection === "home" && (
          <MainHome
            currentPage={currentPage}
            totalPages={3}
            onPageChange={handlePageChange}
          />
        )}

        {activeSection === "profile" && (
          <ProfileSection
            user={user}
            onChangePassword={handleChangePassword}
            onEditBlog={handleEditBlog}
          />
        )}
      </Box>
    </Box>
  );
};

export default MainLayout;