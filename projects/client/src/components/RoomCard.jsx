import React, { useEffect, useState } from "react"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { axiosInstance } from "../api"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BiEditAlt } from "react-icons/bi"
import { TfiTrash } from "react-icons/tfi"

const RoomCard = ({ item_name, price, capacity, description }) => {
  const params = useParams()

  const { isOpen, onOpen, onClose } = useDisclosure()

  //pindah ke ListingDetails
  const [roomPhoto, setRoomPhoto] = useState([])

  const fetchRoomPhoto = async () => {
    try {
      const response = await axiosInstance.get(`/property/room/${params.id}`)

      setRoomPhoto(response.data.data.Images)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRoomPhoto()
  }, [])
  //============================

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    arrows: true,
  }

  return (
    <Center py={2}>
      <Box
        maxW={"445px"}
        w={"full"}
        h="600px"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Box
            h={"270px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Slider {...settings}>
              {roomPhoto.map((val) => (
                <Image src={val.picture_url} h="100%" layout={"fill"} />
              ))}
            </Slider>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  backgroundColor={"unset"}
                  position={"absolute"}
                  right="1"
                  top="1"
                  _hover={"unset"}
                >
                  <BsThreeDotsVertical color="white" size={"20px"} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
                <PopoverArrow />
                <PopoverBody>
                  <Stack>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<TfiTrash />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      onClick={onOpen}
                    >
                      Delete
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent w="350px">
                        <ModalHeader>Delete Room</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          Are you sure want to delete this Room?
                        </ModalBody>

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
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {item_name || "name"}
          </Heading>
          <HStack>
            <Text color={"green.500"} fontWeight={800} fontSize={"sm"}>
              Rp {price || "price"}
            </Text>
            <Text color={"gray.500"} fontSize={"smaller"}>
              / room / night
            </Text>
          </HStack>
          <Text color={"blackAlpha.500"} fontWeight={800} fontSize={"sm"}>
            {capacity || "capacity"} Guests
          </Text>
          <Text color={"gray.500"}>{description || "description"}</Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default RoomCard
