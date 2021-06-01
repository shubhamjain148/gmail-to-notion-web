import { Box, Flex, Select, Spacer } from "@chakra-ui/react";
import React, { FC } from "react";
import { SelectType } from "./DatabaseRender";

interface SelectColumnProps {
  property: SelectType;
  propertyName: string;
  setDatabaseDetails: (data: any) => void;
}
const SelectColumn: FC<SelectColumnProps> = ({
  property,
  propertyName,
  setDatabaseDetails,
}) => {
  return (
    <Flex flexDirection="row">
      <Box p="4">{propertyName}</Box>
      <Spacer />
      <Box p="4">
        <Select
          onChange={(event) =>
            setDatabaseDetails({
              [propertyName]: {
                select: {
                  name: event.target.value,
                },
              },
            })
          }
          placeholder="Select option"
        >
          {property.select.options.map((selectOption) => {
            return (
              <option value={selectOption.name}>{selectOption.name}</option>
            );
          })}
        </Select>
      </Box>
    </Flex>
  );
};

export default SelectColumn;
