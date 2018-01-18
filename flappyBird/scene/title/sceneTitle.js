class Pipes {
    constructor(game) {
        // super(game, 'pipe_up');
        this.game = game
        this.pipes = []
        this.gzjj = 200
        this.old_gzjj = 200
        this.count = 0
        this.updatedNum = 0
        this.setup()
    }
    static new(game) {
        return new this(game)
    }
    init_twoPipe(p1, p2, i){
        p1.y = randomBetween(-100, 0)
        var idx = `pipe_space${i}`
        // p2.y = config.pipe_space1.value + p1.h + p1.y
        p2.y = config[idx].value + p1.h + p1.y
    }    
    setup() {
        // this.life = 15
        for (var i = 0; i < 3; i++) {
            var p1 = GuaImage.new(this.game, 'pipe_down');
            var p2 = GuaImage.new(this.game, 'pipe_up');
            this.init_twoPipe(p1, p2, i)
            p1.x = 300 + this.gzjj * i
            p2.x = 300 + this.gzjj * i
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    debug() {
    
        if (this.gzjj == config.gzjj.value) {
            this.count++
        } else {
            if (this.count > 5) {
                this.old_gzjj = this.gzjj
            }
            this.count =0
            this.gzjj = config.gzjj.value
        }
        
        // this.old_gzjj = this.gzjj
        // this.gzjj = config.gzjj.value
        log('change of gzjj ', this.gzjj, this.old_gzjj); 
    }
    update() {

        for(var i = 0; i < this.pipes.length/2; i += 1) {
            var p1 = this.pipes[2*i]
            var p2 = this.pipes[2*i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -50) {
                this.init_twoPipe(p1, p2, i)
                // log('gzjj  ', this.old_gzjj, this.gzjj)
                // log('end', p1.x)
                p1.x += this.old_gzjj * (2 - i) + this.gzjj*(i + 1)
                p2.x += this.old_gzjj * (2 - i) + this.gzjj*(i + 1)
                // log('start ', p1.x)
                this.updatedNum += 1
            }
        }
        if (this.updatedNum == 3) {
            this.old_gzjj = this.gzjj
        }
    }
    draw() {
        // log('p draw')
        // var c = this.game.context
        // for (var p of this.pipes) {
        //     c.save();
        //     var w2 = p.w/2
        //     var h2 = p.h/2
        //     c.translate(p.x + w2, p.y + h2)
        //     if (p.flipx == false) {
        //         c.scale(-1, 1);
        //         log('left')
        //     }
        //     c.translate(-w2, -h2)
        //     c.drawImage(p.texture, 0, 0)
        //     c.restore(); 
        // }        
        for (var p of this.pipes) {
            this.game.drawImage(p)
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
        this.p = Pipes.new(this.game)
        this.addElement(this.p)

        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
        // enableDebugModel(0, true, this.game)

    }
    setupInputs() {
        var game = this.game
        var s = this
        var p = this.p
        //log(s)
        game.register('k', function(){
            var s = new Scene(game)
            game.setScene(s)
        })
        game.register('a', function(status){
            s.animation.move(-10, status)
            for (var p1 of p.pipes) {
                p1.flipx = false
            }
        })
        game.register('d', function(status){
            s.animation.move(10, status)
            for (var p1 of p.pipes) {
                p1.flipx = true
            }
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