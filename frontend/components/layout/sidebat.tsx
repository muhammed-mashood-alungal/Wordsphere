import {
  Box,
  VStack,
  Text,
  Icon,
  Button,
  Separator,
  useBreakpointValue,
  Drawer,
  IconButton,
  useDisclosure,
  Portal,
  CloseButton,
} from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import { FiHome, FiUser, FiShield } from "react-icons/fi";

interface SidebarProps {
  activeSection: "home" | "profile";
  onSectionChange: (section: "home" | "profile") => void;
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

const SidebarContent = ({
  activeSection,
  onSectionChange,
  isAdmin,
  onAdminClick,
}: SidebarProps) => (
  <VStack gap={4} align="stretch" h="full">
    <Box p={6} borderBottom="1px" borderColor="gray.200">
      <Text fontSize="xl" fontWeight="bold" color="black">
        Dashboard
      </Text>
    </Box>

    <VStack gap={2} px={4} flex={1}>
      <Button
        w="full"
        justifyContent="flex-start"
        variant={activeSection === "home" ? "solid" : "ghost"}
        bg={activeSection === "home" ? "gray.600" : "transparent"}
        color={activeSection === "home" ? "white" : "gray.600"}
        _hover={{
          bg: activeSection === "home" ? "gray.700" : "gray.100",
          color: activeSection === "home" ? "white" : "gray.700",
        }}
        onClick={() => onSectionChange("home")}
        size="lg"
        fontSize="md"
        gap={2}
      >
        <Icon as={FiHome} />
        Home
      </Button>

      <Button
        w="full"
        justifyContent="flex-start"
        variant={activeSection === "profile" ? "solid" : "ghost"}
        bg={activeSection === "profile" ? "gray.600" : "transparent"}
        color={activeSection === "profile" ? "white" : "gray.600"}
        _hover={{
          bg: activeSection === "profile" ? "gray.700" : "gray.100",
          color: activeSection === "profile" ? "white" : "gray.700",
        }}
        onClick={() => onSectionChange("profile")}
        size="lg"
        fontSize="md"
        gap={2}
      >
        <Icon as={FiUser} />
        Profile
      </Button>
    </VStack>

    {isAdmin && (
      <>
        <Separator />
        <Box px={4} pb={4}>
          <Button
            w="full"
            justifyContent="flex-start"
            variant="outline"
            borderColor="blue.500"
            color="blue.500"
            _hover={{
              bg: "blue.50",
              borderColor: "blue.600",
              color: "blue.600",
            }}
            onClick={onAdminClick}
            size="lg"
            fontSize="md"
            gap={2}
          >
            <Icon as={FiShield} />
            Admin Panel
          </Button>
        </Box>
      </>
    )}
  </VStack>
);

export const Sidebar = (props: SidebarProps) => {
  const { open, onOpen, onClose, setOpen } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <>
        <IconButton
          aria-label="Open menu"
          onClick={onOpen}
          position="fixed"
          top={4}
          left={4}
          zIndex={20}
          bg="white"
          shadow="md"
          color="gray.600"
          _hover={{ bg: "gray.100" }}
        >
          <FaBars />
        </IconButton>

        <Drawer.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          placement="start"
          size="sm"
        >
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bg="white">
                <Box p={2} display="flex" justifyContent="flex-end">
                  <CloseButton onClick={onClose} color="gray.600" />
                </Box>
                <Drawer.Body p={0}>
                  <SidebarContent {...props} />
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </>
    );
  }

  return (
    <Box
      w="280px"
      h="100vh"
      bg="white"
      shadow="md"
      position="fixed"
      left={0}
      top={0}
      zIndex={10}
    >
      <SidebarContent {...props} />
    </Box>
  );
};
