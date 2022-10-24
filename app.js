import {solveBFS} from './algorithms/bfs.js';
var isMousePressed = false;
const TOTAL_ROWS = 20;
const TOTAL_COLS = 50;
var START_NODE_ROW = 10;
var START_NODE_COL = 10;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 40;
export {TOTAL_ROWS, TOTAL_COLS, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL}

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
    var page = document.querySelector('body');
    page.addEventListener('mouseup', () => {
        isMousePressed = false;
    });

    document.getElementById('solveBFS').addEventListener('click', () => {solveBFS()});
    document.getElementById('reset').addEventListener('click', () => {reset()});
    //add change to start and finish nodes using input values! - how to combine input into one element?
})();

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