import { Button, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => (
  <HStack gap={2}>
   
    <Button
      aria-label="Previous page"
      size="sm"
      variant="outline"
      disabled={currentPage === 1}
      onClick={() => onPageChange(currentPage - 1)}
      color="gray.600"
      borderColor="gray.300"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.400",
      }}
    >
      <Icon as={ChevronLeft} boxSize={4} mr={1} /> Prev
    </Button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <Button
        key={page}
        size="sm"
        variant={currentPage === page ? "solid" : "outline"}
        bg={currentPage === page ? "gray.600" : "transparent"}
        color={currentPage === page ? "white" : "gray.600"}
        borderColor={currentPage === page ? "gray.600" : "gray.300"}
        _hover={{
          bg: currentPage === page ? "gray.700" : "gray.100",
          borderColor: currentPage === page ? "gray.700" : "gray.400",
        }}
        onClick={() => onPageChange(page)}
        minW="8"
      >
        {page}
      </Button>
    ))}

    <Button
      aria-label="Next page"
      size="sm"
      variant="outline"
      disabled={currentPage === totalPages}
      onClick={() => onPageChange(currentPage + 1)}
      color="gray.600"
      borderColor="gray.300"
      _hover={{
        bg: "gray.100",
        borderColor: "gray.400",
      }}
    >
      Next <Icon as={ChevronRight} boxSize={4} ml={1} />
    </Button>
  </HStack>
);
