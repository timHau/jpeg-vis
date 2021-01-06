import DCExampleOneDim from './DCExampleOneDim.js';
import DCExampleTwoDim from './DCExampleTwoDim.js';
import DCExampleReconstruct from './DCExampleReconstruct.js';
import DCExampleImg from './DCExampleImg.js';
import './DiscreteCosine.css';

export default function DiscreteCosine(props) {
    return <div>
        <h4 className="chapter-intro">Diskrete Kosinustransformation</h4>
        <DCExampleOneDim/>
        <DCExampleTwoDim/>
        <DCExampleReconstruct/>
        <DCExampleImg imgSrc={props.imgSrc}/>
    </div>
}