import classNames from "classnames";
import { useRecoilState } from "recoil";

import { searchItemAtom } from "@recoil/searchItem";
import { filterItemAtom } from "@recoil/filterItem";

import { FILTER_KEY, FILTER_MAP } from "@constants";

const FilterButtons: React.FC = () => {
  const [, setSearchItem] = useRecoilState(searchItemAtom);
  const [filterItem, setFilterItem] = useRecoilState(filterItemAtom);
  const filter = filterItem.type;

  const handleBtn = (type: string) => {
    setFilterItem({
      type,
      value: FILTER_MAP[type],
    });
    setSearchItem("");
  };

  const getBtnClassNames = (type: string) => {
    return {
      "btn-active": filter === type,
      "btn-outline": filter !== type,
    };
  };

  return (
    <div className="flex flex-row space-x-6 justify-center my-4">
      <button
        className={classNames("btn", getBtnClassNames(FILTER_KEY.RECENT))}
        onClick={() => handleBtn(FILTER_KEY.RECENT)}
      >
        최신순
      </button>
      <button
        className={classNames(
          "btn btn-warning",
          getBtnClassNames(FILTER_KEY.RATE)
        )}
        onClick={() => handleBtn(FILTER_KEY.RATE)}
      >
        평점순
      </button>
      <button
        className={classNames(
          "btn btn-primary",
          getBtnClassNames(FILTER_KEY.EPIC)
        )}
        onClick={() => handleBtn(FILTER_KEY.EPIC)}
      >
        에픽
      </button>
      {filter === FILTER_KEY.SEARCH && (
        <button
          className={classNames(
            "btn btn-error",
            getBtnClassNames(FILTER_KEY.SEARCH)
          )}
        >
          검색어
        </button>
      )}
    </div>
  );
};

export default FilterButtons;
