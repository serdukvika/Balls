const canvas = document.getElementById("canvas");
const n = 10;
const colors = [ "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Lime"];

class Ball {
  // конструктор для шариков
  constructor(canvas, colors, x = 100, y = 100) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.colors = colors;
    this.color = this.getColor();
    this.width = canvas.width;
    this.height = canvas.height;
    this.xSpeed = Math.floor(Math.random() * 10);
    this.ySpeed = Math.floor(Math.random() * 10);
  }

  // функция рисования шарика
  circle(x, y, radius, fillCircle = true) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
      this.context.fill();
    } else {
      this.context.stroke();
    }
  }
  draw() {
    this.context.fillStyle = this.color;
    this.circle(this.x, this.y, 3, true);
  }
  getColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollosion() {
    if (this.x < 0 || this.x > this.width) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y < 0 || this.y > this.height) {
      this.ySpeed = -this.ySpeed;
    }
  }
}

class BallsField{
    constructor(balls, canvas){
        this.context = canvas.getContext("2d");
        this.balls = balls;
        this.width = canvas.width;
        this.height = canvas.height;

        this.clear();
        this.drawBorder();
    }

    clear(){
        this.context.fillStyle = this.context.clearRect(
          0,
           0,
            this.width,
             this.height
             );        
    }

    drawBorder(){
        this.context.strokeStyle = 'red';
        this.context.lineWidth = 3;
        this.context.strokeRect(0, 0, this.width, this.height);
    }

    go() {
        this.clear();
        for (let i = 0; i < 10; i++) {
            this.balls[i].draw();
            this.balls[i].move();
            this.balls[i].checkCollosion();
        }
        this.drawBorder();
    }

    start(){
        setInterval(this.go.bind(this), 30);
    }
}

const balls = [];

for (let i = 0; i < n; i++) {
    balls[i] = new Ball(canvas,colors);
}

const ballsField = new BallsField(balls, canvas);

ballsField.start();
