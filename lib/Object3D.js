class Object3D {
    constructor(mesh, texture, vertexs, fragments) {
        this.tx = 0
        this.ty = 0
        this.tz = -20.0
        this.alpha = 0
        this.beta = 0
        this.gamma = 0
        this.scale = 1
        var vs = vertexs ? vertexs : "Shader/vsSimple.glsl"
        var fs = fragments ? fragments : "Shader/fsSimple.glsl"

        this.shader = new Shader(vs, fs)
        this.shader.useShader()
        this.mesh = new OBJ.Mesh(mesh);

        this.tex = new Image();
        this.tex.txNum = 0;
        this.tex.onload = textureLoaderCallback;
        this.tex.src = texture;

        this.setup()
    }

    setup() {
        //this.shader.useShader()
        var program = this.shader.program

        program.vertexPositionAttribute = gl.getAttribLocation(program, "in_pos");
        gl.enableVertexAttribArray(program.vertexPositionAttribute);

        program.vertexNormalAttribute = gl.getAttribLocation(program, "in_norm");
        gl.enableVertexAttribArray(program.vertexNormalAttribute);

        program.textureCoordAttribute = gl.getAttribLocation(program, "in_uv");
        gl.enableVertexAttribArray(program.textureCoordAttribute);

        program.WVPmatrixUniform = gl.getUniformLocation(program, "pMatrix");
        program.NmatrixUniform = gl.getUniformLocation(program, "nMatrix");
        program.textureUniform = gl.getUniformLocation(program, "u_texture");
        program.lightDir = gl.getUniformLocation(program, "lightDir");

        OBJ.initMeshBuffers(gl, this.mesh);
    }

    render() {
        //this.shader.useShader()
        var program = this.shader.program

        this.setup()


        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.vertexBuffer);
        gl.vertexAttribPointer(program.vertexPositionAttribute, this.mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.textureBuffer);
        gl.vertexAttribPointer(program.textureCoordAttribute, this.mesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.mesh.normalBuffer);
        gl.vertexAttribPointer(program.vertexNormalAttribute, this.mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indexBuffer);

        gl.uniform1i(program.textureUniform, 0); //0 è il numero della texture
        gl.uniform4f(program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 0.2);
        gl.uniformMatrix4fv(program.WVPmatrixUniform, gl.FALSE, utils.transposeMatrix(this.getWVPMatrix()));
        gl.uniformMatrix4fv(program.NmatrixUniform, gl.FALSE, utils.transposeMatrix(this.getWorldMatrix()));
        gl.drawElements(gl.TRIANGLES, this.mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    }

    getWorldMatrix() {
        return utils.MakeWorld(this.tx, this.ty, this.tz, this.alpha, this.beta, this.gamma, this.scale)
    }

    getWVPMatrix() {
        return utils.multiplyMatrices(camera.getViewProjectionMatric(), this.getWorldMatrix())
    }

}


function textureLoaderCallback() {
    var textureId = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + this.txNum);
    gl.bindTexture(gl.TEXTURE_2D, textureId);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}
