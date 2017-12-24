class Guagame {
    constructor(fps, imagePath, runCallBack) {
        window.fps = fps
        this.images = {}
        this.runCallBack = runCallBack
        this.scene = null
        this.actions = {}
        this.keydowns = {}

        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        
        var self = this
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })
        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = true
        })
        this.init(imagePath)
    }
    
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(guaImage) {
        this.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    update(){
        if (pause){
            return 
        }
        this.scene.update()
    }
    register (key, callback){
        this.actions[key] = callback
        // log('key is register')
    }
    draw(img){
        this.scene.draw()
    }
    imageByName(name){
        var g = this
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        } 
        return image
    }
    init(imagePath){
        log(window.fps, imagePath)
        var g = this
        var loads = []
        var names = Object.keys(imagePath)
        for (var i = 0; i < names.length; i++){
            let name = names[i]
            var path = imagePath[name]
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
    }
    runloop(){
        var g = this
        // log('g', g)
        // log('g actions', this.actions)
        var actions = Object.keys(this.actions)
        // log(actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]){
                g.actions[key]()
                log('key is', key)
            }
        }
        g.update()
        g.context.clearRect(0, 0, canvas.width, canvas.height);
        g.draw()
        setTimeout(function(){
            g.runloop()}, 1000/window.fps)
    }
    setScene(scene){
        this.scene = scene
    }
    run(scene){
            //开始执行
        var g = this
        this.runCallBack(g)
        this.runloop()
    }
} 

// var GuaGame = function(fps, images, runCallBack) {
//     //loads是图片名字:到路径的dict
//     var g = {
//         scene: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     g.canvas = canvas
//     g.context = context
//     g.imageByName = function(name){
//         var img = g.images[name]
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         } 
//         return image
//     }
//     // draw
//     g.drawImage = function(guaImage){
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }

//     // events
//     window.addEventListener('keyup', function(event){
//         g.keydowns[event.key] = false
//     })
//     window.addEventListener('keydown', function(event){
//         g.keydowns[event.key] = true
//     })
//     //
//     g.register = function(key, callback) {
//         g.actions[key] = callback
//     }
//     g.update = function(){
    
//         if (pause){
//             return
//         }
//         g.scene.update()
//     }

//     g.draw = function(){
//         g.scene.draw()
//     }
//     //timer
//     window.fps = 30    
//     var runloop = function(){
//         var actions = Object.keys(g.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if (g.keydowns[key]){
//                 g.actions[key]()
//             }
//         }
//         g.update()
//         context.clearRect(0, 0, canvas.width, canvas.height);
//         g.draw()
//         setTimeout(runloop, 1000/window.fps)
//     }

//     //预先载入图片
//     log(fps, images)
    
//     var loads = []
//     var names = Object.keys(images)
//     for (var i = 0; i < names.length; i++){
//         let name = names[i]
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         img.onload = function(){
//             g.images[name] = img
//             loads.push(1)
//             log('load images', loads.length, names.length)
//             if (loads.length == names.length){
//                 log(g.images)
//                 g.run()
//             log('load images')
                
//             }
//         }
//     }

//     g.setScene = function(scene){
//         g.scene = scene
//     }

//     //所有图片载入成功
//     g.run = function(){
//         //开始执行
//         runCallBack(g)
//         runloop()
//     }

//     log('return ')
//     return g
// }