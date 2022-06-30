interface IProps {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    r: number;
    color: string;
    moveX: number;
    moveY: number;
}

interface IBall {
    x: number;
    y: number;
    r: number;
    color: string;
    moveX: number;
    moveY: number;
    ctx: CanvasRenderingContext2D;
    move(ballCollection: Array<this>): void;
}

export default class Ball implements IBall {
    x;

    y;

    r;

    color;

    moveX;

    moveY;

    ctx;

    constructor({ x, y, r, color, moveX, moveY, ctx }: IProps) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.moveX = moveX;
        this.moveY = moveY;
        this.ctx = ctx;
    }

    render(ballCollection: Ball[]) {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        // 找朋友
        for (let index = 0; index < ballCollection.length; index += 1) {
            const ball = ballCollection[index];
            // 如果找的是自己 就终止
            if (ball === this) {
                return;
            }
            // 勾股定理算出连个ball之间的距离 x^2 + y^2 = z^2
            const xPow = (this.x - ball.x) ** 2;
            const yPow = (this.y - ball.y) ** 2;
            if (Math.sqrt(xPow + yPow) <= 100) {
                this.ctx.strokeStyle = this.color;
                this.ctx.moveTo(this.x, this.y);
                this.ctx.lineTo(ball.x, ball.y);
                this.ctx.stroke();
            }
        }
        this.ctx.closePath();
    }

    move(ballCollection: Ball[]): void {
        this.x += this.moveX;
        this.y += this.moveY;
        // 碰壁折返
        if (this.x <= this.r || this.x > window.innerWidth - this.r) {
            this.moveX = -this.moveX;
        }
        if (this.y <= this.r || this.y > window.innerHeight - this.r) {
            this.moveY = -this.moveY;
        }
        this.render(ballCollection);
    }
}
