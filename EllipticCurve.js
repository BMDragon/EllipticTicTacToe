class EllipticCurve {
    // A curve of the form y^2 = x^3 + bx + c (mod p)
    constructor(b, c, p) {
        if (typeof b !== 'number' || typeof c !== 'number' || typeof p !== 'number') {
            throw new Error('Parameters must be numbers.');
        }
        this.b = b % p;
        this.c = c % p;
        this.p = p;
    }

    isSingular() {
        return (4 * b * b * b + 27 * c * c) % p === 0;
    }

    add(pointA, pointB) {
        x1 = pointA[0];
        y1 = pointA[1];
        x2 = pointB[0];
        y2 = pointB[1];

        if (x1 === x2 && y1 === y2) {
            if (2 * y1 === 0) {
                return [Infinity, Infinity];
            }
            slope = ((3 * x1 * x1 + b) * modularInverse(2 * y1, p)) % p;
        }
        else {
            if (x1 === x2) {
                return [Infinity, Infinity];
            }
            slope = ((y2 - y1) * modularInverse(x2 - x1, p)) % p;
        }
        x3 = (slope * slope - x1 - x2) % p;
        y3 = (slope * (x1 - x3) - y1) % p;
        return {x3: x3, y3: y3};
    }

    extendedEuclideanAlgorithm(a, b) {
        if (a === 0) {
            return { gcd: b, x: 0, y: 1 };
        }
        ({ gcd, x: x1, y: y1 }) = extendedEuclideanAlgorithm(b % a, a);
        return { gcd: gcd, x: y1 - Math.floor(b / a) * x1, y: x1 };
    }

    modularInverse(a, m) {
        ({ gcd, x }) = extendedEuclideanAlgorithm(a, m);
        if (gcd !== 1) {
            throw new Error("Modular inverse does not exist.");
        }
        result = (x % m + m) % m;
        return result;
    }
}