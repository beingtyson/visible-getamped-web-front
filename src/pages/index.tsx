import Head from "next/head";

import { GetStaticProps } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { Adsense } from "@ctrl/react-adsense";

import SearchBar from "@components/searchBar";
import AccessoryList from "@components/accessory";
import FilterButtons from "@components/filterButtons";
import AccessoryDetail from "@components/accessory/accessoryDetail";

import { fetchAccessories } from "@api/useAccessory";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <main>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Head>
            <title>겟앰프드 악세사리 도감</title>
            <meta name="description" content="겟앰프드 악세사리 도감" />
            <meta name="type" content="website" />
            <meta name="url" content="https://getamped-dictionary.com/" />
            <meta
              name="image"
              content="https://d1376avrctz390.cloudfront.net/meta_img.jpg"
            />
            <link rel="icon" href="/favicon.ico" />
            {/* <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9473682880293101"
            ></script> */}
          </Head>

          <div className="flex h-full">
            <div className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-hidden mb-14">
              <SearchBar />
              <FilterButtons />
              <div className="grid grid-cols-10 divide-x h-screen overflow-y-hidden">
                <div id="mainContainer" className="col-span-5  overflow-y-auto">
                  <AccessoryList />
                </div>
                <div
                  id="detailContainer"
                  className="col-span-4 overflow-y-scroll"
                >
                  <AccessoryDetail />
                </div>
                <div className="col-span-1">
                  {/* <Adsense
                    client="ca-pub-9473682880293101"
                    slot="5917002432"
                    style={{ width: 150, height: 500 }}
                    format="auto"
                  /> */}
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-9473682880293101"
                    data-ad-slot="5917002432"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  ></ins>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("accessories", () =>
    fetchAccessories({ filterData: { orderBy: [{ id: "desc" }] } })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
