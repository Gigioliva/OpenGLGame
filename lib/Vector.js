class Vector3 {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    set(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    magnitude() {
        const x2 = this.x * this.x
        const y2 = this.y * this.y
        const z2 = this.z * this.z
        return Math.sqrt(x2 + y2 + z2)
    }

    normalize() {
        const magnitude = this.magnitude()
        this.x = this.x / magnitude
        this.y = this.y / magnitude
        this.z = this.z / magnitude
    }

    static crossProd(a, b) {
        /*var x = a.y * b.z - a.z * b.y
        var y = a.x * b.z - a.z * b.x
        var z = a.x * b.y - a.y * b.x
        return new Vector3(x, y, z)*/
        return math.cross([a.x, a.y, a.z], [b.x, b.y, b.z])
    }

    static dotProd(a, b) {
        return math.dot([a.x, a.y, a.z], [b.x, b.y, b.z])
    }
}

class Vector4 {
    constructor(x, y, z, w) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    set(x, y, z, w) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    magnitude() {
        const x2 = this.x * this.x
        const y2 = this.y * this.y
        const z2 = this.z * this.z
        const w2 = this.w * this.w
        return Math.sqrt(x2 + y2 + z2 + w2)
    }

    normalize() {
        const magnitude = this.magnitude()
        this.x = this.x / magnitude
        this.y = this.y / magnitude
        this.z = this.z / magnitude
        this.w = this.w / magnitude
    }
}
