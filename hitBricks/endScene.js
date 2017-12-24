gameover = true
var EndScene = function(game){
    var s = {
        game: game,
    }
    s.draw = function(){
        if (gameover) {
            log('s draw')
            // game.context.fillStyle = "lightblue";
            // game.context.fillRect(0, 0, 400, 300);
            game.context.clearRect(0, 0, 400, 300)

            game.context.fillStyle = "black";
            game.context.fillText('failed :', 0, 280);              
            // gameover = false
        }
    }

    s.update = function(){
    }
    return s
}