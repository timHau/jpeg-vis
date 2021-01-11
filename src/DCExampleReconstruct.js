import { useRef, useEffect, useState } from 'react';
import {
    drawTile,
    getCoeffs,
    reconstruct,
    drawCoeffTable,
} from './discreteCosineHelper.js';
 import { exampleTile } from './linAlg.js';

export default function DCExampleReconstruct() {
    const [precision, setPrecision] = useState(1);
    const tileExample = useRef();
    const exampleTable = useRef();
    const exampleReconst = useRef();
    const exampleCompareOrig = useRef();
    const exampleCompareRec = useRef();

    useEffect(() => {
        // draw example for linear equation
        const contextExample = tileExample.current.getContext('2d');
        drawTile(exampleTile, contextExample);
        // handle reconstruction of example tile
        const coeffs = getCoeffs(exampleTile);
        const reconstruction = reconstruct(coeffs, precision);
        const contextReconst = exampleReconst.current.getContext('2d');
        drawTile(reconstruction, contextReconst);
        // draw coefficints of patterns as table
        const contextTable = exampleTable.current.getContext('2d');
        drawCoeffTable(coeffs, precision, contextTable);
        // compare both patterns in smaller size
        const contextCompareOrig = exampleCompareOrig.current.getContext('2d');
        const contextCompareRec = exampleCompareRec.current.getContext('2d');
        drawTile(exampleTile, contextCompareOrig);
        drawTile(reconstruction, contextCompareRec);
    });

    function handleChangePrecision(e) {
        setPrecision(parseFloat(e.target.value));
    }

   return <>
        <div className="display-container">
            <div className="slider-container">
                <label>quality: {precision.toFixed(5)}</label>
                <input 
                    type="range"
                    min={0} 
                    max={1} 
                    step={0.0001} 
                    value={precision}
                    onChange={handleChangePrecision}
                />
            </div>
        </div>
        <div className="horizontal-display-container">
            <span>
                <canvas width={400} height={400} ref={tileExample}/>
                <p className="img-sub">Original Muster (Skaliert)</p>
            </span>
            <span>
                <canvas width={400} height={400} ref={exampleTable}/>
                <p className="img-sub">Koeffizienten der Linearkombination</p>
            </span>
            <span>
                <canvas width={400} height={400} ref={exampleReconst}/>
                <p className="img-sub">Rekonstruirtes Muster (skaliert)</p>
            </span>
            <span>
                <canvas width={40} height={40} ref={exampleCompareOrig}/>
                <canvas width={40} height={40} ref={exampleCompareRec}/>
            </span>
        </div>
   </>
}