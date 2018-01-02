// config.player_speed
var config={
    player_speed: 20,
    cloud_speed: 1,
    bullet_speed: 5,
    enemy_speed: 5,
    cooldown: 5,
}

var randomBetween = function(start, end) {
    var r = Math.random() * (end - start + 1)
    return Math.floor(r + start)    
}

class Bullet extends GuaImage {
    constructor(game) {
        var name = 'bullet' 
        super(game, name)
        this.setup()
        // log('bullet update',x ,y)
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {
        this.y  -= this.speed
    }
    debug() {
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'cloud' + type
        // log('enemy png', name)
        super(game, name)
        // log('this texture', this.texture)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(3, 6)
        this.x = randomBetween(30, 450)
        this.y = -randomBetween(0,500)
    }
    update() {
        if (this.y > 1000) {
            this.setup()
        }
        this.y  += this.speed
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        log('enemy png', name)
        super(game, name)
        log('this texture', this.texture)
        this.ps = GuaParticleSystem.new(this.game)
        this.setup()
    }
    setup() {
        this.alive = true
        this.psLife = 30
        this.speed = randomBetween(10, 20)
        this.x = randomBetween(30, 450)
        this.y = -randomBetween(0,500)
    }
    hitBullet(bullets) {
        // log('检测',this.alive)
        if (this.alive) {
            for (var b of bullets) {
                if ((rectIntersects(this, b))) {
                    log('wtf ')
                    this.alive = false
                    return 
                }
            }
        }
        return 
    }
    
    update() {
        if (this.alive) {
            if (this.y > 1000) {
                this.setup()
            }
            this.y  += this.speed
        } else {
            log('vd uhle ')
            log('why', this.x, this.y)
            this.ps.init(this.x+this.w/2, this.y+this.h/2)
            this.ps.update()
            this.psLife--
            if (this.psLife < 0) {
                this.ps.setup()
                this.setup()
                // this.alive = true
                // this.psLife = 20
            }
        }

    }
    draw() {
        if (this.alive) {
            super.draw()
        } else {
            this.ps.draw()
        }

    }
    debug() {
        this.speed = config.enemy_speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
        this.life = 1
        this.name = 'player'
        this.bullets = []
    }
    setup() {
        this.speed = 30
        this.cooldown = 4
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }       
        this.bullets = this.bullets.filter(p => p.y > 0)              
        // log("bullets nums ", this.bullets.length)
        for (var b of this.bullets) {
            b.update()
        }        
    }
    draw() {
        super.draw()
        for (var b of this.bullets) {
            b.draw()
        }
    }
    debug() {
        this.speed = config.player_speed
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.cooldown
            var x = this.x + this.w/2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x 
            b.y = y
            // log('bullet update',x ,y)
            this.bullets.push(b)
            // log('fire hole ')
            // this.scene.addElement(b)
        }
    }

    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.set()
        this.setupInputs()
        log('this player x', this.player.x)
    }
    set() {
        var game = this.game
        this.bg = GuaImage.new(this.game, 'sky')
        this.player = Player.new(game, 'player')
        // var ps = GuaParticleSystem.new(this.game)

        this.addElement(this.bg)
        this.addElement(this.player)
        // this.addElement(ps)

        
        this.addEnemy()
        this.addCloud()
    }
    addCloud(){
        var clouds = []
        for (var i = 0; i < 4; i++) {
            var e = Cloud.new(this.game)
            this.addElement(e)
            clouds.push(e)
            // log('e  ', e)
        }
        this.clouds = clouds
    }
    addEnemy(){
        var enemys = []
        for (var i = 0; i < 5; i++) {
            var e = Enemy.new(this.game)
            this.addElement(e)
            enemys.push(e)
            // log('e  ', e)
        }
        this.enemys = enemys
    }
    setupInputs() {
        var g = this.game
        var s = this
        //log(s)
        g.register('a', function(){
            s.player.moveLeft()
        })
        g.register('d', function(){
            s.player.moveRight()
        })
        g.register('w', function(){
            s.player.moveUp()
        })
        g.register('s', function(){
            s.player.moveDown()
        }) 
        g.register('k', function(){
            s.player.fire()
        })   
    }

    update() {
        for (var e of this.enemys) {
            e.hitBullet(this.player.bullets)
        }
        super.update()

    }
}



// var Scene = function(game){
//     var s = {
//         game: game,
//     }

//     var paddle = Paddle(game)
//     blocks = loadLevels(0, game)
//     var ball = Ball(game)
//     game.register('a', paddle.moveLeft)
//     game.register('d', paddle.moveRight)
//     game.register('f', ball.fire)
//     enableDebugModel(blocks, true, game)

//     s.draw = function(){
//         // game.context.clearRect(0, 0, 400, 300)
//         game.context.fillStyle = "lightblue";
//         game.context.fillRect(0, 0, 400, 300);
//         game.drawImage(paddle)
//         for (var i = 0; i < blocks.length; i++){
//             block = blocks[i]
//             if (block.alive){
//                 game.drawImage(block)
//             }
//         }
//         game.drawImage(ball)
//         game.context.fillStyle = "black";
        
//         game.context.fillText('score :'+ score, 0, 280);            
//     }

//     s.update = function(){
//         ball.move()
//         if (paddle.collide(ball)) {
//             ball.reverseY()
//         }
//         //判断 block ball 相撞
//         for (var i = 0; i < blocks.length; i++){
//             block = blocks[i]
//             if (block.collide(ball)) {
//                 log('block 相撞')
//                 ball.reverseY()
//                 block.kill()
//             }            
//         }
//     }

//     game.canvas.addEventListener("mousemove", function(event){
//         // log("mosemove  ", event)
//         // log(event.offsetX, event.offsetY)
//         var x = event.offsetX
//         var y = event.offsetY
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener("mousedown", function(event){
//         // log("mosedown  ", event)
//         // log(event.offsetX, event.offsetY)
//         var x = event.offsetX
//         var y = event.offsetY
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener("mouseup", function(event){
//         // log("mouseup  ", event)
//         // log(event.offsetX, event.offsetY)
//         var x = event.offsetX
//         var y = event.offsetY
//         enableDrag = false
//     })
//     return s
// }
