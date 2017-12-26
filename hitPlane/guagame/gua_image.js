class GuaImage {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.game = game
    }
    static new(game, name) {
        return new this(game, name)
    }
    draw() {
   
    }
    update() {

    }
}

// class Player extends GuaImage{ 

// }