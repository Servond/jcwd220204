import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Divider,
  HStack,
  Tag,
  IconButton,
  Toast,
  useDisclosure,
  useToast,
  textDecoration,
} from "@chakra-ui/react"
import { Carousel } from "antd"
import React, { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import { Link, useParams } from "react-router-dom"
import RoomCard from "../../components/room/RoomCard"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { BiEditAlt } from "react-icons/bi"
import Slider from "react-slick"
import { Calendar } from "antd"
import { Badge, Popover } from "antd"

// import "react-calendar/dist/Calendar.css"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useSelector } from "react-redux"
import { useFormik } from "formik"

const ListingDetails = () => {
  const authSelector = useSelector((state) => state.auth)
  const [listing, setListing] = useState([])
  const [room, setRoom] = useState([])
  const [propertyPhoto, setPropertyPhoto] = useState([])
  const [images, setImages] = useState([])
  const [getDateRooms, setGetDateRooms] = useState([])

  const params = useParams()
  const toast = useToast()

  const fetchListingDetails = async () => {
    try {
      const response = await axiosInstance.get(`/property/${params.id}`)

      setListing(response.data.data)
      setPropertyPhoto(response.data.data)
      setImages(response.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(images)

  //=======================GET ROOM
  const fetchRoom = async () => {
    try {
      const response = await axiosInstance.get(`/room/${params.id}`)

      setRoom(response.data.data.PropertyItems)
      console.log(response, "coba")
    } catch (err) {
      console.log(err)
    }
  }
  //===============================DELETE ROOM
  const deleteRoom = async (id) => {
    try {
      await axiosInstance.delete(`/room/delete/${id}`)

      window.location.reload(false)
      toast({ title: "Post deleted", status: "success" })
    } catch (err) {
      console.log(err)
    }
  }

  //======================ROOM PROPERTY DATE

  const getDateRoom = async () => {
    try {
      const responseData = await axiosInstance.get(`/calendar/${params.id}`)
      setGetDateRooms(responseData.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  //============================
  const newFormatted = getDateRooms.map((dateRoom) => {
    const date = new Date(dateRoom.startDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedNewDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`

    dateRoom.formattedNewDate = formattedNewDate

    return dateRoom
  })

  //=============FIND DATE IN CALENDAR

  const findDate = (value) => {
    console.log(value.format("YYYYMMDD"), "format")
  }

  const DateCellRender = (date) => {
    const dateStr = date.format("YYYYMMDD")

    let result = ""
    for (let data of newFormatted) {
      if (data.formattedNewDate === dateStr) {
        result += `${data.PropertyItem.item_name}\n`
      }
    }
    if (result !== "") {
      return (
        <div>
          <Badge
            status="error"
            text={`${result}`}
            style={{ fontSize: "0.5rem" }}
          />
        </div>
      )
    }
  }

  const renderRoomCard = () => {
    return room.map((val) => {
      return (
        <RoomCard
          id={val.id}
          item_name={val.item_name}
          capacity={val.capacity}
          price={val.price}
          description={val.description}
          images={val.Images}
          onDelete={() => deleteRoom(val.id)}
          calendars={val.Calendars}
        />
      )
    })
  }

  console.log(room)

  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

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

  useEffect(() => {
    fetchListingDetails()
    fetchRoom()
    getDateRoom()
  }, [])

  return (
    <Container mt={"75px"} maxWidth="4xl">
      <HStack p="3" pl="1" pr="1" justifyContent={"space-between"}>
        <Link to={`/tenant/${authSelector.id}`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Link to={`/property/edit/${params.id}`}>
          <BiEditAlt size={"25px"} />
        </Link>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 18, md: 17 }}
      >
        {/* <Slider {...settings}> */}
        <Carousel autoplay effect="fade" nextArrow={StackDivider}>
          {images?.map((val) => (
            <Image
              // src={val.image_url}
              src={`http://localhost:8000/public/${val.image_url}`}
              rounded={"md"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "350px", sm: "400px", lg: "500px" }}
            />
          ))}

          {/* </Slider> */}
        </Carousel>

        <Stack spacing={{ base: 6, md: 5 }}>
          <VStack as={"header"} alignItems="start">
            <Heading
              //lineHeight={2}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {listing.name}
            </Heading>

            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"md"}
              fontWeight={"300"}
            >
              {listing.address}, {listing?.City?.cities_name}
            </Text>
            <Tag
              size={"md"}
              variant="solid"
              colorScheme="yellow"
              fontSize={"xl"}
            >
              {listing?.Category?.category_name}
            </Tag>
          </VStack>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Text fontSize={"md"}>{listing.description}</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Box py={{ base: 18, md: 7 }}>
        <Box color={"blue"} textAlign="center">
          <Text>This is a day information from your full booked room </Text>
          <Calendar
            dateCellRender={DateCellRender}
            onChange={findDate}
            style={{ textTransform: "uppercase", fontSize: "0.7rem" }}
          />
        </Box>
        <Divider borderColor={useColorModeValue("gray.200", "gray.600")} />
        <HStack justifyContent={"space-between"}>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={useColorModeValue("yellow.500", "yellow.300")}
            fontWeight={"500"}
            textTransform={"uppercase"}
            my={"4"}
          >
            Rooms
          </Text>
          <IconButton backgroundColor={"unset"} _hover={"unset"}>
            <Link to={`/inputroom?id=${listing.id}`}>
              <GrAdd size="25px" />
            </Link>
          </IconButton>
        </HStack>

        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {renderRoomCard()}
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default ListingDetails
