import classNames from "classnames";
import { scroller } from "react-scroll";

interface TopScrollButtonProps {
  margin: string;
  targetId: string;
  containerId: string;
}

const TopScrollButton: React.FC<TopScrollButtonProps> = ({
  margin,
  targetId,
  containerId,
}) => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    scroller.scrollTo(targetId, {
      duration: 400,
      delay: 0,
      smooth: "easeInOutQuart",
      containerId,
    });
  };
  return (
    <button
      onClick={handleScrollToTop}
      x-data="topBtn"
      className={classNames(
        "fixed z-10 p-3 bg-gray-100 rounded-full shadow-md bottom-10 animate-bounce",
        {
          [margin]: margin ? true : false,
        }
      )}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  );
};

export default TopScrollButton;
