class Guagame {
    constructor(fps, imagePath, runCallBack) {
        window.fps = fps
        this.images = {}
        this.runCallBack = runCallBack
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.mouseActions = []
        log('guagame ')
        this.canvas = document.getElementById('canvas');
        this.context = canvas.getContext('2d');
        
        var self = this
        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = 'up'
        })
        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = 'down'
        })
        let moving = false
        window.addEventListener('mousedown', event => {
            moving = true
            for (let a of this.mouseActions) {
                a(event, 'down')
            }
        })        
        window.addEventListener('mousemove', event => {
            if (moving) {
                for (let a of this.mouseActions) {
                    a(event, 'move')
                }
            }
        })        
        window.addEventListener('mouseup', event => {
            moving = false
            for (let a of this.mouseActions) {
                a(event, 'up')
            }
        })        
        log('before init')
        this.init(imagePath)
    }
    
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(guaImage) {
        // log('gua img ',guaImage.x)
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y)
    }

    update(){
        // log('update' ,pause)
        if (pause){
            return 
        }
        this.scene.update()
    }
    register (key, callback){
        this.actions[key] = callback
        // log('key is register')
    }
    registerMouse(callback,) {
        this.mouseActions.push(callback)
    }
    draw(){
        // if (pause){
        //     log('draw pause')
        //     return
        // }
        this.scene.draw()
    }
    textureByName(name){
        var g = this
        var img = g.images[name]
        return  img
    }
    init(imagePath){
        log(window.fps, imagePath)
        var g = this
        var loads = []
        var names = Object.keys(imagePath)
        log(names.length)
        for (var i = 0; i < names.length; i++){
            let name = names[i]
            var path = imagePath[name]
            let img = new Image()
            img.src = path
            img.onload = function(){
                g.images[name] = img
                loads.push(1)
                // log('load images', loads.length, names.length)
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
            var status = g.keydowns[key]
            if (status == 'down'){
                g.actions[key]('down')
                // log('key is', key)
            } else if (status == 'up') {
                g.actions[key]('up')
                g.keydowns[key] = null
            }
        }
        g.update()
        g.context.clearRect(0, 0, canvas.width, canvas.height);
        g.draw()
        setTimeout(function(){
            g.runloop()}, 1000/window.fps)
        // log(window.fps)
    }
    setScene(scene){
        this.scene = scene
    }
    run(scene){
        log('开始执行')
        var g = this
        this.runCallBack(g)
        enableDebugModel(true ,true, g)
        this.runloop()
    }
} 
