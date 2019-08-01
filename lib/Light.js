class Light {
    constructor(col, index) {
        this.col = new Vector4(col.x / 255, col.y / 255, col.z / 255, col.w / 255)
        this.index = index
    }

    setColor(col) {
        this.col = new Vector4(col.x / 255, col.y / 255, col.z / 255, col.w / 255)
    }

    bindShader(shader) {}
}


class DirectionalLight extends Light {
    constructor(col, dir, index) {
        super(col, index)
        this.dir = dir
        this.dir.normalize()
    }

    bindShader(shader) {
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightType`), 1.0, 0, 0, 0)
        gl.uniform3f(shader.getUniformLocation(`L${this.index}Dir`), this.dir.x, this.dir.y, this.dir.z)
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightColor`), this.col.x, this.col.y, this.col.z, this.col.w)
    }
}

class SportLight extends Light {
    constructor(col, pos, dir, decay, target, coneIn, coneOut, index) {
        super(col, index)
        this.pos = pos
        this.decay = decay
        this.target = target
        this.coneIn = coneIn
        this.coneOut = coneOut
        this.dir = dir
    }

    bindShader(shader) {
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightType`), 0, 0, 1, 0)
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightColor`), this.col.x, this.col.y, this.col.z, this.col.w)
        gl.uniform3f(shader.getUniformLocation(`L${this.index}Dir`), this.dir.x, this.dir.y, this.dir.z)
        gl.uniform3f(shader.getUniformLocation(`L${this.index}Pos`), this.pos.x, this.pos.y, this.pos.z)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}ConeOut`), this.coneOut)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}ConeIn`), this.coneIn)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}Decay`), this.decay)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}Target`), this.target)
    }
}

class PointLight extends Light {
    constructor(col, pos, decay, target, index) {
        super(col, index)
        this.pos = pos
        this.decay = decay
        this.target = target
    }

    bindShader(shader) {
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightType`), 0, 1, 0, 0)
        gl.uniform4f(shader.getUniformLocation(`L${this.index}lightColor`), this.col.x, this.col.y, this.col.z, this.col.w)
        gl.uniform3f(shader.getUniformLocation(`L${this.index}Pos`), this.pos.x, this.pos.y, this.pos.z)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}Decay`), this.decay)
        gl.uniform1f(shader.getUniformLocation(`L${this.index}Target`), this.target)
    }

}
