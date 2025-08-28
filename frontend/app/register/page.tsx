"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  HStack,
  Field,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { registerSchema } from "@/schema/user.schema";
import toast from "react-hot-toast";
import { RegisterFormData } from "@/types/user.types";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setAuth, authLoading, user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/home");
    }
  }, [authLoading , router , user]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      const { token, user } = await AuthService.register(data);
      toast.success("Registration successful!");
      setToken(token);
      setAuth(user);
      router.push("/home");
      setIsLoading(false);
    } catch (error : unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={12} px={{ base: 4, lg: 8 }}>
      <Container maxW="md">
        <VStack gap={8}>
          <VStack gap={6} textAlign="center">
            <Heading size="lg" color="black">
              Create your account
            </Heading>
            <Text color="gray.600">
              Join our community and start blogging today!
            </Text>
          </VStack>

          <Box py={8} px={10} bg="white" shadow="base" rounded="xl" w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={6}>
                {/* Username */}
                <Field.Root required invalid={!!errors.username}>
                  <Field.Label color="blackAlpha.600">Username</Field.Label>
                  <Input type="text" color="black" {...register("username")} />
                  {errors.username && (
                    <Text fontSize="sm" color="red.500">
                      {errors.username.message}
                    </Text>
                  )}
                </Field.Root>

                {/* Email */}
                <Field.Root required invalid={!!errors.email}>
                  <Field.Label color="blackAlpha.600">Email</Field.Label>
                  <Input type="email" color="black" {...register("email")} />
                  {errors.email && (
                    <Text fontSize="sm" color="red.500">
                      {errors.email.message}
                    </Text>
                  )}
                </Field.Root>

                {/* Password */}
                <Field.Root required invalid={!!errors.password}>
                  <Field.Label color="blackAlpha.600">Password</Field.Label>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    color="black"
                    {...register("password")}
                  />
                  {errors.password && (
                    <Text fontSize="sm" color="red.500">
                      {errors.password.message}
                    </Text>
                  )}
                </Field.Root>

                {/* Confirm Password */}
                <Field.Root required invalid={!!errors.confirmPassword}>
                  <Field.Label color="blackAlpha.600">
                    Confirm password
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    color="black"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <Text fontSize="sm" color="red.500">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Field.Root>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  backgroundColor={isLoading ? "gray.500" : "gray.600"}
                  color="white"
                  _hover={{
                    bg: "gray.700",
                  }}
                  loadingText="Creating account..."
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </Stack>
            </form>
          </Box>

          <HStack gap={1}>
            <Text color="black">Already have an account?</Text>
            <Link href="/login">
              <Button
                color="gray.600"
                _hover={{
                  color: "whiteAlpha.800",
                  bg: "gray.600",
                  border: "none",
                }}
                variant="outline"
              >
                Sign in
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default RegisterPage;
