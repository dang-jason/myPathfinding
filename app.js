//import bfs from './algorithms/bfs';

const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

const createNode = (col, row) => {
    const node = document.createElement('div');
    node.classList.add('node');
    node.id = `node-${row}-${col}`;
    col === START_NODE_COL && row === START_NODE_ROW
        ? node.classList.add('node-start')
        : col === FINISH_NODE_COL && row === FINISH_NODE_ROW
        ? node.classList.add('node-finish')
        : ""
    if(!((node.classList.contains('node-start') || node.classList.contains('node-finish')))){
        node.addEventListener('mousedown', () => {
            node.classList.toggle('isWall');
        })
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

function solveBFS(){
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.add('node-visited');
    let queue = [[START_NODE_ROW, START_NODE_COL]];
    let visited = [];
    for(var i = 0; i<TOTAL_ROWS; i++) visited[i] = new Array(TOTAL_COLS).fill(false);
    let possibleMoves = [
        [-1,0],
        [1,0],
        [0,-1],
        [0,1]
    ];
    times = 0;
    while(queue.length){
        let pos = queue.shift();
        let r = pos[0];
        let c = pos[1];
        visited.push([r,c])
        let node = document.getElementById(`node-${r}-${c}`);
        if (node.classList.contains('node-finish'))
            break;

        for (let i = 0; i < possibleMoves.length; i++){
            let dx = possibleMoves[i][1]
            let dy = possibleMoves[i][0]
            let nRow = r+dy;
            let nCol = c+dx;

            if (nRow < 0 || nRow >= TOTAL_ROWS || nCol < 0 || nCol >= TOTAL_COLS){
                continue;
            }

            let nNode = document.getElementById(`node-${nRow}-${nCol}`);
            if(!(nNode.classList.contains('node-visited') || nNode.classList.contains('isWall'))){
                nNode.classList.add('node-visited');
                queue.push([nRow, nCol]);
            }

        }


    }



}

function reset(){
    let nodeList = document.querySelectorAll('.isWall');
    for (let j=0; j<nodeList.length; j++){
        nodeList[j].classList.toggle('isWall');
    }
    nodeList = document.querySelectorAll('.node-visited');
    for (let j=0; j<nodeList.length; j++){
        nodeList[j].classList.toggle('node-visited');
    }
}