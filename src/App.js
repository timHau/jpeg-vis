import { useState } from 'react';
import Title from './Title.js';
import Intro from './Intro.js';
import ColorTransform from './ColorTransform.js';
import './App.css';
import 'katex/dist/katex.min.css';

import mountain from './assets/cozies-tone-unsplash.jpg';

export default function App() {
  const [img, setImg] = useState('')

  return (
    <div className="App">
      <Title/>
      <Intro/>
      <ColorTransform img={mountain}/>
    </div>
  );
}
