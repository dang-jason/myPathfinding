//import bfs from './algorithms/bfs';

const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

function setup(){
    setInitialGrid();
};

function setInitialGrid(){
    let grid = document.getElementById('grid');
    for (let row = 0; row < TOTAL_ROWS; row++) {
        let curRow = document.createElement('div');
        curRow.className='row';
        for (let col = 0; col < TOTAL_COLS; col++) {
            let node = document.createElement('div');
            node.className = 'node col'+ col + ' row'+row;
            node.id = 'col'+ col + ' row'+row;
            curRow.appendChild(node);
            if(col == START_NODE_COL && row == START_NODE_ROW)
                node.className += ' node-start';
            else if(col == FINISH_NODE_COL && row == FINISH_NODE_ROW)
                node.className += ' node-finish';
        }
        grid.appendChild(curRow);
    }
};

