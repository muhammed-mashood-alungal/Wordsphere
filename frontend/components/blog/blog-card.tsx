import { useAuth } from "@/context/auth.context";
import { IBlog, IBlogFormData } from "@/types/blog.types";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Pen } from "lucide-react";
import {  useState } from "react";
import BaseModal from "../common/base-modal";
import BlogForm from "./blog-form";
import BlogViewer from "./blog-read";

interface BlogCardProps {
  blog: IBlog;
  onEdit: (id: string, data: IBlogFormData) => void;
  onDelete: (id: string) => void;
}
export const BlogCard: React.FC<BlogCardProps> = ({ blog, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [readingBlog, setReadingBlog] = useState<IBlog | null>(null);

  return (
    <Box
      bg="white"
      shadow="base"
      rounded="xl"
      overflow="hidden"
      _hover={{
        shadow: "lg",
        transform: "translateY(-2px)",
      }}
      transition="all 0.2s"
      cursor="pointer"
      p={6}
    >
      <VStack gap={4} align="stretch">
        <Flex justify={"space-between"}>
          <Heading size="md" color="black">
            {blog.title.slice(0, 50)}
          </Heading>
          {user?.id === blog.author.id && (
            <Button
              onClick={() => setEditingBlog(blog)}
              variant={"ghost"}
              _hover={{ bg: "gray.100" }}
              color="gray.600"
            >
              Edit
            </Button>
          )}
        </Flex>

        <Text color="gray.600" lineHeight="1.6">
          {blog?.content?.slice(0, 100)}...
        </Text>

        <HStack justify="space-between" align="center" pt={2}>
          <VStack align="flex-start" gap={0}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              <Flex align={"center"} gap={1}>
                <Pen size={12} /> {blog.author.username}
              </Flex>
            </Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(blog.createdAt)?.toLocaleDateString()}
            </Text>
          </VStack>

          <Button
            onClick={() => setReadingBlog(blog)}
            size="sm"
            variant="ghost"
            color="gray.600"
            _hover={{
              bg: "gray.100",
              color: "gray.700",
            }}
          >
            Read More
          </Button>
        </HStack>
      </VStack>
      <BaseModal isOpen={!!editingBlog} onClose={() => setEditingBlog(null)}>
        <BlogForm
          blog={editingBlog}
          onCancel={() => setEditingBlog(null)}
          onSubmit={(data) => onEdit(editingBlog?.id as string, data)}
        />
      </BaseModal>
      <BaseModal isOpen={!!readingBlog} onClose={() => setReadingBlog(null)}>
        {!!readingBlog && (
          <BlogViewer
            blog={readingBlog!}
            canEdit={
              user?.id === readingBlog?.author.id || user?.role == "admin"
            }
            onEdit={() => {
              if (readingBlog) setEditingBlog(readingBlog);
            }}
            onDelete={onDelete}
          />
        )}
      </BaseModal>
    </Box>
  );
};
