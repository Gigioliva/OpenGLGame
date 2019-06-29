//Cache
var shaderDefault = null;



class Material {
    constructor(diffRed, diffGreen, diffBlue, diffAlpha) {
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
        // material ambient color
        this.ambR = 0.0;
        this.ambG = 0.0;
        this.ambB = 0.0;
        this.ambA = 0.0;
        // low light ambient
        this.ambLR = 0.0;
        this.ambLG = 0.0;
        this.ambLB = 0.0;
        // upper light ambient
        this.ambLA = 0.0;
        this.ambHR = 0.0;
        this.ambHG = 0.0;
        this.ambHB = 0.0;
        this.ambHA = 0.0;
        //  light ambient direction
        this.ambX = 0;
        this.ambY = 0;
        this.ambZ = 1;
        this.emitR = 0.0;
        this.emitG = 0.0;
        this.emitB = 0.0;
        this.emitA = 1.0;
        if (!shaderDefault) {
            shaderDefault = new Shader("Shader/vsSimple.glsl", "Shader/fsLight.glsl")
        }
        this.shader = shaderDefault;

    }

    setDiffuseColor(diffRed, diffGreen, diffBlue, diffAlpha) {
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
    }

    setAmbientLowColor(ambRed, ambGreen, ambBlue, ambAlpha) {
        this.ambLR = ambRed / 255.0;
        this.ambLG = ambGreen / 255.0;
        this.ambLB = ambBlue / 255.0;
        this.ambLA = ambAlpha / 255.0;
    }

    setAmbientHighColor(ambRed, ambGreen, ambBlue, ambAlpha) {
        this.ambHR = ambRed / 255.0;
        this.ambHG = ambGreen / 255.0;
        this.ambHB = ambBlue / 255.0;
        this.ambHA = ambAlpha / 255.0;
    }

    setAmbientDirection(ambX, ambY, ambZ) {
        this.ambX = ambX;
        this.ambY = ambY;
        this.ambZ = ambZ;
    }

    setMaterialAmbient(mambR, mambG, mambB, mambA) {
        this.ambR = mambR / 255.0;
        this.ambG = mambG / 255.0;
        this.ambB = mambB / 255.0;
        this.ambA = mambA / 255.0;
    }

    setEmissionColor(emitRed, emitGreen, emitBlue, emitAlpha) {
        this.emitR = emitRed / 255.0;
        this.emitG = emitGreen / 255.0;
        this.emitB = emitBlue / 255.0;
        this.emitA = emitAlpha / 255.0;

    }

    bindShader() {
        this.shader.useShader()
        //light
        var materialDiffLoc = this.shader.getUniformLocation("mColor");
        var materialAmbientLoc = this.shader.getUniformLocation("mAmbientColor");
        var materialEmitLoc = this.shader.getUniformLocation("mEmitColor");
        var ambHLoc = this.shader.getUniformLocation("ambientHighColor");
        var ambLLoc = this.shader.getUniformLocation("ambientLowColor");
        var ambDLoc = this.shader.getUniformLocation("ambientDir");

        gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        gl.uniform4f(materialAmbientLoc, this.ambR, this.ambG, this.ambB, this.ambA);
        gl.uniform4f(materialEmitLoc, this.emitR, this.emitG, this.emitB, this.emitA);
        if (ambDLoc) {
            gl.uniform4f(ambLLoc, this.ambLR, this.ambLG, this.ambLB, this.ambLA);
            gl.uniform4f(ambHLoc, this.ambHR, this.ambHG, this.ambHB, this.ambHA);
            gl.uniform3f(ambDLoc, this.ambX, this.ambY, this.ambZ);
        }
    }
}
