"use client";

import { BlogCard } from "@/components/blog/blog-card";
import BlogForm from "@/components/blog/blog-form";
import BaseModal from "@/components/common/base-modal";
import { Pagination } from "@/components/common/pagination";
import { UserCard } from "@/components/user/user-card";
import { useAuth } from "@/context/auth.context";
import BlogService from "@/services/blog.service";
import { UserServices } from "@/services/user.service";
import { IBlog, IBlogFormData } from "@/types/blog.types";
import { IUser } from "@/types/user.types";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useBreakpointValue,
  Button,
  Input,
} from "@chakra-ui/react";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserManagement = () => {
  const columns = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const limit = 6;

  useEffect(() => {
    fetchUsers(1, search);
  }, [search]);

  const fetchUsers = async (page: number, search: string) => {
    try {
      const { users } = await UserServices.getUsers(page, limit, search);
      setUsers(users.data);
      setPagination(users.pagination);
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong. Please try again.");
    }
  };

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchUsers(page, search);
  };

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <Flex align="center" justify="space-between">
            <VStack align="flex-start" gap={1}>
              <Heading size="lg" color="black">
                All Users
              </Heading>
              <Text color="gray.600">Full List of users </Text>
            </VStack>
            <Flex align={"center"}>
              <Box display={{ base: "none", md: "block" }}>
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={onPageChange}
                />
              </Box>

              <Flex ml={4}>
                <Input
                  type="text"
                  color="black"
                  mr={5}
                  placeholder="Search Users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Flex>
            </Flex>
          </Flex>

          <SimpleGrid columns={columns} gap={6}>
            {users.length === 0 && (
              <Text color={"gray.600"}> Oops, No users found......</Text>
            )}
            {users?.map((user) => (
              <UserCard key={user.id} userData={user} setUsers={setUsers} />
            ))}
          </SimpleGrid>

          <Flex justify="center" display={{ base: "flex", md: "none" }}>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserManagement;
