import React from "react"
import "./Tenant.scss"
import { useState, useEffect } from "react"
import image from "../../assets/Foto_Danar_Sadan_Bastian_4x6-removebg-preview.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  Avatar,
  MenuButton,
  useToast,
  Menu,
  MenuList,
  MenuDivider,
  MenuItem,
  Button,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react"
import Listing from "../../pages/listing/Listing"
import ListingRow from "../room/ListingRow"
import { axiosInstance } from "../../api"
import { AddIcon } from "@chakra-ui/icons"

const Tenant = () => {
  const [tenant, setTenant] = useState([])
  const params = useParams()
  const authSelector = useSelector((state) => state.auth)

  const fetchTenant = async () => {
    try {
      // const response = await axiosInstance.get(`/tenant/${params.id}`)
      const response = await axiosInstance.get("/property")
      setTenant(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const renderTenant = () => {
    return tenant.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.cities_name}

          // image_url={val?.PropertyImages[0]?.image_url}
        />
      )
    })
  }

  useEffect(() => {
    fetchTenant()
  }, [])

  return (
    <>
      {/* <Sidebar /> */}
      <Flex alignItems={"center"} position="absolute" mt={"-740px"} ml="250px">
        {/* <Button
          variant={"solid"}
          colorScheme={"teal"}
          size={"sm"}
          mr={4}
          leftIcon={<AddIcon />}
        >
          Action
        </Button> */}
        {/* <Avatar size={"md"} src={authSelector.profile_picture} /> */}
        <Menu>
          <MenuButton
            as={Button}
            // rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            // border="2px"
            _hover={"none"}
            width="-webkit-max-content"
            textColor={"black"}
          >
            <Text>Tenant Menu</Text>
          </MenuButton>
          <MenuList backgroundColor={"gray.100"}>
            <MenuItem boxSize={"-webkit-max-content"}>Analytic</MenuItem>
            <MenuItem boxSize={"-webkit-max-content"}>Order status</MenuItem>
            <MenuDivider />
            <HStack>
              <Avatar size={"sm"} src={authSelector.profile_picture} />
              <Text>Hi {authSelector.username}</Text>
            </HStack>
          </MenuList>
        </Menu>
      </Flex>

      <Listing />
    </>
  )
}

export default Tenant
