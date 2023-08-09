class EllipticCurve {
    // A curve of the form y^2 = x^3 + bx + c (mod p)
    constructor(b, c, p) {
        if (typeof b !== 'number' || typeof c !== 'number' || typeof p !== 'number') {
            throw new Error('Parameters must be numbers.');
        }
        this.b = b % p;
        this.c = c % p;
        this.p = p;
        this.initPoints();
    }

    // Returns whether the inputed parameters for the curve
    // reduces to a singular curve, meaning the group structure
    // is not preserved
    isSingular() {
        return (4 * this.b * this.b * this.b + 27 * this.c * this.c) % this.p === 0;
    }

    // Method for adding two points on the elliptic curve
    // Returns an x-coordinate and y-coordinate
    add(pointA, pointB) {
        x1 = pointA[0];
        y1 = pointA[1];
        x2 = pointB[0];
        y2 = pointB[1];

        if (x1 === x2 && y1 === y2) {
            if (2 * y1 === 0) {
                return [Infinity, Infinity];
            }
            slope = ((3 * x1 * x1 + this.b) * this.modularInverse(2 * y1, this.p)) % this.p;
        }
        else {
            if (x1 === x2) {
                return [Infinity, Infinity];
            }
            slope = ((y2 - y1) * this.modularInverse(x2 - x1, this.p)) % this.p;
        }
        x3 = (slope * slope - x1 - x2) % this.p;
        y3 = (slope * (x1 - x3) - y1) % this.p;
        return {x3: x3, y3: y3};
    }

    // Extended Euclidean Algorithm used to find the modular inverse
    extendedEuclid(a, b) {
        if (a === 0) {
            return { gcd: b, x: 0, y: 1 };
        }
        ({ gcd, x: x1, y: y1 }) = this.extendedEuclid(b % a, a);
        return { gcd: gcd, x: y1 - Math.floor(b / a) * x1, y: x1 };
    }

    // Finds a^-1 (mod m)
    modularInverse(a, m) {
        ({ gcd, x }) = this.extendedEuclid(a, m);
        if (gcd !== 1) {
            throw new Error("Modular inverse does not exist.");
        }
        result = (x % m + m) % m;
        return result;
    }

    // Method to initiate all points along the elliptic curve
    initPoints()
}