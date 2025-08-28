"use client";

import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Spinner,
  Heading,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { blogSchema } from "@/schema/blog.shema";
import {  IBlogFormData } from "@/types/blog.types";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

interface BlogFormProps {
  blog?: IBlogFormData | null;
  isLoading?: boolean;
  onSubmit: (blogData: IBlogFormData) => Promise<void> | void;
  onCancel: () => void;
}

const BlogForm = ({
  blog = null,
  isLoading = false,
  onSubmit,
  onCancel,
}: BlogFormProps) => {
  const isUpdateMode = !!blog;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<IBlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog || { title: "", content: "" },
  });

  const { user, authLoading } = useAuth();
  const router = useRouter();

  

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      toast.error("You must be logged in to create or edit a blog.");
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (blog) reset(blog);
  }, [blog, reset]);

  const submitHandler = async (data: IBlogFormData) => {
    try {
      await onSubmit(data);
      if (!isUpdateMode) reset({ title: "", content: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      onCancel();
    }
  };

  const handleCancel = () => {
    reset(blog || { title: "", content: "" });
    onCancel();
  };

  return (
    <Box w="full" maxW={{ base: "full", md: "2xl" }} mx="auto">
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="gray.800">
            {isUpdateMode ? "Update Blog" : "Create New Blog"}
          </Heading>
          <Text color="gray.600" mt={2}>
            {isUpdateMode
              ? "Make changes to your blog post"
              : "Share your thoughts with the world"}
          </Text>
        </Box>

        <Box as="form" onSubmit={handleSubmit(submitHandler)}>
          <VStack gap={5} align="stretch">
            {/* Title Field */}
            <Field.Root required invalid={!!errors.title}>
              <Field.Label color="blackAlpha.700">Blog Title</Field.Label>
              <Input
                {...register("title")}
                placeholder="Enter an engaging title for your blog..."
                size="lg"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
                maxLength={100}
                color="black"
              />
              <HStack justify="space-between" mt={1}>
                {errors.title && (
                  <Text fontSize="sm" color="red.500">
                    {errors.title.message}
                  </Text>
                )}
                <Text fontSize="xs" color="gray.500">
                  {watch("title")?.length || 0}/100
                </Text>
              </HStack>
            </Field.Root>

            {/* Content Field */}
            <Field.Root required invalid={!!errors.content}>
              <Field.Label color="blackAlpha.700">Blog Content</Field.Label>
              <Textarea
                {...register("content")}
                placeholder="Write your blog content here..."
                size="lg"
                minH={{ base: "200px", md: "250px" }}
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
                resize="vertical"
                color="black"
              />
              <HStack justify="space-between" mt={1}>
                {errors.content && (
                  <Text fontSize="sm" color="red.500">
                    {errors.content.message}
                  </Text>
                )}
                <Text fontSize="xs" color="gray.500">
                  {watch("content")?.length || 0} characters
                </Text>
              </HStack>
            </Field.Root>

            {/* Actions */}
            <HStack
              gap={3}
              justify="flex-end"
              pt={4}
              flexDirection={{ base: "column", sm: "row" }}
            >
              <Button
                variant="outline"
                onClick={handleCancel}
                size="lg"
                color={"black"}
                _hover={{ color: "gray.100" }}
                w={{ base: "full", sm: "auto" }}
                minW="120px"
                loading={isSubmitting || isLoading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant={"surface"}
                colorScheme="blue"
                size="lg"
                w={{ base: "full", sm: "auto" }}
                minW="120px"
                loading={isSubmitting || isLoading}
                loadingText={isUpdateMode ? "Updating..." : "Creating..."}
                spinner={<Spinner size="sm" />}
              >
                {isUpdateMode ? "Update Blog" : "Create Blog"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default BlogForm;
