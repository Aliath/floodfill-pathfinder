import floodfill from './index';

const successEntries = [
  {
    matrix: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 4, y: 4 },
  },
  {
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 4, y: 4 },
  },
  {
    matrix: [
      [0, 0],
      [0, 0]
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 1, y: 1 },
  },
];

const failEntries = [
  {
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 1, 0],
    ],
    startPoint: { x: 0, y: 0 },
    endPoint: { x: 4, y: 4 },
  },
]

describe('floodfill', () => {
  it('is defined', () => {
    expect(floodfill).toBeDefined();
  });

  it('finds a paths for predefined matrixes', () => {
    successEntries.forEach(({ matrix, startPoint, endPoint }) => {
      let lastResult = null;

      for (let step of floodfill(matrix, startPoint, endPoint)) {
        lastResult = step.result;
      }

      expect(lastResult).not.toBe(null);
    });
  });

  it('does not find a paths for predefined matrixes', () => {
    failEntries.forEach(({ matrix, startPoint, endPoint }) => {
      let lastResult = null;

      for (let step of floodfill(matrix, startPoint, endPoint)) {
        lastResult = step.result;
      }

      expect(lastResult).toBe(null);
    });
  });

  it('takes correct steps', () => {
    const matrix = [
      [0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 0, 1],
      [0, 0, 0, 0, 0],
    ];
    const pathGenerator = floodfill(matrix, { x: 0, y: 0 }, { x: 4, y: 4 });

    let result = null;

    for (let step of pathGenerator) {
      result = step.result;
    }

    expect(result).not.toBe(null);
    
    result.forEach((step, index, array) => {
      const previousStep = array[index - 1];

      if (!previousStep) return;

      const stepDelta = Math.abs(step.x - previousStep.x) + Math.abs(step.y - previousStep.y);
      expect(stepDelta).toBe(1);
    })
  });

  it('avoids collisions', () => {
    const matrix = [
      [0, 1, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0],
      [0, 1, 1, 0, 1],
      [0, 0, 0, 0, 0],
    ];
    const pathGenerator = floodfill(matrix, { x: 0, y: 0 }, { x: 4, y: 4 });

    let result = null;

    for (let step of pathGenerator) {
      result = step.result;
    }

    expect(result).not.toBe(null);
    
    result.forEach((step) => {
      expect(matrix[step.y][step.x]).not.toBe(1);
    });
  });
});