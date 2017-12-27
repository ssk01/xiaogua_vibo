
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
        log(window.fps)
        
        if (window.fps == 0) {
            pause = true
        }
        else {
            pause = false
        }
    })
}


score = 0
enable = true
var __main = function(){

    var images ={
        // ball: 'img/ball.png',
        // block: 'img/block.png',
        // paddle: 'img/paddle.png',
        sky: 'img/sky.jpg',
        player: 'img/player.png',
        cloud0: 'img/cloud0.png',
        cloud1: 'img/cloud0.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy3: 'img/enemy3.png',
        enemy4: 'img/enemy4.png',
        bullet: 'img/bullet.png',
        spark: 'img/spark.jpg'
    }
    var callback = function(game){
        log('gameis ',game)
        // var scene = new SceneTitle(game)
        var scene = new Scene(game)
        log('callback  ',scene)
        game.setScene(scene)
    }
    log('that')
    var game = Guagame.instance(10, images, callback)
    
    
}
__main()