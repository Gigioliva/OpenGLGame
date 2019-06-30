class Camera {

    //Magari creo una classe Vector3

    constructor(elev, ang) {
        this.elev = elev
        this.ang = ang
    }

    setElevation(elev) {
        this.elev = elev
    }

    setAngle(ang) {
        this.ang = ang
    }

    getViewMatrix() {}
}

class LookInCamera extends Camera {
    constructor(pos, elevation, ang) {
        super(elevation, ang)
        this.pos = pos
    }

    setPosition(pos) {
        this.pos = pos
    }

    getViewMatrix() {
        return utils.MakeView(this.pos.x, this.pos.y, this.pos.z, this.elev, this.ang)
    }

    getViewProjectionMatric() {
        return utils.multiplyMatrices(perspectiveMatrix, this.getViewMatrix())
    }

}
