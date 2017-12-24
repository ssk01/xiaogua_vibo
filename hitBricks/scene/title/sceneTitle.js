class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.register('k', function(){
            var s = Scene(game)
            game.setScene(s)
        })
    }
    draw() {
        this.game.context.clearRect(0, 0, 400, 300)
        this.game.context.fillStyle = "black";
        this.game.context.fillText("begin key 'k'", 0, 280);              
    }
}