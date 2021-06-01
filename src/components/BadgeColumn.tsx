import { Flex, Box, Badge, Spacer } from "@chakra-ui/react";
import React, { FC } from "react";

interface TitleColumnProps {
  propertyName: string;
  text: string;
  colorScheme?: string;
}
const BadgeColumn: FC<TitleColumnProps> = ({
  propertyName,
  text,
  colorScheme = "purple",
}) => {
  return (
    <Flex flexDirection="row">
      <Box p="4">{propertyName}</Box>
      <Spacer />
      <Box p="4">
        <Badge colorScheme={colorScheme}>{text}</Badge>
      </Box>
    </Flex>
  );
};

export default BadgeColumn;
