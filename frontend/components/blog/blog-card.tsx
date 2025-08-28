import { IBlog } from "@/types/blog.types";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

interface BlogCardProps {
  blog: IBlog;
}
export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
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
    p={6} // equivalent to CardBody padding
  >
    <VStack gap={4} align="stretch">
      {/* <HStack justify="space-between" align="flex-start">
        <Badge
          colorScheme="blue"
          variant="subtle"
          px={2}
          py={1}
          rounded="md"
          fontSize="xs"
        >
          {blog.category}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          {blog.readTime}
        </Text>
      </HStack> */}

      <Heading size="md" color="black">
        {blog.title}
      </Heading>

      <Text color="gray.600" lineHeight="1.6">
        {blog?.content?.slice(0, 100)}...
      </Text>

      <HStack justify="space-between" align="center" pt={2}>
        <VStack align="flex-start" gap={0}>
          <Text fontSize="sm" fontWeight="medium" color="gray.700">
            {blog.author.username}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {blog.createdAt?.toDateString()}
          </Text>
        </VStack>

        <Button
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
  </Box>
);
