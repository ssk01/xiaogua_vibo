
class JiaTileMap {
    constructor(game) {
        this.game = game
        this.offsetX = 0
        this.offsetIndex = 0
        this.tiles = [
            0,0,1,0,0,0,0,0,0,0, 1, 1, 1, 0, 1,
            0,0,2,0,0,0,0,0,0,0, 1, 1, 1, 0, 1,
            0,0,3,0,0,0,0,0,0,0, 1, 2, 3, 0, 1,
            0,0,4,0,0,0,0,0,0,0, 1, 2, 3, 0, 1,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 0, 0,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
            0,0,4,0,0,0,0,0,0,0, 0, 0, 0, 2, 2,
        ]
        this.th = 15
        this.tw = 20
        this.tw = this.tiles.length / this.th
        this.tileSize = 32
        this.tileImages = [
            null,
            GuaImage.new(game, 't1'),
            GuaImage.new(game, 't2'),
            GuaImage.new(game, 't3'),
            GuaImage.new(game, 't4'),
        ]
    }
    static new(game) {
        return new this(game)
    }
    onTheGround(i, j) {
        let index = (this.offsetIndex + i) * this.th + j
        let tile = this.tiles[index]
        return tile != 0
    }
    update() {
        this.offsetX -= 4
        this.offsetIndex = Math.abs(parseInt(this.offsetX / this.tileSize))
    }

    draw() {
        let tilenums =  this.tw * this.th
        if (tilenums + this.offsetIndex * this.th > this.tiles.length) {
            tilenums = this.tiles.length - this.offsetIndex * this.th
        }
        if (tilenums < 0) {
            tilenums = 0
        }

        for (let i = 0; i < tilenums; i++) {
            let index = this.tiles[i+this.offsetIndex*this.th]
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

        this.groud_walk = 3

        this.jiario = Jiario.new(this.game, jia)
        this.addElement(this.jiario)
        this.jiario.x = 100
        this.jiario.y = 100

    }
    setupInputs() {
        var game = this.game
        var s = this
        var p = this.p
        //log(s)
        var speed = 5
        game.register('k', function(){

        })
        game.register('a', function(status){

            s.jiario.move(-speed, 'down')
        })
        game.register('d', function(status){
            s.jiario.move(speed, 'down')

        })
        game.register('j', function(status){
            s.jiario.jump()
        })
    }
    static new(game) {
        return new this(game)
    }
    draw() {
        super.draw()
    }
    update() {
        super.update()
    }   
}