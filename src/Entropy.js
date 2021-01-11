import React from 'react';

import zigZag from './assets/ZigZag.png';

export default function Entropy() {
    return <div>
        <h4 className="chapter-intro">Entropie Kodierung</h4>
        <p>
            Um die Resultierende Matrix, welche viele Nulleinträge besitzt, weiter zu kompriemieren, wendet man nun
            eine Entropie kodierung auf die Matrix an. Hierfür wird die Matrix in einem "zig zack" Muster aufgereit und eine run-length Kodierung vorgenommen
        </p>
        <div className="horizontal-display-container">
            <span>
                <img src={zigZag} width={400} />
                <p className="img-sub">Zig Zag Muster (Quelle: Wikipedia)</p>
            </span>
        </div>
        <p>
            Durch dieses Verfahren müssen keine unnötigen Nullen gespeichert werden und die Dateigröße verkleinert sich weiter.
        </p>
    </div>
}