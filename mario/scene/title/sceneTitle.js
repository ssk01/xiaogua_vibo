

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
        // this.animation = new Animation(this.game)
        // this.addElement(this.animation)
        this.grounds = []
        for (var i = 0; i <= 18; i++) {
            var w = GuaImage.new(this.game, 'ground')
            w.x = i*19
            w.y = 450
            this.grounds.push(w)
        }
        this.groud_walk = 3

        this.jiario = Jiario.new(this.game)
        this.addElement(this.jiario)
        this.jiario.x = 150
        this.jiario.y = 390
        // this.p = Pipes.new(this.game)

        // var ps = GuaParticleSystem.new(this.game)
        // this.addElement(ps)
        // enableDebugModel(0, true, this.game)

    }
    setupInputs() {
        var game = this.game
        var s = this
        var p = this.p
        //log(s)
        var speed = 5
        game.register('k', function(){
            // var s = new Scene(game)
            // game.setScene(s)
        })
        game.register('a', function(status){

            s.jiario.move(-speed)
        })
        game.register('d', function(status){
            s.jiario.move(speed)
            // s.animation.move(10, status)
            // for (var p1 of p.pipes) {
            //     p1.flipx = true
            // }
        })
        game.register('j', function(status){
            // s.animation.jump()
            s.jiario.jump()
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
        // if (this.groud_walk == 0) {
        //     this.groud_walk = 3
        //     for (var g of this.grounds) {
        //         g.x += 15
        //     }
        // } else {
        //     for (var g of this.grounds) {
        //         g.x -= 5
        //     }
        //     this.groud_walk--
        // }
    }   
}