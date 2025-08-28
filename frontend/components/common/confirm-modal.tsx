import {
  Button,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{message}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Button
                colorScheme="blue"
                onClick={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" onClick={onClose}/>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmModal;
