import { chunk, flattenDeep, zip } from 'lodash';
import { drawChannel } from './colorTransformHelper.js';
import { getCoeffs, reconstruct } from './discreteCosineHelper.js';

export function imgDataInto8x8Blocks(imgData) {
    // WARNING / TODO only supports square images of size 8n x 8n
    const { data, width, height } = imgData;
    const firstChannelData = data.filter((_, i) => i % 4 === 0);

    const rows = chunk(firstChannelData, width);
    const rowBlocks = [];
    for (let row of rows) {
        const chunked = chunk(row, 8);
        rowBlocks.push(chunked)
    }

    const numBlocksH = Math.ceil(height / 8);
    const blocks = [];
    for (let j = 0; j < numBlocksH; ++j) {
        const blocksW = [];
        for (let i = 0; i < rowBlocks[0].length; ++i) {
            const row = [];
            for (let ix = j * 8; ix < j * 8 + 8; ++ix) {
                row.push(rowBlocks[ix][i]);
            }
            blocksW.push(row);
        }
        blocks.push(...blocksW);
    }

    return blocks;
}

export function imgDataFrom8x8Blocks(blocks8x8, width, height) {
    const [numBlocksW, numBlocksH] = [Math.ceil(width / 8), Math.ceil(height / 8)];
    const rows = [];
    for (let i = 0; i < numBlocksH; ++i) {
        const sliceInd = numBlocksW * i;
        const blockRows = blocks8x8.slice(sliceInd, sliceInd + numBlocksW);
        const blockRowsZip = zip(...blockRows);
        rows.push(flattenDeep(blockRowsZip));
    }
    const data = flattenDeep(rows);
    const context = document.createElement('canvas').getContext('2d');
    const res = context.createImageData(width, height);

    for (let i = 0; i < data.length; ++i) {
        const val = data[i];
        res.data[4 * i + 0] = val;
        res.data[4 * i + 1] = val;
        res.data[4 * i + 2] = val;
        res.data[4 * i + 3] = 255;
    }

    return res;
}

export function drawImg8x8Blocks(blocks8x8, context, width, height) {
    const asImgDatas = [];
    for (let block of blocks8x8) {
        const flat = flattenDeep(block);
        const asImgData = context.createImageData(8, 8);
        for (let i = 0; i < flat.length; ++i) {
            const val = flat[i];
            asImgData.data[4 * i + 0] = val;
            asImgData.data[4 * i + 1] = val;
            asImgData.data[4 * i + 2] = val;
            asImgData.data[4 * i + 3] = 255;
        }
        asImgDatas.push(asImgData);
    }

    for (let j = 0; j < height / 8; ++j) {
        for (let i = 0; i < width / 8; ++i) {
            drawChannel(asImgDatas[i + j * width / 8], context, [i * 8*1.3, j * 8*1.3])
        }
    }
}

export function compressBlocks(blocks8x8, precision) {
    const res = [];
    for (let block of blocks8x8) {
        const coeffs = getCoeffs(block);
        const reconst = reconstruct(coeffs, precision);
        res.push(reconst);
    }
    return res;
}