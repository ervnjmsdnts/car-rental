import { Box, Center, HStack, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import axios from "axios";

export const CarPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getAllCars = async () => {
      const carData = await axios.get("http://localhost:8000/car");

      if (carData.data) {
        setCars(carData.data);
      }
    };
    getAllCars();
  }, []);

  return (
    <>
      <NavBar />
      <Box paddingX={64} paddingY={8} bgColor="#514e4f" height="full">
        <HStack fontSize={48} spacing={4} marginTop={8} justifyContent="center">
          <Text>Find the Best</Text>
          <Text color="primary.200">Car for You</Text>
        </HStack>
        <SimpleGrid columns={3} spacing={8} marginTop={8}>
          {cars.map((car) => (
            <CarItem
              key={car.id}
              carId={car.id}
              image={car.image}
              name={car.name}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

const CarItem = ({ carId, image, name }) => {
  return (
    <Link to={`/rental/${carId}`} width="full">
      {image === "" ? (
        <Box height={300} bgColor="white">
          <Center height="full">
            <Text fontSize={24}>No Image</Text>
          </Center>
        </Box>
      ) : (
        <Image height={300} src={image} />
      )}
      <Center>
        <Text color="white" fontSize={24}>
          {name}
        </Text>
      </Center>
    </Link>
  );
};
