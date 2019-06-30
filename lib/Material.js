//Cache
var shaderCache = {}
var textureCount = 0

class Material {
    constructor(diff) {
        this.diff = new Vector4(diff.x / 255, diff.y / 255, diff.z / 255, diff.w / 255)
        if (!shaderCache["default"]) {
            shaderCache["default"] = new SimpleShader()
        }
        this.shader = shaderCache["default"];

    }

    setDiffuseColor(diff) {
        this.diff = new Vector4(diff.x / 255, diff.y / 255, diff.z / 255, diff.w / 255)
    }

    bindShader() {
        this.shader.useShader()
        gl.uniform4f(this.shader.getUniformLocation("mColor"), this.diff.x, this.diff.y, this.diff.z, this.diff.w);
    }
}



class MaterialTexture {
    constructor(urlTexture, textureInfluence) {
        var tex = new Image();
        tex.txNum = textureCount;
        tex.onload = textureLoaderCallback;
        tex.src = urlTexture;

        this.textureId = textureCount
        textureCount++
        if (!shaderCache["texture"]) {
            shaderCache["texture"] = new TextureShader()
        }
        this.shader = shaderCache["texture"];
        this.textureInfluence = textureInfluence
    }

    bindShader() {
        this.shader.useShader()
        gl.uniform1i(this.shader.getUniformLocation("u_texture"), this.textureId);
        gl.uniform1f(this.shader.getUniformLocation("DTexMix"), this.textureInfluence)
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
