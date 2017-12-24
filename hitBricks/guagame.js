var GuaGame = function(fps, images, runCallBack) {
    //loads是图片名字:到路径的dict
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    g.canvas = canvas
    g.context = context
    g.imageByName = function(name){
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        } 
        return image
    }
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
    g.update = function(){
    
        if (pause){
            return
        }
        g.scene.update()
    }

    g.draw = function(){
        g.scene.draw()
    }
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

    //预先载入图片
    log(fps, images)
    
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++){
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function(){
            g.images[name] = img
            loads.push(1)
            log('load images', loads.length, names.length)
            if (loads.length == names.length){
                log(g.images)
                g.run()
            log('load images')
                
            }
        }
    }

    g.setScene = function(scene){
        g.scene = scene
    }

    //所有图片载入成功
    g.run = function(){
        //开始执行
        runCallBack(g)
        runloop()
    }

    log('return ')
    return g
}