
class JiaTileMap {
    constructor(game) {
        this.game = game
        this.tiles = [
            1, 1, 1, 0, 1,
            1, 1, 1, 0, 1,
            1, 2, 3, 0, 1,
            1, 2, 3, 0, 1,
        ]
        this.th = 5
        this.tw = this.tiles.length / this.th
        this.tileSize = 32
        this.tileImages = [
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
    }
    static new(game) {
        return new this(game)
    }
    update() {

    }

    draw() {
        for (let i = 0; i < this.tiles.length; i++) {
            let index = this.tiles[i]
            if (index != 0) {
                let x = Math.floor(i / this.th) * this.tileSize
                let y = Math.floor(i % this.th) * this.tileSize
                let image = this.tileImages[index]
                this.game.context.drawImage(image.texture, x, y)
            }
        }
    }


}

// 288 * 512
class SceneEditor extends GuaScene {
    constructor(game) {
        super(game)


        this.setup()
        this.setupInputs()
    }
    setup() {
        let jia = JiaTileMap.new(this.game)
        this.addElement(jia)

        this.bg = GuaImage.new(this.game,'bg_day')
        // this.addElement(this.bg)
        
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
        this.jiario.x = 100
        this.jiario.y = 100
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

            s.jiario.move(-speed, 'down')
        })
        game.register('d', function(status){
            s.jiario.move(speed, 'down')
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