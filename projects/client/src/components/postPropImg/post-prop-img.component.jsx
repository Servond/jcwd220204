import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { ArrowBackIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react"
import { BsUpload } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import { axiosInstance } from "../../api"

const PostPropImg = () => {
  const toast = useToast()
  const inputFileRef = useRef()
  const params = useParams()
  const navigate = useNavigate()
  const [propertyImage, setPropertyImage] = useState([])
  const [openId, setOpenId] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // =============================== Get Prop Image ========================================
  const getProperty = async () => {
    try {
      const responseProp = await axiosInstance.get(`/property/${params.id}`)
      // console.log(responseProp.data)
      setPropertyImage(responseProp.data.data.PropertyImages)
    } catch (err) {
      console.log(err)
    }
  }

  // =============================== Delete Image =========================================
  const DeleteImg = async (id) => {
    try {
      await axiosInstance.delete(`/property/delete/image/${openId.id}`)
      getProperty()
      setOpenId(null)
      toast({ title: "Image deleted", status: "info" })
    } catch (err) {
      console.log(err)
    }
  }

  // ============================== Post Img =============================================
  const handleSubmit = async (event) => {
    try {
      let newImgProp = new FormData()
      newImgProp.append("image_url", event)
      // console.log(values.image_url[0].name)
      const responseImg = await axiosInstance.post(
        `/property/image/${params.id}`,
        newImgProp
      )

      if (responseImg.name === "AxiosError") {
        throw new Error("Wrong file type or size")
      } else {
        window.location.reload(false)
      }

      toast({
        title: "Image succesfull added",
        description: responseImg.data.message,
        status: "success",
      })
    } catch (err) {
      console.log(err)
      toast({
        title: "Failed to added new image",
        description: "Size or type file is invalid",
        status: "error",
      })
    }
  }
  // ===================================================================================

  useEffect(() => {
    getProperty()
  }, [openId])
  return (
    <Box mt="10vh" ml="7px" mr="7px">
      <ArrowBackIcon
        ml={{ md: "20px", base: 0 }}
        fontSize="25px"
        onClick={() => {
          navigate(-1)
        }}
      />
      <Center display="grid">
        <Box margin={{ base: "50px 10px 50px", md: "30px auto 70px" }}>
          <Text as="b" fontSize="xx-large" position="absolute" ml="20px">
            Update Your Images
          </Text>
          <br />
          <br />
          <br />

          <Text textAlign="center" fontSize="13px" color="red" mb="20px">
            Max file size is 3Mb and only accept JPG, JPEG and PNG
          </Text>
          <Input
            label="Image"
            name="image_url"
            type="file"
            accept="image/*"
            onChange={(event) => {
              handleSubmit(event.target.files[0])
            }}
            display="none"
            ref={inputFileRef}
          />
          <Button
            onClick={() => {
              inputFileRef.current.click()
            }}
            backgroundColor="linkedin.500"
            _hover={{ backgroundColor: "linkedin.400" }}
            color="white"
            minWidth="370px"
            width="fit-content"
            height="50px"
            letter-spacing=" 0.5px"
            line-height="50px"
            padding="0 35px 0 35px"
          >
            <Flex gap="10px">
              <Center>
                <BsUpload />
              </Center>
              <Text>Choose Images</Text>
            </Flex>
          </Button>
        </Box>
        <Box
          position="relative"
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          justifyContent="space-evenly"
          textAlign="center"
          gridGap={{ base: "10px", sm: "50px" }}
        >
          {propertyImage.map((val) => (
            <Box
              maxW={{ base: "sm", md: "xl" }}
              borderWidth="1px"
              rounded="lg"
              shadow="370px"
              p="4px"
              mb="24px"
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 20px"}
              borderRadius="8px"
              position="relative"
            >
              <CloseButton
                position="absolute"
                right={{ md: "5", base: "3" }}
                top={{ md: "3", base: "1" }}
                border="none"
                color="red.400"
                onClick={() => {
                  setOpenId(val)
                  onOpen()
                }}
                size={{ base: "sm", md: "sm" }}
                cursor="pointer"
              />

              <Image
                borderRadius="8px"
                width="100%"
                h="100%"
                objectFit="cover"
                src={`${process.env.REACT_APP_IMG}${val.image_url}`}
              />
              <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent mb="250px">
                  <ModalCloseButton border="none" />
                  <ModalBody>
                    <Text
                      mt="30px"
                      textAlign="center"
                      mb="50px"
                      fontSize="20px"
                      fontWeight="bold"
                    >
                      Are you sure want to delete this image?
                    </Text>
                    <Center>
                      <Button
                        width="200px"
                        color="white"
                        bgColor="red.500"
                        borderRadius="8px"
                        onClick={() => {
                          DeleteImg(val.id)

                          onClose()
                        }}
                        _hover={{
                          bgColor: "red.600",
                          borderRadius: "8px",
                        }}
                        mb="20px"
                      >
                        Delete
                      </Button>
                    </Center>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Box>
          ))}
        </Box>
      </Center>
    </Box>
  )
}

export default PostPropImg
