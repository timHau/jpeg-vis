// some naive linear algebra methods i need

export function scalarMatMul(scalar, mat) {
    const res = [];
    for (let row of mat) {
        const nextRow = [];
        for (let val of row) {
            nextRow.push(scalar * val);
        }
        res.push(nextRow);
    }
    return res;
}

export function matAdd(mat1, mat2) {
    const res = [];
    for (let i = 0; i < mat1.length; ++i) {
        const nextRow = [];
        for (let j = 0; j < mat1[i].length; ++j) {
            const val = mat1[i][j] + mat2[i][j];
            nextRow.push(val)
        }
        res.push(nextRow);
    }
    return res;
}

export function zeros(n, m) {
    const res = [];
    for (let i = 0; i < n; ++i) {
        const row = [];
        for (let j = 0; j < m; ++j) {
            row.push(0)
        }
        res.push(row);
    }
    return res;
}

export function matToVec(mat) {
    const res = [];
    for (let row of mat) {
        for (let val of row) {
            res.push(val);
        }
    }
    return res;
}

export function vecToMat(vec) {
    const res = [];
    for (let i = 0; i < 8; ++i) {
        const row = [];
        for (let j = 0; j < 8; ++j) {
            const val = vec[i*8+j];
            row.push(val);
        }
        res.push(row);
    }
    return res;
}

export function getDiscCosine(x, y) {
    return (n, m) => {
        return Math.cos(n*x*Math.PI) * Math.cos(m*y*Math.PI)
    }
}

export function getDiscCosineMat(n, m) {
    const res = [];
    for (let i = 0; i < 8; ++i) {
        const col = [];
        for (let j = 0; j < 8; ++j) {
            const discCosine = getDiscCosine(i/7, j/7);
            const val = discCosine(n, m);
            col.push(val);
        }
        res.push(col);
    }
    return res;
}


export function generateRandomTile() {
    const res = [];
    for (let i = 0; i < 8; ++i) {
        const row = [];
        for (let j = 0; j < 8; ++j) {
            const val = -1 + Math.random()*2;
            row.push(val);
        }
        res.push(row);
    }
    return res;
}

export const exampleTile = [
    [  0,  29,  255,  135,  255,  255,  255,    0],
    [255,    0,  255,  255,  255,  255,    0,  255],
    [235,  255,    0,    0,    0,    0,  255,  195],
    [155,  255,    0,  255,  255,    0,  255,  215],
    [255,  255,    0,  255,  205,    0,  250,  255],
    [255,  255,    0,    0,    0,    0,  255,  255],
    [255,    0,  255,  255,  145,  255,    0,  255],
    [  0,   25,  255,  19,  255,  255,  255,    0],
].map(row => row.map(v => (v-127)/127));
