import {solveBFS} from './algorithms/bfs';

const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

const createNode = (col, row) => {
    const node = document.createElement('div');
    node.className = 'node ';
    node.id = `node-${row}-${col}`;
    node.setAttribute('isWall', false);
    node.setAttribute('isStart', col === START_NODE_COL && row === START_NODE_ROW);
    node.setAttribute('isFinish', col === FINISH_NODE_COL && row === FINISH_NODE_ROW);
    const extraClassName = node.getAttribute('isFinish') == "true"
        ? 'node-finish'
        : node.getAttribute('isStart') == "true"
        ? 'node-start'
        : node.getAttribute('isWall') == "true"
        ? 'node-wall'
        : '';
    if(!((node.getAttribute('isStart') == "true") || (node.getAttribute('isFinish') == "true"))){
        node.addEventListener('mousedown', () => {
            node.setAttribute('isWall', node.getAttribute('isWall') != "true");
        })
    }
    node.className += extraClassName;
    return node;
    
}

//setting up the grid
const getInitialGrid = (() => {
    const grid = document.getElementById('grid');
    for (let row = 0; row < 20; row++) {
        const currentRow = document.createElement('div');
        currentRow.className = 'row';
        for (let col = 0; col < 50; col++) {
            currentRow.appendChild(createNode(col, row));
        }
        grid.appendChild(currentRow);
    }
})();

function reset(){
    return;
}