export function createDiagonalPattern(color = 'black') {
        let shape = document.createElement('canvas')
        shape.width = 10
        shape.height = 10
        let c = shape.getContext('2d')
        c.strokeStyle = color
        c.beginPath()
        c.moveTo(2, 0)
        c.lineTo(10, 8)
        c.stroke()
        c.beginPath()
        c.moveTo(0, 8)
        c.lineTo(2, 10)
        c.stroke()
        return c.createPattern(shape, 'repeat')
      }