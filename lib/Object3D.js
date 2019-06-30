class Object3D {
    constructor() {
        this.pos = new Vector3(0, 0, 0)
        this.rot = new Vector3(0, 0, 0)
        this.scale = 1
    }


    render() {
        this.material.bindShader()
        for (var light of lights) {
            light.bindShader(this.material.shader)
        }
        this.mesh.render(this.getWorldMatrix(), this.getWVPMatrix(), this.material.shader.program)
    }

    getWorldMatrix() {
        return utils.MakeWorld(this.pos.x, this.pos.y, this.pos.z, this.rot.x, this.rot.y, this.rot.z, this.scale)
    }

    getWVPMatrix() {
        return utils.multiplyMatrices(camera.getViewProjectionMatric(), this.getWorldMatrix())
    }

    setPosition(pos) {
        this.pos = pos
    }

    setRotation(rot) {
        this.rot = rot
    }
}


class Object3DMesh extends Object3D {
    constructor(mesh, texture, textureInfluence) {
        super()
        this.mesh = Mesh.loadMeshFromOBJ(mesh)
        this.material = new MaterialTexture(texture, textureInfluence)
    }
}

class Object3DSimple extends Object3D {
    constructor(mesh, diff) {
        super()
        this.mesh = Mesh.loadMeshFromOBJ(mesh)
        this.material = new Material(diff)
    }
}
