import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';

export default function Quantization() {
    return <div>
        <h4 className="chapter-intro">Quantisierung</h4>
        <p>
            Das menschliche Auge kann zwar sehr kleine Unterschiede in Helligkeit erkennen, allerdings tut es sich schwer die genaue Stärke einer Helligkeitsfrequenz änderung zu erkennen.
            Dies wird in der JPEG Komprimierung genutzt, indem man die Koeffizienten der Linearkombination durch einen konstanten Faktor teilt und anschließend auf die nächste ganze Zahl rundet.
            Durch diese Quantisierung werden einige der Koeffizienten auf die Null geschickt und verschwinden somit aus der Linearkombination. In diesem Schritt wird also ein Verlust erzeugt.
            Die Stärke der Quantisierung wird in der Praxis durch eine Quantisierungsmatrix erzielt. Eine typische Quantisierungsmatrix ist zum Beispiel
        </p>
        <BlockMath math={`
            \\begin{aligned}
                Q = \\begin{bmatrix}
                    16 & 11 & 10 & 16 & 24 & 40 & 51 & 61 \\\\
                    12 & 12 & 14 & 19 & 26 & 58 & 60 & 55 \\\\
                    14 & 13 & 16 & 24 & 40 & 57 & 69 & 56 \\\\
                    14 & 17 & 22 & 29 & 51 & 87 & 80 & 62 \\\\
                    18 & 22 & 37 & 56 & 68 & 109 & 103 & 77 \\\\
                    24 & 35 & 55 & 64 & 81 & 104 & 113 & 92 \\\\
                    49 & 64 & 78 & 87 & 103 & 121 & 120 & 101 \\\\
                    72 & 92 & 95 & 98 & 112 & 100 & 103 & 99 
                \\end{bmatrix}
            \\end{aligned}
        `} />
        <p>
            Für jeden Koeffizient <InlineMath math={`K_{i,j}`} /> wird dann der korrespondierende quantisierte Koeffizient 
        </p>
        <BlockMath math={`
            B_{i,j} = \\text{round}(\\frac{K_{i,j}}{Q_{i,j}})
        `} />
        <p>
            berechnet. Diese Koeffizienten werden dann zusammen mit der verwendeten Matrix gespeichert. Wie oben angesprochen sorgt dieser verlustbehaftete
            Schritt dafür, dass kleine Koeffizienten zur Null gerundet werden und die resultierende quantisierte Matrix viele Nullen enthält.
        </p>
    </div>
}