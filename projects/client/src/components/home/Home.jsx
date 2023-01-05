import React, { useEffect, useState } from "react"
import "./Home.scss"
import Popular from "../popular/Popular"
import RoomCard from "../room/RoomCard"
import ListingDetails from "../../pages/listing/ListingDetails"
import Listing from "../../pages/listing/Listing"
import { axiosInstance } from "../../api"
import Footer from "../Footer/Footer"
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
import { useSelector } from "react-redux"
import TenantHome from "./TenantHome"
import Slide from "react-reveal/Slide"

var data = require("../../db/cities_name_data.json")

const Home = () => {
  const authSelector = useSelector((state) => state.auth)
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
      console.log(response, "coba")
      setProperty(response.data.data)
      setTotalCount(response.data.dataCount)

      setMaxPage(Math.ceil(response.data.dataCount / maxProperties))

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

  const setMoreBtnHandler = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    fetchProperties()
  }, [page, searchInput])
  return (
    <>
      {authSelector.role === "tenant" ? (
        <TenantHome />
      ) : (
        <div>
          <div>
            <section className="home" id="home">
              <div className="secContainer container">
                <Slide bottom>
                  <div className="homeText">
                    <h1 className="title">Stay Cheapest Full Happiness</h1>
                    <p className="subTitle">
                      Stay with us and add your new memorable experiences
                    </p>
                    <button className="btn">
                      <a href="#">Explore</a>
                    </button>
                  </div>
                </Slide>

                <div className="homeCard grid">
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
                      cursor: "pointer",
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
          <Box display={"block"} paddingLeft="10px" paddingRight={"10px"}>
            <HStack
              gap="2px"
              marginTop={{ base: "200px", md: "100px", lg: "200px" }}
            >
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
                  <Button boxSize={"-webkit-max-content"}>
                    <a href="#search">Change keyword</a>
                  </Button>
                </Alert>
              ) : null}
              {page === 1 ? null : (
                <FaArrowLeft onClick={previousPage} cursor="pointer" />
              )}
              <Text fontWeight="semibold" fontSize="20px">
                Page: {page}
              </Text>
              {page >= maxPage ? null : (
                <FaArrowRight onClick={nextPage} cursor="pointer" />
              )}
            </HStack>
            <Grid>{renderProperty()}</Grid>
          </Box>
        </div>
      )}
    </>
  )
}

export default Home
