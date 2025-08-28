"use client";

import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  Flex,
  Icon,
  Container,
} from "@chakra-ui/react";
import { IBlog } from "@/types/blog.types";
import { Calendar, Delete, DeleteIcon, Trash } from "lucide-react";
import BlogService from "@/services/blog.service";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "../common/confirm-modal";
import { useAuth } from "@/context/auth.context";

interface BlogViewerProps {
  blog: IBlog;
  onEdit?: (blog: IBlog) => void;
  canEdit?: boolean;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
}

const BlogViewer = ({
  blog,
  onEdit,
  onDelete,
  onRestore,
  canEdit = true,
}: BlogViewerProps) => {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const { user } = useAuth();
  const handleDelete = () => {
    setConfirmModalOpen(true);
  };

  return (
    <Box
      w="full"
      maxW="4xl"
      mx="auto"
      h="80vh"
      display="flex"
      flexDirection="column"
      bg="white"
    >
      <VStack gap={0} align="stretch" h="full" >
        <Box
          color={"gray.800"}
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          p={{ base: 4, md: 6 }}
          position="sticky"
          top={0}
          zIndex={1}
        >
          <VStack gap={4} align="stretch">
            <Heading
              size={{ base: "lg", md: "xl" }}
              color="gray.800"
              lineHeight="shorter"
              fontWeight="bold"
            >
              {blog.title}
            </Heading>

            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "flex-start", sm: "center" }}
              gap={4}
            >
              {/* Author & Meta */}
              <HStack gap={3}>
                <VStack align="flex-start" gap={0}>
                  <Text fontWeight="medium" fontSize="sm" color="gray.800">
                    {typeof blog.author === "string"
                      ? blog.author
                      : blog.author.username}
                  </Text>
                  <HStack gap={4} fontSize="xs" color="gray.600">
                    <HStack gap={1}>
                      <Icon as={Calendar} boxSize={3} />
                      <Text>{formatDate(blog.createdAt)}</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>

              {canEdit && !blog.isDeleted && (
                <Flex align={"center"} gap={2}>
                  <Button
                    size="sm"
                    variant="outline"
                    color={"black"}
                    _hover={{ color: "gray.100" }}
                    colorScheme="blue"
                    onClick={() => onEdit?.(blog)}
                  >
                    Edit
                  </Button>
                  <Button onClick={handleDelete}>
                    <Trash size={16} />
                  </Button>
                </Flex>
              )}
              {
                user?.role == "admin" && blog.isDeleted && (
                  <Button onClick={() => onRestore?.(blog.id)}>
                    Restore
                  </Button>
                )
              }
            </Flex>
          </VStack>
        </Box>

        {/* Content */}
        <Box flex={1} overflowY="auto" p={{ base: 4, md: 6 }} bg="white">
          <Container maxW="none" p={0}>
            <Text
              color="gray.800"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="tall"
              whiteSpace="pre-wrap"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {blog.content}
            </Text>
          </Container>
        </Box>

        <Box
          bg="white"
          borderTop="1px solid"
          borderColor="gray.200"
          p={{ base: 4, md: 6 }}
        >
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "stretch", sm: "center" }}
            gap={4}
          >
            <VStack align={{ base: "center", sm: "flex-start" }} gap={1}>
              <Text fontSize="sm" color="gray.600">
                Published {formatDate(blog.createdAt)}
                {blog.updatedAt !== blog.createdAt && (
                  <Text as="span" ml={2}>
                    • Updated {formatDate(blog.updatedAt)}
                  </Text>
                )}
              </Text>
              <Text fontSize="xs" color="gray.600">
                {blog.content.length} characters •{" "}
                {blog.content.split(" ").length} words
              </Text>
            </VStack>
          </Flex>
        </Box>
      </VStack>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
        }}
        onConfirm={() => onDelete?.(blog.id)}
      />
    </Box>
  );
};

export default BlogViewer;
