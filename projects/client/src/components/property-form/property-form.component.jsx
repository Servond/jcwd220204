import { axiosInstance } from "../../api/index"
// import * as Yup from "yup"
import { useFormik } from "formik"
import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import FormInput from "../input/from-input.component"
import { useState } from "react"
import { useRef } from "react"
import { BsUpload } from "react-icons/bs"
import { useEffect } from "react"
import { Form, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import * as Yup from "yup"

const PropertyForm = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const authSelector = useSelector((state) => state.auth)

  // ==================================================================================================
  const inputFileRef = useRef()
  const [selectedImages, setSelectedImages] = useState([])
  const [category, setCategory] = useState([])
  const [cities, setCities] = useState([])

  // ========================================= Get Category =============================================

  const getCategory = async () => {
    try {
      const responseCategory = await axiosInstance.get("/category/")
      setCategory(responseCategory.data.data)
      // console.log(responseCategory.data)
    } catch (err) {
      console.log(err)
    }
  }

  // ========================================= Get Cities =============================================
  const getCities = async () => {
    try {
      const responseCities = await axiosInstance.get("/cities/all/")
      setCities(responseCities.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  // ==================================================================================================
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      rules: "",
      description: "",
      cityId: "",
      categoryId: "",
      image_url: "",
    },
    onSubmit: async (values) => {
      try {
        let newProperty = new FormData()
        newProperty.append("name", values.name)
        newProperty.append("address", values.address)
        newProperty.append("rules", values.rules)
        newProperty.append("description", values.description)
        newProperty.append("cityId", values.cityId)
        newProperty.append("categoryId", values.categoryId)
        for (let i = 0; i < values.image_url.length; i++) {
          newProperty.append("image_url", values.image_url[i])
        }
        const response = await axiosInstance.post(
          "/property/create",
          newProperty
        )

        if (response.name === "AxiosError") {
          throw new Error(response.message)
        }
        navigate(`/tenant/${authSelector.id}`)
        toast({
          title: "Property successful added",
          // description: response.data.message,
          status: "success",
        })
      } catch (err) {
        console.log(err)

        toast({
          title: "Failed create new property",
          description: "please check again your file type and size",
          status: "error",
        })
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required("You must fill this form"),
      address: Yup.string().required("You must fill this form"),
      rules: Yup.string().required("You must fill this form"),
      description: Yup.string().required("You must fill this form"),
      image_url: Yup.mixed().required("Select at least 1 file"),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
  }

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  useEffect(() => {
    getCategory()
    getCities()
  }, [])

  return (
    <Box mt="150px" ml="20px" mb={"15vh"}>
      <h1>Register Your Property Here</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.name}>
          <FormInput
            label="Property Name"
            type="text"
            onChange={formChangeHandler}
            name="name"
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.address}>
          <FormInput
            label="Address"
            type="text"
            onChange={formChangeHandler}
            name="address"
            value={formik.values.address}
          />
          <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
        </FormControl>
        <Text>Rules</Text>
        <br />
        <FormControl isInvalid={formik.errors.rules}>
          <Textarea
            // width={{ base: "45vh", sm: "85vh" }}
            display="block"
            width="93%"
            height="20vh"
            label="rules"
            type="text"
            onChange={formChangeHandler}
            name="rules"
            value={formik.values.rules}
            borderColor="grey"
          />
          <FormErrorMessage>{formik.errors.rules}</FormErrorMessage>
        </FormControl>

        <Text mt="40px">Description</Text>
        <br />
        <FormControl isInvalid={formik.errors.description}>
          <Textarea
            display="block"
            // width={{ base: "45vh", sm: "85vh" }}
            width="93%"
            height="20vh"
            label="Description"
            type="text"
            onChange={formChangeHandler}
            name="description"
            value={formik.values.description}
            borderColor="grey"
          />
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
        </FormControl>
        <HStack mt="5">
          {/* ================================ Category =================================== */}

          <Stack width="44.75%">
            <Text>Category</Text>
            <HStack width="100%">
              <Select
                type="text"
                onChange={formChangeHandler}
                name="categoryId"
                value={formik.values.categoryId}
                required
              >
                <option>-- Select Category --</option>
                {category.map((val) => (
                  <option value={val.id}>{val.category_name}</option>
                ))}
              </Select>
            </HStack>
          </Stack>
          {/* ================================ CITY =================================== */}

          <Stack width="44.75%">
            <Text>City</Text>
            <HStack width="100%">
              <Select
                label="cityId"
                type="text"
                onChange={formChangeHandler}
                name="cityId"
                value={formik.values.cityId}
                required
              >
                <option value={0}> -- Select City --</option>
                {cities.map((val) => (
                  <option value={val.id}>{val.cities_name}</option>
                ))}
              </Select>
            </HStack>
          </Stack>
        </HStack>
        <Box width="90%" mt="40px">
          {/* <FormControl isInvalid={formik.errors.image_url}> */}
          <Input
            label="Image"
            multiple={true}
            name="image_url"
            type="file"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue("image_url", event.target.files)
              onSelectFile(event)
            }}
            display="none"
            ref={inputFileRef}
            required
          />
          <Box width="max-content" gap="2" margin="auto">
            <Text
              fontWeight="bold"
              fontSize="20px"
              textAlign="center"
              mb="10px"
            >
              Upload Your Image
            </Text>
            <Text textAlign="center" fontSize="12px" color="red" mb="20px">
              Max file size is 3Mb and only accept JPG, JPEG and PNG
            </Text>
            {/* <Center mb="20px">
                <FormErrorMessage>{formik.errors.image_url}</FormErrorMessage>
              </Center> */}
            <Button
              display="flex"
              alignItems="center"
              backgroundColor="linkedin.500"
              width="fit-content"
              minWidth="350px"
              mb="10px"
              color="white"
              _hover={{ backgroundColor: "linkedin.400" }}
              onClick={() => inputFileRef.current.click()}
            >
              <Flex gap="10px">
                <Center>
                  <BsUpload />
                </Center>
                <Text>Choose Images</Text>
              </Flex>
            </Button>
            <Button
              cursor={"pointer"}
              type="submit"
              width="fit-content"
              minWidth="350px"
              backgroundColor="whatsapp.500"
              color="white"
              _hover={{ backgroundColor: "whatsapp.400" }}
            >
              Submit
            </Button>
          </Box>
          {/* </FormControl> */}

          <br />
          <Box
            position="relative"
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            justifyContent="space-evenly"
            textAlign="center"
            gridGap="10px"
          >
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <Box
                    w="100%"
                    borderWidth="1px"
                    rounded="lg"
                    shadow="370px"
                    display="flex"
                    p="4px"
                    mb="24px"
                    boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 20px"}
                    borderRadius="8px"
                    position="relative"
                  >
                    <CloseButton
                      top={{ md: "3", base: "1" }}
                      right={{ base: "3", md: "5" }}
                      position="absolute"
                      border="none"
                      color="red.400"
                      cursor="pointer"
                      size="sm"
                      onClick={() => deleteHandler(image)}
                    />
                    <Image
                      borderRadius="8px"
                      boxSize="100%"
                      objectFit="cover"
                      src={image}
                      alt="upload"
                    />
                  </Box>
                )
              })}
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default PropertyForm
