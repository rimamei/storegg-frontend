import { useEffect } from "react";
import AOS from "aos";
import Image from "next/image";
import {
  FeaturedGame,
  Footer,
  MainBanner,
  Navbar,
  Reached,
  Story,
  TransactionStep,
} from "../components/organisms";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame />
      <Reached />
      <Story />
      <Footer />
    </>
  );
}
