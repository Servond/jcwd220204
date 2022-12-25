import React, { useEffect, useState } from "react"
import "./Home.scss"
import Popular from "../popular/Popular"
import RoomCard from "../room/RoomCard"
import ListingDetails from "../../pages/listing/ListingDetails"
import Listing from "../../pages/listing/Listing"
import { axiosInstance } from "../../api"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

var data = require("../../db/cities_name_data.json")

const Home = () => {
  const [startDate, setStartDate] = useState(new Date())

  const [property, setProperty] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("")
  const [maxPage, setMaxPage] = useState(0)

  const fetchProperties = async () => {
    const maxProperties = 3
    try {
      const response = await axiosInstance.get(`/property?`, {
        params: {
          _limit: maxProperties,
          _page: page,
          _sortDir: "ASC",
          _expand: "properties",
          cities_name: searchInput,
        },
      })
      setProperty(response.data.data)
      setTotalCount(response.data.dataCount)
      console.log("result", totalCount)
      setMaxPage(Math.ceil(response.data.dataCount / maxProperties))
      console.log(response)

      if (page === 1) {
        setProperty(response.data.data)
      } else {
        setProperty(response.data.data)
      }

      renderProperty()
    } catch (err) {
      console.log(err)
    }
  }

  const renderProperty = () => {
    return property.map((val) => {
      return (
        <Popular
          key={val.id.toString()}
          id={val.id}
          name={val.name}
          city={val.City}
          properties_image={val.PropertyImages}
        />
      )
    })
  }

  console.log(property)
  const setMoreBtnHandler = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }
  console.log(page)

  useEffect(() => {
    fetchProperties()
  }, [page, searchInput])
  return (
    <>
      <div>
        <div>
          <section className="home" id="home">
            <div className="secContainer container">
              <div className="homeText">
                <h1 className="title">Stay Cheapest Full Happiness</h1>
                <p className="subTitle">
                  Stay with us and add your new memorable experiences
                </p>
                <button className="btn">
                  <a href="#">Explore</a>
                </button>
              </div>
              <div className="homeCard grid">
                {/* <div className="locationDiv">
                <label htmlFor="location">Name</label>
                <br />
                <input type={"text"} placeholder="Let's stay with us" />
              </div> */}

                <div className="distDiv">
                  <label htmlFor="distance">Location</label>
                  <br />
                  <input
                    id="search"
                    type={"search"}
                    placeholder="search from location"
                    data={property}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>

                <div className="priceDiv">
                  <label htmlFor="price">Date</label>
                  <br />
                  <input
                    type={"date"}
                    data-date=""
                    data-date-format="DD MMMM YYYY"
                    style={{
                      maxBlockSize: "100px",
                    }}
                  />
                </div>
                <button
                  style={{
                    marginLeft: "1.5px",
                  }}
                  className="btn"
                  onClick={fetchProperties}
                  onChange={(e) => setSearchInput(e.target.value)}
                >
                  Search
                </button>
              </div>
            </div>
          </section>
        </div>
        <Box display={"block"}>
          <Grid>{renderProperty()}</Grid>
        </Box>
        <HStack gap="2px" marginTop={"300px"} marginLeft="130px">
          {!property.length ? (
            <Alert
              status="error"
              textAlign="center"
              justifyContent={"center"}
              alignContent="center"
              flexDir="column"
              borderRadius={"10px"}
              // h="200px"
              width="350px"
              mt={"-50px"}
              mr="20px"
            >
              <AlertIcon boxSize="40px" mr="0" />
              <AlertTitle>No Property on your location filter!</AlertTitle>
              {/* <AlertDescription>
                Coba kata kunci lain atau cek produk rekomendasi kami.
                Terimakasih{" "}
              </AlertDescription> */}
              <Button boxSize={"-webkit-max-content"}>
                <a href="#search">Change keyword</a>
              </Button>
            </Alert>
          ) : null}
          {page === 1 ? null : <FaArrowLeft onClick={previousPage} />}
          <Text fontWeight="semibold" fontSize="20px">
            Page: {page}
          </Text>
          {page >= maxPage ? null : <FaArrowRight onClick={nextPage} />}
        </HStack>

        <div>
          {/* {property.length >= maxPage ? null : (
            <button
              onClick={setMoreBtnHandler}
              style={{
                marginTop: "320px",
                marginLeft: "130px",
              }}
            >
              See More
            </button>
          )} */}
        </div>
        <div>
          {/* {!property.length ? (
          <Alert
            status="warning"
            marginTop={"200px"}
            backgroundColor="red.500"
            color={"white"}
          >
            <AlertTitle>No Property on your location filter</AlertTitle>
          </Alert>
        ) : null} */}
        </div>
      </div>
    </>
  )
}

export default Home
