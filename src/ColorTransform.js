import { useRef, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import './ColorTransform.css'


function rgbFromImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
    return data;
}

function rgbToYCbCr(data) {
    const res = [];
    for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i+1], data[i+2]];
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        const cb = 128 + (-0.168736) * r + (-0.331264) * g + 0.5 * b;
        const cr = 128 + 0.5 * r + (-0.331264) * g + (-0.081312) * b;
        res.push(y, cb, cr)
    }
    return res
}

export default function ColorTransform(props) {
    const imgEl = useRef();
    const outputCan = useRef();
    useEffect(() => {
        const rgbData = rgbFromImg(imgEl.current)
        const ycbcrData = rgbToYCbCr(rgbData);
        console.log(ycbcrData);
    })
    const { imgSrc } = props
    return <div>
        <h4 className="chapter-intro">Farbmodellumrechnung</h4>
        <div className="ycbcr-container">
            <img className="original" src={imgSrc} alt="original" ref={imgEl}/>
            <canvas className="ycbcr-output"/>
        </div>
        <BlockMath
            math={`
                    \\begin{bmatrix} Y \\\\ Cb \\\\ Cr \\end{bmatrix} \\approx
                    \\begin{bmatrix} 0 \\\\ 128 \\\\ 128 \\end{bmatrix} + 
                    \\begin{bmatrix} 0.299 \& 0.587 \& 0.114 \\\\ -0.168736 \& -0.331264 \& 0.5 \\\\ 0.5 \& -0.418688 \& -0.081312 \\end{bmatrix}
                    \\cdot \\begin{bmatrix} R \\\\ G \\\\ B \\end{bmatrix}
            `} />
    </div>
}