//import bfs from './algorithms/bfs';
var isMousePressed = false;
const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;
var START_NODE_ROW = 10;
var START_NODE_COL = 10;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 40;

const createNode = (col, row) => {
    const node = document.createElement('div');
    node.classList.add('node');
    node.id = `node-${row}-${col}`;
    node.setAttribute('data-prevnode', null);
    col === START_NODE_COL && row === START_NODE_ROW
        ? node.classList.add('node-start')
        : col === FINISH_NODE_COL && row === FINISH_NODE_ROW
        ? node.classList.add('node-finish')
        : ""
    if(!((node.classList.contains('node-start') || node.classList.contains('node-finish')))){
        node.addEventListener('mousedown', () => {
            isMousePressed = true;
            node.classList.toggle('isWall');
        });
        node.addEventListener('mouseenter', () =>{
            if(isMousePressed){
                node.classList.toggle('isWall');
            }
        });
        node.addEventListener('mouseup', () =>{
            isMousePressed = false;
        });
    }
    return node;
}
//setting up the grid
const getInitialGrid = (() => {
    const grid = document.getElementById('grid');
    for (let row = 0; row < 20; row++) {
        const currentRow = document.createElement('div');
        currentRow.classList.add('row');
        for (let col = 0; col < 50; col++) {
            currentRow.appendChild(createNode(col, row));
        }
        grid.appendChild(currentRow);
    }
})();
//setting up visual aspects of grid and page
const setup = (() => {
    console.log('setup');
    const page = document.querySelector('body');
    page.addEventListener('mouseup', () => {
        isMousePressed = false;
    });
    //add change to start and finish nodes using input values! - how to combine input into one element?
})();

function solveBFS(){
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
    solved = false;


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
        let pathNode = document.getElementById(previous.pop());
        s += 10;
        setTimeout(() => {
            pathNode.classList.toggle('node-visited');
            pathNode.classList.add('node-path');
        }, 8*(s));
    }
}

function reset(){
    //clear timeoutIDs
    const highestId = setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
            clearInterval(i);
        }
    }, 0);
    //reset all walls
    let nodeList = document.querySelectorAll('.isWall');
    for (let j=0; j<nodeList.length; j++){
        nodeList[j].classList.toggle('isWall');
    }
    //clear searched nodes
    nodeList = document.querySelectorAll('.node-visited');
    for (let j=0; j<nodeList.length; j++){
        nodeList[j].classList.toggle('node-visited');
    }
    //clear shortest path
    nodeList = document.querySelectorAll('.node-path');
    for (let j=0; j<nodeList.length; j++){
        nodeList[j].classList.toggle('node-path');
    }

}