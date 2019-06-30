class Object3D {
    constructor() {
        this.tx = 0
        this.ty = 0
        this.tz = 0.0
        this.alpha = 0
        this.beta = 0
        this.gamma = 0
        this.scale = 1
    }


    render() {
        this.material.bindShader()
        this.mesh.render(this.getWorldMatrix(), this.getWVPMatrix(), this.material.shader.program)
    }

    getWorldMatrix() {
        return utils.MakeWorld(this.tx, this.ty, this.tz, this.alpha, this.beta, this.gamma, this.scale)
    }

    getWVPMatrix() {
        return utils.multiplyMatrices(camera.getViewProjectionMatric(), this.getWorldMatrix())
    }

    setPosition(tx, ty, tz) {
        this.tx = tx
        this.ty = ty
        this.tz = tz
    }

    setRotation(alpha, beta, gamma) {
        this.alpha = alpha
        this.beta = beta
        this.gamma = gamma
    }
}


class Object3DMesh extends Object3D {
    constructor(mesh, texture) {
        super()
        this.mesh = Mesh.loadMeshFromOBJ(mesh)
        this.material = new MaterialTexture(texture)
    }
}

class Object3DSimple extends Object3D {
    constructor(mesh, diff) {
        super()
        this.mesh = Mesh.loadMeshFromOBJ(mesh)
        this.material = new Material(diff[0], diff[1], diff[2], diff[3])
    }
}
