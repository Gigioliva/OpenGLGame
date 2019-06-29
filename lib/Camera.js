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
    constructor(tx, ty, tz, elevation, ang) {
        super(elevation, ang)
        this.tx = tx
        this.ty = ty
        this.tz = tz
    }

    setPosition(tx, ty, tz) {
        this.tx = tx
        this.ty = ty
        this.tz = tz
    }

    getViewMatrix() {
        return utils.MakeView(this.tx, this.ty, this.tz, this.elev, this.ang)
    }

    getViewProjectionMatric() {
        return utils.multiplyMatrices(perspectiveMatrix, this.getViewMatrix())
    }

}
