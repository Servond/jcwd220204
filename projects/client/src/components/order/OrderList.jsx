import {
  Badge,
  Box,
  Button,
  Center,
  color,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { axiosInstance } from "../../api"
import moment from "moment"
import { HiBadgeCheck } from "react-icons/hi"
import { IoIosOptions } from "react-icons/io"
import { Card, Col, Row } from "antd"

const OrderList = () => {
  const search = useLocation().search
  const findParams = new URLSearchParams(search).get("id")
  const [orderList, setOrderList] = useState([])

  const fetchOrderList = async () => {
    try {
      const response = await axiosInstance.get(`/transaction/${findParams}`)
      setOrderList(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchOrderList()
  }, [])

  return (
    <Center>
      <Box
        mt={{ base: "75px", md: "200px" }}
        width={{ base: "350px", md: "5xl" }}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        backgroundColor={"whiteAlpha.900"}
        mb="10vh"
        // ml={{ base: "2vw", md: "10vw" }}
        height="100vh"
      >
        <Link to={`/tenant/${findParams}`}>
          <GrLinkPrevious size={"25px"} />
        </Link>

        <Center>
          <VStack>
            <Heading size={{ base: "md", md: "xl" }}>
              This is your order list history
            </Heading>
          </VStack>
        </Center>

        <Center>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            padding="10px"
            gap={"20px"}
          >
            {orderList.map((val) => (
              <div className="site-card-wrapper">
                <Row gutter={40}>
                  <Col span={8}>
                    <Card
                      title={val.Property?.name}
                      extra={
                        val.status === "in progress" ||
                        val.status === "cancelled" ||
                        val.status === "accepted" ? (
                          <HStack>
                            <HiBadgeCheck color="green" />
                            <Text fontSize={"12px"}>Done</Text>
                          </HStack>
                        ) : (
                          <Link to={`/payment-approval/${val.id}`}>
                            <HStack>
                              <IoIosOptions color="black" />
                              <Text color={"black"} fontSize={"12px"}>
                                Action
                              </Text>
                            </HStack>
                          </Link>
                        )
                      }
                      type="inner"
                      bordered={true}
                      style={{
                        width: 300,
                        height: "auto",
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                        gap: "50px",
                      }}
                      headStyle={{
                        backgroundColor: "powderblue",
                      }}
                    >
                      <p>
                        {" "}
                        {val.status === "waiting for payment" && (
                          <Badge colorScheme={"green"}>
                            Waiting for payment
                          </Badge>
                        )}
                        {val.status === "need accepted" && (
                          <Badge colorScheme={"orange"}>Need accepted</Badge>
                        )}
                        {val.status === "accepted" && (
                          <Badge colorScheme={"linkedin"}> Accepted</Badge>
                        )}
                        {val.status === "in progress" && (
                          <Badge colorScheme={"linkedin"}> In progress</Badge>
                        )}
                        {val.status === "cancelled" && (
                          <Badge colorScheme={"red"}> Cancelled</Badge>
                        )}
                      </p>
                      <Text>Cust. name: {val.User.username}</Text>
                      <Text>Email: {val.User.email}</Text>
                      <Text>Room: {val.PropertyItem?.item_name}</Text>
                      <Text>
                        Total:
                        {new Intl.NumberFormat("ja-JP", {
                          style: "currency",
                          currency: "JPY",
                        }).format(val.price)}
                      </Text>
                      <Text>
                        CheckIn:{" "}
                        {moment(val.start_date).utc().format("YYYY-MM-DD")}
                      </Text>
                      <Text>
                        CheckOut:{" "}
                        {moment(val.end_date).utc().format("YYYY-MM-DD")}
                      </Text>

                      {val.Review !== null ? (
                        <Text>Review: {val.Review.review} </Text>
                      ) : (
                        <Text>Review: - </Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </div>
              // </Stack>
            ))}
          </Grid>
        </Center>
      </Box>
    </Center>
    // </Box>
  )
}

export default OrderList
