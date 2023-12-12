/* eslint-disable react/no-unknown-property */
import { NotionAPI } from "notion-client";
import { Container, Flex, Text, Image } from "@chakra-ui/react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
import NotionPagesLinks from "constants/notion";
import { NextSeo } from "next-seo";
import { getPageTitle } from "notion-utils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import Hero from "components/sections/Hero";
import TweetEmbed from "react-tweet-embed";
import { Collection } from "react-notion-x/build/third-party/collection";
import Navbar from "@shm/components/sections/Navbar";

const Page = ({
  recordMap,
  notionPageDetails,
}: {
  recordMap: ExtendedRecordMap;
  notionPageDetails: any;
}) => {
  const Tweet = ({ id }: { id: string }) => {
    return <TweetEmbed tweetId={id} />;
  };
  const title = notionPageDetails.title || getPageTitle(recordMap);
  const canonical = "https://shardeum.org/101/";
  const description = notionPageDetails.description;
  const image = notionPageDetails.image;
  return (
    <>
      <Hero />
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        additionalMetaTags={[
          {
            property: "keywords",
            content: "shardeum,blockchain,layer1 blockchain,evm compatible blockchain",
          },
          {
            property: "twitter:image",
            content: image,
          },
        ]}
        openGraph={{
          title: title,
          type: "website",
          url: canonical,

          description: description,
          images: [
            {
              url: image,
              alt: "Shardeum Image",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "https://shardeum.org",
          handle: "@shardeum",
        }}
      />
      <Flex bg="brand.white" as="section">
        <Container
          maxW="container.xl"
          mx="auto"
          py={{ base: "9", md: "10" }}
          px={{ base: 6, xl: 0 }}
        >
          <Image src={image} mb={30} />
          <Text
            fontSize={{ base: "md", lg: "xl" }}
            textAlign="left"
            fontWeight="bold"
            lineHeight={{ base: "7", md: "8" }}
            color={"#37352f"}
            paddingLeft={{ base: "15", md: "7.9cm" }}
          >
            {title}
          </Text>

          <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            components={{ Collection, Tweet }}
          />
        </Container>
      </Flex>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  const notion = new NotionAPI();
  const pageId = "Shardeum-in-a-Nutshell";
  // console.log(NotionPagesLinks);
  let notionPageDetails = { slug: "", notionId: "", title: "", description: "", image: "" };
  for (const nPage of NotionPagesLinks) {
    // console.log(nPage);
    if (nPage.slug == pageId) notionPageDetails = nPage;
  }

  if (!notionPageDetails.notionId) {
    //Redirect to 404
    return {
      // returns the default 404 page with a status code of 404
      notFound: true,
    };
  }
  // const notionPageDetails = NotionPagesLinks[pageId];
  const recordMap = await notion.getPage(notionPageDetails.notionId);

  // console.log(recordMap);
  return {
    props: {
      recordMap,
      notionPageDetails,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 10, // In seconds
  };
}

export default Page;
