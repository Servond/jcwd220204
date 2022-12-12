import React, { useEffect, useState } from "react"
import ListingRow from "../../components/room/ListingRow"
import { axiosInstance } from "../../api"
import { Box, Center, HStack, Text } from "@chakra-ui/react"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { Link, useParams } from "react-router-dom"

const Listing = () => {
  const [listing, setListing] = useState([])
  const [city, setCity] = useState([])
  const params = useParams()

  // const fetchCities = async () => {
  //   try {
  //     const responseCities = await axiosInstance.get(
  //       `/property/city/${params.id}`
  //     )

  //     setCity(responseCities.data.data)
  //     console.log(responseCities, "coba")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
          // image_url={val?.PropertyImages[0]?.image_url}
        />
      )
    })
  }

  useEffect(() => {
    fetchListing()
  }, [])

  return (
    <Center>
      <Box marginTop={"100px"}>
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
          <Link to="/">
            <GrAdd size={"25px"} />
          </Link>
        </HStack>

        {renderListingRow()}
      </Box>
    </Center>
  )
}

export default Listing
