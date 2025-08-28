"use client";

import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Spinner,
  Heading,
  Field,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePassSchema } from "@/schema/user.schema";
import { IChangePassForm } from "@/types/user.types";

interface ChangePassFormProps {
  onSubmit: (blogData: IChangePassForm) => Promise<void> | void;
  onCancel: () => void;
}

const ChangePassForm = ({ onSubmit, onCancel }: ChangePassFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }>({
    resolver: zodResolver(changePassSchema),
    defaultValues: { oldPass: "", newPass: "", confirmPass: "" },
  });

  const submitHandler = async (data: IChangePassForm) => {
    onSubmit(data);
  };

  return (
    <Box w="full" maxW={{ base: "full", md: "2xl" }} mx="auto">
      <VStack gap={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="gray.800">
            Change your Password Using the Form Below
          </Heading>
        </Box>

        <Box as="form" onSubmit={handleSubmit(submitHandler)}>
          <VStack gap={5} align="stretch">
            <Field.Root required invalid={!!errors.oldPass}>
              <Field.Label color="blackAlpha.700">Old Password</Field.Label>
              <Input
                {...register("oldPass")}
                placeholder="Enter your old password..."
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
                {errors.oldPass && (
                  <Text fontSize="sm" color="red.500">
                    {errors.oldPass.message}
                  </Text>
                )}
              </HStack>
            </Field.Root>
            <Field.Root required invalid={!!errors.newPass}>
              <Field.Label color="blackAlpha.700">New Password</Field.Label>
              <Input
                {...register("newPass")}
                placeholder="Enter your new password..."
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
              {errors.newPass && (
                <Text fontSize="sm" color="red.500">
                  {errors.newPass.message}
                </Text>
              )}
            </Field.Root>
            <Field.Root required invalid={!!errors.confirmPass}>
              <Field.Label color="blackAlpha.700">Confirm Password</Field.Label>
              <Input
                {...register("confirmPass")}
                placeholder="Confirm your new password..."
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
              {errors.confirmPass && (
                <Text fontSize="sm" color="red.500">
                  {errors.confirmPass.message}
                </Text>
              )}
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
                onClick={onCancel}
                size="lg"
                color={"black"}
                _hover={{ bg: "gray.100", borderColor: "gray.400" }}
                w={{ base: "full", sm: "auto" }}
                minW="120px"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant={"surface"}
                size="lg"
                w={{ base: "full", sm: "auto" }}
                minW="120px"
                spinner={<Spinner size="sm" />}
              >
                Submit
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default ChangePassForm;
