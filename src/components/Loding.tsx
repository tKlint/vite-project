import React, { useEffect, useRef } from 'react'
import { Ball } from '../util/ball';
import { createRandomColor, createRandomPath } from '../util/random';

const Loading: React.FC<{
    style?: React.CSSProperties;
    width?: number;
    height?: number;
}> = props => {
    const { style, width, height } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderCanvas = () => {
     
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width || window.innerWidth
        canvas.height = height || window.innerHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
      
        const ballCollection: Array<Ball> = [];

        ctx.moveTo( 0, 0 );
        ctx.lineTo( 0 + canvas.width, 0 );
        ctx.lineTo( 0 + canvas.width, 0 + canvas.height  );
        ctx.lineTo( 0, 0 + canvas.height  );
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#f40';  //描边颜色
        ctx.fillStyle = '#f40';  //填充颜色

        ctx.fill();  //填充
        ctx.stroke();  //描边

        for (let index = 0; index < 40; index++) {
            const [x, y] = createRandomPath([0, window.innerWidth], [0, window.innerHeight]);
            const color = createRandomColor();
            let moveX = parseInt((Math.random() * 10).toString()) - 5;
            let moveY = parseInt((Math.random() * 10).toString()) - 5;
            moveX = moveX === 0 ? 1 : moveX;
            moveY = moveY === 0 ? 1 : moveY;
            let ball = new Ball({x, y, r: 8, color, moveX, moveY, ctx});
            ball.render(ballCollection);
            ballCollection.push(ball);
        }

        const move = () => {
            ctx.clearRect(0, 0, window.innerWidth, innerHeight);
            for (let index = 0; index < ballCollection.length; index++) {
                const ball = ballCollection[index];
                ball.move(ballCollection);
            }
            requestAnimationFrame(move)
        }
        move();
    }

    useEffect(() => {
        renderCanvas();
    }, []);

    return <div style={style}>
        <canvas id='game' ref={canvasRef} />
    </div>
}
export default Loading;