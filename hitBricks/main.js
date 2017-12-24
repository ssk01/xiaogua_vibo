
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
            log('pause')
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
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    var callback = function(game){
        log('gameis ',game)
        var scene = new SceneTitle(game)
        game.setScene(scene)
    }
    var game = Guagame.instance(30, images, callback)
    
    
}
__main()