var Scene = function(game){
    var s = {
        game: game,
    }

    var paddle = Paddle(game)
    blocks = loadLevels(0, game)
    var ball = Ball(game)
    game.register('a', paddle.moveLeft)
    game.register('d', paddle.moveRight)
    game.register('f', ball.fire)
    enableDebugModel(blocks, true, game)

    s.draw = function(){
        // game.context.clearRect(0, 0, 400, 300)
        game.context.fillStyle = "lightblue";
        game.context.fillRect(0, 0, 400, 300);
        game.drawImage(paddle)
        for (var i = 0; i < blocks.length; i++){
            block = blocks[i]
            if (block.alive){
                game.drawImage(block)
            }
        }
        game.drawImage(ball)
        game.context.fillStyle = "black";
        
        game.context.fillText('score :'+ score, 0, 280);            
    }

    s.update = function(){
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
    return s
}
