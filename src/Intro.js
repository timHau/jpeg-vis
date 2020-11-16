import './Intro.css';

export default function Intro() {
    return <p className="intro">
        Die Abkürzung JPEG steht für <span className="text-highlight">Joint Photographic Experts Group</span>, welches
        die JPEG Norm festgelegt hat.
        Bei JPEG handelt es sich um eine verlustbehaftete Komprimierung, was bedeutet, dass
        komprimiertes und Originalbild nicht genau übereinstimmen. Das geläufigste JPEG Format (JFIF für <span className="text-highlight">JPEG File Interchange Format</span>)
        funktioniert, einfach gesagt, nach folgenden Schritten.
      <ol>
            <li>Farbmodellumrechnung (RGB zu YCbCr)</li>
            <li>Tiefpassfilter</li>
            <li>diskrete Kosinustransformation</li>
            <li>Quantisierung</li>
            <li>Umsortierung und Entropiekodierung</li>
        </ol>
    </p>
}