import { BlockMath } from 'react-katex';
import './ColorTransform.css'

export default function ColorTransform(props) {
    const { img } = props;
    return <div>
        <h4 className="chapter-intro">Farbmodellumrechnung</h4>
        <img className="original" src={img} alt="original" />
        <BlockMath
            math={`
                    \\begin{bmatrix} Y \\\\ Cb \\\\ Cr \\end{bmatrix} \\approx
                    \\begin{bmatrix} 0 \\\\ 128 \\\\ 128 \\end{bmatrix} + 
                    \\begin{bmatrix} 0.299 \& 0.587 \& 0.114 \\\\ -0.168736 \& -0.331264 \& 0.5 \\\\ 0.5 \& -0.418688 \& -0.081312 \\end{bmatrix}
                    \\cdot \\begin{bmatrix} R \\\\ G \\\\ B \\end{bmatrix}
            `} />
    </div>
}