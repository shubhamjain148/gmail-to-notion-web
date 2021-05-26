import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://apis.google.com/js/platform.js"></script>
          <meta
            name="google-signin-client_id"
            content="891866724637-rqhpb7cep2ntkhenomcau08dcob1ltqf.apps.googleusercontent.com"
          ></meta>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
