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

export const exampleTile = [
    [-1,  1,  1,  1,  1,  1,  1, -1],
    [ 1, -1,  1,  1,  1,  1, -1,  1],
    [ 1,  1, -1, -1, -1, -1,  1,  1],
    [ 1,  1, -1,  1,  1, -1,  1,  1],
    [ 1,  1, -1,  1,  1, -1,  1,  1],
    [ 1,  1, -1, -1, -1, -1,  1,  1],
    [ 1, -1,  1,  1,  1,  1, -1,  1],
    [-1,  1,  1,  1,  1,  1,  1, -1],
];
