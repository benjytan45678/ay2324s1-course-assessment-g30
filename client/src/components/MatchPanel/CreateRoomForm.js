import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  useToast,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

function CreateRoomForm({ socket }) {
  const [inputDifficulty, setInputDifficulty] = useState("");
  const [showRoomCreatedModal, setShowRoomCreatedModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();

  const handleModalSubmit = () => {
    if (inputDifficulty !== "") {
      socket.emit("create-room", inputDifficulty);
    } else {
      toast({
        title: "Please select a difficulty",
        description: "We need to know how hard you want to play!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCreateRoomClick = () => {
    setShowModal(true);
  };

  // Successful Room Creation
  useEffect(() => {
    if (socket) {
      socket.on("room-created", () => {
        setShowModal(false);
        setShowRoomCreatedModal(true);
      });
    }
  }, [socket]);

  return (
    <>
      <Button onClick={handleCreateRoomClick}>Create Room</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Room Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              value={inputDifficulty}
              onChange={(e) => setInputDifficulty(e.target.value)}
              size="sm"
              placeholder="Select difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
            <Button onClick={handleModalSubmit}>Create Room</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={showRoomCreatedModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Room Created!</ModalHeader>
          <ModalBody>
            Enjoy! You'll be redirected to your room in a bit!
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateRoomForm;
