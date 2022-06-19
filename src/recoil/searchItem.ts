import { atom } from "recoil";

import { SEARCH_ITEM } from "src/recoilKeys";

export const searchItemAtom = atom<string>({
  key: SEARCH_ITEM,
  default: "",
});
