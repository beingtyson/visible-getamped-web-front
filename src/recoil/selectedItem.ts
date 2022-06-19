import { atom } from "recoil";

import { SELECTED_ITEM } from "src/recoilKeys";
import { AccessoryType } from "@types";

export const selectedItemAtom = atom<AccessoryType>({
  key: SELECTED_ITEM,
  default: {
    code: "",
    id: 0,
    img: "",
    statImg: "",
    name: "",
    price: "",
    priceType: "",
    detailDescription: "",
    detailCommand: "",
    availableCharacter: [""],
    averageRate: 0,
  },
});
