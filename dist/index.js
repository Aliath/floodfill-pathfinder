(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.floodfillPathfinder = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    var PointTypes = {
        ALLOWED: 0,
        DISALLOWED: 1,
    };
    function floodfill(matrix, startPoint, endPoint) {
        var getPointIdentifier, mapWidth, mapHeight, receivedPoints, endPointIdentifier, getPointsAround, pathsToExecute, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getPointIdentifier = function (point) { return point.y * mapWidth + point.x; };
                    mapWidth = matrix[0].length;
                    mapHeight = matrix.length;
                    receivedPoints = new Set([getPointIdentifier(startPoint)]);
                    endPointIdentifier = getPointIdentifier(endPoint);
                    getPointsAround = function (anchor) {
                        var x = anchor.x, y = anchor.y;
                        return [
                            { x: x - 1, y: y },
                            { x: x + 1, y: y },
                            { x: x, y: y - 1 },
                            { x: x, y: y + 1 },
                        ].filter(function (point) {
                            var isPointWithinBitmap = point.x >= 0 && point.y >= 0 &&
                                point.x < mapWidth && point.y < mapHeight;
                            if (!isPointWithinBitmap) {
                                return false;
                            }
                            var isPointCollision = matrix[point.y][point.x] === PointTypes.DISALLOWED;
                            if (isPointCollision) {
                                return false;
                            }
                            return true;
                        });
                    };
                    pathsToExecute = [[startPoint]];
                    _loop_1 = function () {
                        var noPathsToSeek, result;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    noPathsToSeek = true;
                                    result = null;
                                    pathsToExecute = pathsToExecute.flatMap(function (path) {
                                        var lastPathPoint = path[path.length - 1];
                                        var lastPointNeighbors = getPointsAround(lastPathPoint).filter(function (point) {
                                            var pointIdentifier = getPointIdentifier(point);
                                            var isPointReceived = receivedPoints.has(pointIdentifier);
                                            if (isPointReceived) {
                                                return false;
                                            }
                                            receivedPoints.add(pointIdentifier);
                                            return true;
                                        });
                                        if (lastPointNeighbors.length > 0) {
                                            noPathsToSeek = false;
                                        }
                                        return lastPointNeighbors.map(function (point) {
                                            var childPath = __spreadArray(__spreadArray([], path), [point]);
                                            var pointIdentifier = getPointIdentifier(point);
                                            if (pointIdentifier === endPointIdentifier) {
                                                result = childPath;
                                            }
                                            return childPath;
                                        });
                                    });
                                    return [4 /*yield*/, { result: result, pathsToExecute: pathsToExecute }];
                                case 1:
                                    _b.sent();
                                    if (result || noPathsToSeek) {
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    }

    return floodfill;

})));
