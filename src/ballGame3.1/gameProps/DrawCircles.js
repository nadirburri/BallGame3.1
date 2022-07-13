export function DrawCircles(canvas, c, circle, level) {
    let { x, y, radius, lineWidth, color, borderColor} = circle
    
    let data = new Circle(x, y, radius, lineWidth, color, borderColor)
    data.draw(c)
}

// VIZATOJE TOPIN PAS ÇDO RIRENDERIMI
function Circle(x, y, radius, lineWidth, color, borderColor) {
    this.x = x
    this.y = y
    this.radius = radius
    this.lineWidth = lineWidth
    this.color = color
    this.borderColor = borderColor

    this.draw = function (c) {
        c.beginPath();
        c.lineWidth = lineWidth;
        c.strokeStyle = borderColor;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}