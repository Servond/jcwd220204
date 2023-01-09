import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
  Alert,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { GrLinkPrevious } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { Badge, Carousel as Carousel2, Progress } from "antd"
import moment from "moment"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector } from "react-redux"

const UserPage = ({
  property_name,
  address,
  cities_name,
  start_date,
  end_date,
  status,
  property_image,
  room_name,
  capacity,
  room_image,
  property_id,
  key,
  transaction_id,
  review,
}) => {
  const [getUserTransaction, setGetUserTransaction] = useState([])
  const params = useParams()
  const toast = useToast()
  const authSelector = useSelector((state) => state.auth)
  const [reviewId, setReviewId] = useState([])

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
        let newReview = {
          review: values.review,
          UserId: authSelector.id,
          PropertyId: property_id,
          TransactionId: transaction_id,
          ReviewId: values.review,
        }

        const response = await axiosInstance.post(
          "/review/addreview",
          newReview
        )

        setReviewId(response)

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

  const today = moment().utc().format("YYYY-MM-DD")

  useEffect(() => {}, [])
  return (
    <Center backgroundSize="cover">
      <Box
        border={"2px orange"}
        borderStyle="solid"
        borderRadius="5px"
        padding="10px"
        mb={"15px"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 28%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        width={{ base: "450px", md: "3xl" }}
      >
        <Grid templateColumns={"repeat(2, 1fr)"} gap="10px">
          <GridItem>
            <Carousel
              showArrows={true}
              // showThumbs={true}
              thumbWidth={100}
              infiniteLoop={true}
              autoPlay={true}
              stopOnHover={true}
            >
              {property_image?.map((value) => (
                <Image
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
              <Text>{property_name}</Text>
              <Text fontSize={"13px"}>
                {address}, {cities_name}
              </Text>
              <Text fontSize={"14px"} fontFamily="monospace">
                CheckIn: {moment(start_date).utc().format("LL")}
                <br />
                CheckOut: {moment(end_date).utc().format("LL")}
              </Text>
              <Text fontSize={"12px"}>
                Order status: {status}
                <br />
                {status === "waiting for payment" && <Progress percent={30} />}
                {status === "waiting for payment" && (
                  <Link to={`/payment-proof/${params.id}`}>
                    <Button
                      cursor={"pointer"}
                      size="sm"
                      bg="red.500"
                      _hover={{ bg: "red.400" }}
                      color="white"
                    >
                      Complete your payment
                    </Button>
                  </Link>
                )}
                {status === "need accepted" && (
                  <Progress percent={50} status="active" />
                )}
                {status === "in progress" && (
                  <Progress
                    percent={80}
                    status="active"
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                )}
                {status === "in progress" && (
                  <Text color={"red"}>Don't forget your CheckIn date</Text>
                )}
                {status === "accepted" && <Progress percent={100} />}
                {status === "cancelled" && (
                  <Progress percent={100} status="exception" />
                )}
              </Text>
              <br />
              <Text fontSize={"13px"}>
                Room name: {room_name}
                <br />
                Max capacity: {capacity}
              </Text>

              <Text fontSize={"13px"}>Room preview: </Text>
              <Carousel2
                autoplay
                effect="fade"
                dotPosition="left"
                dots={false}
                easing="linear"
              >
                {room_image.map((values) => (
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
        {review === null ? (
          moment(end_date).utc().format("YYYY-MM-DD") <= today &&
          status === "accepted" ? (
            <form onSubmit={formik.handleSubmit}>
              <Textarea
                placeholder="write your review here"
                fontSize={"13px"}
                fontStyle="italic"
                color={"gray.400"}
                onChange={formChangeHandler}
                name="review"
                value={formik.values.review}
              />
              <Button
                colorScheme={"blue"}
                type="submit"
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                cursor={"pointer"}
                mt="10px"
              >
                Submit
              </Button>
            </form>
          ) : null
        ) : (
          <Alert
            flexDirection="column"
            status="success"
            maxWidth={{ base: "400px", md: "3xl" }}
          >
            <AlertIcon />
            Review submitted!
            <AlertDescription>Thank you for your feedback</AlertDescription>
          </Alert>
        )}
      </Box>
    </Center>
  )
}

export default UserPage
