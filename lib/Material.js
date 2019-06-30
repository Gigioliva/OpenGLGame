//Cache
var shaderCache = {}
var textureCount = 0

class Material {
    constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
        if (!shaderCache["default"]) {
            shaderCache["default"] = new SimpleShader()
        }
        this.shader = shaderCache["default"];

    }

    setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
    }

    bindShader() {
        this.shader.useShader()
        gl.uniform4f(this.shader.program.mColor, this.diffR, this.diffG, this.diffB, this.diffA);
    }
}



class MaterialTexture {
    constructor(urlTexture) {
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
    }

    bindShader() {
        this.shader.useShader()
        gl.uniform1i(this.shader.program.u_texture, this.textureId);
        gl.uniform4f(this.shader.program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 0.0);
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
