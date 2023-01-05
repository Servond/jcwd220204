import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { async } from "@firebase/util"
import { Carousel } from "antd"
import { GrFormNext } from "react-icons/gr"
import { Calendar } from "antd"

const DetailProperty = () => {
  const reserveModal = useDisclosure()
  const [room, setRoom] = useState([])
  const [property, setProperty] = useState([])
  const [images, setImages] = useState([])
  const [getDateRooms, setGetDateRooms] = useState()

  const params = useParams()

  const fetchRoom = async () => {
    try {
      const response = await axiosInstance.get(`/room/${params.id}`)

      setRoom(response.data.data.PropertyItems)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)

      setProperty(response.data.data)
      setImages(response.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }

  const getDateRoom = async () => {
    try {
      const responseData = await axiosInstance.get(`/calendar/${params.id}`)
      setGetDateRooms(responseData.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(getDateRooms, "coba2")

  const contentStyle = {
    margin: 0,
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    padding: 0,
  }

  useEffect(() => {
    fetchRoom()
    fetchProperty()
    getDateRoom()
  }, [])
  return (
    <Center>
      <Container width={"-moz-max-content"} height="auto" mt={"75px"}>
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>

        <Carousel autoplay effect="fade" dotPosition="bottom" easing="linear">
          {images?.map((val) => (
            <Image
              style={contentStyle}
              //   src={val.image_url}
              src={`http://localhost:8000/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"50%"}
              h={{ base: "350px", sm: "400px", lg: "500px" }}
            />
          ))}
        </Carousel>

        <br />
        <Grid
          templateColumns={"repeat(2, 2fr)"}
          gap="10"
          // border={"2px solid red"}
        >
          <GridItem>
            <Text>{property.name}</Text>
            <Badge colorScheme={"linkedin"}>
              {property?.Category?.category_name}
            </Badge>
            <Text fontSize={"12px"}>
              {property?.address}, {property?.City?.cities_name}
            </Text>
            <br />
            <Text fontFamily={"sans-serif"} fontSize={"13.5px"}>
              {property?.description}
            </Text>
            {/* <Box color={"blue"} textAlign="center">
                <Calendar
                  // dateCellRender={DateCellRender}
                  // onChange={findDate}
                  style={{ textTransform: "uppercase", fontSize: "0.7rem" }}
                />
              </Box> */}
            <Button
              colorScheme={"orange"}
              ml="0"
              width={"100%"}
              color="white"
              onClick={reserveModal.onOpen}
            >
              Reserve
              <GrFormNext size={"25px"} />
            </Button>
            <Box color={"blue"} textAlign="center">
              <Calendar
                // dateCellRender={DateCellRender}
                // onChange={findDate}
                style={{ textTransform: "uppercase", fontSize: "0.7rem" }}
              />
            </Box>
            <Modal
              isOpen={reserveModal.isOpen}
              onClose={reserveModal.onClose}
              size="sm"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Reservation Form</ModalHeader>
                <ModalCloseButton color={"red"} />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Select Room</FormLabel>
                    <Select>
                      {room.map((val) => (
                        <option>{val.item_name}</option>
                      ))}
                    </Select>
                    <FormLabel mt={"5px"}>Amount of Guest</FormLabel>
                    <InputGroup>
                      <Input
                        type={"number"}
                        fontStyle="normal"
                        borderColor={"black"}
                      />
                      <InputRightAddon children="people" />
                    </InputGroup>
                    <FormLabel mt={"5px"}>Name</FormLabel>
                    <InputGroup>
                      <Input type={"text"} fontStyle="normal" />
                    </InputGroup>
                    <FormLabel mt={"5px"}>Email</FormLabel>
                    <InputGroup>
                      <Input type={"text"} fontStyle="normal" />
                    </InputGroup>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={reserveModal.onClose}
                    size="sm"
                  >
                    Close
                  </Button>
                  <Button variant="ghost" color={"white"} size="sm">
                    Checkout
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </GridItem>
          <GridItem>
            <Text>Available room:</Text>
            {room.map((val) => (
              <Box
                border={"2px solid"}
                w="200px"
                rounded={"md"}
                // mb={"10px"}
                borderColor="teal.300"
                // height={"200px"}
                backgroundColor="linkedin.400"
                color={"white"}
                fontWeight="extrabold"
              >
                <Carousel
                  autoplay
                  effect="fade"
                  dotPosition="left"
                  dots={false}
                  easing="linear"
                  // style={contentStyle}
                >
                  {val.Images.map((value) => (
                    <Image
                      src={`http://localhost:8000/public/${value.picture_url}`}
                      rounded={"md"}
                      fit={"cover"}
                      align={"center"}
                      maxW={"100%"}
                    />
                  ))}
                </Carousel>

                <Text fontFamily={"sans-serif"} fontSize="13.5px">
                  Room: {val.item_name} type
                </Text>
                <Text color={"white"} fontSize={"x-small"}>
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  }).format(val.price)}
                  / room / night
                </Text>
                <Text color={"white"} fontSize={"x-small"}>
                  Max. capacity: {val.capacity} People
                </Text>
                <Text color={"white"} fontSize={"x-small"}>
                  {val.description}
                </Text>
              </Box>
            ))}
          </GridItem>
        </Grid>
      </Container>
    </Center>
  )
}

export default DetailProperty
