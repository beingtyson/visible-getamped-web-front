import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useAccessories } from "@api/useAccessory";
import { useInView } from "react-intersection-observer";
import { Element } from "react-scroll";

import AccessoryItem from "@components/accessory/accessoryItem";
import TopScrollButton from "@components/common/topScrollButton";
import LoadingIndicator from "@components/common/loadingIndicator";

import { filterItemAtom } from "@recoil/filterItem";

import { AccessoryType } from "@types";

interface PageAccessoryProps {
  accessories: Array<AccessoryType>;
}

const AccessoryList: React.FC = () => {
  const [visibleRef, inView] = useInView();
  const [filterItem] = useRecoilState(filterItemAtom);
  const {
    data = { pages: [] },
    hasNextPage,
    isFetching,
    isFetched,
    isFetchingNextPage,
    fetchNextPage,
  } = useAccessories({ filterData: filterItem.value });

  const { pages = [] } = data;
  const isEmptyPage = isFetched && pages[0].accessories.length === 0;

  useEffect(() => {
    if (!isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <Element name="accessoryList">
      <div className="flex mx-auto px-6 py-8 ">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-4 gap-4">
            {pages.map(({ accessories }: PageAccessoryProps) => {
              return accessories.map((accessoryItem: AccessoryType) => (
                <AccessoryItem
                  key={accessoryItem.id}
                  accessoryItem={accessoryItem}
                />
              ));
            })}
            {isFetched && hasNextPage && <div ref={visibleRef} />}
          </div>
          {(isFetching || isFetchingNextPage) && <LoadingIndicator />}
          {isEmptyPage && "검색된 악세사리가 없습니다."}
        </div>
        <TopScrollButton
          margin="left-10"
          targetId="accessoryList"
          containerId="mainContainer"
        />
      </div>
    </Element>
  );
};

export default AccessoryList;
