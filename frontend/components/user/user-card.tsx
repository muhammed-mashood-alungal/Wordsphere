import { useAuth } from "@/context/auth.context";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { IUser } from "@/types/user.types";
import { UserServices } from "@/services/user.service";
import ConfirmModal from "../common/confirm-modal";
import { useState } from "react";
import { set } from "zod";

interface UserCardProps {
  userData: IUser;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}
export const UserCard: React.FC<UserCardProps> = ({ userData, setUsers }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);



  const handleDeletion = async (id: string) => {
    try {
      await UserServices.delete(id);
      setUsers((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isDeleted: true } : b))
      );
      
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong. Please try again.");
    }
  };

  const handleRestoreUser = async (id: string) => {
    try {
      
      await UserServices.restore(id);
      setUsers((prev) =>
        prev.map((b) => (b.id === id ? { ...b, isDeleted: false } : b))
      );
      toast.success("User restored successfully");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong. Please try again.");
    }
  };

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
            {userData.username}
          </Heading>
        </Flex>

        <Text color="gray.600" lineHeight="1.6">
          {userData.email}
        </Text>

        <HStack justify="space-between" align="center" pt={2}>
          <VStack align="flex-start" gap={0}>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              <Flex align={"center"} gap={1}>
                Role : {userData.role}
              </Flex>
            </Text>
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              <Flex align={"center"} gap={1}>
                {userData.isDeleted ? "Deleted" : "Active"}
              </Flex>
            </Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(userData.createdAt)?.toLocaleDateString()}
            </Text>
          </VStack>

          {userData.isDeleted ? (
            <Button
              onClick={() => setIsConfirmOpen(true)}
              variant={"ghost"}
              _hover={{ bg: "gray.100" }}
              color="gray.600"
            >
              Restore
            </Button>
          ) : (
            <Button
              onClick={() => setIsConfirmOpen(true)}
              variant={"ghost"}
              _hover={{ bg: "gray.100" }}
              color="gray.600"
            >
              Delete
            </Button>
          )}
        </HStack>
      </VStack>
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          if (userData.isDeleted) {
            handleRestoreUser(userData.id);
          } else {
            handleDeletion(userData.id);
          }
          setIsConfirmOpen(false);
        }}
      />
    </Box>
  );
};
