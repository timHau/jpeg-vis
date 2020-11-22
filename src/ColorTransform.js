import { useRef, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import { 
    rgbFromImg, 
    rgbToYCbCr,
    drawYCbCrToCanvas,
} from './colorTransformHelper.js';
import './ColorTransform.css'

export default function ColorTransform(props) {
    const imgEl = useRef();
    const outputCan = useRef();
    useEffect(() => {
        const context = outputCan.current.getContext('2d');
        const rgbData = rgbFromImg(imgEl.current);
        const ycbcrData = rgbToYCbCr(rgbData, context);
        drawYCbCrToCanvas(ycbcrData, context);
    })
    const { imgSrc } = props;
    return <div>
        <h4 className="chapter-intro">Farbmodellumrechnung</h4>
        <div className="ycbcr-container">
            <img className="original" src={imgSrc} alt="original" ref={imgEl}/>
            <canvas width={900} height={400} className="ycbcr-output" ref={outputCan}/>
        </div>
        <BlockMath
            math={`
                    \\begin{bmatrix} Y \\\\ Cb \\\\ Cr \\end{bmatrix} \\approx
                    \\begin{bmatrix} 0 \\\\ 128 \\\\ 128 \\end{bmatrix} + 
                    \\begin{bmatrix} 0.299 & 0.587 & 0.114 \\\\ -0.168736 & -0.331264 & 0.5 \\\\ 0.5 & -0.418688 & -0.081312 \\end{bmatrix}
                    \\cdot \\begin{bmatrix} R \\\\ G \\\\ B \\end{bmatrix}
            `} />
    </div>
}