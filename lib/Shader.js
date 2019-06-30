class Shader {
    constructor(vsSource, fsSource) {

        utils.loadFiles([vsSource, fsSource], (shaders) => {
            const localProgram = gl.createProgram();
            const vertexShader = this.loadShader(gl.VERTEX_SHADER, shaders[0])
            const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, shaders[1])
            gl.attachShader(localProgram, vertexShader);
            gl.attachShader(localProgram, fragmentShader);
            gl.linkProgram(localProgram);
            if (!gl.getProgramParameter(localProgram, gl.LINK_STATUS)) {
                alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(localProgram));
                this.program = null;
            } else {
                this.program = localProgram;
            }
        })
    }


    loadShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    useShader() {
        gl.useProgram(this.program)
    }

    getPositionsLocation() {
        return gl.getAttribLocation(this.program, "in_pos");
    }
    getNormalsLocation() {
        return gl.getAttribLocation(this.program, "in_norm");
    }
    getUVsLocation() {
        return gl.getAttribLocation(this.program, "in_uv");
    }
    getMatrixLocation() {
        return gl.getUniformLocation(this.program, "pMatrix");
    }
    getNormalMatrixLocation() {
        return gl.getUniformLocation(this.program, "nMatrix");
    }
    getTextureLocation() {
        return gl.getUniformLocation(this.program, "u_texture");
    }
    getUniformLocation(locationName) {
        return gl.getUniformLocation(this.program, locationName);
    }
}


class SimpleShader extends Shader {
    constructor() {
        super("Shader/vsSimple.glsl", "Shader/fsLight.glsl");
        this.program.vertexPositionAttribute = gl.getAttribLocation(this.program, "in_pos");
        gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
        this.program.vertexNormalAttribute = gl.getAttribLocation(this.program, "in_norm");
        gl.enableVertexAttribArray(this.program.vertexNormalAttribute);
        this.program.textureCoordAttribute = gl.getAttribLocation(this.program, "in_uv");
        gl.enableVertexAttribArray(this.program.textureCoordAttribute);
        this.program.PmatrixUniform = gl.getUniformLocation(this.program, "pMatrix");
        this.program.NmatrixUniform = gl.getUniformLocation(this.program, "nMatrix");
        this.program.mColor = gl.getUniformLocation(this.program, "mColor");



        //this.program.textureUniform = gl.getUniformLocation(this.program, "u_texture");
        //this.program.lightDir = gl.getUniformLocation(this.program, "lightDir");
    }
}


class TextureShader extends Shader {
    constructor() {
        super("Shader/vsSimple.glsl", "Shader/fsTexture.glsl");
        this.program.vertexPositionAttribute = gl.getAttribLocation(this.program, "in_pos");
        gl.enableVertexAttribArray(this.program.vertexPositionAttribute);
        this.program.vertexNormalAttribute = gl.getAttribLocation(this.program, "in_norm");
        gl.enableVertexAttribArray(this.program.vertexNormalAttribute);
        this.program.textureCoordAttribute = gl.getAttribLocation(this.program, "in_uv");
        gl.enableVertexAttribArray(this.program.textureCoordAttribute);
        this.program.PmatrixUniform = gl.getUniformLocation(this.program, "pMatrix");
        this.program.NmatrixUniform = gl.getUniformLocation(this.program, "nMatrix");
        this.program.u_texture = gl.getUniformLocation(this.program, "u_texture");
        this.program.lightDir = gl.getUniformLocation(this.program, "lightDir");
    }
}
