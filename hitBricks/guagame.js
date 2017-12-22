var GuaGame = function(fps) {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    g.canvas = canvas
    g.context = context
    
    // draw
    g.drawImage = function(guaImage){
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    // events
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    //
    g.register = function(key, callback) {
        g.actions[key] = callback
    }
    g.update = function(){}
    g.draw = function(){}
    //timer
    window.fps = 30    
    var runloop = function(){
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]){
                g.actions[key]()
            }
        }
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height);
        g.draw()
        setTimeout(runloop, 1000/window.fps)
    }
    runloop()
    return g
}