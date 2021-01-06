import Title from './Title.js';
import Intro from './Intro.js';
import ColorTransform from './ColorTransform.js';
import DiscreteCosine from './DiscreteCosine.js';
import Resources from './Resources.js';
import './App.css';
import 'katex/dist/katex.min.css';

import mountain from './assets/berg_296x296.jpg';

export default function App() {
  return (
    <div className="App">
      <Title/>
      <Intro/>
      <ColorTransform imgSrc={mountain}/>
      <DiscreteCosine imgSrc={mountain}/>
      <Resources/>
    </div>
  );
}
