import { useEffect } from "react";
import AOS from "aos";
import {
  FeaturedGame,
  Footer,
  MainBanner,
  Navbar,
  Reached,
  Story,
  TransactionStep,
} from "../components/organisms";
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>StoreGG - Get a New Experience in Gaming</title>
        <meta name="description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
        <meta property="og:title" content="StoreGG - Get a New Experience in Gaming" />
        <meta property="og:description" content="Kami menyediakan jutaan cara untuk membantu players menjadi pemenang sejati" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
      </Head>
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
