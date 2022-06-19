import { atom } from "recoil";

import { ACCESSORY_FILTER } from "src/recoilKeys";
import { FILTER_KEY, FILTER_MAP } from "@constants";

interface FilterItemType {
  type: string;
  value: object;
}

export const filterItemAtom = atom<FilterItemType>({
  key: ACCESSORY_FILTER,
  default: { type: FILTER_KEY.RECENT, value: FILTER_MAP.RECENT },
});
