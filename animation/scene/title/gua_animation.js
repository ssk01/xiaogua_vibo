class Animation  {
    constructor(game, text) {
        this.game = game
        this.setup()
        this.pause = 1
        this.x = 100
        this.y = 109
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup() {
        this.allActions = {
            'walk': [],
            'fire': [], 
        }
        this.frames = []
        for (var i = 0; i < 9; i++) {
            var name = `walk${i}`
            var t = this.game.textureByName(name)
            this.allActions['walk'].push(t)
        }
        for (var i = 0; i < 4; i++) {
            var name = `fire${i}`
            var t = this.game.textureByName(name)
            this.allActions['fire'].push(t)
        }
        this.frames = this.allActions['walk']
        this.texture = this.frames[0]
        this.frameCount = 3
        this.frameIndex = 0
        this.flipx = true
        this.w = this.texture.width
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex++
            this.texture = this.frames[this.frameIndex%this.frames.length]
        }
    }
    draw() {
        // log('flip ', this.flipx)
        if (this.flipx){
            this.game.drawImage(this)
            // this.pause = 0
        } else {
            var c = this.game.context
            c.save();
            c.scale(-1, 1);
            c.drawImage(this.texture, -this.x - this.w/2, this.y)
            c.restore();
        }
    }

    changeFrames(name) {
        this.frames = this.allActions[name]
    }

    move(x, status) {
        this.flipx = (x > 0)
        log('after move ',status ,this.flipx)
        this.x += x
        var animationName = {
            up: 'walk',
            down: 'fire',
        }
        this.changeFrames(animationName[status])
    }
}
