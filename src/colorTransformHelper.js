export function rgbFromImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 1;
    canvas.height = img.naturalHeight || 1;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

export function rgbToYCbCr(rgb, context) {
    const res = context.createImageData(rgb);
    for (let i = 0; i < rgb.data.length; i += 4) {
        const [r, g, b] = [rgb.data[i], rgb.data[i+1], rgb.data[i+2]];
        const y = 0.299 * r + 0.587 * g + 0.114 * b;
        const cb = 128 + (-0.168736) * r + (-0.331264) * g + 0.5 * b;
        const cr = 128 + 0.5 * r + (-0.331264) * g + (-0.081312) * b;
        res.data[i  ] = y;
        res.data[i+1] = cb;
        res.data[i+2] = cr;
        res.data[i+3] = rgb.data[i+3]
    }
    return res
}

function drawChannel(data, context, pos) {
    const tmpCan = document.createElement('canvas');
    tmpCan.width = data.width;
    tmpCan.height = data.height;
    const tmpContext = tmpCan.getContext('2d');
    tmpContext.putImageData(data, 0, 0);
    const img = document.createElement('img');
    img.src = tmpCan.toDataURL();
    img.onload = () => {
        context.drawImage(img, ...pos);
    }
}

export function drawYCbCrToCanvas(imgdata, context) {
    const y = context.createImageData(imgdata);
    const cb = context.createImageData(imgdata);
    const cr = context.createImageData(imgdata);
    for (let i = 0; i < imgdata.data.length; i += 4) {
        const yData = imgdata.data[i]
        const cbData = imgdata.data[i+1]
        const crData = imgdata.data[i+2]
        y.data[i] = yData; y.data[i+1] = yData; y.data[i+2] = yData; y.data[i+3] = 255;
        cb.data[i] = 128; cb.data[i+1] = 128; cb.data[i+2] = cbData; cb.data[i+3] = 255;
        cr.data[i] = crData; cr.data[i+1] = 128; cr.data[i+2] = 128; cr.data[i+3] = 255;
    }
    drawChannel(y, context, [0, 0]);
    drawChannel(cb, context, [300, 0]);
    drawChannel(cr, context, [600, 0]);
}