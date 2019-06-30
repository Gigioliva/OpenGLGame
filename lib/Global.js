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
    obj = new Object3DMesh("models/truck/Hummer.obj", "models/truck/HummerDiff.png")
    obj.setPosition(0, 0, -10)
    obj.setRotation(270, 0, 30)

    obj1 = new Object3DSimple("models/truck/Hummer.obj", [255, 0, 0, 255])
    obj1.setPosition(5, 0, -20)
    obj1.setRotation(270, 0, 30)


    objects.push(obj)
    objects.push(obj1)
    draw()
}

function draw() {

    for (var x of objects) {
        x.render()
    }
    window.requestAnimationFrame(draw);
}
