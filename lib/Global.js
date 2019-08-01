var gl;
var canvas;
var aspectRatio;
var perspectiveMatrix;
var camera
var objects = []
var lights = []

function main() {
    CanvasUtils.init()
    //camera = new LookInCamera(new Vector3(0, 4, 0), -20, 0)
    truck = new Object3DMesh("models/truck/Hummer.obj", "models/truck/HummerDiff.png", 1.0)
    truck.setPosition(new Vector3(0, 1, -10))
    truck.setRotation(new Vector3(270, 0, 30))

    floor0 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor0.setPosition(new Vector3(0, 0, -10))
    floor0.setRotation(new Vector3(0, 0, 0))
    floor1 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor1.setPosition(new Vector3(7, 0, -10))
    floor1.setRotation(new Vector3(0, 0, 0))
    floor2 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor2.setPosition(new Vector3(-7, 0, -10))
    floor2.setRotation(new Vector3(0, 0, 0))
    floor3 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor3.setPosition(new Vector3(0, 0, -17))
    floor3.setRotation(new Vector3(0, 0, 0))
    floor4 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor4.setPosition(new Vector3(0, 0, -3))
    floor4.setRotation(new Vector3(0, 0, 0))
    floor5 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor5.setPosition(new Vector3(7, 0, -3))
    floor5.setRotation(new Vector3(0, 0, 0))
    floor6 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor6.setPosition(new Vector3(-7, 0, -3))
    floor6.setRotation(new Vector3(0, 0, 0))
    floor7 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor7.setPosition(new Vector3(7, 0, -17))
    floor7.setRotation(new Vector3(0, 0, 0))
    floor8 = new Object3DMesh("models/road/Strada.obj", "models/road/Strada.jpg", 1.0)
    floor8.setPosition(new Vector3(-7, 0, -17))
    floor8.setRotation(new Vector3(0, 0, 0))


    camera = new LookAtCamera(new Vector3(0, 8, 0), truck)

    objects.push(floor0)
    objects.push(floor1)
    objects.push(floor2)
    objects.push(floor3)
    objects.push(floor4)
    objects.push(floor5)
    objects.push(floor6)
    objects.push(floor7)
    objects.push(floor8)

    objects.push(truck)

    lights.push(new DirectionalLight(new Vector4(255, 255, 255, 255), new Vector3(0, -1, 0), 0))
    //lights.push(new SportLight(new Vector4(255, 255, 255, 255), new Vector3(0, 2, -10), new Vector3(0, -1, 0), 0.5, 0.5, 30, 60, 1))
    //lights.push(new PointLight(new Vector4(255, 255, 255, 255), new Vector3(0, 2, -10), 0.4, 0.5, 2))
    startAnimating(1)
}

var fpsInterval, startTime, then, now, elapsed;

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {

    // request another frame

    requestAnimationFrame(animate);

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame

    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        draw()

        // Put your drawing code here

    }
}

function draw() {

    for (var x of objects) {
        x.render()
    }
    //window.requestAnimationFrame(draw);
}
