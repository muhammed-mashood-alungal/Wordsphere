"use client";

import { IBlog } from "@/types/blog.types";
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
  useDisclosure,
} from "@chakra-ui/react";

import { FiUser, FiMail, FiLock, FiEdit3, FiCalendar } from "react-icons/fi";

const UserBlogCard = ({
  blog,
  onEdit,
}: {
  blog: IBlog;
  onEdit?: (blogId: string) => void;
}) => (
  <Box
    bg="white"
    shadow="base"
    rounded="xl"
    overflow="hidden"
    _hover={{
      shadow: "lg",
      transform: "translateY(-1px)",
    }}
    transition="all 0.2s"
    p={6}
  >
    <VStack gap={4} align="stretch">
      <HStack justify="space-between" align="flex-start">
        <Box
          px={2}
          py={1}
          rounded="md"
          fontSize="xs"
          bg={!blog.isDeleted ? "green.50" : "orange.50"}
          color={!blog.isDeleted ? "green.600" : "orange.600"}
        >
          {blog.isDeleted && "Deleted"}
        </Box>
      </HStack>

      <Heading size="sm" color="black">
        {blog.title}
      </Heading>

      <Text color="gray.600" fontSize="sm" lineHeight="1.5">
        {blog?.author?.username}
      </Text>

      <HStack justify="space-between" align="center" pt={2}>
        <Text fontSize="xs" color="gray.500">
          {blog.createdAt?.toDateString()}
        </Text>

        <Button
          size="sm"
          variant="ghost"
          color="gray.600"
          _hover={{ bg: "gray.100", color: "gray.700" }}
          onClick={() => onEdit?.(blog.id)}
        >
          <Icon as={FiEdit3} mr={2} />
          Edit
        </Button>
      </HStack>
    </VStack>
  </Box>
);

 const ProfileSection = ({
  user ,
  userBlogs,
  onChangePassword,
  onEditBlog,
}: any) => {
  const {  onOpen, onClose } = useDisclosure();
  const columns = useBreakpointValue({ base: 1, lg: 2 }) || 1;

  return (
    <Box minH="100vh" bg="gray.100" py={8}>
      <Container maxW="6xl" px={{ base: 4, lg: 8 }}>
        <VStack gap={8} align="stretch">
          <VStack align="flex-start" gap={1}>
            <Heading size="lg" color="black">
              Profile
            </Heading>
            <Text color="gray.600">
              Manage your account details and view your content
            </Text>
          </VStack>

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
                        {user?.createdAt?.toDateString() }
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>

             

                <Button
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.600"
                  _hover={{ bg: "gray.100", borderColor: "gray.400" }}
                  onClick={onOpen}
                >
                  <Icon as={FiLock} mr={2} />
                  Change Password
                </Button>
              </VStack>
            </Box>

            {/* Stats Card */}
            <Box bg="white" shadow="base" rounded="xl" p={8}>
              <VStack gap={6}>
                <Heading size="md" color="black">
                  Statistics
                </Heading>

                <HStack gap={8} justify="center">
                  <VStack gap={1}>
                    <Text fontSize="xl" fontWeight="bold" color="green.500">
                      {
                        userBlogs?.filter((blog: IBlog) => !blog?.isDeleted)
                          .length
                      }
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Published
                    </Text>
                  </VStack>
                  <VStack gap={1}>
                    <Text fontSize="xl" fontWeight="bold" color="orange.500">
                      {
                        userBlogs?.filter((blog: IBlog) => blog?.isDeleted)
                          .length
                      }
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Deleted
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>

          {/* User Blogs */}
          <VStack gap={6} align="stretch">
            <Heading size="md" color="black">
              My Blogs
            </Heading>

            <SimpleGrid columns={columns} gap={6}>
              {userBlogs?.map((blog: IBlog) => (
                <UserBlogCard key={blog.id} blog={blog} onEdit={onEditBlog} />
              ))}
            </SimpleGrid>

            {userBlogs?.length === 0 && (
              <Box
                bg="white"
                shadow="base"
                rounded="xl"
                p={12}
                textAlign="center"
              >
                <VStack gap={4}>
                  <Text color="gray.500" fontSize="lg">
                    No blogs yet
                  </Text>
                  <Text color="gray.400">
                    Start writing your first blog post
                  </Text>
                  <Button
                    bg="gray.600"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    size="lg"
                  >
                    Create Blog
                  </Button>
                </VStack>
              </Box>
            )}
          </VStack>
        </VStack>
      </Container>

      {/* <ChangePasswordModal isOpen={isOpen} onClose={onClose} /> */}
    </Box>
  );
};


export default ProfileSection