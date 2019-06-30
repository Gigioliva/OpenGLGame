class Light {
    constructor(col) {
        this.col = new Vector4(col.x / 255, col.y / 255, col.z / 255, col.w / 255)
    }

    setColor(col) {
        this.col = new Vector4(col.x / 255, col.y / 255, col.z / 255, col.w / 255)
    }

    bindShader(shader) {}
}


class DirectionalLight extends Light {
    constructor(col, dir) {
        super(col)
        this.dir = dir
        this.dir.normalize()
    }

    bindShader(shader) {
        gl.uniform3f(shader.getUniformLocation("eyePos"), camera.pos.x, camera.pos.y, camera.pos.z)
        gl.uniform4f(shader.getUniformLocation("LAlightType"), 1.0, 0, 0, 0)
        gl.uniform3f(shader.getUniformLocation("LADir"), this.dir.x, this.dir.y, this.dir.z)
        gl.uniform4f(shader.getUniformLocation("LAlightColor"), this.col.x, this.col.y, this.col.z, this.col.w)

        gl.uniform3f(shader.getUniformLocation("LAPos"), 0, 0, 0)
        gl.uniform1f(shader.getUniformLocation("LAConeOut"), 0)
        gl.uniform1f(shader.getUniformLocation("LAConeIn"), 45)
        gl.uniform1f(shader.getUniformLocation("LADecay"), 0.0)
        gl.uniform1f(shader.getUniformLocation("LATarget"), 1.0)

        gl.uniform4f(shader.getUniformLocation("ambientType"), 0, 0, 0, 0)
        gl.uniform4f(shader.getUniformLocation("diffuseType"), 0, 0, 0, 0)
        gl.uniform4f(shader.getUniformLocation("specularType"), 0, 0, 0, 0)
        gl.uniform4f(shader.getUniformLocation("emissionType"), 1, 0, 0, 0)
        gl.uniform4f(shader.getUniformLocation("emitColor"), 1.0, 0.0, 0.0, 0.0)

    }
}


/*

uniform vec4 ambientType;
uniform vec4 diffuseType;
uniform vec4 specularType;
uniform vec4 emissionType;

*/

class SportLight extends Light {
    constructor(col, pos, decay) {
        super(col)
        this.pos = pos
        this.decay = dacay
    }
}

class PointLight extends Light {
    constructor(col, pos, dir, decay) {
        super(col)
        this.pos = pos
        this.decay = dacay
        this.dir = dir
    }
}
