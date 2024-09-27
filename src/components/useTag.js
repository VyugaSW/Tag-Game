import React from "react";
import Tag from "./Tag";

export default function useTag(){
    const tagState = Tag.getInstance();

    const [state, setState] = React.useState(tagState.getState());
    const [isPaused, setIsPaused] = React.useState(false);

    function newGame () {
        tagState.startNewGame();
        setState(tagState.getState());
    }

    function undo () {
        tagState.undo();
        setState(tagState.getState());
    }

    function move (i) {
        return function () {
            if(!isPaused){
                tagState.moveTile(i);
                setState(tagState.getState());
            }
        }
    }

    React.useEffect(() => { setState(tagState.getState()); }, [tagState]); 

    return [(val) => {setIsPaused(val)}, state.seconds, state.board, state.moves, state.solved, newGame, undo, move];
}