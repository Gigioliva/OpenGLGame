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

    render(worldMatrix, WVPMatrix, program) {


        //Load Vertex
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(program.textureCoordAttribute, this.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
        //Load Normal
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.vertexAttribPointer(program.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);


        gl.vertexAttribPointer(program.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        //gl.uniform1i(program.textureUniform, 0); //0 è il numero della texture
        gl.uniform4f(program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 0.2);
        gl.uniformMatrix4fv(program.WVPmatrixUniform, gl.FALSE, utils.transposeMatrix(WVPMatrix));
        gl.uniformMatrix4fv(program.NmatrixUniform, gl.FALSE, utils.transposeMatrix(worldMatrix));
        gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    }

}
