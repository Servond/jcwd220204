import {
  Badge,
  Box,
  Center,
  Divider,
  HStack,
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

  const status = ["waiting for payment", "need accept", "accepted", "cancelled"]
  console.log(orderList, "response")

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
          <Text>This is your order recap</Text>
          <Text fontSize={"10px"} fontStyle="italic" color={"blue"}>
            *swipe right on table for other information
          </Text>
        </VStack>
      </Center>
      <Center>
        <Box
          //   border={"2px solid blue"}
          width="350px"
          backgroundColor={"whiteAlpha.700"}
          boxShadow="xl"
        >
          <TableContainer
            width={"400px"}
            fontSize="10px"
            border={"2px solid white"}
          >
            <Table variant={"striped"} colorScheme="facebook" size={"sm"}>
              <Thead>
                <Tr backgroundColor={"linkedin.400"} textColor="white">
                  <Th maxW={"45%"}>Property Name</Th>
                  <Th maxW={"45%"}>Room Name</Th>
                  <Th maxW={"45%"}>Cust. Name</Th>
                  <Th maxW={"20%"}>Start Date</Th>
                  <Th maxW={"20%"}>End Date</Th>
                  <Th maxW="15%">Status</Th>
                  <Th>Total Price</Th>
                </Tr>
              </Thead>
              {orderList.map((val) => (
                <Tbody>
                  <Td>{val.Property?.name}</Td>
                  <Td>{val.PropertyItem?.item_name}</Td>
                  <Td>{val.User?.username}</Td>
                  <Td>{moment(val.start_date).utc().format("YYYY-MM-DD")}</Td>
                  <Td>{moment(val.end_date).utc().format("YYYY-MM-DD")}</Td>
                  <Td>
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
                  </Td>
                  <Td>
                    {new Intl.NumberFormat("ja-JP", {
                      style: "currency",
                      currency: "JPY",
                    }).format(
                      (moment(val.end_date).utc().format("DD") -
                        moment(val.start_date).utc().format("DD")) *
                        val.PropertyItem?.price
                    )}
                  </Td>
                </Tbody>
              ))}
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </Box>
  )
}

export default OrderList
