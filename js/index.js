const sizePerCell = 15;
const cellsPerRow = 60;
const gridSize = sizePerCell * cellsPerRow;
let grid = null;
let draggedSquares = null;

function setup() {
  grid = make2dArray(cellsPerRow, cellsPerRow);
  draggedSquares = make2dArray(cellsPerRow, cellsPerRow);

  createCanvas(gridSize, gridSize);
  frameRate(10);
  noLoop();
  redraw();
}

function draw() {
  background(0, 0, 0);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      fill(grid[i][j] === 1 ? 'black' : 'white');
      square(i*sizePerCell, j*sizePerCell, sizePerCell);
    }
  }

  if (isLooping()) {
    grid = produceNextGeneration(grid);
  }
}

function handleClick(cellX, cellY) {
  if (draggedSquares[cellX][cellY]) {
    return;
  }

  draggedSquares[cellX][cellY] = true;
  grid[cellX][cellY] = grid[cellX][cellY] ? 0 : 1;
  redraw();
}

function mousePressed() {
  if (isLooping()) return;
  const cell = getCell(mouseX, mouseY, sizePerCell, cellsPerRow);
  if (cell !== false) {
    handleClick(cell[0], cell[1]);
    return false;
  }
}

function mouseDragged() {
  if (isLooping()) return;
  const cell = getCell(mouseX, mouseY, sizePerCell, cellsPerRow);
  if (cell !== false) {
    handleClick(cell[0], cell[1]);
    return false;
  }
}

function mouseReleased() {
  if (isLooping()) return;
  const cell = getCell(mouseX, mouseY, sizePerCell, cellsPerRow);
  if (cell !== false) {
    draggedSquares = make2dArray(cellsPerRow, cellsPerRow);
    return false;
  }
}


document.getElementById('play-random').addEventListener('click', function() {
  generateRandomGrid(grid);
  loop();
});

document.getElementById('play-current').addEventListener('click', function() {
  loop();
});

document.getElementById('stop').addEventListener('click', function() {
  noLoop();
});

document.getElementById('clear-grid').addEventListener('click', function() {
  grid = make2dArray(cellsPerRow, cellsPerRow);
  noLoop();
  redraw();
});
