const GRID_SIZE = 20;

const canvas = document.querySelector('canvas');
const startButton = document.getElementById('start-button');
const resetColsButton = document.getElementById('reset-cols-button');
const resetResultButton = document.getElementById('reset-result-button');
const context = canvas.getContext('2d', { alpha: false });
const PointTypes = {
  ALLOWED: 0,
  DISALLOWED: 1,
  START: 2,
  END: 3,
};

let matrix = [[2,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1],[0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1],[0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1],[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0],[0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3]];
let hoveredPoint = null;
let mouseClicked = false;
let shiftClicked = false;
let pathsToExecute = [];
let isFinding = false;

const gridWidth = Math.ceil(canvas.width / GRID_SIZE);
const gridHeight = Math.ceil(canvas.height / GRID_SIZE);

const resetMatrix = () => {
  matrix = new Array(gridHeight)
    .fill(null)
    .map(() => {
      return new Array(gridWidth).fill(PointTypes.ALLOWED);
    })

  matrix[0][0] = PointTypes.START;
  matrix[gridHeight - 1][gridWidth - 1] = PointTypes.END;
};

const render = () => {
  requestAnimationFrame(render);

  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);


  pathsToExecute.forEach((path, index, array) => {
    const progress = (index + 1) / Math.max(1, array.length);
    context.fillStyle = `rgba(0, 256, 0, ${progress})`;

    path.forEach((point) => {
      context.fillRect(point.x * GRID_SIZE, point.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
  });

  matrix.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      switch (col) {
        case PointTypes.DISALLOWED:
          context.fillStyle = 'red';
          break;
        case PointTypes.START:
        case PointTypes.END:
          context.fillStyle = 'purple';
          break;
        
        default:
          return;
      }

      context.fillRect(colIndex * GRID_SIZE, rowIndex * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });
  });

  if (hoveredPoint) {
    context.fillStyle = 'rgba(0, 0, 0, .25)';
    context.fillRect(hoveredPoint.x * GRID_SIZE, hoveredPoint.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
};

requestAnimationFrame(render);

canvas.addEventListener('mousemove', (event) => {
  const { offsetX: x, offsetY: y } = event;

  const gridX = Math.min(Math.max(0, Math.floor(x / GRID_SIZE)), gridWidth - 1);
  const gridY = Math.min(Math.max(0, Math.floor(y / GRID_SIZE)), gridHeight - 1);

  hoveredPoint = { x: gridX, y: gridY };

  if (mouseClicked) {
    if (
      (hoveredPoint.y === 0 && hoveredPoint.x === 0) ||
      (hoveredPoint.y === gridHeight - 1 && hoveredPoint.x === gridWidth - 1) ||
      isFinding
    ) {
      return;
    }

    matrix[hoveredPoint.y][hoveredPoint.x] = shiftClicked ? PointTypes.ALLOWED :PointTypes.DISALLOWED;
  }
});

canvas.addEventListener('mouseout', () => { hoveredPoint = null; });

addEventListener('mousedown', ({ target }) => {
  if (target !== canvas) return;

  mouseClicked = true;

  if (hoveredPoint) {
    if (
      (hoveredPoint.y === 0 && hoveredPoint.x === 0) ||
      (hoveredPoint.y === gridHeight - 1 && hoveredPoint.x === gridWidth - 1) ||
      isFinding
    ) {
      return;
    }
    
    matrix[hoveredPoint.y][hoveredPoint.x] = shiftClicked ? PointTypes.ALLOWED :PointTypes.DISALLOWED;
  }
});

addEventListener('mouseup', () => {
  mouseClicked = false;
});

addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    shiftClicked = true;
  }
});

addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    shiftClicked = false;
  }
});

const delay = (timeInMs) => new Promise(resolve => setTimeout(resolve, timeInMs));

startButton.addEventListener('click', async () => {
  const startPoint = { x: 0, y: 0 };
  const endPoint = { x: gridWidth - 1, y: gridHeight - 1 };
  const pathGenerator = floodfillPathfinder(matrix, startPoint, endPoint);

  startButton.disabled = true;
  startButton.textContent = 'finding...';

  let laststep = null;
  isFinding = true;

  for (const step of pathGenerator) {
    pathsToExecute = step.pathsToExecute;
    laststep = step;

    await delay(1000 / 45);
  }

  if (laststep.result === null) {
    alert('Cannot find a path, sorry :(');
  } else {
    pathsToExecute = [laststep.result];
  }

  isFinding = false;

  startButton.disabled = false;
  startButton.textContent = 'find path';
});

resetColsButton.addEventListener('click', () => {
  if (isFinding) { return }

  resetMatrix();
});

resetResultButton.addEventListener('click', () => {
  if (isFinding) { return }

  pathsToExecute = [];
})