var Paddle = function(){
    image = imgFromPath('paddle.png')
    var o  = {
        x: 100,
        y: 200,
        speed: 10,
        image: image,
    }
    o.move = function(x){
        if (x < 0) {
            x = 0
        }
        if (x + o.image.width > 400){
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function(){
        o.move(o.x-o.speed)
    }
    o.moveRight = function(){
        o.move(o.x+o.speed)
    }
    o.collide = function(ball){
        // xjb撞， xjb判断
        if (rectIntersects(ball, o) || rectIntersects(o, ball)){
                return true
        }
        return false
    }
    return o
}
