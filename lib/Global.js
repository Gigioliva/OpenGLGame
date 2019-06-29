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
    obj = new Object3D("models/truck/Hummer.obj", CarTextureData)
    obj.setPosition(0, 0, -30)
    obj.setRotation(0, 90, 0)
    objects.push(obj)
    draw()
}

function draw() {

    for (var x of objects) {
        x.render()
    }
    window.requestAnimationFrame(draw);
}
