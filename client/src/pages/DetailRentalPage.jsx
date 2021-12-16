import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const DetailRentalPage = () => {
  const { rentalId } = useParams();
  const [rental, setRental] = useState({});
  const [car, setCar] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getRental = async () => {
      const rentalData = await axios.get(
        `http://localhost:8000/rental/${rentalId}`
      );

      if (rentalData.data) {
        setRental(rentalData.data);
      }
    };
    getRental();
  }, [rentalId]);

  useEffect(() => {
    const getCar = async () => {
      try {
        let carData = {};
        if (rental.car) {
          carData = await axios.get(`http://localhost:8000/car/${rental.car}`);
        }

        if (carData.data) {
          setCar(carData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCar();
  }, [rental]);

  const totalHours =
    Math.abs(new Date(rental.pickUpDate) - new Date(rental.returnDate)) / 36e5;

  const convertHoursToDays = (numberOfHours) => {
    const days = Math.floor(numberOfHours / 24);
    if (numberOfHours >= 24) {
      if (days === 1) {
        return `${days} day`;
      }
      return `${days} days`;
    } else {
      if (numberOfHours === 1) {
        return `${days} hour`;
      }
      return `${days} hours`;
    }
  };

  const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    const amOrPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    if (month < 10) {
      month = "0" + month;
    }

    const finalDate = `${day}/${month}/${year} - ${hour}:${minutes} ${amOrPm}`;

    return finalDate;
  };

  return (
    <Center height="100vh" flexDirection="column">
      <Box>
        <Text color="primary.100" fontSize={40} fontWeight="semibold">
          Make Your Trip Awesome
        </Text>
      </Box>
      <Center
        width={800}
        height={600}
        bgColor="text.200"
        flexDirection="column">
        <Flex justifyContent="space-evenly" width="full">
          {car.image === "" ? (
            <Box height={200} width={300} bgColor="white">
              <Center height="full">
                <Text fontSize={24}>No Image</Text>
              </Center>
            </Box>
          ) : (
            <Image src={car.image} height={200} />
          )}
          <Center flexDirection="column" color="white" fontSize={24}>
            <Text>{car.name}</Text>
            <Text>{car.type}</Text>
          </Center>
        </Flex>
        <VStack color="white" fontSize={24} marginTop={8}>
          <Text>Pick-up Date: {convertDate(rental.pickUpDate)}</Text>
          <Text>Return Date: {convertDate(rental.returnDate)}</Text>
          {isConfirm && (
            <>
              <Text>Price: Php {car.price} per hour</Text>
              <Text>
                Price: Php {rental.total} ({convertHoursToDays(totalHours)})
              </Text>
            </>
          )}
        </VStack>
        {isConfirm ? (
          <>
            <Text
              color="primary.100"
              fontSize={24}
              width={500}
              textAlign="center"
              marginTop={8}>
              Payment will be given only on the day that your rented car is
              picked up.
            </Text>
            <Button
              bgColor="primary.200"
              marginTop={4}
              onClick={() => navigate("/", { replace: true })}>
              Go Back
            </Button>
          </>
        ) : (
          <Button
            bgColor="primary.200"
            width={450}
            marginTop={8}
            size="lg"
            onClick={() => setIsConfirm(true)}
            _hover={{ bgColor: "" }}
            _active={{ bgColor: "" }}>
            Confirm
          </Button>
        )}
      </Center>
    </Center>
  );
};
