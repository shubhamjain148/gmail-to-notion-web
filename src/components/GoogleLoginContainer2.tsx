import React, { FC, useEffect, useState } from "react";
import { signInToGoogle } from "../service/googleOauth2";
import axios, { AxiosResponse } from "axios";
import { Input } from "@chakra-ui/input";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { serviceUrl } from "../../constants/constants";
import { axiosConfig } from "../service/gmailNotion";
import NotionDatabaseRender from "./DatabaseRender";

interface User {
  notion_key?: string;
  database_id?: string;
  label?: string;
  id?: string;
}

interface GoogleLoginContainer2Props {}
const GoogleLoginOAtuh: FC<GoogleLoginContainer2Props> = () => {
  const [databaseId, setDatabaseId] = useState<string>();
  const [integrationKey, setIntegrationKey] = useState<string>();
  const [savingUser, setSavingUser] = useState<boolean>(false);
  const [saveToNotion, setSaveToNotion] = useState<boolean>(false);
  const [label, setLabel] = useState<string>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        const me = await axios.get(`${serviceUrl}/me`, axiosConfig);
        console.log({ data: me.data });
        setUser(me.data.user);
        if (me.data.user) {
          const { database_id, notion_key, label } = me.data.user;
          setDatabaseId(database_id);
          setIntegrationKey(notion_key);
          setLabel(label);
        }
      } catch (err) {
        console.log({ err });
        setUser(undefined);
        return null;
      }
    })();
  }, []);

  const updateUser = async () => {
    console.log("service url is ", serviceUrl);
    setSavingUser(true);
    try {
      const updatedUser: AxiosResponse<User> = await axios.post<User>(
        `${serviceUrl}/updateUser`,
        {
          notion_key: integrationKey,
          database_id: databaseId,
          label,
        },
        axiosConfig
      );
      const { database_id, notion_key, label: userLabel } = updatedUser.data;
      setUser(updatedUser.data);
      setDatabaseId(database_id);
      setIntegrationKey(notion_key);
      setLabel(userLabel);
    } catch (err) {
      console.log({ err });
      return null;
    }
    setSavingUser(false);
  };

  return user ? (
    <Stack pb={4} spacing={4}>
      <Flex direction="column">
        <Text mb="4px">Database Id of Notion</Text>
        <Input
          value={databaseId}
          onChange={(event) => setDatabaseId(event.target.value)}
          placeholder="database id of notion"
        />
      </Flex>
      <Flex direction="column">
        <Text mb="4px">Notion Integration Key</Text>
        <Input
          value={integrationKey}
          onChange={(event) => setIntegrationKey(event.target.value)}
          placeholder="notion integration key"
        />
      </Flex>

      <Flex direction="column">
        <Text mb="4px">Gmail Label to use</Text>
        <Input
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="gmail label"
        />
      </Flex>
      <Button
        isLoading={savingUser}
        loadingText="Updating your details"
        onClick={updateUser}
      >
        Update user details
      </Button>
      {user?.database_id && user?.label && user?.notion_key && (
        <>
          <NotionDatabaseRender
            integrationKey={user.notion_key}
            label={user.label}
            databaseId={user.database_id}
          />
        </>
      )}
    </Stack>
  ) : (
    <>
      <Text mb="8px">Not Logged in</Text>
      <Button onClick={signInToGoogle}>Log in to google</Button>
    </>
  );
};

export default GoogleLoginOAtuh;
