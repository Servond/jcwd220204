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
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"

const ListingRow = ({ name, image_url, id, properties, address, city }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params = useParams()
  const toast = useToast()

  const [images, setImages] = useState([])

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

  const DeleteProperty = async () => {
    try {
      const deleted = await axiosInstance.delete(
        `/property/delete/${params.id}`
      )
      console.log(deleted)
      toast({
        title: "Property Deleted",
        description: "Success delete property",
        status: "success",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Error deleted property",
        description: "Error delete property",
        status: "error",
      })
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
        width={{ md: "300px", base: "340px" }}
      >
        <TfiTrash />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="350px">
          <ModalHeader>Delete Listing</ModalHeader>
          <ModalCloseButton backgroundColor="none" cursor={"pointer"} />
          <ModalBody>Are you sure want to delete this listing?</ModalBody>

          <ModalFooter>
            <Button
              variant={"solid"}
              mr={3}
              cursor={"pointer"}
              onClick={() => {
                deleteProperty(id)
              }}
              color="white"
              backgroundColor="red.500"
              _hover={{ backgroundColor: "red.400" }}
            >
              Delete
            </Button>
            {/* <Button variant="ghost" onClick={onClose} cursor={"pointer"}>
              Cancel
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ListingRow
