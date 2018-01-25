class Jiario  {
    constructor(game, text) {
        this.game = game
        this.setup()
        this.pause = 1
        this.x = 150
        this.y = 390

        this.vy = 0 
        this.vx = 0 
        this.wx = 0
        this.gy = 10
        this.alpha = 1.0
        this.pixelWidth = 2
        this.pixelSize = 8
        this.blockSize = 8
        this.frameCount = 6
        this.frameIndex = 0
        this.bytesPerBlock = 16
        this.blockPerSprite = 8

        this.w = this.pixelSize * this.pixelWidth * 2 
        this.h = this.pixelSize * this.pixelWidth * 4
        log('???', this.w, this.h)
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup() {
        this.data = bytes.slice(offset)
    }
    update() {
        this.y += this.vy
        this.vy += this.gy * 0.1
        this.vx += this.wx
        log('t ', this.vx, this.wx)
        if (this.vx * this.wx < 0) {
            log('this.vx', this.vx)
            this.x += this.vx
        } else {
            this.vx = 0
            this.wx = 0
        }
        if (this.y > 100) {
            this.y = 100
        }
        // if (this.rotation <= 45) {
        //     this.rotation += 5
        // }
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 6
            this.frameIndex++
            this.frameIndex %= 5
        }
    }
    jump() {
        this.vy = -10
    }
    draw() {

        var c = this.game.context
        c.save();
        // log('xy', this.x, this.y)
        var w2 = this.w/2
        var h2 = this.h/2
        // log('w2 h2', w2, h2)
        c.translate(this.x + w2, this.y + h2)
        if (this.flipx == false) {
            c.scale(-1, 1);
            // log('what is wrong', this.x, this.y, w2, h2)
        }
        c.translate(-w2, -h2)
        
        this.drawSprite()
        // c.drawImage(this.texture, 0, 0)


        c.restore();        
    }
    drawSprite(){
        let tileOffset = this.frameIndex * this.bytesPerBlock * this.blockPerSprite
        let context = this.game.context

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                let x = j * this.pixelSize * this.pixelWidth
                let y = i * this.pixelSize * this.pixelWidth
                let bytes = this.data.slice(tileOffset + 16*(i * 2  + j))
                this.drawBlock(context, bytes, x, y, this.pixelWidth)
            }
        }
    }
    drawBlock(context, data, x, y, pixelWidth){
        var colors = [
            'white',
            '#FE0100',
            '#FFB010',
            '#AA3030',
        ]
        let pixelSize = 8
        for (let i = 0; i < pixelSize; i++) {
            let p1 = data[i]
            let p2 = data[i+8]
            for (let j = 0; j < pixelSize; j++) {
                let c1 = (p1 >> (7 - j)) &0b00000001
                let c2 = (p2 >> (7 - j)) &0b00000001
                let c = (c2 << 1) + c1
                if (c != 0) {
                    let color = colors[c]
                    context.fillStyle = color
                    let px = x + j * pixelWidth
                    let py = y + i * pixelWidth
                    context.fillRect(px, py, pixelWidth, pixelWidth)
                }
            }
        }
    }
    drawNes(bytes){
        let canvas = e('#id-canvas')
        let context = canvas.getContext('2d')

        let numberOfBytesPerBlock = 16
        for (let i = 0; i < this.blockSize; i++) {
            for (let j = 0; j < this.blockSize; j++) {
                let x = j * pixelSize * this.pixelWidth
                let y = i * pixelSize * this.pixelWidth
                let index = window.offset + (i * 8 + j) * numberOfBytesPerBlock
                this.drawBlock(context, bytes.slice(index), x, y, this.pixelWidth)
            }
        }
    }
    
    changeFrames(name) {
        this.frames = this.allActions[name]
    }

    move(x, status) {
        this.flipx = (x > 0)
        log('after move ',status ,this.flipx)
        // this.x += x
        let speed = x*3
        if (status == 'down') {
            this.vx = speed
            this.wx = -speed/5
        }
        // this.changeFrames(animationName[status])
    }
}
