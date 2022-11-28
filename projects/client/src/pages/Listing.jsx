import React, { useEffect, useState } from "react"
import ListingRow from "../components/ListingRow"
import { axiosInstance } from "../api"
import { Box, Center, Heading, HStack, Text } from "@chakra-ui/react"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { Link } from "react-router-dom"

const Listing = () => {
  const [properties, setProperties] = useState([])

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get("/property")

      setProperties(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderPropertyRow = () => {
    return properties.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.name}
          image_url={val?.PropertyImages[0]?.image_url}
        />
      )
    })
  }

  useEffect(() => {
    fetchProperty()
  }, [])

  return (
    <Center>
      <Box>
        <HStack mb="2" p="3" pl="1" pr="1" justifyContent={"space-between"}>
          <Link to="/">
            <GrLinkPrevious size={"25px"} />
          </Link>
          <Link to="/">
            <GrAdd size={"25px"} />
          </Link>
        </HStack>
        <Text fontFamily={"sans-serif"} fontWeight="bold" fontSize={"2xl"}>
          Your Listings
        </Text>

        {renderPropertyRow()}
      </Box>
    </Center>
  )
}

export default Listing
