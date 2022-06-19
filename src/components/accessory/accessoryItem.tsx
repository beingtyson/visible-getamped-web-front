import Image from "next/image";
import classNames from "classnames";
import { scroller } from "react-scroll";
import { useRecoilState } from "recoil";

import Rating from "@components/common/rating";

import { selectedItemAtom } from "@recoil/selectedItem";

import { AccessoryType } from "@types";

interface AccessoryProps {
  accessoryItem: AccessoryType;
}

const AccessoryItem: React.FC<AccessoryProps> = ({ accessoryItem }) => {
  const [, setSelectedItem] = useRecoilState(selectedItemAtom);
  const { code, img, name, averageRate } = accessoryItem;
  const isEpicItem = code.includes("epic");
  return (
    <div
      className="flex flex-row items-start cursor-pointer"
      onClick={() => {
        scroller.scrollTo("accessoryDetail", {
          containerId: "detailContainer",
        });
        setSelectedItem(accessoryItem);
      }}
    >
      <div className="basis-1/4">
        <Image src={img} alt={name} width={32} height={32} />
      </div>
      <div className="basis-3/4 flex flex-col">
        <span
          className={classNames("text-sm", {
            "text-purple-600": isEpicItem,
            "font-bold": isEpicItem,
          })}
        >
          {name}
        </span>
        <Rating point={Math.round(averageRate)} disabled={true} size={"xs"} />
      </div>
    </div>
  );
};

export default AccessoryItem;
