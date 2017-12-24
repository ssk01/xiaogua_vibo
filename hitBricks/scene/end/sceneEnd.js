gameover = true

class EndScene extends GuaScene {
    constructor(game) {
        super(game)
        game.register('r', function(){
            var s = new SceneTitle(game)
            log("wtf", s)
            game.setScene(s)
        })
    }
    draw() {
        if (gameover) {
            log('s draw')
            this.game.context.clearRect(0, 0, 400, 300)
            this.game.context.fillStyle = "black";
            this.game.context.fillText('game over 按r重玩 :', 0, 280);              
        }
    }
}