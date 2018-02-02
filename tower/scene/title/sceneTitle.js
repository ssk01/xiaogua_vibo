class Tower extends GuaImage {
    constructor(game, name) {
        name = name || 't1'
        // log('tower ',)
        super(game, name)
        this.setup()
        this.rotation = 45
    }
    setup() {
        this.attack = 1
        this.range = 150
        this.target = null
        this.cooldown = 3
        this.fireCount = this.cooldown
    }
    calRotation() {
        if (this.target == null) {
            return
        }
        let e = this.target.center()
        let t = this.center()
        let rotation = Math.atan((e.y-t.y)/(e.x-t.x)) * 360 /2 /Math.PI
        if (e.y <  t.y) {
            if (rotation < 0) {
                this.rotation = rotation
                return
            } else {
                this.rotation = rotation + 180
                return
            }
        } else {
            if (rotation > 0) {
                this.rotation = rotation
                return                
            } else {
                this.rotation = rotation + 180
                return
            }
        }

    }
    draw() {
        let ctx = this.game.context
        ctx.fillStyle = 'read'
        // log('oops')o
        let vec = this.center()
        ctx.arc(vec.x, vec.y, this.range, 0, 2 * Math.PI);
        ctx.stroke();
        
        // super.draw()
        this.calRotation()
        log('ratation', this.rotation)
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
        // c.globalAlpha = this.alpha
        c.drawImage(this.texture, 0, 0)
        c.restore();        
    }
    update() {
        if (this.canAttack(this.target)) {
            // log('attack enemy', this.target)
            // log(this.fireCount)
            if (this.fireCount == 0) {
                this.fireCount = this.cooldown
                // log('break me ')
                this.target.break1(this.attack)
                // log('break me ')
                if (this.target.dead) {
                    this.target = null
                    log('next one')
                }
                // log('ok.......................')
            } else {
                this.fireCount--
            }
        } else {
            this.target = null
        }
    }
    canAttack(enemy) {
        let e = enemy
        let enemyExist = e !== null
        if (enemyExist && !e.dead) {
            if(e.center().distance(this.center()) < this.range) {
                return true
            }
        } 
        // log('excuse')
        return false
    }
    findTarget(enemies) {
        for(let e of enemies) {
            if (this.canAttack(e)) {
                this.target = e
                // log('attack ')
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
        this.beginHp = 20
        this.hp = this.beginHp
        this.y = 350
        this.x = 0
        this.hpw = this.w
        this.hph = 5

        this.speed = 3
        this.destination = 500
    }
    break1(ap) {
        this.hp -= ap
        // log('after break hp ', this.hp)
        if (this.hp <= 0) {
            this.die()
        }
    }
    drawHp() {
        this.hpx = this.x
        this.hpy = this.y - this.hph
        // log(' , ', this.hpx, this.hpy,this.y)
        let ctx = this.game.context
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.hpx, this.hpy, this.hpw, this.hph)
        ctx.fillStyle = 'red'
        let hpw = this.hp / this.beginHp * this.hpw
        // log('hpw', hpw)
        ctx.fillRect(this.hpx, this.hpy, hpw, this.hph)
    }
    draw() {
        if (this.dead) {
            return
        }
        super.draw()
        this.drawHp()
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
        let t1 = Tower.new(this.game,   'bird0_0')
        t1.x = 300
        t1.y = 250
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupGameElements() {
        for (let i = 0; i < 2; i++) {

            let e1 = Enemy1.new(this.game)
            e1.x = e1.x - 50 * i
            this.addElement(e1)
            this.enemies.push(e1)
        }
        // let e2 = Enemy1.new(this.game)
        // e2.x = e1.x - 50
        // this.addElement(e2)
        // this.enemies.push(e2)
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