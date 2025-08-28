"use client";

import { BlogCard } from "@/components/blog/blog-card";
import BlogForm from "@/components/blog/blog-form";
import BaseModal from "@/components/common/base-modal";
import { Pagination } from "@/components/common/pagination";
import { useAuth } from "@/context/auth.context";
import BlogService from "@/services/blog.service";
import { IBlog, IBlogFormData } from "@/types/blog.types";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MainHome = () => {
  const columns = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
  });
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const { user } = useAuth();
  const limit = 6;

  useEffect(() => {
    fetchBlogs(1, debouncedSearch);
  }, [debouncedSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const fetchBlogs = async (page: number, search: string) => {
    try {
      const { blogs } = await BlogService.getBlogs(page, limit, search);
      setBlogs(blogs.data);
      setPagination(blogs.pagination);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to fetch blogs");
      }
    }
  };

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    fetchBlogs(page, debouncedSearch);
  };

  const handleSubmit = async (data: IBlogFormData) => {
    try {
      const { blog } = await BlogService.create(data, user?.id as string);
      toast.success("Blog created successfully!");
      setBlogs([blog, ...blogs].slice(0, limit));
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <Flex align="center" justify="space-between">
            <VStack align="flex-start" gap={1}>
              <Heading size="lg" color="black">
                Latest Blogs
              </Heading>
              <Text color="gray.600">
                Discover the latest articles and insights
              </Text>
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
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  variant={"surface"}
                  _hover={{ bg: "gray.600" }}
                  onClick={() => setIsBlogModalOpen(true)}
                >
                  Create Blog
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <SimpleGrid columns={columns} gap={6}>
            {blogs.length === 0 && (
              <Text color={"gray.600"}> Oooppsss, No blogs found......</Text>
            )}
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} setBlogs={setBlogs} />
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
      <BaseModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
      >
        <BlogForm
          onSubmit={handleSubmit}
          onCancel={() => setIsBlogModalOpen(false)}
        />
      </BaseModal>
    </Box>
  );
};

export default MainHome;
