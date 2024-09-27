import Timer from "./Timer";
import useTag from "./useTag";
import Tile from './Tile';
import { useState } from "react";

export default function App () {
  const [setIsPaused, seconds, board, moves, solved, newGame, undo, move] = useTag();
  
  return (
    <div className='game-container'>
      <div className='game-header'>
        <div className='moves'>
          {moves}
        </div>
        <button className='big-button' onClick={undo}> UNDO </button>
        <Timer startRightAway={true} setIsPaused={(val) => {setIsPaused(val)}} stopRightNow={solved}/>
      </div>
      <div className='board'>
      {
        board.slice(0,-1).map((pos, index) => ( 
          <Tile index={index} pos={pos} onClick={move(index)} />
        ))
      }
      { solved &&
          <div className='overlay'>
            <button className='big-button' onClick={newGame}>
              PLAY AGAIN 
            </button>
          </div>
      }
      </div>
    </div>
  );
}
