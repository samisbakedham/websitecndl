import { Box, Button, Stack } from "@chakra-ui/react";
import { IconDApps, IconNFTs, IconP2P_Transfer, IconWeb3 } from "@shm/Icons";
import SlidingStats from "components/common/SlidingStats";
import {
  Container,
  VStack,
  ListItem,
  OrderedList,
  SimpleGrid,
  Grid,
  GridItem,
  Img,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { CheckIcon } from "@chakra-ui/icons";
import Hero from "components/sections/Hero";
import ReadWhitepaper from "components/sections/home/ReadWhitepaper";
import RoadmapFull from "components/sections/home/RoadMapFull";
import ShardeumInNews from "components/sections/home/ShardeumInNews";
import SHMTokenomics from "components/sections/home/SHMTokenomics";
import SectionHeading from "../components/common/SectionHeading";
import JoinCommunity from "components/sections/JoinCommunity";
import { CLAIM_100_SHM_LINK, REPORT_BUGS } from "constants/links";
import type { InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import MoreAboutShardeum from "../components/sections/home/MoreAboutShardeum";
import Team from "../components/sections/Team";
import { IconCommunity, IconGlobe, IconTransaction } from "@shm/Icons";
import Head from "next/head";

const LandingPage = ({
  news,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactNode => {
  const { t: pageTranslation } = useTranslation("page-home");
  const { t: commonTranslation } = useTranslation("common");

  const stats = [
    { Icon: IconCommunity, title: "total-community-members" },
    { Icon: IconGlobe, title: "est-transaction-per-second" },
    { Icon: IconTransaction, title: "est-transaction-cost" },
    { Icon: IconGlobe, title: "min-validators" },
  ];

  return (
    <>
      {/* Hero section */}
      <Head>
        <title>{"Shardeum | EVM based Sharded Layer 1 Blockchain"}</title>
        <meta
          name="description"
          content="Shardeum is an EVM-based, linearly scalable network that provides low gas fees forever while maintaining true decentralization and solid security"
        />
        <meta
          name="keywords"
          content="shardeum,blockchain,layer1 blockchain,evm based blockchain"
        />
        <meta property="og:title" content="EVM Based Sharded Layer 1 Blockchain" />
        <meta
          property="og:description"
          content="Shardeum is an EVM-based, linearly scalable smart contract platform that maintains low gas fees while providing true decentralization and solid security"
        />
        <meta property="og:url" content="https://shardeum.org/" />
        <meta property="og:image" content="https://shardeum.org/Shardeum.png" />
        <meta name="twitter:title" content="EVM Based Sharded Layer 1 Blockchain" />
        <meta
          name="twitter:description"
          content="Shardeum is an EVM-based, linearly scalable network that provides low gas fees forever while maintaining true decentralization and solid security"
        />
        <meta name="twitter:image" content="https://shardeum.org/Shardeum.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shardeum" />
        <link rel="canonical" href="https://shardeum.org/" />
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/08f8687cb2b708c3de5b4b9f/script.js"
        ></script>
      </Head>

      <Hero
        heading={commonTranslation("shm-slogan")}
        description={commonTranslation("shm-description")}
        cta={
          <Stack
            spacing="4"
            direction={{ base: "column", sm: "row" }}
            width={{ base: "full", sm: "auto" }}
          >
            <Button
              as="a"
              variant="secondary"
              size="lg"
              rel="noopener noreferrer"
              target="_blank"
              href="https://shardeum.org/betanet"
            >
              Join Betanet Sphinx
            </Button>
            <Button
              as="a"
              variant="primary"
              size="lg"
              rel="noopener noreferrer"
              target="_blank"
              href={CLAIM_100_SHM_LINK}
            >
              {commonTranslation("claim-100-shm-cta")}
            </Button>
          </Stack>
        }
        media={
          <Box position="relative">
            <Box
              h={{ base: "150px", md: "250px", xl: "auto" }}
              overflow="hidden"
              mb={{ base: "-24px" }}
              mx="auto"
              transform={{ md: "scale(1)" }}
            >
              <Image alt="" src="/hero-globe-image.png" width="660" height="660" />
            </Box>
          </Box>
        }
      />

      <SlidingStats stats={stats} />
      <ReadWhitepaper />
      <MoreAboutShardeum />
      <SHMTokenomics />
      <RoadmapFull heading={"h2"} />
      <Team />
      <ShardeumInNews news={news} />
      <JoinCommunity />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  // Replace Airtable data fetching with static or empty data
  const news = []; // Replace with static content if needed
  return {
    props: {
      news,
      ...(await serverSideTranslations(locale, ["common", "page-home"])),
    },
  };
};

export default LandingPage;
