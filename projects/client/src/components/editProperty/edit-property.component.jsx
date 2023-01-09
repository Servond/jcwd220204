import { ArrowBackIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Img,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

const EditProperty = () => {
  const [listing, setListing] = useState([])
  const toast = useToast()
  const params = useParams()
  const navigate = useNavigate()
  // ============================= GET Prop ID========================================

  const getProperty = async () => {
    try {
      const responseProp = await axiosInstance.get(`property/${params.id}`)
      setListing(responseProp.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // =============================== Edit Prop =========================================

  const formik = useFormik({
    initialValues: {
      name: listing.name,
      address: listing.address,
      description: listing.description,
    },
    onSubmit: async ({ name, address, description, rules }) => {
      try {
        const response = await axiosInstance.patch(
          `/property/edit/${params.id}`,
          {
            name,
            address,
            rules,
            description,
          }
        )
        navigate(-1)
        toast({
          title: "Success Edit Property",
          description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed Edit Property",
          //  description: err.response.message,
          status: "error",
        })
      }
    },
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    getProperty()
  }, [])
  return (
    <Center mt={{ md: "45vh", base: "58vh" }} mb={{ md: "40vh", base: "43vh" }}>
      <Box
        minW={{ md: "90vh", base: "fit-content" }}
        w="fit-content"
        position="absolute"
        ml="5px"
      >
        <Text
          as="b"
          fontSize="xx-large"
          mb="50px"
          // textAlign={{ base: "center" }}
        >
          {" "}
          Edit Property Form
        </Text>
        <Box mt="20px" height={{ base: "80vh", sm: "58vh" }} w="100%">
          <form onSubmit={formik.handleSubmit}>
            <Box mb="20px" mt="22px" mr="20px">
              <Text as="b" fontSize="16px">
                Property Name
              </Text>
              <Input
                label="Property Name"
                type="text"
                defaultValue={listing.name}
                required
                onChange={formChangeHandler}
                name="name"
                color="black"
              />
            </Box>
            <Box mb="20px" mr="20px">
              <Text as="b" fontSize="16px">
                Address
              </Text>
              <Input
                label="Address"
                type="text"
                required
                defaultValue={listing.address}
                onChange={formChangeHandler}
                name="address"
                color="black"
              />
            </Box>
            <Box mb="20px" mr="20px">
              <Text as="b" fontSize="16px">
                Rules
              </Text>
              <Textarea
                h="15vh"
                label="rules"
                defaultValue={listing.rules}
                type="text"
                required
                onChange={formChangeHandler}
                name="rules"
              />
            </Box>
            <Box mb="20px" mr="20px">
              <Text as="b" fontSize="16px">
                Description
              </Text>
              <Textarea
                h="15vh"
                label="Description"
                defaultValue={listing.description}
                type="text"
                required
                onChange={formChangeHandler}
                name="description"
              />
            </Box>
            <Center mr="20px" display="flex">
              <ButtonGroup w="100%">
                <Button
                  type="submit"
                  // width="fit-content"
                  w={{ base: "100%", md: "50%" }}
                  // minWidth={{ md: "70vh", base: "50vh" }}
                  color="white"
                  backgroundColor="linkedin.500"
                  _hover={{ backgroundColor: "linkedin.400" }}
                  mb="10px"
                  // left="17%"
                >
                  Submit
                </Button>
                <Button
                  // width="fit-content"
                  // minWidth={{ md: "70vh", base: "50vh" }}
                  w={{ base: "100%", md: "50%" }}
                  // left="17%"
                  // right="50"
                  color="white"
                  backgroundColor="red.500"
                  _hover={{ backgroundColor: "red.400" }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Center>
          </form>
        </Box>
      </Box>
    </Center>
  )
}

export default EditProperty
