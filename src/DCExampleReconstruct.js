import { useRef, useEffect, useState } from 'react';
import {
    drawTile,
    getCoeffs,
    reconstruct,
    drawCoeffTable,
} from './discreteCosineHelper.js';
 import { exampleTile } from './linAlg.js';

export default function DCExampleReconstruct() {
    const [precision, setPrecision] = useState(0.00001);
    const tileExample = useRef();
    const exampleTable = useRef();
    const exampleReconst = useRef();

    useEffect(() => {
        // draw example for linear equation
        const contextExample = tileExample.current.getContext('2d');
        drawTile(exampleTile, contextExample);
        // handle reconstruction of example tile
        const coeffs = getCoeffs(exampleTile);
        const reconstruction = reconstruct(coeffs, 1.0 - precision);
        const contextReconst = exampleReconst.current.getContext('2d');
        drawTile(reconstruction, contextReconst);
        // draw coefficints of patterns as table
        const contextTable = exampleTable.current.getContext('2d');
        drawCoeffTable(coeffs, 1.0 - precision, contextTable);
    });

    function handleChangePrecision(e) {
        setPrecision(parseFloat(e.target.value));
    }

   return <>
        <div className="display-container">
            <div className="slider-container">
                <label>precision: {precision.toFixed(5)}</label>
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
            <canvas width={400} height={400} ref={tileExample}/>
            <canvas width={400} height={400} ref={exampleTable}/>
            <canvas width={400} height={400} ref={exampleReconst}/>
        </div>
   </>
}