class GuaImage {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.name = name
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.game = game
        this.flipx = true
        this.flipy = true
    }

    static new(game, name) {
        return new this(game, name)
    }
    clone() {
        let c = GuaImage.new(this.game, this.name)
        c.x = this.x
        c.y = this.y
        return c
    }
    pointInFrame(x, y) {
        let xIn = x >= this.x && x <= this.x + this.w
        let yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }
    draw() {
        this.game.drawImage(this)
     }
    update() {

    }
}
