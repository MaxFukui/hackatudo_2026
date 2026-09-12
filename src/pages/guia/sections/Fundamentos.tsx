import { Rule, Section } from './shared'

export function Principios() {
  return (
    <Section id="principios" title="Princípios" lead="Quatro decisões que valem para qualquer tela. Em dúvida, volte aqui.">
      <ul className="max-w-prose space-y-2">
        <Rule>
          <span>
            <strong>Conteúdo primeiro.</strong> A tela existe para mostrar um dado ou pedir uma ação. Tudo que não ajuda nisso é ruído — inclusive decoração.
          </span>
        </Rule>
        <Rule>
          <span>
            <strong>Um ponto de ênfase por área.</strong> Um botão primário, um número grande, um título. Se tudo grita, nada é ouvido.
          </span>
        </Rule>
        <Rule>
          <span>
            <strong>Borda antes de sombra, cinza antes de cor.</strong> Cor é para significado (estado, ação), não para preencher espaço.
          </span>
        </Rule>
        <Rule>
          <span>
            <strong>Só token.</strong> Cor, tamanho de fonte, raio e espaçamento vêm de <code className="font-mono text-small">tokens.css</code>. Nada de <code className="font-mono text-small">text-[13px]</code> ou <code className="font-mono text-small">bg-[#…]</code>.
          </span>
        </Rule>
      </ul>
    </Section>
  )
}
