//import useState hook to create menu collapse state
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import {
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiHome,
  FiMenu,
  FiSettings,
  FiUser,
} from "react-icons/fi"
import { IoMdAperture } from "react-icons/io"
import NavItem from "./NavItem"
import { useSelector } from "react-redux"
// import "./Sidebar.css"

const Sidebar = () => {
  const authSelector = useSelector((state) => state.auth)
  const [navSize, changeNavSize] = useState("large")
  return (
    <Flex
      pos={"sticky"}
      left="-50"
      marginTop={"2.5vh"}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize === "small" ? "75px" : "200px"}
      flexDir={"column"}
      justifyContent="space-between"
      backgroundColor={"blue.300"}
      mt="-620px"
      ml={"-200px"}
    >
      <Flex p={"-3%"} flexDir="column" alignItems={"flex-start"} as="nav">
        <IconButton
          background={"none"}
          color="white"
          mt={5}
          right="30px"
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large")
            else changeNavSize("small")
          }}
        />
        <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
        <NavItem navSize={navSize} icon={FiCalendar} title="Calendar" active />
        <NavItem navSize={navSize} icon={FiUser} title="Clients" />
        <NavItem navSize={navSize} icon={IoMdAperture} title="Animals" />
        <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
        <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
        <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
      </Flex>
      <Flex
        p={"5%"}
        flexDir="column"
        w={"100%"}
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        {/* <Divider display={navSize == "small" ? "none" : "flex"} /> */}
        <Flex mt={4} align="center">
          <Avatar size={"md"} src={authSelector.profile_picture} />
          <Flex
            flexDir={"column"}
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as={"h3"} size="sm">
              {authSelector.username}
            </Heading>
            <Text color={"gray"}>{authSelector.role}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Sidebar
