function drawAxis(context, xAxis, yAxis) {
    for (let ax of [xAxis, yAxis]) {
        const [axisStart, axisEnd]  = ax;
        context.beginPath();
        context.strokeStyle = 'rgb(0,0,0)';
        context.moveTo(...axisStart);
        context.lineTo(...axisEnd);
        context.stroke();
    }
}

function canvasSetup(context) {
    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
    context.fillStyle = 'rgba(200,200,200,0.2)';
    context.fillRect(0, 0, width, height);
    return { width, height };
}

function cosValueToRgb(val) {
    return `rgb(${(val+1)*127.5}, ${(val+1)*127.5}, ${(val+1)*127.5})`;
}

export function drawCosineOneDim(n, context) {
    const { width, height } = canvasSetup(context);
    const xStart = 70;
    const xEnd = width - 70;
    const yHeight = 300
    const xAxis = [[xStart,yHeight], [xEnd,yHeight]];
    const yAxis = [[xStart, 50], [xStart, height-50]];
    drawAxis(context, xAxis, yAxis);

    const scale = 200;
    const f = x => Math.cos((2*n+1)*Math.PI*x);
    context.beginPath();
    context.moveTo(xStart, yHeight - scale*f(0));
    for (let i = 0; i <= 1; i += 0.001) {
        context.lineTo((1-i)*xStart + i*xEnd, yHeight - scale*f(i));
    }
    context.strokeStyle = 'rgb(0, 0, 255)';
    context.stroke();

    context.fillStyle = 'rgb(255, 0, 0)';
    context.strokeStyle = 'rgb(255, 0, 0)';
    const cosSamples = [];
    for (let i = 0; i <= 1; i+=1/8) {
        context.beginPath();
        const p = [(1-i)*xStart + i*xEnd, yHeight];
        context.arc(...p, 5, 0, 2*Math.PI, false);
        context.fill();
        context.beginPath();
        context.moveTo(...p);
        context.lineTo(p[0], yHeight - scale*f(i));
        context.stroke();
        cosSamples.push(f(i))
    }


    const l = xEnd - xStart;
    const [boxW, boxH] = [l/8, 20];
    for (let i = 0; i < cosSamples.length; ++i) {
        context.fillStyle = cosValueToRgb(cosSamples[i]);
        context.fillRect(20 + i*boxW, height-30, boxW, boxH);
        context.strokeStyle = 'rgb(255,0,0)';
        context.strokeRect(20 + i*boxW, height-30, boxW, boxH);
    }
}

function getDiscCosine(x, y) {
    return (n, m) => {
        return Math.cos(((2*n+1)*x*Math.PI)/16) 
             * Math.cos(((2*m+1)*y*Math.PI)/16);
    }
}

function draw8x8Tile(n, m, x, y, w, h, context) {
    const [stepX, stepY] = [w/8, h/8];
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x_i = i*stepX;
            const y_i = j*stepY;
            const discCosine = getDiscCosine(i, j);
            const val = discCosine(n, m);
            context.fillStyle = cosValueToRgb(val);
            context.fillRect(x + x_i, y + y_i, stepX, stepY);
        }
    }
}

export function drawCosineTable(context) {
    const { width, height } = canvasSetup(context);

    const offset = 20;
    const [stepX, stepY] = [(width-2*offset) / 8, (height-2*offset) / 8]
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x = offset + i * stepX;
            const y = offset + j * stepY;
            draw8x8Tile(i, j, x, y, stepX-10, stepY-10, context)
        }
    }
}

export function selectCosineTable(e) {
    console.log(e.target)
}