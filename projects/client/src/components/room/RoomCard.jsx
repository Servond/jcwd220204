import React, { useEffect, useRef, useState } from "react"
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Flex,
  CloseButton,
  AlertDialogContent,
  Textarea,
  InputRightAddon,
  InputGroup,
  ButtonGroup,
  Container,
  Tooltip,
} from "@chakra-ui/react"
import { VscEdit } from "react-icons/vsc"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BiEditAlt } from "react-icons/bi"
import { TfiTrash } from "react-icons/tfi"
import { useFormik } from "formik"
import { BiUpload } from "react-icons/bi"
import { Calendar } from "antd"
import { Carousel } from "antd"

const RoomCard = ({
  item_name,
  price,
  capacity,
  description,
  images,
  picture_url,
  onDelete,
  id,
  calendars,
  fetchListingDetails,
}) => {
  const params = useParams()
  const toast = useToast()
  const roomId = id

  const inputFileRef = useRef()
  const [selectedImages, setSelectedImages] = useState([])
  const [room, setRoom] = useState([])

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const modalDelete = useDisclosure()
  const modalEditInfo = useDisclosure()
  const modalImage = useDisclosure()
  const modalImageAsk = useDisclosure()
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [closeModalEdit, setCloseModalEdit] = useState(false)
  const [openImageId, setOpenImageId] = useState(null)
  const [getImg, setGetImg] = useState([])
  const [zeroImg, setZeroImg] = useState([])

  const cancelRef = React.useRef()
  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const deleteRef = useRef()

  const confirmDeleteBtnHandler = () => {
    // onClose()
    modalDelete.onClose()
    onDelete()
  }

  //=======================UPDATE ROOM INFO
  const formik = useFormik({
    initialValues: {
      item_name: item_name,
      description: description,
      capacity: capacity,
      price: price,
    },
    onSubmit: async ({ item_name, description, capacity, price }) => {
      try {
        const response = await axiosInstance.patch(`/room/editroom/${roomId}`, {
          item_name,
          description,
          capacity,
          price,
        })
        window.location.reload(true)
        toast({
          title: "Success to edit room info",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit room info",
          status: "error",
        })
      }
    },
  })

  //==========================DELETE ROOM IMAGE

  const getImages = async () => {
    try {
      const responseImg = await axiosInstance.get(`/room`)
      // console.log(responseImg.data)
      setRoom(responseImg.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  const getImagesNew = room.map(
    // (val) => `${process.env.REACT_APP_IMG}${val.picture_url}`
    (val) => `http://localhost:8204/public/${val.picture_url}`
  )
  // console.log(getImagesNew)

  const deleteRoomImg = async (id) => {
    try {
      await axiosInstance.delete(`/room/deleteimage/${openImageId.id}`)
      setOpenImageId(null)
      fetchListingDetails()
      getImages()
      // fetchRoom()

      toast({
        title: "Image deleted",
        status: "info",
      })
      // fetchRoom()
      modalImageAsk.onClose()
      // getImg()
      // window.location.reload(false)
    } catch (err) {
      console.log(err)
    }
  }
  const reload = () => {
    return window.location.reload(false)
  }
  //==============================POST IMAGE
  const handleSubmit = async (event) => {
    try {
      let newImgRoom = new FormData()
      newImgRoom.append("picture_url", event)
      const responseImg = await axiosInstance.post(
        `/room/addimageroom/${roomId}`,
        newImgRoom
      )

      setGetImg(responseImg.data.data.picture_url)

      images.push(responseImg?.data?.data)

      toast({
        title: "Image has been added",
        status: "success",
      })

      // window.location.reload(false)
      // event.preventDefault()
    } catch (err) {
      console.log(err)
    }
  }

  //================================SHOW DATA IN CALENDAR

  const getDate = calendars.map((val) => val.startDate)

  useEffect(
    () => {
      getImages()
      fetchListingDetails()
    },
    [openImageId],
    [getImg],
    [getImagesNew]
  )

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imageArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setSelectedImages((previousImage) => previousImage.concat(imageArray))
  }
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e != image))
    URL.revokeObjectURL(image)
  }

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  }

  return (
    <>
      <Center py={2}>
        <Box
          maxW={"445px"}
          w={"full"}
          h="600px"
          // bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Box
            h={"270px"}
            mt={-6}
            p={6}
            mx={-6}
            // mb={20}
            pos={"relative"}
          >
            <Popover>
              <PopoverTrigger>
                <IconButton
                  // background={"linkedin.500"}
                  _hover="none"
                  width={"30px"}
                  cursor="pointer"
                  marginBottom={"10px"}
                >
                  <VscEdit size={"20px"} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent
                w="fit-content"
                border={"none"}
                _focus={{ boxShadow: "none" }}
              >
                <PopoverArrow />

                <PopoverBody>
                  <VStack>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                      // onClick={() => setOpenModalEdit(true)}
                      onClick={modalEditInfo.onOpen}
                      cursor="pointer"
                    >
                      Edit Room Info
                    </Button>

                    <Modal
                      isOpen={modalEditInfo.isOpen}
                      onClose={modalEditInfo.onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit your room information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl isRequired>
                            <FormLabel>Room type</FormLabel>
                            <Textarea
                              placeholder="type here"
                              type="text"
                              name="item_name"
                              defaultValue={item_name}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              placeholder="type here"
                              textAlign={"left"}
                              verticalAlign="top"
                              type="text"
                              h={"200px"}
                              textTransform="full-size-kana"
                              name="description"
                              defaultValue={description}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Capacity</FormLabel>
                            <InputGroup>
                              <Input
                                placeholder="type here"
                                type="number"
                                name="capacity"
                                defaultValue={capacity}
                                onChange={formChangeHandler}
                              />
                              <InputRightAddon children="person" />
                            </InputGroup>
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                              <Input
                                placeholder="type here"
                                type="number"
                                name="price"
                                defaultValue={price}
                                onChange={formChangeHandler}
                              />
                              <InputRightAddon children="¥/ night" />
                            </InputGroup>
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <ButtonGroup>
                            <Button
                              colorScheme={"red"}
                              onClick={modalEditInfo.onClose}
                              cursor="pointer"
                            >
                              Close
                            </Button>

                            <Button
                              colorScheme={"blue"}
                              type="submit"
                              onClick={formik.handleSubmit}
                              cursor="pointer"
                            >
                              Save
                            </Button>
                          </ButtonGroup>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                      onClick={modalImage.onOpen}
                      cursor="pointer"
                    >
                      Edit Room Images
                    </Button>
                    <Modal
                      isOpen={modalImage.isOpen}
                      onClose={modalImage.onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Your Room Images</ModalHeader>
                        <ModalBody>
                          <Stack spacing="6">
                            <Box>
                              <Input
                                // placeholder="type here"

                                multiple={true}
                                type="file"
                                accept="image/*"
                                justifyContent={"center"}
                                alignItems="center"
                                display="none"
                                onChange={(event) => {
                                  handleSubmit(event.target.files[0])
                                }}
                                ref={inputFileRef}
                                onClick={getImg}
                              />

                              <Box
                                mt={"30px"}
                                backgroundColor={"green.500"}
                                boxSize="-webkit-max-content"
                                borderRadius={"5px"}
                                mb="10px"
                              >
                                <label
                                  onClick={() => inputFileRef.current.click()}
                                >
                                  <Flex
                                    gap="10px"
                                    borderRadius="5px"
                                    boxShadow={"lg"}
                                    boxSize="-webkit-max-content"
                                    cursor={"pointer"}
                                  >
                                    <Center width="30px" borderRadius="5px">
                                      <BiUpload color="white " size={"30px"} />
                                    </Center>
                                    <Text textAlign={"center"}>
                                      Choose Images
                                    </Text>
                                  </Flex>
                                </label>
                              </Box>
                            </Box>
                          </Stack>

                          {images.map((val) => (
                            <Box
                              w="100%"
                              borderWidth="1px"
                              rounded="lg"
                              shadow="370px"
                              display="flex"
                              p="4px"
                              mb="24px"
                              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 20px"}
                              borderRadius="8px"
                            >
                              <Image
                                borderRadius="8px"
                                boxSize="100%"
                                objectFit="cover"
                                // src={`${process.env.REACT_APP_IMG}${val.picture_url}`}

                                src={`http://localhost:8204/public/${val.picture_url}`}
                                alt="upload"
                              />

                              <CloseButton
                                position="absolute"
                                border="none"
                                color="white"
                                cursor="pointer"
                                size="sm"
                                // onClick={() => deleteHandler(image)}
                                backgroundColor="red.500"
                                onClick={() => {
                                  setOpenImageId(val)
                                  modalImageAsk.onOpen()
                                }}
                              />

                              <AlertDialog
                                isCentered
                                isOpen={modalImageAsk.isOpen}
                                onClose={modalImageAsk.onClose}
                              >
                                <AlertDialogOverlay />
                                <AlertDialogContent maxWidth="-webkit-max-content">
                                  <AlertDialogHeader
                                    fontSize={"md"}
                                    fontWeight="bold"
                                  >
                                    Delete Room Image
                                  </AlertDialogHeader>
                                  <AlertDialogBody>
                                    Are you sure to delete this image room ?
                                  </AlertDialogBody>
                                  <AlertDialogFooter>
                                    <ButtonGroup>
                                      <Button
                                        ref={cancelRef}
                                        // onClick={onClose}
                                        onClick={modalImageAsk.onClose}
                                        colorScheme="gray"
                                        color={"black"}
                                        cursor="pointer"
                                      >
                                        Cancel
                                      </Button>

                                      <Button
                                        colorScheme={"red"}
                                        onClick={() => {
                                          deleteRoomImg(val.id)
                                        }}
                                        cursor="pointer"
                                      >
                                        Delete
                                      </Button>
                                    </ButtonGroup>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </Box>
                          ))}
                        </ModalBody>
                        <ModalFooter>
                          <ButtonGroup>
                            <Button
                              onClick={modalImage.onClose}
                              colorScheme="red"
                              cursor={"pointer"}
                            >
                              Cancel
                            </Button>

                            <Button
                              colorScheme={"blue"}
                              onClick={reload}
                              cursor={"pointer"}
                            >
                              Save
                            </Button>
                          </ButtonGroup>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<TfiTrash />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      // onClick={onOpen}
                      onClick={modalDelete.onOpen}
                      position="relative"
                      cursor={"pointer"}
                    >
                      Delete Room
                    </Button>

                    <AlertDialog
                      isCentered
                      isOpen={modalDelete.isOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={modalDelete.onClose}
                      motionPreset="slideInBottom"
                    >
                      <AlertDialogOverlay />
                      <AlertDialogContent maxWidth="-webkit-max-content">
                        <AlertDialogHeader fontSize={"md"} fontWeight="bold">
                          Delete Room
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          Are you sure to delete this room ?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <ButtonGroup>
                            <Button
                              ref={cancelRef}
                              // onClick={onClose}
                              onClick={modalDelete.onClose}
                              colorScheme="gray"
                              color={"black"}
                              cursor="pointer"
                            >
                              Cancel
                            </Button>
                            <Button
                              colorScheme={"red"}
                              onClick={confirmDeleteBtnHandler}
                              cursor="pointer"
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                      {/* </AlertDialogOverlay> */}
                    </AlertDialog>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Carousel autoplay nextArrow={BiEditAlt}>
              {images.map((val) => (
                <Image
                  // border={"5px solid white"}
                  // src={`${process.env.REACT_APP_IMG}${val.picture_url}`}
                  src={`http://localhost:8204/public/${val.picture_url}`}
                  objectFit="cover"
                  width={"100%"}
                  height="100%"
                />
              ))}
            </Carousel>
          </Box>
          <Container bgColor={"linkedin.100"} width="100%" height={"100%"}>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {item_name || "name"}
            </Heading>
            <HStack>
              <Text color={"green.500"} fontWeight={800} fontSize={"sm"}>
                {new Intl.NumberFormat("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                }).format(price)}
              </Text>
              <Text color={"gray.500"} fontSize={"smaller"}>
                / room / night
              </Text>
            </HStack>

            <Text fontWeight={800} fontSize={"sm"}>
              {capacity || "capacity"} Guests
            </Text>
            <Text>{description || "description"}</Text>
          </Container>
          {/* </Stack> */}
        </Box>
      </Center>
    </>
  )
}

export default RoomCard
