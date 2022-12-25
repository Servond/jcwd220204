import {
  Badge,
  Box,
  Button,
  Center,
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
import OrderList from "../../components/order/OrderList"

const ListingOrder = () => {
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

  const status = ["waiting for payment", "need accept", "accepted", "cancelled"]
  // console.log(orderList, "response")

  const renderOrderList = () => {
    return orderList.map((val) => {
      return (
        <OrderList
          id={val.id}
          property_name={val.Property?.name}
          status={val.status}
        />
      )
    })
  }

  useEffect(() => {
    fetchOrderList()
  }, [])

  return (
    <Box
      width="400px"
      position={"static"}
      mb="16rem"
      border={"2px solid red"}
      height="auto"
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
      <Center>{renderOrderList()}</Center>
    </Box>
  )
}

export default ListingOrder
