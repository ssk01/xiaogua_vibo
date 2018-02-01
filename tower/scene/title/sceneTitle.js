class Tower extends GuaImage {
    constructor(game, name) {
        name = name || 't1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.range = 150
        this.target = null
    }
    update() {
        if (this.canAttack(this.target)) {
            // log('attack enemy', this.target)
            this.target.break1(this.attack)
            if (this.target.dead) {
                this.target = null
                log('next one')
            }
        } else {
            this.target = null
        }
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null
        if (enemyExist) {
            return !e.dead && e.center().distance(this.center()) < this.range
        } else {
            return false
        }
    }
    findTarget(enemies) {
        for(let e of enemies) {
            if (this.canAttack(e)) {
                this.target = e
                log('attack ')
                break
            }
        }
    }
}

class Enemy1 extends GuaImage {
    constructor(game, name) {
        name = name || 't2'
        super(game, name)
        this.dead = false
        this.setup()
    }
    setup() {
        this.hp = 3
        this.y = 200
        this.x = 0
        this.speed = 3
        this.destination = 500
    }
    break1(ap) {
        this.hp -= ap
        log('hp ', this.hp)
        if (this.hp <= 0) {
            this.die()
        }
    }
    die() {
        this.dead = true

        log('die')
    }
    update() {
        if (this.dead) {
            return
        }
        this.x += this.speed
        if (this.x > this.destination) {
            log('got in destination')
        }
    }
}



// 288 * 512
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.enemies = []
        this.towers = []
        this.setupTower()
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.bg = GuaImage.new(this.game,'bg_day')
        this.addElement(this.bg)

        this.setupHUD()
        this.setupGameElements()
        this.setupTower()
    }
    setupTower() {
        let t1 = Tower.new(this.game)
        t1.x = 300
        t1.y = 250
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupGameElements() {
        let e1 = Enemy1.new(this.game)
        e1.hp = 100
        this.addElement(e1)
        this.enemies.push(e1)
        let e2 = Enemy1.new(this.game)
        e2.x = e1.x - 50
        this.addElement(e2)
        this.enemies.push(e2)
    }
    setupHUD(){
        let gun = GuaImage.new(this.game, 't1')
        this.gun = gun
        this.addElement(this.gun)
        gun.x = 500
        gun.y = 300
        log('ok')
    }
    removeElement(node) {
        this.elements = this.elements.filter(e => e != node )
    }
    removeEnemy(node) {
        this.enemies = this.enemies.filter(e => e != node)
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
        for (let t of this.towers) {
            if (t.target === null) {
                t.findTarget(this.enemies)
            }
        }
        // for (let e of this.enemies) {
        //     log('edead', e.dead)
        //     if (e.dead) {
        //         this.removeEnemy(e)
        //         this.removeElement(e)
        //         log('after remove', this.enemies.length)
        //     }
        // }
    }   
}