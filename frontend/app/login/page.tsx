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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth.context";
import { LoginFormData } from "@/types/user.types";
import { loginSchema } from "@/schema/user.schema";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setAuth, authLoading, user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/home");
    }
  }, [authLoading, user, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const { token, user } = await AuthService.login(data);
      toast.success("Login successful!");
      setToken(token);
      setAuth(user);
      router.push("/home");
    } catch (error : unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.100" py={12} px={{ base: 4, lg: 8 }}>
      <Container maxW="md">
        <VStack gap={8}>
          <VStack gap={6} textAlign="center">
            <Heading size="lg" color="black">
              Sign in to your account
            </Heading>
            <Text color="gray.600">
              Welcome back! Please enter your details.
            </Text>
          </VStack>

          <Box py={8} px={10} bg="white" shadow="base" rounded="xl" w="full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={6}>
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
                  loadingText="Signing in..."
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </Stack>
            </form>
          </Box>

          <HStack gap={1}>
            <Text color="black">Don't have an account?</Text>
            <Link href="/register">
              <Button
                color="gray.600"
                _hover={{
                  color: "whiteAlpha.800",
                  bg: "gray.600",
                  border: "none",
                }}
                variant="outline"
                onClick={() => router.push("/register")}
              >
                Create account
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
