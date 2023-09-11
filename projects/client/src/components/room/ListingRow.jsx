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
import { BsTrash } from "react-icons/bs"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"

const ListingRow = ({ name, image_url, id, properties, address, city }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params = useParams()
  const toast = useToast()

  const [images, setImages] = useState([])

  const getImages = properties.map((val) => val.image_url)
  const randomIndex = Math.floor(Math.random() * getImages.length)
  console.log(getImages, "try")
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
          w={{ base: "340px", md: "300px" }}
          height={{ base: "220px", md: "auto" }}
          direction="row"
          boxShadow={"md"}
          padding={5}
          mt={"20px"}
          bg="white"
        >
          <Flex flex={0.5} mt="1vh">
            <Image
              // src={`${process.env.REACT_APP_IMG}${getImages[0]}`}
              src={`http://localhost:8204/public/${getImages[randomIndex]}`}
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
        width={{ base: "340px", md: "300px" }}
        fontWeight="bold"
      >
        <BsTrash fontWeight={"bolder"} />
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
              backgroundColor="red.500"
              _hover={{ backgroundColor: "red.400" }}
              color="white"
              mr={3}
              cursor={"pointer"}
              onClick={() => {
                deleteProperty(id)
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ListingRow
