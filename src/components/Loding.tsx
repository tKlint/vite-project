import React, { useEffect, useRef } from 'react'
import { Ball } from '../util/ball';
import { createRandomColor, createRandomPath } from '../util/random';

const Loading: React.FC<{}> = props => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderCanvas = () => {
     
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
      
        const ballCollection: Array<Ball> = [];

        for (let index = 0; index < 40; index++) {
            const [x, y] = createRandomPath([0, window.innerWidth], [0, window.innerHeight]);
            const color = createRandomColor();
            let moveX = parseInt((Math.random() * 10).toString()) - 5;
            let moveY = parseInt((Math.random() * 10).toString()) - 5;
            moveX = moveX === 0 ? 1 : moveX;
            moveY = moveY === 0 ? 1 : moveY;
            let ball = new Ball({x, y, r: 10, color, moveX, moveY, ctx});
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






    return <canvas id='game' ref={canvasRef} />
}
export default Loading;