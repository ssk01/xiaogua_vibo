var Ball = function(game){
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 200
    o.speedX = 10
    o.speedY = 10
    o.fired = false
    o.hasPoint = function(x, y) {
        if (x >= o.x && x <= o.x + o.w) {
            if (y >= o.y && y <= o.y + o.h) {
                return true
            }
        }
        return false
    }
    o.move = function(){
        if (o.fired){
            // log(o.x)
            if (o.x < 0 || o.x > 400 - o.image.width){
                o.speedX *=-1
            }
            if (o.y < 0 || o.y > 300 - o.image.height){
                o.speedY *=-1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
        if (o.y > 250) {
            log('failed' )
            var endScene = new EndScene(game)
            game.setScene(endScene)
        }
    }
    o.fire = function(){
        o.fired = true
    }
    o.reverseY = function(){
        o.speedY *=-1
    }
    return o
}
