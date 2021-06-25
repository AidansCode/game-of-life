function make2dArray(size1, size2) {
  let arr = new Array(size1);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(size2).map(() => 0);
    arr[i].fill(0);
  }
  return arr;
}

function nestedLoop(grid, callback) {
  for(let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      callback(x, y);
    }
  }
}

function generateRandomGrid(grid) {
  nestedLoop(grid, (x, y) => {
    grid[x][y] = random(0, 1) < .5 ? 0 : 1;
  });
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++) {
    for(let j = -1; j < 2; j++) {
      let realX = x + i;
      let realY = y + j;
      if (realX < 0 || realY < 0 || realX >= grid.length || realY >= grid[x].length) {
        continue;
      }

      sum += grid[x + i][y + j];
    }
  }

  sum -= grid[x][y];
  return sum;
}

function deepCopy(grid) {
  let newGrid = make2dArray(grid.length, grid[0].length);
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      newGrid[i][j] = grid[i][j];
    }
  }

  return newGrid;
}

function produceNextGeneration(grid) {
  let newGrid = deepCopy(grid);
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      let livingNeighbors = countNeighbors(grid, x, y);
      let isCellAlive = grid[x][y] === 1;

      if (!isCellAlive) {
        if (livingNeighbors === 3) {
          newGrid[x][y] = 1;
        }
      } else {
        if (livingNeighbors >= 4 || livingNeighbors <= 1) {
          newGrid[x][y] = 0;
        }
      }
    }
  }

  return newGrid;
}

function getCell(posX, posY, pixelsPerCell, gridSize) {
  const cellX = floor(posX / pixelsPerCell);
  const cellY = floor(posY / pixelsPerCell);

  if (cellX >= 0 && cellX <= gridSize && cellY >= 0 && cellY <= gridSize) {
    return [cellX, cellY];
  }
  return false;
}
