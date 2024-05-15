import React, {useState} from "react";
import Box from "./Box";
import "./Grid.css"

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Grid = ({ncols = 3, nrows=3, lightOnChance = 0.2}) => {
    const [grid,setGrid] = useState(createGrid());
/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
   

    function createGrid() {
        let initialGrid = [];
         // TODO: create array-of-arrays of true/false values
         for(let rows = 0; rows < nrows; rows++){
            let gridArray = [];
            for(let cols = 0; cols < ncols; cols++){
                if(Math.random() < lightOnChance){
                  gridArray.push(false)
                }
                else{
                  gridArray.push(true)
                }
                }
                initialGrid.push(gridArray)
            }
            
            return initialGrid
          }
             

    function hasWon(){
      const isOff = (val) => val === false;
        return grid.every(isOff);
    }
 

    function flipBoxesAround(coord){
        setGrid(oldGrid => {
            const [y,x] = coord.split("-").map(Number);

            const flipCell = (y,x, gridCopy) => {

                if(x >= 0 && x < ncols && y >= 0 && y < nrows){
                    gridCopy[y][x] = !gridCopy[y][x];
                }
            };
     


        const gridCopy = oldGrid.map(row => [...row]);

        flipCell(y,x, gridCopy)
        flipCell(y + 1,x, gridCopy)
        flipCell(y,x + 1, gridCopy)
        flipCell(y - 1,x, gridCopy)
        flipCell(y,x - 1, gridCopy)


      return gridCopy;

    });

}

   
  // make table board
       let tableGrid = [];

       for(let y = 0; y < nrows;y++){
          let row = [];
            for(let x=0; x < ncols; x++){
              let coord = `${y}-${x}`;
              row.push(<Box 
                key={coord}
                flipBoxesAroundMe={e => flipBoxesAround(coord)}
                lightOn = {grid[y][x]}
                />,
              );

            }
        tableGrid.push(<tr key={y}>{row}</tr>);
       }
    return (
        <>
        {hasWon() ? <div>You Won!</div> :
          <table className="Grid">
        <tbody>{tableGrid}</tbody>
        </table>}
        </>
      
    );
}

export default Grid;