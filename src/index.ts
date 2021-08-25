type Bitmap = number[][];
type Point = { x: number; y: number };
type Path = Point[];
type Result = {
  result: Path | null;
  pathsToExecute: Path[];
};

const PointTypes = {
  ALLOWED: 0,
  DISALLOWED: 1,
};

export default function* floodfill(matrix: Bitmap, startPoint: Point, endPoint: Point) {
  const getPointIdentifier = (point: Point) => point.y * mapWidth + point.x;

  const mapWidth = matrix[0].length;
  const mapHeight = matrix.length;
  const receivedPoints = new Set<number>([getPointIdentifier(startPoint)])
  const endPointIdentifier = getPointIdentifier(endPoint);

  const getPointsAround = (anchor: Point) => {
    const { x, y } = anchor;
  
    return [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ].filter((point) => {
      const isPointWithinBitmap =
        point.x >= 0 && point.y >= 0 &&
        point.x < mapWidth && point.y < mapHeight;

        if (!isPointWithinBitmap) {
          return false;
        }
  
        const isPointCollision =
          matrix[point.y][point.x] === PointTypes.DISALLOWED;

        if (isPointCollision) {
          return false;
        }

        return true;
    });
  }

  let pathsToExecute: Path[] = [[startPoint]];

  while (true) {
    let noPathsToSeek = true;
    let result: Path | null = null;

    pathsToExecute = pathsToExecute.flatMap((path) => {
      const lastPathPoint = path[path.length - 1];
      const lastPointNeighbors = getPointsAround(lastPathPoint).filter((point) => {
        const pointIdentifier = getPointIdentifier(point);
        const isPointReceived = receivedPoints.has(pointIdentifier);

        if (isPointReceived) {
          return false;
        }

        receivedPoints.add(pointIdentifier);
        return true;
      });

      if (lastPointNeighbors.length > 0) {
        noPathsToSeek = false;
      }

      return lastPointNeighbors.map((point) => {
        const childPath = [...path, point];
        const pointIdentifier = getPointIdentifier(point);

        if (pointIdentifier === endPointIdentifier) {
          result = childPath;
        }

        return childPath;
      });
    });

    yield { result, pathsToExecute };

    if (result || noPathsToSeek) {
      return;
    }
  }
};