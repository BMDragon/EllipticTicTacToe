import numpy as np

# E: y^2 = x^3 + bx + c (mod p)
p = 7
b = 1
c = 3

assert (4*b**3 + 27*c**2) % p != 0, 'Curve has a singularity'

# prepend with infinity
points = np.array([np.array([np.inf, np.inf])], dtype=object, ndmin=2)

squares = {}
def initSquares(prime):
    assert isinstance(prime, int), 'Parameter must be an integer'
    for i in range(prime):
        squares[i] = np.array([])

def calcSquares(prime):
    assert isinstance(prime, int), 'Parameter must be an integer'
    initSquares(prime)
    for i in range(prime):
        sq = i**2 % prime
        squares[sq] = np.append(squares[sq], i)

def calcPoints(b, c, prime, points):
    assert isinstance(prime, int) and isinstance(b, int) and isinstance(c, int), 'Parameters must be integers'
    for x in range(prime):
        ySquared = (x**3 + b*x + c) % prime
        for y in squares[ySquared]:
            points = np.append(points, np.array([np.array([int(x), int(y)])]), axis=0)
    points = points[1:]
    return points

def add(pointP, pointQ):
    x1 = pointP[0]
    x2 = pointQ[0]
    y1 = pointP[1]
    y2 = pointQ[1]
    if x1 == x2 and y1 == y2:
        if 2*y1 == 0:
            return np.array([np.inf, np.inf])
        slope = ((3*x1**2 + b) * pow(2*y1, -1, p)) % p
    else:
        if x1 == x2:
            return np.array([np.inf, np.inf])
        slope = ((y2-y1) * pow(x2-x1, -1, p)) % p
    x3 = (slope**2 - x1 - x2) % p
    y3 = (slope*(x1-x3) - y1) % p
    return np.array([x3, y3])

calcSquares(p)
points = calcPoints(b, c, p, points)
print(points)

lines = set({})
for i in range(len(points)):
    for j in range(i+1,len(points)):
        pointP = points[i]
        pointQ = points[j]
        pointR = add(pointP, pointQ)
        #print(str(pointP) + " + " + str(pointQ) + " = " + str(pointR))
        line = frozenset({tuple(pointP), tuple(pointQ), tuple(pointR)})
        lines.add(line)
print(lines)