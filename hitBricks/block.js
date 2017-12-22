var Block = function(position){
    var image = imgFromPath('block.png')
    var o  = {
        x: position[0],
        y: position[1],
        image: image,
        alive: true,
    }
    o.kill = function(){
        o.alive = false
    }
    o.collide = function(ball){
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o
}
