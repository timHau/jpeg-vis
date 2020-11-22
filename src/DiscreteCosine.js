import { useRef, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import { drawAxis } from './utils.js';

function drawCosineOneDim(context) {
    drawAxis(context, 
        [[50,350], [850,350]], 
        [[50,50], [50, 400]]
    );
}

export default function DiscreteCosine(props) {
    const cosineOneDim = useRef();
    useEffect(() => {
        const can = cosineOneDim.current;
        const context = can.getContext('2d');
        drawCosineOneDim(context);
    })

    return <div>
        <h4 className="chapter-intro">Diskrete Kosinustransformation</h4>
        <div className="canvas-container">
            <canvas width={900}  height={400} ref={cosineOneDim}/>
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