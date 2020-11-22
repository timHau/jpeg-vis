import { useRef, useEffect, useState } from 'react';
import { BlockMath } from 'react-katex';
import { drawAxis } from './utils.js';

function drawCosineOneDim(n, context) {
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgba(200,200,200,0.2)';
    context.fillRect(0, 0, width, height);

    const xStart = 70;
    const xEnd = width - 70;
    const yHeight = 300
    const xAxis = [[xStart,yHeight], [xEnd,yHeight]];
    const yAxis = [[xStart, 50], [xStart, height-50]];
    drawAxis(context, xAxis, yAxis);

    const scale = 200;
    const f = x => Math.cos(n*x*3);
    context.beginPath();
    context.moveTo(xStart, yHeight - scale*f(0));
    for (let i = 0; i <= 1; i += 0.001) {
        context.lineTo((1-i)*xStart + i*xEnd, yHeight - scale*f(i));
    }
    context.strokeStyle = 'rgb(0, 0, 255)';
    context.stroke();

    context.fillStyle = 'rgb(255, 0, 0)';
    context.strokeStyle = 'rgb(255, 0, 0)';
    const cosSamples = [];
    for (let i = 0; i <= 1; i+=1/8) {
        context.beginPath();
        const p = [(1-i)*xStart + i*xEnd, yHeight];
        context.arc(...p, 5, 0, 2*Math.PI, false);
        context.fill();
        context.beginPath();
        context.moveTo(...p);
        context.lineTo(p[0], yHeight - scale*f(i));
        context.stroke();
        cosSamples.push(f(i))
    }


    const l = xEnd - xStart;
    const [boxW, boxH] = [l/8, 20];
    for (let i = 0; i < cosSamples.length; ++i) {
        context.fillStyle = `rgb(${(cosSamples[i]+1)*127}, ${(cosSamples[i]+1)*127}, ${(cosSamples[i]+1)*127})`;
        context.fillRect(20 + i*boxW, height-30, boxW, boxH);
        context.strokeStyle = 'rgb(255,0,0)';
        context.strokeRect(20 + i*boxW, height-30, boxW, boxH);
    }
}

export default function DiscreteCosine(props) {
    const [n, setN] = useState(3);

    const cosineOneDim = useRef();
    useEffect(() => {
        const can = cosineOneDim.current;
        const context = can.getContext('2d');
        drawCosineOneDim(n, context);
    })

    function handleChangeN(e) {
        setN(parseInt(e.target.value));
    }

    return <div>
        <h4 className="chapter-intro">Diskrete Kosinustransformation</h4>
        <div className="display-container">
            <canvas width={1000}  height={570} ref={cosineOneDim}/>
        </div> 
        <div className="display-container">
            <div>
                <label>n: {n}</label>
                <input 
                    type="range"
                    min={0} 
                    max={8} 
                    step={1} 
                    value={n}
                    onChange={handleChangeN}
                />
            </div>
        </div>
        <BlockMath
            math={`
                F_{x,y} = \\frac{1}{4}C_xC_y \\sum_{m=0}^7\\sum_{n=0}^7 f_{mn} 
                \\cos\\frac{(2m+1)x \\pi}{16} \\cos\\frac{(2n+1)y \\pi}{16}
            `}/>
        <p>wobei</p>
        <BlockMath
            math={`
                C_x, C_y := 
                \\begin{cases} 
                    \\frac{1}{\\sqrt{2}} & \\text{wenn } x,y = 0 \\\\
                    1 & \\text{sonst}
                \\end{cases}
            `}/>
    </div>
}