"use client";

import { BlogCard } from "@/components/blog/blog-card";
import BaseModal from "@/components/common/base-modal";
import { Pagination } from "@/components/common/pagination";
import { IBlog } from "@/types/blog.types";
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
} from "@chakra-ui/react";
import { useState } from "react";

interface MainHomeProps {
  blogs: IBlog[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MainHome = ({
  blogs,
  currentPage = 1,
  totalPages = 3,
  onPageChange = () => {},
}: Partial<MainHomeProps>) => {
  const columns = useBreakpointValue({ base: 1, md: 2, xl: 3 });
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const mockBlogs: any[] = [
    {
      id: 1,
      title: "Getting Started with React and TypeScript",
      author: "John Doe",
      date: "Aug 25, 2025",
      category: "Development",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Chakra UI",
      excerpt:
        "Explore the powerful layout components in Chakra UI and learn how to create beautiful, responsive designs.",
      author: "Jane Smith",
      date: "Aug 24, 2025",
      category: "Design",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Advanced State Management in Next.js",
      excerpt:
        "Deep dive into state management patterns for complex Next.js applications using modern techniques.",
      author: "Mike Johnson",
      date: "Aug 23, 2025",
      category: "Development",
      readTime: "12 min read",
    },
    {
      id: 4,
      title: "UI/UX Best Practices for 2025",
      excerpt:
        "Discover the latest trends and best practices in user interface and user experience design for modern web applications.",
      author: "Sarah Wilson",
      date: "Aug 22, 2025",
      category: "Design",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Performance Optimization Techniques",
      excerpt:
        "Learn various techniques to optimize your web application performance and improve user experience.",
      author: "David Brown",
      date: "Aug 21, 2025",
      category: "Performance",
      readTime: "10 min read",
    },
    {
      id: 6,
      title: "Serverless Architecture with Vercel",
      excerpt:
        "Explore serverless deployment strategies using Vercel and how to build scalable applications.",
      author: "Emily Davis",
      date: "Aug 20, 2025",
      category: "Infrastructure",
      readTime: "7 min read",
    },
  ];

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="7xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          {/* Header with Pagination */}
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
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </Box>

              <Box ml={4}>
                <Button variant={"surface"} _hover={{ bg: "gray.600" }} onClick={() => setIsBlogModalOpen(true)}>
                  Create Blog
                </Button>
              </Box>
            </Flex>
          </Flex>

          {/* Blog Cards Grid */}
          <SimpleGrid columns={columns} gap={6}>
            {mockBlogs?.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </SimpleGrid>

          {/* Mobile Pagination */}
          <Flex justify="center" display={{ base: "flex", md: "none" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Flex>
        </VStack>
      </Container>
      <BaseModal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)}>
      HELLO WORLD
      </BaseModal>
    </Box>
  );
};

export default MainHome;
