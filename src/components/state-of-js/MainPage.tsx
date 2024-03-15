import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import LineChart from "./LineChart";
import data from "../../data/stateOfJs.json";

/**
 * We will use a line chart to plot the percentage of respondents
 * @returns
 */

const categories = {
  WOULD_USE: "would_use",
  NEVER_HEARD: "never_heard",
  INTERESTED: "interested",
  WOULD_NOT_USE: "would_not_use",
  NOT_INTERESTED: "not_interested",
};

const MainPage = () => {
  return (
    <Box p="4">
      <Heading as="h1" mb="4" fontSize="2xl" textAlign="center">
        JavaScript Technology Interest Over Time
      </Heading>
      <Flex justify="space-between" alignItems="flex-start">
        <Box
          maxW="450px"
          p="4"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          padding={"5px"}
          marginLeft={"30px"}
          marginTop={"110px"}
          border="1px solid"
          borderColor="gray"
        >
          <Heading as="h2" size="md" mb="4" color="black" borderBottom="1px solid" borderColor="gray">
            Information
          </Heading>
          <Text fontSize="lg" color="black" lineHeight="tall">
            The x-axis represents time in years, and the y-axis represents the percentage of respondents interested in
            the technology at that year. You can hover over the line to see the corresponding technology evolution of
            interest from 2016 to 2019.
          </Text>
          <Text mt="4" fontSize="sm" color="gray">
            Data source:{" "}
            <a href="https://2019.stateofjs.com/overview/" target="_blank" rel="noopener noreferrer">
              State of JavaScript 2019 Overview
            </a>
          </Text>
        </Box>
        <Box flex="1" ml="4">
          <Box bg="gray.100" p="4" borderRadius="md">
            <LineChart data={data} width={1200} height={800} category={categories.INTERESTED} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default MainPage;
