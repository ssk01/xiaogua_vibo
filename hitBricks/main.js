
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

var enableDebugModel = function(blocks, enable, game){
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
    var callback = function(game){
        log('gameis ',game)
        var scene = Scene(game)
        game.setScene(scene)
    }
    var game = GuaGame(30, images, callback)
    
    
}
__main()