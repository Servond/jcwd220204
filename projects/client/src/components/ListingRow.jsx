import React from "react"
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { TfiTrash } from "react-icons/tfi";
import { Link } from "react-router-dom"

const ListingRow = ({ name, image_url, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Center py={3}>
      <Link to={`/listing/details/${id}`}>
        
      <Stack
        borderRadius="lg"
        w="350px"
        height="100px"
        direction="row"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"base"}
        padding={4}
      >
        <Flex flex={0.5}>
          <Image
            rounded={"md"}
            src={
              image_url ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
            }
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
         
        >
          <Text fontSize={"md"} fontFamily={"sans-serif"}  pl="10px">
            {name || "name"}
          </Text>
        </Stack>
      </Stack>
      </Link>
      <Box onClick={onOpen} position="relative" right={"30px"}>
        <TfiTrash/>
      </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="350px">
            <ModalHeader>Delete Listing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure want to delete this listing?</ModalBody>

            <ModalFooter>
              <Button variant={"solid"} mr={3}>
                Delete
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Center>
  )
}

export default ListingRow
