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
                /*gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "inPosition"));
                gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "inNormal"));
                gl.enableVertexAttribArray(gl.getAttribLocation(this.program, "inUV"));
                program.textureUniform = gl.getUniformLocation(program, "u_texture");*/
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
