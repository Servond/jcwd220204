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
import { Link, useLocation, useParams } from "react-router-dom"
import { GrLinkPrevious, GrAdd } from "react-icons/gr"
import { axiosInstance } from "../../api"

import { HiBadgeCheck } from "react-icons/hi"
import { IoIosOptions } from "react-icons/io"
import { Card, Col, Row } from "antd"
import moment, { Moment } from "moment"

import { Calendar } from "antd"

const Finances = () => {
  const search = useLocation().search
  const findParams = new URLSearchParams(search).get("id")
  const [orderList, setOrderList] = useState([])
  const params = useParams()

  const fetchOrderList = async () => {
    try {
      const response = await axiosInstance.get(`/transaction/${params.id}`)
      setOrderList(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }
  console.log(orderList, "cobas")
  useEffect(() => {
    fetchOrderList()
  }, [])
  const getFirstDateAndLastDateOnThePanel = () => {
    const firstDate = moment(orderList.start_date).startOf("month")
    const lastDate = moment(orderList.end_date).endOf("month")

    const firstDateDay = firstDate.day()
    firstDate.subtract(firstDateDay, "days")
    lastDate.add(42 - Number(lastDate.format("DD")) - firstDateDay, "days")

    return {
      firstDate,
      lastDate,
    }
  }
  console.log(getFirstDateAndLastDateOnThePanel, "coba2")

  return (
    <Center>
      <Box
        mt={{ base: "75px", md: "200px" }}
        width={{ base: "400px", md: "3xl" }}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        backgroundColor={"whiteAlpha.900"}
        mb="10vh"
        // ml={{ base: "2vw", md: "10vw" }}
      >
        <Link to={`/tenant/${findParams}`}>
          <GrLinkPrevious size={"25px"} />
        </Link>

        <Center>
          <VStack>
            <Heading size={{ base: "md", md: "xl" }}>
              This is your finances report
            </Heading>
            <Calendar />
          </VStack>
        </Center>
      </Box>
    </Center>
    // </Box>
  )
}

export default Finances
