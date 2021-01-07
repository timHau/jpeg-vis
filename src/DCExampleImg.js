import { useRef, useEffect, useState } from 'react';
import {
    rgbFromImgSrc,
    rgbToYCbCr,
    getYChannel,
    drawChannel,
} from './colorTransformHelper.js';
import { 
    imgDataInto8x8Blocks,
    imgDataFrom8x8Blocks,
    compressBlocks,
} from './imageHelper.js';


export default function DCExampleImg({ imgSrc }) {
    const [pres, setPres] = useState(20);

    const originalImg = useRef();
    const img8x8 = useRef();
    const reconstImg = useRef();

    useEffect(() => {
        async function initImg() {
            const contextOriginal = originalImg.current.getContext('2d');
            // get rgb data from img
            const rgbData = await rgbFromImgSrc(imgSrc);
            // convert to YCbCr 
            const yCbCr = rgbToYCbCr(rgbData);
            // we are only interested in the Y channel here
            const yChannel = getYChannel(yCbCr);
            // draw Y channel of original image
            drawChannel(yChannel, contextOriginal, [0, 0]);
            // split img in 8x8 blocks and plot them
            const contextReconst = img8x8.current.getContext('2d');
            const { width, height } = yChannel;
            const blocks8x8 = imgDataInto8x8Blocks(yChannel);
            const compressed = compressBlocks(blocks8x8, pres);
            const compressedImg = imgDataFrom8x8Blocks(compressed, width, height);
            drawChannel(compressedImg, contextReconst, [0,0])
        }
        initImg();
    });

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
            <span>
                <canvas width={400} height={400} ref={originalImg} />
                <canvas width={400} height={400} ref={img8x8} />
                <canvas width={400} height={400} ref={reconstImg} />
            </span>
        </div>
    </>
}