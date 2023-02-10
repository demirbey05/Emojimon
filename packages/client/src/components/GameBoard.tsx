import { useComponentValueStream } from "@latticexyz/std-client";
import { useMUD } from "../MUDContext";
import { useEffect } from "react";

export const GameBoard = () => {

    const rows = new Array(10).fill(0).map((_, i) => i);
    const columns = new Array(10).fill(0).map((_, i) => i);

    const {
        components:{Position},
        systems,
        playerEntity,
    } = useMUD();


    // Getting value from the contract with entityID
    const playerPosition = useComponentValueStream(Position,playerEntity);



    useEffect(()=> {
        const moveTo = async (x:number,y:number)=>{
            const tx = await systems["system.Move"].executeTyped({x,y});
            await tx.wait();
        };

        const moveBy = async (deltaX:number,deltaY:number) => {
            if(!playerPosition){
                console.warn(
                    "cannot moveBy without a player position, not yet spawned?"
                  );
                  return;

            }
            await moveTo(playerPosition.x + deltaX, playerPosition.y + deltaY);
        }

        const listener = (e:KeyboardEvent) => {
            switch(e.key){
                case "ArrowUp":
                    moveBy(0,-1);
                    break;
                case "ArrowDown":
                    moveBy(0,1);
                    break;
                case "ArrowLeft":
                    moveBy(-1,0);
                    break;
                case "ArrowRight":
                    moveBy(1,0);
                    break;
            }
        };

        window.addEventListener("keydown",listener);
        return () => window.removeEventListener("keydown",listener);
    },[playerPosition,systems])

    return(
        <div className = "inline-grid p-2 bg-lime-500">
            {
                rows.map((y)=>{
                    return columns.map((x)=>{
                        return <div
                           key= {`${x},${y}`}
                           className= "w-8 h-8"
                           style = {{
                            gridColumn : x+1,
                            gridRow : y+1,
                           }}
                           onClick={(event) => {
                            event.preventDefault();
                            systems["system.Move"].executeTyped({ x, y });
                          }}
                           >
                            {playerPosition?.x === x && playerPosition?.y === y  ? <>🤠</> : null}
                           </div>
                        })	
                })
            }
        </div>
    );


}