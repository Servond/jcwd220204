import React, { useState } from "react"

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
import { TfiTrash } from "react-icons/tfi"
import { Link } from "react-router-dom"

const ListingRow = ({ name, image_url, id, properties, address, city }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [images, setImages] = useState([])

  const getImages = properties.map((val) => val.image_url)
  console.log(getImages)

  return (
    <Center py={2} px={5} top="0" zIndex="0">
      <Link to={`/listing/details/${id}`}>
        <Stack
          borderRadius="2xl"
          w="340px"
          height="150px"
          direction="row"
          bg={useColorModeValue("gray.100", "black")}
          boxShadow={"base"}
          padding={5}
          position="static"
        >
          <Flex flex={0.5} ml="-10px">
            <Image
              src={`http://localhost:8000/public/${getImages[0]}`}
              borderRadius="2xl"
              h="-moz-max-content"
              width={"150px"}
              layout={"fill"}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
          >
            <Text
              fontSize={"md"}
              fontFamily={"body"}
              fontWeight="bold"
              pl="10px"
            >
              {name || "name"}
              <br />
              <Text fontSize={"small"} fontFamily={"mono"} fontWeight="light">
                {city?.cities_name || "cities"}
              </Text>
            </Text>
          </Stack>
        </Stack>
      </Link>
      <Box onClick={onOpen} position="relative" right={"30px"} bottom="50px">
        <TfiTrash />
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
