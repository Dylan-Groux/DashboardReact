import { useState } from 'react';
import { Bar, BarChart, XAxis, YAxis, Line } from 'recharts';
import { addMovingAverageMaxBpm } from '@api/Mapping/strategies/bpm/MapMovingAverageMaxBpm';

export interface ChartBPMProps {
  data: {
    name: string;
    pointsaveragebpm: number; // première barre
    minbpm: number; // deuxième barre
    maxbpm: number; // troisième barre
  }[];
  startDate: Date;
  endDate: Date;
}

const ChartBPM: React.FC<ChartBPMProps> = ({ data }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const barColor = selectedIndex !== null ? '#0B23F4' : '#F2F3FF';
    const xAndYColor = '#707070';
    const lineColor = '#717171';
    const xAndYFontStyle = {
      fill: xAndYColor,
      fontSize: 10,
      fontFamily: 'Inter, sans-serif',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '100%',
      letterSpacing: 0,
      textAlign: 'center',
    };

    const startBPM = 130; // Valeur de départ pour l'axe Y
    const step = 10; // Intervalle de 10 bpm
    const maxValue = Math.max(
      ...data.map(d => Math.max(d.pointsaveragebpm, d.minbpm, d.maxbpm))
    );
    const maxTick = Math.ceil((maxValue - startBPM) / step) * step + startBPM;
    const ticks = [];
    for (let i = startBPM; i <= maxTick; i += step) {
      ticks.push(i);
    }
    const pointTick = [5,15];

    // Largeur du chart visuel pour l'axe X (plus large que le chart principal)
    const chartWidth = 580;
    const chartHeight = 307;
    const xTickStyle = { ...xAndYFontStyle, dy: 10 };

    // Applique la moyenne mobile sur les données
    // Détermine le nombre de données valides (non nulles)
    const windowSize = 7; // 7 si 7 données valides, sinon 1
    console.log("name: ", data.map(d => d.name));

    const dataWithMovingAvg = addMovingAverageMaxBpm(data, windowSize);
    return (
      <div 
        style={{ position: 'relative', 
        width: chartWidth, 
        height: chartHeight }}
      >

         {/* Faux axe Y HTML/CSS aligné avec le chart principal */}
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 20, // ajuste pour surélever
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: chartHeight - 80, // ajuste pour resserrer ou étirer
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {[...ticks].reverse().map(val => (
            <span
              key={val}
              style={{
                color: '#707070',
                fontFamily: 'Inter, sans-serif',
                fontSize: 10,
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: 0,
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              {val}
            </span>
          ))}
        </div>



      <div style={{
        position: 'absolute',
        left: 60,
        top: 50,
        width: '88.5%',
        height: chartHeight - 80,
        zIndex: 0, // derrière le chart
        pointerEvents: 'none',
      }}>
        {pointTick.map((val, idx) => (
          <div
            key={val}
            style={{
              position: 'absolute',
              top: `${(1 - idx / (pointTick.length - 1)) * 50}%`,
              left: 0,
              width: '100%',
              borderTop: '1px dashed #F1F1F1',
              opacity: 0.7,
            }}
          />
        ))}

      </div>
          {/* Chart pour l'axe X visuel */}
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={[]}
            margin={{ left: 40, right: 0, top: 10, bottom: 20 }}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
          >
            <XAxis
                axisLine={{ stroke: lineColor, strokeWidth: 1, dy: 18}}
                tickLine={false}
                ticks={[]}
            />
          </BarChart>
          <BarChart
            data={dataWithMovingAvg}
            margin={{ left: -13, right: 0, top: 20, bottom: 20 }}
            width={chartWidth}
            height={chartHeight}
          >
            <XAxis
              tickLine={false}
              tick={xTickStyle}
              axisLine={false}
              dataKey="name"
            />
            <YAxis
              tickLine={false} 
              tick={false}
              domain={[startBPM, 'dataMax']} 
              ticks={ticks} 
              padding={{ bottom: 1 }} 
              axisLine={{ stroke: lineColor, strokeWidth: 1, dx: -10 }}
            />
            <Line
              type="monotone"
              dataKey="movingMaxBpm"
              stroke={barColor}
              strokeWidth={2}
              dot={(props) => (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill="#0B23F4"
                  stroke="#fff" // Bordure blanche
                  strokeWidth={1}
                  onClick={() => setSelectedIndex(props.index)}
                />
              )}
              name="Max BPM (moyenne mobile)"
            />
            <Bar dataKey="minbpm"  onClick={(_, index) => setSelectedIndex(index)} fill="#FCC1B6" radius={[10, 10, 0, 0]} barSize={14} name="Min BPM" />
            <Bar dataKey="maxbpm" onClick={(_, index) => setSelectedIndex(index)} fill="#F4320B" radius={[10, 10, 0, 0]} barSize={14} name="Max BPM" />
          </BarChart>
        </div>
    );
}

export default ChartBPM;
