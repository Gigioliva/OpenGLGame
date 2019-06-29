class Shader {
    constructor(vsSource, fsSource) {
        const vertexShader = this.loadShader(gl.VERTEX_SHADER, vsSource)
        const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, fsSource)

        const localProgram = gl.createProgram();
        gl.attachShader(localProgram, vertexShader);
        gl.attachShader(localProgram, fragmentShader);
        gl.linkProgram(localProgram);
        if (!gl.getProgramParameter(localProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(localProgram));
            this.localProgram = null;
        } else {
            this.localProgram = localProgram;
        }

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
        gl.useProgram(this.localProgram)
    }

    getPositionsLocation() {
        return gl.getAttribLocation(this.program, "inPosition");
    }
    getNormalsLocation() {
        return gl.getAttribLocation(this.program, "inNormal");
    }
    getUVsLocation() {
        return gl.getAttribLocation(this.program, "inUV");
    }
    getMatrixLocation() {
        return gl.getUniformLocation(this.program, "worldProjectionMatrix");
    }
    getWorldViewMatrixLocation() {
        return gl.getUniformLocation(this.program, "worldViewMatrix");
    }
    getNormalMatrixLocation() {
        return gl.getUniformLocation(this.program, "nMatrix");
    }
    getTextureLocation() {
        return gl.getUniformLocation(this.program, "uTexture");
    }
    getUniformLocation(locationName) {
        return gl.getUniformLocation(this.program, locationName);
    }
}
