import { useRef, useEffect, useState } from 'react';
import { drawChannel } from './colorTransformHelper.js';
import { imgDataFrom8x8Blocks, compressBlocks } from './imageHelper.js';

export default function DCExampleImgRes(props) {
    const [pres, setPres] = useState(20);
    const reconstImg = useRef();
    const { blocks, yChannel } = props;

    useEffect(() => {
        async function handleBlocks() {
            const { width, height } = yChannel;
            const compressed = compressBlocks(blocks, pres);
            const compressedImg = imgDataFrom8x8Blocks(compressed, width, height);
            const contextReconst = reconstImg.current.getContext('2d');
            drawChannel(compressedImg, contextReconst, [0, 0]);
        }
        if (blocks.length > 0 && yChannel) {
            handleBlocks();
        }
    })

    function handleChangePres(e) {
        setPres(parseInt(e.target.value));
    }

    return <>
        <div className="display-container">
            <div className="slider-container">
                <label>qualitiy: {pres}</label>
                <input 
                    type="range"
                    min={0} 
                    max={25} 
                    step={0.01} 
                    value={pres}
                    onChange={handleChangePres}
                />
            </div>
        </div>
        <div className="horizontal-display-container">
            <canvas width={400} height={400} ref={reconstImg} />
        </div>
    </>
}