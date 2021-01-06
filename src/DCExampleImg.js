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
} from './imageHelper.js';


export default function DCExampleImg({ imgSrc }) {
    const originalImg = useRef();
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
            // drawChannel(yChannel, contextOriginal, [0, 0]);
            // reconstruct image
            // const blocks8x8 = imgDataInto8x8Blocks(yChannel);
            const contextReconst = reconstImg.current.getContext('2d');
            // draw8x8Blocks(blocks8x8, yChannel, contextReconst);



            const TMP_w = 296
            const TMP_h = 296
            const TMP = contextOriginal.createImageData(TMP_w, TMP_h);
            for (let i = 0; i< TMP.data.length; i +=4) {
                const v = Math.floor(Math.random() * 255);
                TMP.data[i] = v;
                TMP.data[i+1] = v;
                TMP.data[i+2] = v;
                TMP.data[i+3] = 255;
            }
           drawChannel(TMP, contextOriginal, [0,0])
            const TMP_blocks = imgDataInto8x8Blocks(TMP);
            const TMP_data = imgDataFrom8x8Blocks(TMP_blocks, TMP_w, TMP_h);
            console.log(TMP_data);
           drawChannel(TMP_data, contextOriginal, [TMP_w + 10,0])

        }
        initImg();
    });

    return <>
        <div className="display-container">

        </div>
        <div className="horizontal-display-container">
            <span>
                <canvas width={400} height={400} ref={originalImg} />
                <canvas width={400} height={400} ref={reconstImg} />
            </span>
        </div>
    </>
}