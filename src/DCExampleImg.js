import { useRef, useEffect, useState } from 'react';
import {
    rgbFromImgSrc,
    rgbToYCbCr,
    getYChannel,
    drawChannel,
} from './colorTransformHelper.js';
import { InlineMath } from 'react-katex';
import { imgDataInto8x8Blocks } from './imageHelper.js';
import DCExampleImgRes from './DCExampleImgRes.js';

export default function DCExampleImg({ imgSrc }) {
    const [yChannel, setYChannel] = useState();
    const [blocks, setBlocks] = useState([]);
    const originalImg = useRef();

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
            const blocks8x8 = await imgDataInto8x8Blocks(yChannel);
            setBlocks(blocks8x8);
            setYChannel(yChannel);
        }
        initImg();
    }, [imgSrc]);

    console.log('drawn');
    return <>
        <p>
            Um die Berechnung zu vereinfachen Beschränkt man sich auf <InlineMath math={`8 \\times 8`} />  Kästchen und teilt das zu komprimierende
            Bild dafür in solche ein. Für jedes dieser Kästchen wird dann mit Hilfe der diskreten Kosinustransformation eine Approximation berrechnet, indem
            Basismuster mit kleinem Koeffizienten weggelassen werden.
        </p>
        <div className="horizontal-display-container">
            <span>
                <canvas width={400} height={400} ref={originalImg} />
            </span>
            <DCExampleImgRes blocks={blocks} yChannel={yChannel} />
        </div>
    </>
}