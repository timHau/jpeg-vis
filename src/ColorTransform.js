import { useRef, useEffect } from 'react';
import { BlockMath } from 'react-katex';
import './ColorTransform.css'


function rgbFromImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 1;
    canvas.height = img.naturalHeight || 1;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

function rgbToYCbCr(rgb, context) {
    const res = context.createImageData(rgb);
    for (let i = 0; i < rgb.data.length; i += 4) {
        const [r, g, b] = [rgb.data[i], rgb.data[i+1], rgb.data[i+2]];
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        const cb = 128 + (-0.168736) * r + (-0.331264) * g + 0.5 * b;
        const cr = 128 + 0.5 * r + (-0.331264) * g + (-0.081312) * b;
        res.data[i  ] = y;
        res.data[i+1] = cb;
        res.data[i+2] = cr;
        res.data[i+3] = rgb.data[i+3]
    }
    return res
}

function yCbCrTorgb(ycbcr, context) {
    const res = context.createImageData(ycbcr);
    for (let i = 0; i < ycbcr.data.length; i += 4) {
        const [y, cb, cr] = [ycbcr.data[i], ycbcr.data[i+1], ycbcr.data[i+2]];
        const r = y + 1.4 * (cr - 128);
        const g = y + (-0.343) * (cb - 128) + (-0.711) * (cr - 128);
        const b = y + 1.765 * (cb - 128);
        res.data[i  ] = y;
        res.data[i+1] = cb;
        res.data[i+2] = cr;
        res.data[i+3] = ycbcr.data[i+3]
    }
    return res
}

function drawChannel(data, context, pos) {
    const tmpCan = document.createElement('canvas');
    tmpCan.width = data.width;
    tmpCan.height = data.height;
    const tmpContext = tmpCan.getContext('2d');
    tmpContext.putImageData(data, 0, 0);
    const img = document.createElement('img');
    img.src = tmpCan.toDataURL();
    img.onload = () => {
        context.drawImage(img, ...pos);
    }
}

function drawYCbCrToCanvas(imgdata, context) {
    const y = context.createImageData(imgdata);
    const cb = context.createImageData(imgdata);
    const cr = context.createImageData(imgdata);
    for (let i = 0; i < imgdata.data.length; i += 4) {
        const yData = imgdata.data[i]
        const cbData = imgdata.data[i+1]
        const crData = imgdata.data[i+2]
        y.data[i] = yData; y.data[i+1] = yData; y.data[i+2] = yData; y.data[i+3] = 255;
        cb.data[i] = 128; cb.data[i+1] = 128; cb.data[i+2] = cbData; cb.data[i+3] = 255;
        cr.data[i] = crData; cr.data[i+1] = 128; cr.data[i+2] = 128; cr.data[i+3] = 255;
    }
    drawChannel(yCbCrTorgb(y, context), context, [0, 0]);
    drawChannel(yCbCrTorgb(cb, context), context, [300, 0]);
    drawChannel(yCbCrTorgb(cr, context), context, [600, 0]);
}

export default function ColorTransform(props) {
    const imgEl = useRef();
    const outputCan = useRef();
    useEffect(() => {
        const can = outputCan.current;
        const context = can.getContext('2d');
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
                    \\begin{bmatrix} 0.299 \& 0.587 \& 0.114 \\\\ -0.168736 \& -0.331264 \& 0.5 \\\\ 0.5 \& -0.418688 \& -0.081312 \\end{bmatrix}
                    \\cdot \\begin{bmatrix} R \\\\ G \\\\ B \\end{bmatrix}
            `} />
    </div>
}