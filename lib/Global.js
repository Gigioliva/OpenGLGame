var gl;
var canvas;
var aspectRatio;
var perspectiveMatrix;
var camera
var objects = []
var gLightDir = [-1.0, 0.0, 0.0, 0.0];

function main() {
    CanvasUtils.init()
    camera = new LookInCamera(0, 3, 0, 0, 0)
    objects.push(new Object3D(carObjStr, CarTextureData))
    draw()
}

function draw() {

    for (var x of objects) {
        x.render()
    }
    window.requestAnimationFrame(draw);
}
