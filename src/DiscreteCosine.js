import { useRef, useEffect } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { 
    drawCosineTable,
    selectCosineTable,
    draw8x8Tile,
 } from './discreteCosineHelper.js';
 import { 
     setupCosine3d,
     drawCosine3d,
} from './cosine3dHelper.js';
import DCExampleOneDim from './DCExampleOneDim.js';
import DCExampleReconstruct from './DCExampleReconstruct.js';
import './DiscreteCosine.css';


let camera, scene, renderer, controls;

export default function DiscreteCosine() {
    const cosineTable = useRef();
    const cosineSelect = useRef();
    const cosine3d = useRef();

    useEffect(() => {
        // draw cosine table
        const contextTable = cosineTable.current.getContext('2d');
        drawCosineTable(contextTable);
        // draw 3d plot of cosine surface
        [camera, scene, renderer, controls] = setupCosine3d(cosine3d.current);
        drawCosine3d(scene, 0, 0);
        const render = () => {
            window.requestAnimationFrame(render);
            controls.update();
            renderer.render(scene, camera);
        }
        render();
    })


    function handleSelect(e) {
        const [n, m] = selectCosineTable(e);
        const selectCanvas = cosineSelect.current;
        const selectContext = selectCanvas.getContext('2d');
        const { width, height } = selectCanvas;
        selectContext.fillRect(0, 0, width, height);
        draw8x8Tile(n, m, 0, 0, width, height, selectContext);

        for( var i = scene.children.length - 1; i >= 0; i--) { 
            const obj = scene.children[i];
            scene.remove(obj); 
       }

        drawCosine3d(scene, n, m);
    }

    return <div>
        <h4 className="chapter-intro">Diskrete Kosinustransformation</h4>
        <DCExampleOneDim/>
        <p>
            Die so von f gesampelten Werte werden nun als Grauwerte interpretiert. Dies ist anhand der Kacheln unter dem Plot zu erkennen.
            Dabei werden die gesampelten Werte vom Interval [-1, 1] ins Interval [0, 255] transformiert. Je höher also der Wert der Funktion
            an einer der Stützstellen, desto heller ist der zugehörige Grauwert. Analog korrespondiert ein niedriger Wert der Funktion zu einem 
            dunkleren Grauwert. Der Wert 0 wird hiermit also auf einen mittleren Grauwert gemapt. <br/>
            Dieses Verfahren kann man nun vom 1-dimensionalen Fall ins mehrdimensionale Übertragen. Für uns ist hier besonders
            der 2-dimensionale Fall interessant. Analog zum eindimensionalen Plot, kann man sich nun die diskreten gesampelten Werte als ein
            <InlineMath math={` 8 \\times 8`}/> Muster vorstellen, über dem eine Funktion geplotet wird. <br/>
            Dabei wird hier für <InlineMath math={`n,m \\in [0, 8]`} /> von der Funktion 
        </p>
            <BlockMath math={`
            \\begin{aligned}
                g_{m,n} &: \\mathbb{R}^2 \\longmapsto \\mathbb{R} \\\\
                g_{m,n}(x, y) &= \\cos(n x \\pi) \\cos(m y  \\pi)
            \\end{aligned}
        `}/>
        <p>
            gesampelt. In der nächsten Grafik sieht man zur Linken eine Tabelle, die die verschiedenen Muster, die entstehen können, aufzeigt.
            Dabei wird in der Tabelle jeweils die Indices als Frequenzen genommen. Die Indizierung startet dabei mit der 0. So sieht man bspw. im
            ersten Muster links oben die Funktion <InlineMath math={`g_{0,0}(x,y) = \\cos(0) \\cos(0) = 1`}/> jeweils ausgewertet auf dem <InlineMath math={` 8 \\times 8`}/> Muster. 
            Im Kästchen an der Position i,j sieht man die Funktion <InlineMath math={`g_{0,0}(i,j) = \\cos(i x \\pi) \\cos(j y \\pi)`}/>. <br/>
            In der Mitte sieht man eine Vergrößerung des aktuellen Musters und zur Rechten sieht man die dazugehörige Kosinusfunktion über dem 
            Muster geplotet. <br/>
            <span className="text-highlight">Klicken Sie auf eines der Muster um dieses auszuwählen.</span>
        </p>

        <div className="horizontal-display-container">
            <canvas width={400} height={400} ref={cosineTable} onClick={handleSelect}/>
            <canvas width={400} height={400} ref={cosineSelect} />
            <canvas width={400} height={400} ref={cosine3d} />
        </div>

        <p>
            Mit hilfe dieser 64 Blöcke, kann man nun jedes andere <InlineMath math={` 8 \\times 8`}/> Kästchen darstellen, indem man eine 
            geeignete Linearkombination findet.
        </p>

        <DCExampleReconstruct/>
    </div>
}