class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'spark')
        this.setup()
    }
    setup() {
        this.life = 15
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.05
        this.vx -= factor * this.vx
        this.vy -= factor * this.vy
    }
    draw() {
        // log('p draw')
        this.game.drawImage(this)
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
}

class GuaParticleSystem  {
    constructor(game) {
        this.game = game
        this.setup()
    }
    init(x, y) {
        this.x = x
        this.y = y        
    }
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 10
        this.particle = []
    }
    update() {
        this.particle = this.particle.filter(p => p.life > 0)              
        if (this.particle.length < this.numberOfParticles) {
            log('real, ',this.x,this.y)
            var p = GuaParticle.new(this.game)
            var vx = randomBetween(-3, 3)
            var vy = randomBetween(-3, 3)
            p.init(this.x, this.y, vx, vy)
            this.particle.push(p)
        }
        for (var p of this.particle) {
            p.update()
        }
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        // log('ps draw')
        
        for (var p of this.particle) {
            p.draw()
        }           
    }
}

class SceneLable  {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        log('what fuck ', this.text)
        this.game.context.fillText(this.text, 0, 280);              
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.register('k', function(){
            var s = new Scene(game)
            game.setScene(s)
        })
        this.setup()
    }
    setup() {
        this.lable = SceneLable.new(this.game, 'begin')
        this.addElement(this.lable)
        var ps = GuaParticleSystem.new(this.game)
        this.addElement(ps)
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        super.draw()
    }
}