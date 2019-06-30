var gl;
var canvas;
var aspectRatio;
var perspectiveMatrix;
var camera
var objects = []
var lights = []

function main() {
    CanvasUtils.init()
    camera = new LookInCamera(new Vector3(0, 3, 0), 0, 0)
    obj = new Object3DMesh("models/truck/Hummer.obj", "models/truck/HummerDiff.png", 1.0)
    obj.setPosition(new Vector3(0, 0, -10))
    obj.setRotation(new Vector3(270, 0, 30))

    /*obj1 = new Object3DSimple("models/truck/Hummer.obj", new Vector4(255, 0, 0, 255))
    obj1.setPosition(new Vector3(5, 0, -20))
    obj1.setRotation(new Vector3(270, 0, 30))*/


    objects.push(obj)
    //objects.push(obj1)

    lights.push(new DirectionalLight(new Vector4(255, 255, 255, 255), new Vector3(0, -1, -1)))
    draw()
}

function draw() {

    for (var x of objects) {
        x.render()
    }
    window.requestAnimationFrame(draw);
}
