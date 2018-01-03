class Animation  {
    constructor(game, text) {
        this.game = game
        this.setup()
        this.pause = 1
        this.x = 150
        this.y = 100
        this.vy = 0
        this.gy = 10
        this.alpha = 1.0
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup() {
        this.allActions = {
            'walk': [],
            'fire': [], 
            'bird': [],
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
        for (var i = 0; i < 3; i++) {
            var name = `bird0_${i}`
            var t = this.game.textureByName(name)
            this.allActions['bird'].push(t)
        }
        this.frames = this.allActions['bird']
        this.texture = this.frames[0]
        this.frameCount = 3
        this.frameIndex = 0
        this.flipx = true
        this.w = this.texture.width
        this.h = this.texture.height
        this.rotation = 0
    }
    update() {
        if (this.alpha > 0){
            this.alpha -= 0.05
        }
        if (this.alpha < 0) {
            this.alpha = 1
        }
        this.y += this.vy
        this.vy += this.gy * 0.1
        if (this.y > 400) {
            this.y = 400
        }
        if (this.rotation <= 45) {
            this.rotation += 5
        }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex++
            this.texture = this.frames[this.frameIndex%this.frames.length]
        }
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    draw() {

        var c = this.game.context
        c.save();
        // log('xy', this.x, this.y)
        var w2 = this.w/2
        var h2 = this.h/2
        // log('w2 h2', w2, h2)
        c.translate(this.x + w2, this.y + h2)
        if (this.flipx == false) {
            c.scale(-1, 1);
        }
        c.rotate(this.rotation*Math.PI/180)
        c.translate(-w2, -h2)
        c.globalAlpha = this.alpha
        c.drawImage(this.texture, 0, 0)
        c.restore();        
        // // log('flip ', this.flipx)
        // if (this.flipx){
        //     this.game.drawImage(this)
        //     // this.pause = 0
        // } else {
        //     var c = this.game.context
        //     c.save();
        //     c.scale(-1, 1);
        //     c.drawImage(this.texture, -this.x - this.w/2, this.y)
        //     c.restore();
        // }
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
        // this.changeFrames(animationName[status])
    }
}
