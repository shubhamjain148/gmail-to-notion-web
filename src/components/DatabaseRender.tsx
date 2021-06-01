import { Button } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import axios, { AxiosResponse } from "axios";
import React, { FC, useState } from "react";
import { serviceUrl } from "../../constants/constants";
import { axiosConfig } from "../service/gmailNotion";
import RenderProperty from "./RenderProperty";

interface DatabaseRenderProps {
  databaseId: string;
  integrationKey: string;
  label: string;
}
export interface Database {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  title: Title[];
  properties: Properties;
}

export type PropertyType = SelectType | CreatedType | TitleType;

export interface Properties {
  [key: string]: PropertyType;
}
export enum ColumnTypes {
  select = "select",
  created_time = "created_time",
  title = "title",
}

export interface CreatedType {
  id: string;
  type: ColumnTypes.created_time;
  created_time: {};
}

export interface SelectType {
  id: string;
  type: ColumnTypes.select;
  select: SelectOptions;
}

export interface SelectOptions {
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  color: string;
}

export interface TitleType {
  id: string;
  type: ColumnTypes.title;
  title: {};
}

export interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Text {
  content: string;
  link: null;
}

const NotionDatabaseRender: FC<DatabaseRenderProps> = () => {
  const [database, setDatabase] = useState<Database>();
  const [saveToNotion, setSaveToNotion] = useState<boolean>(false);
  const [databaseDetails, setDatabaseDetails] = useState<{
    [key: string]: any;
  }>({});

  if (!database) {
    (async () => {
      try {
        const databaseDetails: AxiosResponse<Database> = await axios.get(
          `${serviceUrl}/notion/database`,
          axiosConfig
        );
        console.log("details are", databaseDetails.data);
        setDatabase(databaseDetails.data);
        Object.keys(databaseDetails.data.properties).forEach((property) => {
          if (
            databaseDetails.data.properties[property].type == ColumnTypes.title
          ) {
            updateDatabaseDetails({
              [property]: {
                title: [
                  {
                    text: {
                      content: "email from script",
                    },
                  },
                ],
              },
            });
          }
        });
      } catch (err) {
        console.log("error is ", err);
      }
    })();
  }

  const addToNotion = async () => {
    setSaveToNotion(true);
    try {
      await axios.post(`${serviceUrl}/notion`, databaseDetails, axiosConfig);
    } catch (err) {
      console.log({ err });
      return null;
    }
    setSaveToNotion(false);
  };

  const updateDatabaseDetails = (data: any) => {
    console.log("updated data is ", data);
    setDatabaseDetails((databaseDetails) => {
      return {
        ...databaseDetails,
        ...data,
      };
    });
    console.log("database details are ", databaseDetails);
  };

  return database?.properties ? (
    <>
      {Object.keys(database.properties).map((key) => {
        const property = database.properties[key];
        return (
          <RenderProperty
            setDatabaseDetails={updateDatabaseDetails}
            propertyName={key}
            property={property}
          />
        );
      })}
      <Button
        isLoading={saveToNotion}
        loadingText="Getting your email into notion"
        onClick={addToNotion}
      >
        Post To Notion
      </Button>
    </>
  ) : (
    <Spinner />
  );
};

export default NotionDatabaseRender;
