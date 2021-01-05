import { useRef, useEffect, useState } from 'react';
import {
    drawTile,
    getCoeffs,
    reconstruct,
} from './discreteCosineHelper.js';
 import { exampleTile } from './linAlg.js';

export default function DCExamples() {
    const [precision, setPrecision] = useState(0.8);
    const tileExample = useRef();
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
    });

    function handleChangePrecision(e) {
        setPrecision(parseFloat(e.target.value));
    }

   return <>
        <div className="display-container">
            <div className="slider-container">
                <label>precision: {precision}</label>
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
            <canvas width={300} height={300} ref={tileExample}/>
            <canvas width={300} height={300} ref={exampleReconst}/>
        </div>
   </>
}