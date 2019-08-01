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

    getViewProjectionMatric() {}
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

class LookAtCamera extends Camera {
    constructor(pos, target) {
        super(0, 0)
        this.target = target
        this.pos = pos
    }

    getViewMatrix() {
        var diff = new Vector3(this.target.pos.x - this.pos.x, this.target.pos.y - this.pos.y, this.target.pos.z - this.pos.z)
        var angle = Math.sqrt((diff.x * diff.x) + (diff.z * diff.z))
        angle = Math.acos(-diff.z / angle)


        var elev = Math.sqrt((diff.y * diff.y) + (diff.z * diff.z))
        elev = Math.asin(diff.y / elev)

        console.log(elev)
        if (diff.z > 0) {
            elev = Math.PI - elev
        }

        this.ang = utils.radToDeg(angle)
        this.elev = utils.radToDeg(elev)


        return utils.MakeView(this.pos.x, this.pos.y, this.pos.z, this.elev, this.ang)

        /*var upVector = new Vector3(0, -1, 0)

        var vz = new Vector3(this.pos.x - this.target.pos.x, this.pos.y - this.target.pos.y, this.pos.z - this.target.pos.z)
        vz.normalize()
        var vx = Vector3.crossProd(upVector, vz)
        vx.normalize()
        var vy = Vector3.crossProd(vz, vx)

        var temp = [vx.x, vy.x, vz.x, this.pos.x,
                    vx.y, vy.y, vz.y, this.pos.y,
                    vx.z, vy.z, vz.z, this.pos.z,
                    0, 0, 0, 1]
        return utils.invertMatrix(temp)*/
    }

    getViewProjectionMatric() {
        return utils.multiplyMatrices(perspectiveMatrix, this.getViewMatrix())
    }
}
