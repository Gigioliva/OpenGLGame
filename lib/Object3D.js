class Object3D {
    constructor(mesh, texture, vertexs, fragments) {
        this.tx = 0
        this.ty = 0
        this.tz = 0.0
        this.alpha = 0
        this.beta = 0
        this.gamma = 0
        this.scale = 1
        /*var vs = vertexs ? vertexs : "Shader/vsSimple.glsl"
        var fs = fragments ? fragments : "Shader/fsSimple.glsl"

        this.shader = new Shader(vs, fs)
        this.shader.useShader()*/

        this.mesh = Mesh.loadMeshFromOBJ(mesh)
        this.material = new Material(255, 0, 0, 255)

        /*this.tex = new Image();
        this.tex.txNum = 0;
        this.tex.onload = textureLoaderCallback;
        this.tex.src = texture;*/
    }


    render() {
        this.material.bindShader()
        this.mesh.render(this.getWorldMatrix(), this.getWVPMatrix(), this.material.shader.program)
    }

    getWorldMatrix() {
        return utils.MakeWorld(this.tx, this.ty, this.tz, this.alpha, this.beta, this.gamma, this.scale)
    }

    getWVPMatrix() {
        return utils.multiplyMatrices(camera.getViewProjectionMatric(), this.getWorldMatrix())
    }

    setPosition(tx, ty, tz) {
        this.tx = tx
        this.ty = ty
        this.tz = tz
    }

    setRotation(alpha, beta, gamma) {
        this.alpha = alpha
        this.beta = beta
        this.gamma = gamma
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
