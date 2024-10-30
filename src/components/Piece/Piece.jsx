import { WHITE } from "chess.js";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { returnPieceIconName } from "../../utils/js/utils";

import "./Piece.scss";
import Spritesheet from "../../assets/symbol-defs.svg";

export default function Piece({ pieceData , draggable}) {
  const {attributes, listeners, setNodeRef, transform } = useDraggable({
    id: pieceData.square,
    data: pieceData
  });
  const styleTransform = {
    transform: CSS.Translate.toString(transform),
    zIndex: 1000
  }

  const draggablePiece = 
  <span ref={setNodeRef} 
        style={styleTransform} 
        {...listeners} 
        {...attributes} 
        className='piece-icon-box'>
    <svg className={`piece${pieceData.color == WHITE ? "-white" : "-black"}`}>
      <use href={`${Spritesheet}#${returnPieceIconName(pieceData)}`} />
    </svg>
  </span>;

  const nonDraggablePiece = 
  <span ref={setNodeRef} 
        style={styleTransform} 
        {...listeners} 
        {...attributes} 
        className='piece-icon-box'>
    <svg className={`piece${pieceData.color == WHITE ? "-white" : "-black"}`}>
      <use href={`${Spritesheet}#${returnPieceIconName(pieceData)}`} />
    </svg>
  </span>;
  return (
    <>
      {draggable==true ? draggablePiece : nonDraggablePiece }
    </>
  );
}
