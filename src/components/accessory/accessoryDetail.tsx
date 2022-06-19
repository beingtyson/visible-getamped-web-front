import Image from "next/image";
import { Element } from "react-scroll";
import { useRecoilState } from "recoil";

import Rating from "@components/common/rating";
import CommentList from "@components/comment";
import TopScrollButton from "@components/common/topScrollButton";

import { selectedItemAtom } from "@recoil/selectedItem";

const AccessoryDetail: React.FC = () => {
  const [selectedItem] = useRecoilState(selectedItemAtom);
  const {
    id,
    img,
    name,
    statImg,
    price,
    priceType,
    detailDescription,
    detailCommand,
    availableCharacter,
    averageRate,
  } = selectedItem;

  return (
    <>
      <Element name="accessoryDetail" />
      {id > 0 && (
        <div className="flex flex-col items-center mx-5 space-y-7 divide-y divide-inherit">
          <div>
            <span>{name}</span>
          </div>
          <div className="flex flex-row items-center space-x-7">
            <div>
              {img && <Image src={img} alt={name} width={32} height={32} />}
            </div>
            <div>
              {statImg && (
                <Image src={statImg} alt={name} width={102} height={71} />
              )}
            </div>
            <span>
              평점
              <Rating
                point={Math.round(averageRate)}
                disabled={true}
                size={"xs"}
              />
            </span>
            {price && (
              <span>
                가격 {priceType} {price}
              </span>
            )}
          </div>
          <div className="text-center whitespace-pre-line">
            {detailDescription}
          </div>
          <div className="grid grid-cols-6 gap-4 justify-items-center">
            {availableCharacter.map((character) => (
              <span key={character}>{character}</span>
            ))}
          </div>
          {detailCommand && (
            <div className="collapse text-center collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                기술표 보기
              </div>
              <div className="collapse-content">
                <div className="whitespace-pre-line">{detailCommand}</div>
              </div>
            </div>
          )}
          <CommentList />

          <div className="h-32" />
        </div>
      )}

      <TopScrollButton
        margin="right-10"
        targetId="accessoryDetail"
        containerId="detailContainer"
      />
    </>
  );
};

export default AccessoryDetail;
