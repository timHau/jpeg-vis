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
        imgEl.current.addEventListener('load', () => {
            const context = outputCan.current.getContext('2d');
            const rgbData = rgbFromImg(imgEl.current);
            const ycbcrData = rgbToYCbCr(rgbData);
            drawYCbCrToCanvas(ycbcrData, context);
        })
    })
    const { imgSrc } = props;
    return <div>
        <h4 className="chapter-intro">Farbmodellumrechnung</h4>
        <p>
            Das Eingabebild liegt meistens als RGB Bild vor. Besteht also aus den Kanälen Rot, Grün, Blau. 
            Damit die Komprimierung leichter wird, wird das RGB Bild in den <a href="https://de.wikipedia.org/wiki/YCbCr-Farbmodell">YCbCr</a> Farbraum umgerechnet.
            Dieser besteht aus einem Kanal Y für die Grundhelligkeit und zwei Farbkanälen Cb (Blue-Yellow Chrominance) und Cr (Red-Green Chrominance).
            Die Transformation von RGB nach YCbCr ist linear und kann somit per Matrix vektor Multiplikation durchgeführt werden. Dabei wird jeder Pixel im Eingabebild
            als 3-dimensionaler Vektor mit Komponenten R,G,B aufgefasst. Die Transformation ist dann gegeben durch:
        </p>
        <BlockMath
            math={`
                    \\begin{bmatrix} Y \\\\ Cb \\\\ Cr \\end{bmatrix} \\approx
                    \\begin{bmatrix} 0 \\\\ 128 \\\\ 128 \\end{bmatrix} + 
                    \\begin{bmatrix} 0.299 & 0.587 & 0.114 \\\\ -0.168736 & -0.331264 & 0.5 \\\\ 0.5 & -0.418688 & -0.081312 \\end{bmatrix}
                    \\cdot \\begin{bmatrix} R \\\\ G \\\\ B \\end{bmatrix}
            `} />
        <p>
            Im folgenden ist die Transformation an einem Beispielbild illustriert. Ganz links ist hier das original Bild zu sehen.
            Dieses wird dann in die drei anderen Kanäle aufgeteilt. Dabei ist das erste der Y (Grundhelligkeits)-Kanal, der zweite der Cb (Blue-Yellow Chrominance) Kanal 
            und der letzte ist der Cr (Red-Green Chrominance) Kanal.
        </p>
        <div className="ycbcr-container">
            <span>
                <img className="original" src={imgSrc} alt="original" ref={imgEl}/>
                <p className="img-sub">Original Bild</p>
            </span>
            <span className="ycbcr-output">
                <canvas width={900} height={400} ref={outputCan}/>
                <p className="img-sub">Y Kanal (links), Cb Kanal (mitte) und Cr Kanal (rechts)</p>
            </span>
        </div>
    </div>
}