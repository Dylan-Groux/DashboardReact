/**
 * @file FauxYAxisProps.tsx
 * @component FauxYAxis
 * @description Composant pour afficher une fausse échelle Y à côté du graphique.
 * Permet d'afficher une échelle Y personnalisée à côté du graphique, avec des ticks et des styles personnalisables.
 * Type générique pour multipliée l'utilisation dans les charts et améliorer la lisibilité du code dans les composants de chart.
 */

interface FauxYAxisProps {
    ticks: number[];
    style?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
}

export const FauxYAxis: React.FC<FauxYAxisProps> = ({ ticks, style, labelStyle }) => {
    return (
        <div
          style={{
            ...style,
          }}
        >
          {[...ticks].reverse().map(val => (
            <span
              key={val}
              style={{
                ...labelStyle,
              }}
            >
              {val}
            </span>
          ))}
        </div>
    );
}