import { useRef, useEffect, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { drawCosineOneDim } from './discreteCosineHelper.js';

export default function DCExampleOneDim() {
    const [n, setN] = useState(1);
    const cosineOneDim = useRef();

    useEffect(() => {
        // draw one dimensional cosine
        const contextOneDim = cosineOneDim.current.getContext('2d');
        drawCosineOneDim(n, contextOneDim);
    });

    function handleChangeN(e) {
        setN(parseInt(e.target.value));
    }

    return <>
        <p>
            Als nächstes betrachtet man für ein festes <InlineMath math={`n \\in \\mathbb{N}`}/>  die Funktion <InlineMath math={`x \\mapsto \\cos(n\\cdot x)`}/>. Diese an sich stetige 
            Funktion wird nun an einer diskreten (sprich endlichen) Anzahl an sogenannten Stützstellen ausgewertet. Im Fall des jpeg Verfahrens 
            wird diese Kosinusfunktion an 8 Stützstellen ausgewertet. Mit diesem Slider können Sie den Wert von n verändern
        </p>
        <div className="display-container">
            <div className="slider-container">
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
        <p>
            In dem folgenden Plot ist die stetige Kosinusfunktion zu sehen, sowie die 8 äquidistanten Stützstellen, von denen die Funktion gesampelt wird.
        </p>
        <BlockMath math={`
            \\begin{aligned}
                f &: \\mathbb{R} \\longmapsto \\mathbb{R} \\\\
                f(x) &= \\cos(${n} \\cdot x)
            \\end{aligned}
        `}/>
        <div className="display-container">
            <canvas width={1000}  height={570} ref={cosineOneDim}/>
        </div> 
    </>
}