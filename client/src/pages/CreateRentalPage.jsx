import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { UserConsumer } from "../context/userContext";

export const CreateRentalPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({});
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  const navigate = useNavigate();

  const { user } = UserConsumer();

  useEffect(() => {
    const getCar = async () => {
      const carData = await axios.get(`http://localhost:8000/car/${carId}`);

      if (carData.data) {
        setCar(carData.data);
      }
    };
    getCar();
  }, [carId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const hours = Math.abs(pickUpDate - returnDate) / 36e5;

    const total = hours * car.price;

    const rentalData = {
      user: user.id,
      car: carId,
      pickUpDate,
      returnDate,
      total,
    };

    const response = await axios.post(
      "http://localhost:8000/rental",
      rentalData,
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data) {
      console.log(response.data);
      navigate(`/detail/${response.data.id}`);
    }
  };

  return (
    <HStack
      spacing={10}
      justifyContent="center"
      alignItems="center"
      height="100vh">
      <Box>
        {car.image === "" ? (
          <Box height={200} width={300} bgColor="white">
            <Center height="full" fontSize={24}>
              No Image
            </Center>
          </Box>
        ) : (
          <Image src={car.image} height={200} />
        )}
        <Center flexDirection="column" color="white" fontSize={24}>
          <Text>{car.name}</Text>
          <Text>{car.type}</Text>
        </Center>
      </Box>
      <Box>
        <Text color="primary.100" fontSize={40} fontWeight="semibold">
          Make Your Trip Awesome
        </Text>
        <VStack
          as="form"
          onSubmit={onSubmit}
          alignItems="start"
          bgColor="text.200"
          spacing={16}
          width={800}
          height={500}
          padding={8}>
          <Box width="full">
            <Text color="white" fontSize={32}>
              Pick-up Date:
            </Text>
            <Box width="full">
              <Datetime value={pickUpDate} onChange={setPickUpDate} />
            </Box>
          </Box>
          <Box>
            <Text color="white" fontSize={32}>
              Return Date:
            </Text>
            <Box bgColor="white" width="full">
              <Datetime value={returnDate} onChange={setReturnDate} />
            </Box>
          </Box>
          <Center width="full">
            <Button
              bgColor="primary.200"
              width={250}
              size="lg"
              type="submit"
              _hover={{ bgColor: "" }}
              _active={{ bgColor: "" }}>
              Submit
            </Button>
          </Center>
        </VStack>
      </Box>
    </HStack>
  );
};
