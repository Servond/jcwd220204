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
  IconButton,
  useToast,
} from "@chakra-ui/react"
import { TfiTrash } from "react-icons/tfi"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../api"

const ListingRow = ({ name, image_url, id, properties, address, city }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [images, setImages] = useState([])
  const toast = useToast()

  const getImages = properties.map((val) => val.image_url)
  const deleteProperty = async () => {
    try {
      await axiosInstance.delete(`/property/delete/${id}`)
      window.location.reload(false)
      toast({
        status: "success",
        title: "deleted successful",
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Link to={`/listing/details/${id}`}>
        <Stack
          borderRadius="2xl"
          w={{ base: "340px", md: "300px" }}
          height={{ base: "220px", md: "auto" }}
          direction="row"
          bg={useColorModeValue("gray.100", "black")}
          boxShadow={"base"}
          padding={5}
          // border="2px solid red"
          mt={"20px"}
        >
          <Flex flex={0.5} ml="-10px">
            <Image
              src={`http://localhost:8000/public/${getImages[0]}`}
              borderRadius="2xl"
              h="130px"
              mt={"20px"}
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
              color={"black"}
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
      <IconButton
        onClick={onOpen}
        mt={{ base: "-220px", md: "20px" }}
        ml={{ base: "0px", md: "-310px" }}
        position={{ base: "sticky", md: "sticky" }}
        color="red"
        cursor={"pointer"}
        width="10px"
        backgroundColor={"white"}
      >
        <TfiTrash />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="350px">
          <ModalHeader>Delete Listing</ModalHeader>
          <ModalCloseButton backgroundColor={"red"} cursor={"pointer"} />
          <ModalBody>Are you sure want to delete this listing?</ModalBody>

          <ModalFooter>
            <Button
              variant={"solid"}
              mr={3}
              cursor={"pointer"}
              onClick={() => {
                deleteProperty(id)
              }}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose} cursor={"pointer"}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ListingRow
