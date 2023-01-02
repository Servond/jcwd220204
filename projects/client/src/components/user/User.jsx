import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { GrLinkPrevious } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { Carousel as Carousel2, Progress } from "antd"
import moment from "moment"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector } from "react-redux"

const UserPage = () => {
  const [getUserTransaction, setGetUserTransaction] = useState([])
  const params = useParams()
  const toast = useToast()
  const authSelector = useSelector((state) => state.auth)
  const [reviewId, setReviewId] = useState([])

  const fetchUserTransaction = async () => {
    try {
      const response = await axiosInstance.get(`/transaction/user/${params.id}`)

      setGetUserTransaction(response.data.data)
      console.log(response, "coba2")
    } catch (err) {
      console.log(err)
    }
  }

  const formik = useFormik({
    initialValues: {
      review: "",
      UserId: "" || authSelector.id,
      PropertyId: "" || "5",
    },
    validationSchema: Yup.object({
      review: Yup.string().required(),
    }),

    onSubmit: async (values) => {
      try {
        // let newReview = new FormData()
        // newReview.append("review", values.review)
        // newReview.append("UserId", values.UserId)
        // newReview.append("PropertyId", values.PropertyId)
        let newReview = {
          review: values.review,
          UserId: authSelector.id,
          PropertyId: values.PropertyId,
        }

        const response = await axiosInstance.post(
          "/review/addreview",
          newReview
        )
        console.log(response, "coba3")
        setReviewId(response)
        // formik.setFieldValue("review", "")
        toast({
          position: "top",
          title: "Review submitted",
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          position: "top",
          title: "Review not submitted",
          status: "error",
        })
      }
    },
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  console.log(getUserTransaction, "coba")
  useEffect(() => {
    fetchUserTransaction()
  }, [])
  return (
    <Center>
      <Container width={"-moz-max-content"} height="auto" mt={"75px"}>
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Text>Here your order list</Text>
        {getUserTransaction.map((val) => {
          return (
            <Box
              border={"2px orange"}
              borderStyle="double"
              borderRadius="5px"
              mb={"15px"}
              padding="10px"
            >
              <Grid templateColumns={"repeat(2, 1fr)"}>
                <GridItem>
                  <Carousel
                    showArrows={true}
                    // showThumbs={true}
                    thumbWidth={100}
                    infiniteLoop={true}
                    autoPlay={true}
                    stopOnHover={true}
                  >
                    {val.Property.PropertyImages.map((value) => (
                      <Image
                        // src={`${value.image_url}`}
                        src={`http://localhost:8000/public/${value.image_url}`}
                        rounded={"md"}
                        fit={"cover"}
                        align={"center"}
                        maxW={"100%"}
                        height="420px"
                      />
                    ))}
                  </Carousel>
                </GridItem>
                <GridItem>
                  <Box
                    borderRadius="5px"
                    backgroundColor={"whitesmoke"}
                    border="2px solid white"
                  >
                    <Text>{val.Property.name}</Text>
                    <Text fontSize={"13px"}>
                      {val.Property.address}, {val.Property.City.cities_name}
                    </Text>
                    <Text fontSize={"14px"} fontFamily="monospace">
                      CheckIn:{" "}
                      {moment(val.start_date).utc().format("YYYY-MM-DD")}
                      <br />
                      CheckOut:{" "}
                      {moment(val.end_date).utc().format("YYYY-MM-DD")}
                    </Text>
                    <Text fontSize={"12px"}>
                      Order status: {val.status}
                      <br />
                      {val.status === "waiting for payment" && (
                        <Progress percent={30} />
                      )}
                      {val.status === "need accepted" && (
                        <Progress percent={50} status="active" />
                      )}
                      {val.status === "accepted" && <Progress percent={100} />}
                      {val.status === "cancelled" && (
                        <Progress percent={100} status="exception" />
                      )}
                    </Text>
                    <br />
                    <Text fontSize={"13px"}>
                      Room name: {val.PropertyItem.item_name}
                      <br />
                      Max capacity: {val.PropertyItem.capacity}
                    </Text>

                    <Text fontSize={"13px"}>Room preview: </Text>
                    <Carousel2
                      autoplay
                      effect="fade"
                      dotPosition="left"
                      dots={false}
                      easing="linear"
                    >
                      {val.PropertyItem.Images.map((values) => (
                        <Image
                          src={`http://localhost:8000/public/${values.picture_url}`}
                          rounded={"md"}
                          fit={"cover"}
                          align={"center"}
                          maxW={"100%"}
                        />
                      ))}
                    </Carousel2>
                  </Box>
                </GridItem>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
                <Textarea
                  placeholder="write your review here"
                  fontSize={"13px"}
                  fontStyle="italic"
                  color={"gray.400"}
                  onChange={formChangeHandler}
                  // onChange={({ target }) =>
                  //   formik.setFieldValue(target.name, target.value)
                  // }
                  name="review"
                  value={formik.values.review}
                />
                <Button colorScheme={"blue"} type="submit">
                  Submit
                </Button>
              </form>
            </Box>
          )
        })}
      </Container>
    </Center>
  )
}

export default UserPage
