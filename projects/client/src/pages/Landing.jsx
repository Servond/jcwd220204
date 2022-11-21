import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <>
    <Box display={"flex"} justifyContent="center" h="100vh" alignItems={"center"}>
      <Box display={"flex"} alignItems="center" >
        <Button 
        colorScheme={"purple"} 
        margin="3"
        onClick={onOpen}>Sign Up</Button>
      </Box>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="200px">
          <ModalHeader>Sign up as</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
            <Link to="/registerUser" >
            <Button 
            w="full"
            colorScheme={"purple"}>
              User
            </Button>
            </Link>
            <Link to="/registerTenant">
            <Button 
            w="full" 
            colorScheme={"purple"}>
              Tenant
            </Button>
            </Link>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default Landing