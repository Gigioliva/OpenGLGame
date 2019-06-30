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
