import React, { useEffect, useState } from "react"
import ListingRow from "../../components/room/ListingRow"
import { axiosInstance } from "../../api"
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Menu,
  MenuButton,
  Text,
  VStack,
} from "@chakra-ui/react"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { Link, NavLink, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Listing = () => {
  const authSelector = useSelector((state) => state.auth)
  const [listing, setListing] = useState([])
  const [city, setCity] = useState([])
  const params = useParams()

  const fetchListing = async () => {
    try {
      const response = await axiosInstance.get(`/tenant/${params.id}`)

      setListing(response.data.data.Properties)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const renderListingRow = () => {
    return listing.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.name}
          properties={val.PropertyImages}
          address={val.address}
          city={val.City}
        />
      )
    })
  }
  const Menu = ["Properties", "Order", "Finances"]

  useEffect(() => {
    fetchListing()
  }, [])

  return (
    <Center marginTop={"100px"} mb="400px">
      <VStack>
        <Box height={"50px"} maxW="400px">
          <HStack spacing={"2"} as="nav">
            <ButtonGroup variant={"link"}>
              <Link to="/">
                <Button
                  color={"white"}
                  cursor="pointer"
                  backgroundColor={"green.500"}
                  fontSize={"15px"}
                >
                  Properties
                </Button>
              </Link>
              <Link to={`/orderlist?id=${authSelector.id}`}>
                <Button
                  color={"white"}
                  cursor="pointer"
                  backgroundColor={"green.500"}
                  fontSize={"15px"}
                >
                  Order List
                </Button>
              </Link>
              <Link to="/">
                <Button
                  color={"white"}
                  cursor="pointer"
                  backgroundColor={"green.500"}
                  fontSize={"15px"}
                >
                  Finances
                </Button>
              </Link>
            </ButtonGroup>
          </HStack>
        </Box>
        <Box>
          <Center>
            <Text
              fontFamily={"sans-serif"}
              fontWeight="bold"
              fontSize={"2xl"}
              position="absolute"
            >
              Your List of Properties
            </Text>
          </Center>
          <HStack mb="2" p="3" pl="1" pr="1" justifyContent={"space-between"}>
            <Link to="/">{/* <GrLinkPrevious size={"15px"} /> */}</Link>
            <Link to="/property-form">
              <GrAdd size={"25px"} />
            </Link>
          </HStack>

          {renderListingRow()}
        </Box>
      </VStack>
    </Center>
  )
}

export default Listing
