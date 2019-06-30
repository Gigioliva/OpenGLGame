class Mesh {

    static loadMeshFromOBJ(urlObj) {

        var modelMesh;

        utils.loadFile(urlObj, 0, (response, data) => {
            modelMesh = new OBJ.Mesh(response);
            OBJ.initMeshBuffers(gl, modelMesh);
        })

        return new Mesh(modelMesh.vertexBuffer, modelMesh.textureBuffer, modelMesh.normalBuffer, modelMesh.indexBuffer)
    }

    constructor(vertexBuffer, textureBuffer, normalBuffer, indexBuffer) {
        this.vertexBuffer = vertexBuffer
        this.textureBuffer = textureBuffer
        this.normalBuffer = normalBuffer
        this.indexBuffer = indexBuffer
    }

    render(Wmatrix, WVPmatrix, program) {

        if (program.vertexPositionAttribute != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        if (program.vertexNormalAttribute != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(program.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        if (program.textureCoordAttribute != null) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
            gl.vertexAttribPointer(program.textureCoordAttribute, this.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        if (program.PmatrixUniform != null) {
            gl.uniformMatrix4fv(program.PmatrixUniform, gl.FALSE, utils.transposeMatrix(WVPmatrix));
        }
        if (program.WmatrixUniform != null) {
            gl.uniformMatrix4fv(program.WmatrixUniform, gl.FALSE, utils.transposeMatrix(Wmatrix));
        }

        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    }

}
