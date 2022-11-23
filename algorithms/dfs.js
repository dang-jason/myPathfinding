import {TOTAL_ROWS, TOTAL_COLS, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL} from "../app.js";
import {reset} from '../app.js';


export function solveDFS(){
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.add('node-visited');
    let queue = [[START_NODE_ROW, START_NODE_COL]];
    let visited = [];
    for(let i = 0; i<TOTAL_ROWS; i++) visited[i] = new Array(TOTAL_COLS).fill(false);
    visited[START_NODE_ROW][START_NODE_COL] = true;
    let possibleMoves = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];
    let s = 0;
    let solved = false;


    while(queue.length){
        let pos = queue.shift();
        let r = pos[0];
        let c = pos[1];
        let node = document.getElementById(`node-${r}-${c}`);
        if (node.classList.contains('node-finish')){    
            solved = true;
            break;
        }
        for (let i = 0; i < possibleMoves.length; i++){
            let nRow = r+possibleMoves[i][0];
            let nCol = c+possibleMoves[i][1];
            if (nRow < 0 || nRow >= TOTAL_ROWS || nCol < 0 || nCol >= TOTAL_COLS || visited[nRow][nCol]){
                continue;
            }
            visited[nRow][nCol] = true;
            let nNode = document.getElementById(`node-${nRow}-${nCol}`);
            if(!(nNode.classList.contains('node-visited') || nNode.classList.contains('isWall'))){
                nNode.dataset.prevnode = `node-${r}-${c}`;
                s++;
                queue.push([nRow, nCol]);
                setTimeout(() => {
                    nNode.classList.add('node-visited');
                }, 8*s);
            }
        }
    }


    if(!solved){
        for(let i = 1; i <= 5; i++){
            if (s < 200 * i){
                setTimeout( () => {
                    alert('Path to end cannot be found! I will restart this for you.')
                    reset();
                }, (22-(2.5*i))*s);
                return;
            }

        }
    }

    //put the previous node into an array to traceback the shortest path
    let previous = [`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`];
    let curNode = document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
    while(curNode.dataset.prevnode != "null"){
        previous.push(curNode.dataset.prevnode);
        curNode = document.getElementById(curNode.dataset.prevnode);
    }
    while(previous.length){
        let pathNode = document.getElementById(previous.shift());
        s += 10;
        setTimeout(() => {
            pathNode.classList.toggle('node-visited');
            pathNode.classList.add('node-path');
        }, 8*(s));
    }
}
