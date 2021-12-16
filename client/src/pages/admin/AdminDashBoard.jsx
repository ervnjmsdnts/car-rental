import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Center,
  Tbody,
  Td,
  Text,
  IconButton,
  Image,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  CircularProgress,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SideBar } from "../../components/SideBar";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";

export const AdminDashBoard = () => {
  const [cars, setCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState("");
  const [imageId, setImageId] = useState("");

  const {
    isOpen: isOpenImage,
    onClose: onCloseImage,
    onOpen: onOpenImage,
  } = useDisclosure();

  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onOpen: onOpenAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDisclosure();

  useEffect(() => {
    const getAllCars = async () => {
      const response = await axios.get("http://localhost:8000/car");

      if (response.data) {
        setCars(response.data);
      }
    };
    getAllCars();
  }, []);

  useEffect(() => {
    const getAllRentals = async () => {
      const response = await axios.get("http://localhost:8000/rental");

      if (response.data) {
        setRentals(response.data);
      }
    };
    getAllRentals();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await axios.get("http://localhost:8000/user/all");

      if (response.data) {
        setUsers(response.data);
      }
    };
    getAllUsers();
  }, []);

  return (
    <Flex>
      <SideBar />
      <Center
        width="full"
        flexDirection="column"
        justifyContent="start"
        color="white"
        padding={8}>
        <VStack alignItems="stretch" spacing={16} width="auto">
          <Box>
            <Flex justifyContent="space-between">
              <Heading>Cars</Heading>
              <IconButton
                colorScheme="green"
                icon={<AddIcon />}
                onClick={onOpenAdd}
              />
              <AddCarModal isOpen={isOpenAdd} onClose={onCloseAdd} />
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Price</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {cars.map((car) => (
                  <Tr key={car.id}>
                    <Td>{car.id}</Td>
                    <Td>
                      {car.image === "" ? (
                        <Box
                          bgColor="white"
                          position="relative"
                          width={150}
                          height={75}
                          color="text.200">
                          <Center height="full">
                            <Text>No Image</Text>
                          </Center>
                          <IconButton
                            position="absolute"
                            top={-3}
                            right={-3}
                            onClick={() => {
                              onOpenImage();
                              setImageId(car.id);
                            }}
                            size="sm"
                            colorScheme="green"
                            icon={<AddIcon />}
                          />
                        </Box>
                      ) : (
                        <Image src={car.image} width={150} />
                      )}
                    </Td>
                    <Td>{car.name}</Td>
                    <Td>{car.type}</Td>
                    <Td>Php {car.price}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="yellow"
                        onClick={() => {
                          onOpenEdit();
                          setEditId(car.id);
                        }}
                      />
                    </Td>
                  </Tr>
                ))}
                <AddImageModal
                  isOpen={isOpenImage}
                  id={imageId}
                  onClose={onCloseImage}
                />
                <EditCarModal
                  id={editId}
                  isOpen={isOpenEdit}
                  onClose={onCloseEdit}
                />
              </Tbody>
            </Table>
          </Box>
          <Box>
            <Heading>Rentals</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>User</Th>
                  <Th>Car</Th>
                  <Th>Pick-up Date</Th>
                  <Th>Return Date</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {rentals.map((rental) => {
                  const pickUpDate = new Date(rental.pickUpDate).toDateString();
                  const returnDate = new Date(rental.returnDate).toDateString();
                  return (
                    <Tr key={rental.id}>
                      <Td>{rental.id}</Td>
                      <Td>{rental.user}</Td>
                      <Td>{rental.car}</Td>
                      <Td>{pickUpDate}</Td>
                      <Td>{returnDate}</Td>
                      <Td>Php {rental.total}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
          <Box>
            <Heading>Users</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.id}</Td>
                    <Td>{user.email}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Center>
    </Flex>
  );
};

const AddImageModal = ({ id, isOpen, onClose }) => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file !== "") {
      formData.append("file", file);
      setIsLoading(true);
      const response = await axios.put(
        `http://localhost:8000/car/image/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        setIsLoading(false);
        window.location.reload();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color="white">
        <ModalHeader>Add Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </ModalBody>

        <ModalFooter>
          {isLoading ? (
            <CircularProgress isIndeterminate color="primary.100" />
          ) : (
            <Button colorScheme="yellow" onClick={handleClick}>
              Submit
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const AddCarModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);

  const handleClick = async (e) => {
    const carData = {
      image: "",
      name,
      type,
      price,
    };
    setIsLoading(true);
    const response = await axios.post("http://localhost:8000/car", carData);

    if (response.data) {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color="white">
        <ModalHeader>Add a car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftAddon children="Name" />
              <Input
                placeholder="Car name"
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Type" />
              <Input
                placeholder="Car type"
                onChange={(e) => setType(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Php" />
              <Input
                placeholder="Car price"
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {isLoading ? (
            <CircularProgress isIndeterminate color="primary.100" />
          ) : (
            <Button colorScheme="yellow" onClick={handleClick}>
              Add car
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditCarModal = ({ isOpen, onClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const getCar = async () => {
      const response = await axios.get(`http://localhost:8000/car/${id}`);

      if (response.data) {
        setEditImage(response.data.image);
        setEditName(response.data.name);
        setEditType(response.data.type);
        setEditPrice(response.data.price);
      }
    };
    getCar();
  }, [id]);

  const handleClick = async () => {
    const editCarData = {
      image: editImage,
      name: editName,
      type: editType,
      price: editPrice,
    };

    setIsLoading(true);
    const response = await axios.put(
      `http://localhost:8000/car/${id}`,
      editCarData
    );

    if (response.data) {
      setIsLoading(false);
      window.location.reload();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color="white">
        <ModalHeader>Edit car</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftAddon children="Name" />
              <Input
                placeholder="Car name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Type" />
              <Input
                placeholder="Car type"
                value={editType}
                onChange={(e) => setEditType(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Php" />
              <Input
                placeholder="Car price"
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          {isLoading ? (
            <CircularProgress isIndeterminate color="primary.100" />
          ) : (
            <Button colorScheme="yellow" onClick={handleClick}>
              Edit car
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
