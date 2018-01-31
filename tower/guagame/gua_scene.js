enableDebugModel = true
class GuaScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    addElement(guaImage) {
        guaImage.scene = this
        this.elements.push(guaImage)
    }
    draw() {
        // log('wtf ', this.elements.length)
        for (var e of this.elements){
            e.draw()
        }
        // for (var i = 0; i < this.elements.length; i++ ) {
        //     var e = this.elements[i]
        //     this.game.drawImage(e)
        // }   
    }
    update() {
        if (enableDebugModel) {
            for (var i = 0; i < this.elements.length; i++ ) {
                var e = this.elements[i]
                e.debug && e.debug()
            }              
        }
        // loge('gua scene update')
        for (var i = 0; i < this.elements.length; i++ ) {
            var e = this.elements[i]
            e.update && e.update()
        }   
    }
}
