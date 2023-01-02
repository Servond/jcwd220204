import {
  Badge,
  Box,
  Button,
  Center,
  color,
  Divider,
  Grid,
  GridItem,
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
import { Card } from "antd"

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

  console.log(orderList, "response")

  useEffect(() => {
    fetchOrderList()
    // getStatus()
  }, [])

  return (
    <Box
      width="400px"
      position={"static"}
      // mb="12rem"
      mt="4.5rem"
      height="auto"
      mb={"27rem"}
    >
      <Link to={`/tenant/${findParams}`}>
        <GrLinkPrevious size={"25px"} />
      </Link>

      <Center>
        <VStack>
          <Text>This is your order list history</Text>
          <Text fontSize={"10px"} fontStyle="italic" color={"blue"}>
            *swipe right on table for other information
          </Text>
        </VStack>
      </Center>
      <Center>
        <Box maxW={"400px"}>
          {orderList.map((val) => (
            <Stack
              borderRadius="2xl"
              w="340px"
              height="150px"
              direction="row"
              padding={5}
              position="static"
              align={"stretch"}
              mb="4rem"
            >
              <Card
                title={val.Property?.name}
                extra={
                  val.status === "accepted" || val.status === "cancelled" ? (
                    <HStack>
                      <HiBadgeCheck color="green" />
                      <Text fontSize={"12px"}>Done</Text>
                    </HStack>
                  ) : (
                    <Link to={"/"}>
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
                  height: "200px",
                  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}
                headStyle={{
                  backgroundColor: "powderblue",
                }}
              >
                <p>
                  {" "}
                  {val.status === "waiting for payment" && (
                    <Badge colorScheme={"green"}>Waiting for payment</Badge>
                  )}
                  {val.status === "need accepted" && (
                    <Badge colorScheme={"orange"}>Need accepted</Badge>
                  )}
                  {val.status === "accepted" && (
                    <Badge colorScheme={"linkedin"}> Accepted</Badge>
                  )}
                  {val.status === "cancelled" && (
                    <Badge colorScheme={"red"}> Cancelled</Badge>
                  )}
                </p>
                <Text>Room: {val.PropertyItem?.item_name}</Text>
                <Text>
                  Total:
                  {new Intl.NumberFormat("ja-JP", {
                    style: "currency",
                    currency: "JPY",
                  }).format(val.price)}
                </Text>
                <Text>
                  Start Date:{" "}
                  {moment(val.start_date).utc().format("YYYY-MM-DD")}
                </Text>
                <Text>
                  End Date: {moment(val.end_date).utc().format("YYYY-MM-DD")}
                </Text>
              </Card>
            </Stack>
          ))}
        </Box>
      </Center>
    </Box>
  )
}

export default OrderList
