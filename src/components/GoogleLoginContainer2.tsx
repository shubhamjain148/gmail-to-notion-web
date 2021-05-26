import React, { FC, useEffect, useState } from "react";
import { signInToGoogle } from "../service/googleOauth2";
import axios, { AxiosRequestConfig } from "axios";
import { Input } from "@chakra-ui/input";
import { Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { serviceUrl } from "../../constants/constants";

interface User {
  notion_key?: string;
  database_id?: string;
  id?: string;
}

interface GoogleLoginContainer2Props {}
const GoogleLoginOAtuh: FC<GoogleLoginContainer2Props> = () => {
  const [databaseId, setDatabaseId] = useState<string>();
  const [integrationKey, setIntegrationKey] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [user, setUser] = useState<{ user: User }>();

  const config: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      credentials: "include",
    },
    withCredentials: true,
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await axios.get(`${serviceUrl}/me`, config);
        console.log({ data: me.data });
        setUser(me.data);
      } catch (err) {
        console.log({ err });
        setUser(undefined);
        return null;
      }
    })();
  }, []);

  const updateUser = async () => {
    try {
      axios.post(
        `${serviceUrl}/updateUser`,
        {
          notion_key: integrationKey,
          database_id: databaseId,
          label,
        },
        config
      );
    } catch (err) {
      console.log({ err });
      return null;
    }
  };

  const addToNotion = async () => {
    try {
      axios.post(
        `${serviceUrl}/notion`,
        {
          notion_key: integrationKey,
          database_id: databaseId,
          label,
        },
        config
      );
    } catch (err) {
      console.log({ err });
      return null;
    }
  };

  return user?.user ? (
    <Stack spacing={4}>
      <Text mb="4px">Database Id of Notion</Text>
      <Input
        value={databaseId}
        onChange={(event) => setDatabaseId(event.target.value)}
        placeholder="database id of notion"
      />
      <Text mb="4px">Notion Integration Key</Text>
      <Input
        value={integrationKey}
        onChange={(event) => setIntegrationKey(event.target.value)}
        placeholder="notion integration key"
      />
      <Text mb="4px">Gmail Label to use</Text>
      <Input
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        placeholder="gmail label"
      />
      <Button onClick={updateUser}>Update user details</Button>
      <Button onClick={addToNotion}>Post To Notion</Button>
    </Stack>
  ) : (
    <>
      <Text mb="8px">Not Logged in</Text>
      <Button onClick={signInToGoogle}>Log in to google</Button>
    </>
  );
};

export default GoogleLoginOAtuh;
