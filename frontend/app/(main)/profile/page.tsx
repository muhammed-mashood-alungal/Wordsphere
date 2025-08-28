"use client";

import { BlogCard } from "@/components/blog/blog-card";
import BaseModal from "@/components/common/base-modal";
import { Pagination } from "@/components/common/pagination";
import ChangePassForm from "@/components/user/change-password";
import { useAuth } from "@/context/auth.context";
import AuthService from "@/services/auth.service";
import BlogService from "@/services/blog.service";
import { UserServices } from "@/services/user.service";
import { IBlog } from "@/types/blog.types";
import { IChangePassForm } from "@/types/user.types";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Icon,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { FiUser, FiMail, FiLock, FiEdit3, FiCalendar } from "react-icons/fi";

const ProfileSection = () => {
  const columns = useBreakpointValue({ base: 1, lg: 2 }) || 1;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myBlogs, setMyBlogs] = useState<IBlog[]>([]);
  const router = useRouter();
  const { user, authLoading, setAuth } = useAuth();
  const limit = 2;
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, router , authLoading]);

  const fetchMyBlogs = async (page: number) => {
    try {
      const { blogs } = await BlogService.getBlogs(page, limit, "", user?.id);
      setMyBlogs(blogs.data);
      setPagination(blogs.pagination);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    fetchMyBlogs(1);
  }, []);

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchMyBlogs(page);
  };

  const handleChangePassword = async (data: IChangePassForm) => {
    try {
      await UserServices.changePassword(data);
      setIsModalOpen(false);
    } catch (error: unknown) {
      toast.error((error as Error).message || "Something went wrong. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setAuth(null);
    } catch (error : unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="6xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <Flex justify={"space-between"} align={"center"}>
            <VStack align="flex-start" gap={1}>
              <Heading size="lg" color="black">
                Profile
              </Heading>
              <Text color="gray.600">
                Manage your account details and view your content
              </Text>
            </VStack>
            <VStack align="flex-end">
              <Button
                variant="outline"
                color={"black"}
                _hover={{ color: "white" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </VStack>
          </Flex>

          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={8}>
            {/* User Details Card */}
            <Box bg="white" shadow="base" rounded="xl" p={8}>
              <VStack gap={6} align="stretch">
                <Heading size="md" color="black" mb={4}>
                  Account Details
                </Heading>

                <VStack gap={4} align="stretch">
                  <HStack gap={4}>
                    <Icon as={FiUser} color="gray.500" boxSize={5} />
                    <VStack align="flex-start" gap={1} flex={1}>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Username
                      </Text>
                      <Text color="black" fontWeight="medium">
                        {user?.username}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack gap={4}>
                    <Icon as={FiMail} color="gray.500" boxSize={5} />
                    <VStack align="flex-start" gap={1} flex={1}>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Email
                      </Text>
                      <Text color="black" fontWeight="medium">
                        {user?.email}
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack gap={4}>
                    <Icon as={FiCalendar} color="gray.500" boxSize={5} />
                    <VStack align="flex-start" gap={1} flex={1}>
                      <Text fontSize="sm" color="gray.500" fontWeight="medium">
                        Member Since
                      </Text>
                      <Text color="black" fontWeight="medium">
                        {user?.createdAt
                          ? new Date(user.createdAt).toDateString()
                          : ""}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

                <Button
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.600"
                  _hover={{ bg: "gray.100", borderColor: "gray.400" }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <Icon as={FiLock} mr={2} />
                  Change Password
                </Button>
                <BaseModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <ChangePassForm
                    onSubmit={handleChangePassword}
                    onCancel={() => setIsModalOpen(false)}
                  />
                </BaseModal>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
        <VStack gap={8} align="stretch" marginTop={10}>
          <Flex justify={"space-between"} align={"center"}>
            <Heading size="lg" color="black">
              My Blogs
            </Heading>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </Flex>
          <SimpleGrid columns={columns} gap={6}>
            {myBlogs.length === 0 && (
              <Text color={"gray.600"}> Oops, No blogs found......</Text>
            )}
            {myBlogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} setBlogs={setMyBlogs} />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfileSection;
