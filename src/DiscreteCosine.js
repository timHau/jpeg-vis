import DCExampleOneDim from './DCExampleOneDim.js';
import DCExampleTwoDim from './DCExampleTwoDim.js';
import DCExampleReconstruct from './DCExampleReconstruct.js';
import './DiscreteCosine.css';

export default function DiscreteCosine() {
    return <div>
        <h4 className="chapter-intro">Diskrete Kosinustransformation</h4>
        <DCExampleOneDim/>
        <DCExampleTwoDim/>
        <DCExampleReconstruct/>
    </div>
}