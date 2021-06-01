import React, { FC } from "react";
import { ColumnTypes, PropertyType } from "./DatabaseRender";
import SelectColumn from "./SelectColumn";
import BadgeColumn from "./BadgeColumn";

interface RenderPropertyProps {
  property: PropertyType;
  propertyName: string;
  setDatabaseDetails: (data: any) => void;
}
const RenderProperty: FC<RenderPropertyProps> = ({
  property,
  propertyName,
  setDatabaseDetails,
}) => {
  switch (property.type) {
    case ColumnTypes.select:
      return (
        <SelectColumn
          setDatabaseDetails={setDatabaseDetails}
          property={property}
          propertyName={propertyName}
        />
      );
    case ColumnTypes.title:
      return (
        <BadgeColumn
          propertyName={propertyName}
          text="Will be set to email's subject"
        />
      );
    case ColumnTypes.created_time:
      return (
        <BadgeColumn
          propertyName={propertyName}
          text="Will be set to created time of record"
        />
      );
    default:
      return (
        <BadgeColumn
          propertyName={propertyName}
          text="Will be empty"
          colorScheme="red"
        />
      );
  }
};

export default RenderProperty;
