

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
        let gun = GuaImage.new(this.game, 't1')
        this.gun = gun
        this.addElement(this.gun)
        gun.x = 500
        gun.y = 300
        log('ok')


    }
    removeElement(node) {
        // this.elements = this.elements.filter(e => e != node )
    }
    setupInputs() {
        let startDrag = false
        let self = this
        this.game.registerMouse(function(event, status) {
            let x = event.offsetX
            let y = event.offsetY
            if (status == 'down') {
                let clickIn = self.gun.pointInFrame(x, y) 
                if (clickIn) {
                    startDrag = true
                    self.tower = self.gun.clone()
                    self.addElement(self.tower)
                }
            } else if (status == 'move') {
                if (startDrag) {
                    self.tower.x = x
                    self.tower.y = y
                }
            } else {
                startDrag = false
                self.removeElement(self.tower)
                self.tower = null
            }
            log('mouse event', event, status)
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