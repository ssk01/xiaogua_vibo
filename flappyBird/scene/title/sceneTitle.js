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
        log('p draw')
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
    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 10
        this.particle = []
    }
    update() {
        this.particle = this.particle.filter(p => p.life > 0)              
        if (this.particle.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            var vx = randomBetween(-10, 10)
            var vy = randomBetween(-10, 10)
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
        // log('what fuck ', this.text)
        this.game.context.fillText(this.text, 0, 280);              
    }
}


// 288 * 512
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)


        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game,'bg_day')
        this.addElement(this.bg)
        // this.lable = SceneLable.new(this.game, 'begin')
        // this.addElement(this.lable)
        this.animation = new Animation(this.game)
        this.addElement(this.animation)
        this.grounds = []
        for (var i = 0; i <= 18; i++) {
            var w = GuaImage.new(this.game, 'ground')
            w.x = i*19
            w.y = 450
            this.grounds.push(w)
        }
        this.groud_walk = 3

        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
        // enableDebugModel(0, true, this.game)

    }
    setupInputs() {
        var game = this.game
        var s = this
        //log(s)
        game.register('k', function(){
            var s = new Scene(game)
            game.setScene(s)
        })
        game.register('a', function(status){
            s.animation.move(-10, status)
        })
        game.register('d', function(status){
            s.animation.move(10, status)
        })
        game.register('j', function(status){
            s.animation.jump()
        })
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        super.draw()
        for (var g of this.grounds) {
            g.draw()
        }
    }
    update() {
        super.update()
        if (this.groud_walk == 0) {
            this.groud_walk = 3
            for (var g of this.grounds) {
                g.x += 15
            }
        } else {
            for (var g of this.grounds) {
                g.x -= 5
            }
            this.groud_walk--
        }
    }   
}