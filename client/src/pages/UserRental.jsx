import { Box, Center, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavBar } from "../components/NavBar";
import axios from "axios";
import { UserConsumer } from "../context/userContext";

export const UserRental = () => {
  const [rentals, setRentals] = useState([]);
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = UserConsumer();

  useEffect(() => {
    const getUserRentals = async () => {
      const userRentals = await axios.get(
        `http://localhost:8000/rental/user/${user.id}`
      );

      if (userRentals.data) {
        setRentals(userRentals.data);
      }
    };
    getUserRentals();
  }, [user.id]);

  useEffect(() => {
    const getCarsFromRental = async () => {
      setIsLoading(true);
      rentals.map(async (rental) => {
        const carsFromRental = await axios.get(
          `http://localhost:8000/car/${rental.car}`
        );

        if (carsFromRental.data) {
          setCars((oldCars) => [...oldCars, carsFromRental.data]);
          setIsLoading(false);
        }
      });
    };
    getCarsFromRental();
  }, [rentals]);

  return (
    <>
      <NavBar />
      <Center height="90vh" flexDirection="column">
        <Text color="primary.100" fontSize={40} fontWeight="semibold">
          Your Records
        </Text>
        <Box
          width={800}
          padding={4}
          height={600}
          bgColor="text.200"
          overflowY="auto"
          position="relative">
          <VStack>
            {cars &&
              rentals.map((rental, index) => {
                return isLoading ? null : (
                  <RentalItem
                    key={index}
                    car={cars}
                    index={index}
                    rental={rental}
                  />
                );
              })}
          </VStack>
        </Box>
      </Center>
    </>
  );
};

const RentalItem = ({ car, index, rental }) => {
  if (car[index]) {
    return (
      <Box width="full" height={175} bgColor="#514e4f">
        <Flex alignItems="center" height="full" paddingX={4}>
          {car[index].image === "" ? (
            <Box height={150} width={225} bgColor="white"></Box>
          ) : (
            <Image height={150} width={250} src={car[index].image} />
          )}
          <Box marginLeft={4} fontSize={24} color="white">
            <Text>{car[index].name}</Text>
            <Text>{car[index].type}</Text>
            <Text>Total: Php {rental.total}</Text>
          </Box>
        </Flex>
      </Box>
    );
  } else return null;
};
