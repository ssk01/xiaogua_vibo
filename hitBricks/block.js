var Block = function(position, game){
        var o = game.imageByName('block')
        o.x = position[0],
        o.y = position[1]
        o.speed = 10
        o.life = position[2]||1
        o.alive = true
    log('life is :', o.life)
    o.kill = function(){
        if (o.alive){
            o.life -= 1
            score += 100
            if (o.life == 0){
                o.alive = false
            }
        }
    }
    o.collide = function(ball){
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o
}
