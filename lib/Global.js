var gl;
var canvas;
var aspectRatio;
var perspectiveMatrix;
var camera


function main() {
    CanvasUtils.init()
    camera = new LookInCamera(0, 3, 0, 0, 0)
    initOBJ()
    drawScene()
}

var vs = `#version 300 es
#define POSITION_LOCATION 0
#define NORMAL_LOCATION 1
#define UV_LOCATION 2

layout(location = POSITION_LOCATION) in vec3 in_pos;
layout(location = NORMAL_LOCATION) in vec3 in_norm;
layout(location = UV_LOCATION) in vec2 in_uv;

uniform mat4 pMatrix;
uniform mat4 nMatrix;

out vec3 fs_pos;
out vec3 fs_norm;
out vec2 fs_uv;

void main() {
	fs_pos = in_pos;
	fs_norm = (nMatrix * vec4(in_norm, 0.0)).xyz;
	fs_uv = vec2(in_uv.x, 1.0-in_uv.y);
	
	gl_Position = pMatrix * vec4(in_pos, 1.0);
}`;

// Fragment shader
var fs = `#version 300 es
precision highp float;

in vec3 fs_pos;
in vec3 fs_norm;
in vec2 fs_uv;

uniform sampler2D u_texture;
uniform vec4 lightDir;
//uniform float ambFact;

out vec4 color;

void main() {
	vec4 texcol = texture(u_texture, fs_uv);
	float ambFact = lightDir.w;
	float dimFact = (1.0-ambFact) * clamp(dot(normalize(fs_norm), lightDir.xyz),0.0,1.0) + ambFact;
	color = vec4(texcol.rgb * dimFact, texcol.a);
}`;

var carMesh, imgtx, gLightDir, program;

function initOBJ() {
    var shader = new Shader(vs, fs)
    shader.useShader()

    carMesh = new OBJ.Mesh(carObjStr);

    imgtx = new Image();
    imgtx.txNum = 0;
    imgtx.onload = textureLoaderCallback;
    imgtx.src = CarTextureData;

    program = shader.localProgram

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
    //		program.ambFact = gl.getUniformLocation(program, "ambFact");

    OBJ.initMeshBuffers(gl, carMesh);

    gLightDir = [-1.0, 0.0, 0.0, 0.0];
}

var textureLoaderCallback = function () {
    var textureId = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + this.txNum);
    gl.bindTexture(gl.TEXTURE_2D, textureId);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
}


var carAngle = 0;
var carX = 0.0;
var carY = 0.0;
var carZ = -20.0;

var lookRadius = 10.0;


var keys = [];
var vz = 0.0;
var rvy = 0.0;

function drawScene() {

    // call user procedure for world-view-projection matrices
    wvpMats = worldViewProjection(carX, carY, carZ);


    // draws the request
    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.vertexBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute, carMesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.textureBuffer);
    gl.vertexAttribPointer(program.textureCoordAttribute, carMesh.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, carMesh.normalBuffer);
    gl.vertexAttribPointer(program.vertexNormalAttribute, carMesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, carMesh.indexBuffer);

    gl.uniform1i(program.textureUniform, 0);
    gl.uniform4f(program.lightDir, gLightDir[0], gLightDir[1], gLightDir[2], 0.2);
    gl.uniformMatrix4fv(program.WVPmatrixUniform, gl.FALSE, utils.transposeMatrix(wvpMats));
    gl.uniformMatrix4fv(program.NmatrixUniform, gl.FALSE, utils.transposeMatrix(utils.MakeWorld(carX, carY, carZ, 0, 0, 0, 1)));
    gl.drawElements(gl.TRIANGLES, carMesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(drawScene);
}


function worldViewProjection(tx, ty, tz) {
    const world = utils.MakeWorld(tx, ty, tz, 0, 0, 0, 1)
    const view = camera.getViewMatrix()
    const projection = perspectiveMatrix
    return utils.multiplyMatrices(camera.getViewProjectionMatric(), world)
}
