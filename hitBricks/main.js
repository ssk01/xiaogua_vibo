
var loadLevels = function(idx, game){
    var level = levels[idx]
    log('level', level)
    blocks = []
    for (var i = 0; i < level.length; i++){
        b = Block(level[i], game)
        blocks.push(b)
    }
    return blocks    
}

pause = false

var enableDebugModel = function(enable, game){
    if (!enable){
        return
    }
    window.addEventListener('keydown', function(event){
        k = event.key
        if (k == 'p'){
            pause = !pause
        } else if ('01234567'.includes(k)){
            blocks = loadLevels(Number(k), game)
        } 
    })
    // querySelector('#id-input-speed')
    document.getElementById("id-input-speed").addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
        if (window.fps == 0) {
            pause = true
        }
        else {
            pause = false
        }
    })
}


score = 0
enableDrag = false
var __main = function(){

    var images ={
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }
    var callback = function(){
        log('gameis ',game)
        enableDebugModel(true, game)
        var paddle = Paddle(game)
        
        blocks = []
        for (var i = 0; i < 1; i++){
            b = Block([5,100], game)
            // b.x = b.x + 50 * i
            blocks.push(b)
        }
        // events 
        var ball = Ball(game)
    
        game.register('a', paddle.moveLeft)
        game.register('d', paddle.moveRight)
        game.register('f', ball.fire)
        game.update = function(){
    
            if (pause){
                return
            }
            ball.move()
            if (paddle.collide(ball)) {
                ball.reverseY()
            }
            //判断 block ball 相撞
            for (var i = 0; i < blocks.length; i++){
                block = blocks[i]
                if (block.collide(ball)) {
                    log('block 相撞')
                    ball.reverseY()
                    block.kill()
                }            
            }
        }
    
        game.draw = function(){
            game.context.fillStyle = "lightblue";
            game.context.fillRect(0, 0, 400, 300);
            game.context.fillText('score :'+ score, 0, 280);
            game.drawImage(paddle)
            for (var i = 0; i < blocks.length; i++){
                block = blocks[i]
                if (block.alive){
                    game.drawImage(block)
                }
            }
            game.drawImage(ball)
        }

        game.canvas.addEventListener("mousemove", function(event){
            // log("mosemove  ", event)
            // log(event.offsetX, event.offsetY)
            var x = event.offsetX
            var y = event.offsetY
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener("mousedown", function(event){
            // log("mosedown  ", event)
            // log(event.offsetX, event.offsetY)
            var x = event.offsetX
            var y = event.offsetY
            if (ball.hasPoint(x, y)) {
                enableDrag = true
            }
        })
        game.canvas.addEventListener("mouseup", function(event){
            // log("mouseup  ", event)
            // log(event.offsetX, event.offsetY)
            var x = event.offsetX
            var y = event.offsetY
            enableDrag = false
        })
    }
    var game = GuaGame(30, images, callback)
    
    
}
__main()