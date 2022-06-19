import classNames from "classnames";

interface RatingProps {
  size?: string;
  point: number;
  disabled: boolean;
  setPoint?: (value: any) => void;
}
const Rating: React.FC<RatingProps> = ({
  size,
  point,
  disabled,
  setPoint = () => {},
}) => {
  const MAX_STAR = 5;
  return (
    <div
      className={classNames("rating", {
        "rating-xs": size === "xs",
      })}
    >
      <input
        readOnly
        type="radio"
        className="rating-hidden hidden"
        checked={point === 0}
      />
      {Array(MAX_STAR)
        .fill(null)
        .map((_, idx) => {
          return (
            <input
              key={idx}
              type="radio"
              value={idx + 1}
              className="mask mask-star-2 bg-orange-400"
              checked={idx + 1 === point}
              disabled={disabled}
              onChange={(e) => {
                setPoint(Number(e.target.value));
              }}
            />
          );
        })}
    </div>
  );
};

export default Rating;
