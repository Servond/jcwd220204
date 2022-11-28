import React from "react"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react"

const RoomCard = ({ item_name, price, capacity, description}) => {
  return (
    <Center py={2}>
      <Box
        maxW={"445px"}
        w={"full"}
        h="600px"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Box
            h={"270px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={6}
            pos={"relative"}
          >
            <Image
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
              }
              h="full"
              layout={"fill"}
            />
          </Box>

          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {item_name || "name"}
          </Heading>
          <HStack>
          <Text color={"green.500"} fontWeight={800} fontSize={"sm"}>
            Rp {price || "price"} 
          </Text>
          <Text color={"gray.500"} fontSize={"smaller"}>
            / room / night
          </Text>

          </HStack>
          <Text color={"blackAlpha.500"} fontWeight={800} fontSize={"sm"}>
            {capacity || "capacity"} Guests
          </Text>
          <Text color={"gray.500"}>
            {description || "description"}
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default RoomCard
