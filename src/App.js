import Title from './Title.js';
import Intro from './Intro.js';
import ColorTransform from './ColorTransform.js';
import './App.css';
import 'katex/dist/katex.min.css';

export default function App() {
  return (
    <div className="App">
      <Title/>
      <Intro/>
      <ColorTransform/>
    </div>
  );
}
