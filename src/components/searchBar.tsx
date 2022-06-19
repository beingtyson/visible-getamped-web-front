import React from "react";
import { useRecoilState } from "recoil";

import { searchItemAtom } from "@recoil/searchItem";
import { filterItemAtom } from "@recoil/filterItem";

import { FILTER_KEY, FILTER_MAP } from "@constants";

const SearchBar: React.FC = () => {
  const [, setFilterItem] = useRecoilState(filterItemAtom);
  const [searchItem, setSearchItem] = useRecoilState(searchItemAtom);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (setSearchItem) {
      setSearchItem(`${e.target.value}`);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }
    if (searchItem) {
      return setFilterItem({
        type: FILTER_KEY.SEARCH,
        value: {
          where: {
            name: {
              contains: searchItem,
            },
          },
          ...(!searchItem && {
            orderBy: [
              {
                id: "desc",
              },
            ],
          }),
        },
      });
    }

    setFilterItem({
      type: FILTER_KEY.RECENT,
      value: FILTER_MAP[FILTER_KEY.RECENT],
    });
  };
  return (
    <div className="mx-8 my-5 ">
      <div className="flex flex-row space-x-10">
        <div className="basis-11/12">
          <label className="relative  block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="악세사리 검색"
              type="text"
              name="search"
              value={searchItem}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </label>
        </div>

        <div className="basis-1/12">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://open.kakao.com/o/sFipMIje"
          >
            <button className="flex flex-col btn">
              <span>1:1 문의</span>
              <span>후원 환영</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
