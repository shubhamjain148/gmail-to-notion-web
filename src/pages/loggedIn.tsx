import { useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { serviceUrl } from "../../constants/constants";

const LoggedIn = () => {
  const router = useRouter();

  useEffect(() => {
    if (window == undefined) {
      return;
    }
    var fragmentString = window.location.search.substring(1);
    console.log("fragment string is ", fragmentString);
    var params: { [key: string]: string } = {};
    var regex = /([^&=]+)=([^&]*)/g,
      m;
    while ((m = regex.exec(fragmentString))) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    console.log("params are ", params);
    if (Object.keys(params).length > 0 && params?.code) {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          credentials: "include",
        },
        withCredentials: true,
      };
      (async () => {
        try {
          console.log("service url is ", serviceUrl);
          await axios.post(
            `${serviceUrl}/createUser`,
            {
              code: params.code,
            },
            config
          );
          router.push("/");
        } catch (err) {
          router.push("/");
        }
      })();
    } else {
      router.push("/");
    }
  }, []);

  return <div>Test</div>;
};

export default LoggedIn;
