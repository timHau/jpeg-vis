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
    drawImg8x8Blocks,
} from './imageHelper.js';


export default function DCExampleImg({ imgSrc }) {
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
            const blocks8x8 = imgDataInto8x8Blocks(yChannel);
            const contextReconst = img8x8.current.getContext('2d');
            const { width, height } = yChannel;
            const blocksAsImgData = imgDataFrom8x8Blocks(blocks8x8, width, height);
            drawImg8x8Blocks(blocks8x8, contextReconst, width, height);
            // drawChannel(blocksAsImgData, contextReconst, [0, 0]);
        }
        initImg();
    });

    return <>
        <div className="display-container">

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