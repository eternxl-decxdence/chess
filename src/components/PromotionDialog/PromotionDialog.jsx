import "./PromotionDialog.scss";
import { defaultSquareNotation, returnPieceIconName } from "../../utils";
import PieceIcon from "../../assets/symbol-defs.svg";

export default function PromotionDialog({
  sideToMove,
  row,
  column,
  onClose,
  onPromotionSelect
}) {
  const figures = ["q", "b", "r", "n"];
  function handlePieceSelect(figure) {
    onPromotionSelect(defaultSquareNotation(column, row), figure);
    onClose();
  }
  return (
    <div className='promotion-dialog-overlay' onClick={onClose}>
      <div className='promotion-dialog'>
        {figures.map((figure) => (
          <div
            key={figure}
            className='piece-click'
            onClick={() => handlePieceSelect(figure)}
          >
            <svg className='icon'>
              <use
                href={`${PieceIcon}#${returnPieceIconName({
                  color: sideToMove,
                  type: figure
                })}`}
              ></use>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
