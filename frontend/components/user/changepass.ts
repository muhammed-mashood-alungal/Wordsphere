// const ChangePasswordModal = ({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) => (
//   <Modal isOpen={isOpen} onClose={onClose}>
//     <ModalOverlay />
//     <ModalContent>
//       <ModalHeader color="black">Change Password</ModalHeader>
//       <ModalCloseButton />
//       <ModalBody>
//         <Stack spacing={4}>
//           <FormControl>
//             <FormLabel color="gray.600">Current Password</FormLabel>
//             <Input type="password" placeholder="Enter current password" />
//           </FormControl>
//           <FormControl>
//             <FormLabel color="gray.600">New Password</FormLabel>
//             <Input type="password" placeholder="Enter new password" />
//           </FormControl>
//           <FormControl>
//             <FormLabel color="gray.600">Confirm New Password</FormLabel>
//             <Input type="password" placeholder="Confirm new password" />
//           </FormControl>
//         </Stack>
//       </ModalBody>
//       <ModalFooter>
//         <Button variant="outline" mr={3} onClick={onClose} color="gray.600">
//           Cancel
//         </Button>
//         <Button bg="gray.600" color="white" _hover={{ bg: "gray.700" }}>
//           Update Password
//         </Button>
//       </ModalFooter>
//     </ModalContent>
//   </Modal>
// );
