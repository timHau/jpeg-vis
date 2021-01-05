import linear from 'linear-solve';
import {
    scalarMatMul,
    matAdd,
    zeros,
    matToVec,
} from './linAlg.js';

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

export function cosValueToRgb(val) {
    return `rgb(${Math.round((val+1)*255/2)}, ${Math.round((val+1)*255/2)}, ${Math.round((val+1)*255/2)})`;
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
    const f = x => Math.cos(n*Math.PI*x);
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

export function getDiscCosine(x, y) {
    // const [c_x, c_y] = x === y ? [1/Math.sqrt(2), 1/Math.sqrt(2)] : [1, 1];
    return (n, m) => {
        // return 1/4 * c_x * c_y * Math.cos(((2*n+1)*x*Math.PI)/16) 
        //    * Math.cos(((2*m+1)*y*Math.PI)/16);
        return Math.cos(n*x*Math.PI) * Math.cos(m*y*Math.PI)
    }
}

export function getDiscCosineMat(n, m) {
    const res = [];
    for (let i = 0; i < 8; ++i) {
        const col = [];
        for (let j = 0; j < 8; ++j) {
            const discCosine = getDiscCosine(i/8, j/8);
            const val = discCosine(n, m);
            col.push(val);
        }
        res.push(col);
    }
    return res;
}


export function drawTile(mat, context) {
    const [w,h] = [context.canvas.width, context.canvas.height];
    const [stepX, stepY] = [w/8, h/8];
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x_i = i*stepX;
            const y_i = j*stepY;
            const val = mat[i][j];
            context.fillStyle = cosValueToRgb(val);
            context.fillRect(x_i, y_i, stepX, stepY);
        }
    }
}

export function draw8x8Tile(n, m, x, y, w, h, context) {
    const [stepX, stepY] = [w/8, h/8];
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const x_i = i*stepX;
            const y_i = j*stepY;
            const discCosine = getDiscCosine(i/8, j/8);
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
    context.font = "15px sans-serif"
    for (let n = 0; n < 8; ++n) {
        context.fillStyle ="black"
        context.fillText(n, 1.5*offset + n*stepX, offset/1.5)
        context.fillText(n, offset/3, 2*offset + n*stepY)
        for (let m = 0; m < 8; ++m) {
            const x = offset + n * stepX;
            const y = offset + m * stepY;
            draw8x8Tile(n, m, x, y, stepX-10, stepY-10, context)
        }
    }
}

export function selectCosineTable(e) {
    const context = e.target.getContext('2d');
    const relX = e.pageX - e.target.offsetLeft;
    const relY = e.pageY - e.target.offsetTop;
    const { width, height } = context.canvas;
    const offset = 20;
    const [stepX, stepY] = [(width-2*offset) / 8, (height-2*offset) / 8]
    const n = Math.min(7, Math.floor(relX/stepX));
    const m = Math.min(7, Math.floor(relY/stepY));
    context.clearRect(0, 0, width, height);
    drawCosineTable(context);
    context.strokeStyle = 'red';
    context.lineWidth = 3;
    context.strokeRect(offset+n*stepX, offset+m*stepY, stepX-10, stepY-10);
    return [ n, m ];
}

export function reconstruct(coeffs, precision=0.2) {
    const basis = [];
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const discCosMat = getDiscCosineMat(i, j);
            basis.push(discCosMat);
        }
    }

    let val = zeros(8, 8);
    for (let i = 0; i < coeffs.length; ++i) {
        if (Math.abs(coeffs[i]) >= precision) {
            // coeff_i * A_i
            const nextTerm = scalarMatMul(coeffs[i], basis[i]);
            val = matAdd(val, nextTerm);
        }
    }

    return val;
}

export function getCoeffs(resTile) {
    const b = matToVec(resTile);
    const A = [];
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            const discCosMat = getDiscCosineMat(i, j);
            const asVec = matToVec(discCosMat);
            A.push(asVec);
        }
    }
    return linear.solve(A, b);
}