import { useRef, useEffect, useState } from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import { 
    drawCosineOneDim,
    drawCosineTable,
    selectCosineTable,
    draw8x8Tile,
 } from './discreteCosineHelper.js';
 import { 
     setupCosine3d,
     drawCosine3d,
} from './cosine3dHelper.js';
import './DiscreteCosine.css';


let camera, scene, renderer, controls;

export default function DiscreteCosine() {
    const [n, setN] = useState(0);

    const cosineOneDim = useRef();
    const cosineTable = useRef();
    const cosineSelect = useRef();
    const cosine3d = useRef();
    useEffect(() => {
        const contextOneDim = cosineOneDim.current.getContext('2d');
        drawCosineOneDim(n, contextOneDim);
        const contextTable = cosineTable.current.getContext('2d');
        drawCosineTable(contextTable);
        [camera, scene, renderer, controls] = setupCosine3d(cosine3d.current);
        drawCosine3d(scene, 0, 0);
        const render = () => {
            window.requestAnimationFrame(render);
            controls.update();
            renderer.render(scene, camera);
        }
        render();
    })

    function handleChangeN(e) {
        setN(parseInt(e.target.value));
    }

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
        <p>
            Als nächstes betrachtet man für ein festes <InlineMath math={`n \\in \\mathbb{N}`}/>  die Funktion <InlineMath math={`x \\mapsto \\cos(n\\cdot x)`}/>. Diese an sich stetige 
            Funktion wird nun an einer diskreten (sprich endlichen) Anzahl an sogenannten Stützstellen ausgewertet. Im Fall des jpeg Verfahrens 
            wird diese Kosinusfunktion an 8 Stützstellen ausgewertet. Mit diesem Slider können Sie den Wert von n verändern
        </p>
        <div className="display-container">
            <div>
                <label>n: {n}</label>
                <input 
                    type="range"
                    min={0} 
                    max={8} 
                    step={1} 
                    value={n}
                    onChange={handleChangeN}
                />
            </div>
        </div>
        <p>
            In dem folgenden Plot ist die stetige Kosinusfunktion zu sehen, sowie die 8 äquidistanten Stützstellen, von denen die Funktion gesampelt wird.
        </p>
        <BlockMath math={`
            \\begin{aligned}
                f &: \\mathbb{R} \\longmapsto \\mathbb{R} \\\\
                f(x) &= \\cos(${n} \\cdot x)
            \\end{aligned}
        `}/>
        <div className="display-container">
            <canvas width={1000}  height={570} ref={cosineOneDim}/>
        </div> 
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



        <BlockMath
            math={`
                F_{x,y} = \\frac{1}{4}C_xC_y \\sum_{m=0}^7\\sum_{n=0}^7 f_{mn} 
                \\cos\\frac{(2m+1)x \\pi}{16} \\cos\\frac{(2n+1)y \\pi}{16}
            `}/>
        <p>wobei</p>
        <BlockMath
            math={`
                C_x, C_y := 
                \\begin{cases} 
                    \\frac{1}{\\sqrt{2}} & \\text{wenn } x,y = 0 \\\\
                    1 & \\text{sonst}
                \\end{cases}
            `}/>
    </div>
}