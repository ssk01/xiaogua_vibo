
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
    log('wtf...................................')
    window.addEventListener('keydown', function(event){
        k = event.key
        if (k == 'p'){
            log('pause', pause)
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
        spark: 'img/spark.jpg',
        w0: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-0.png',
        w1: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-1.png',
        w2: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-2.png',
        w3: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-3.png',
        w4: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-4.png',
        w5: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-5.png',
        w6: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-6.png',
        w7: 'img/fe4bd23a8f3f48119d580c18fa2f36f3-7.png',
        walk0: 'img/walk/attack-0.png',
        walk1: 'img/walk/attack-1.png',
        walk2: 'img/walk/attack-2.png',
        walk3: 'img/walk/attack-3.png',
        walk4: 'img/walk/attack-4.png',
        walk5: 'img/walk/attack-5.png',
        walk6: 'img/walk/attack-6.png',
        walk7: 'img/walk/attack-7.png',
        walk8: 'img/walk/attack-8.png',
        fire0: 'img/fire/attack-9.png',
        fire1: 'img/fire/attack-10.png',
        fire2: 'img/fire/attack-11.png',
        fire3: 'img/fire/attack-12.png',
    }
    var callback = function(game){
        log('gameis ',game)
        var scene = new SceneTitle(game)
        // var scene = new Scene(game)
        log('callback  ',scene)
        game.setScene(scene)
    }
    log('that')
    var game = Guagame.instance(10, images, callback)
    
    
}
__main()