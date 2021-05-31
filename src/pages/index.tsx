import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/GoogleLoginContainer2"),
  { ssr: false }
);
const Index = () => (
  <Container height="100vh">
    <Hero />
    <DynamicComponentWithNoSSR />
    <DarkModeSwitch />
  </Container>
);

export default Index;
