var Ball = function(){
    var image = imgFromPath('ball1.png')
    var o  = {
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 8,
        image: image,
        fired: false,
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
    }
    o.fire = function(){
        o.fired = true
    }
    o.reverseY = function(){
        o.speedY *=-1
    }
    return o
}
