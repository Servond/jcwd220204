import React from "react"
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react"
import NavHoverBox from "./NavHoverBox"

export default function NavItem({ icon, title, description, active, navSize }) {
  return (
    <Flex
      //   mt={30}
      flexDir="column"
      w="50%"
      width={"50px"}
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          //   backgroundColor={active && "#AEC8CA"}
          p={2}
          borderRadius={8}
          //   _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize == "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "white"}
                mr="-30px"
              />
              <Text ml={10} display={navSize == "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  )
}
