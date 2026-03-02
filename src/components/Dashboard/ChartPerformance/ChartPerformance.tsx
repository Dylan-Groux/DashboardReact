import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import CustomTooltip from './ToolTips';
import { useState } from 'react';

export interface ChartPerformanceProps {
    data: {name: string; uv: number}[];
    startDate: Date;
    endDate: Date;
}

const ChartPerformance: React.FC<ChartPerformanceProps> = ({ data }) => {
    const xAndYColor = '#707070';
    const lineColor = '#B6BDFC';
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

    const step = 10; // Intervalle de 10 km
    const maxValue = Math.max(...data.map(d => d.uv));
    const maxTick = Math.ceil(maxValue / step) * step;
    const ticks = [];
    for (let i = 0; i <= maxTick; i += step) {
      ticks.push(i);
    }

    // Largeur du chart visuel pour l'axe X (plus large que le chart principal)
    const visualWidth = 300;
    const chartWidth = 340;
    const chartHeight = 307;
    const xTickStyle = { ...xAndYFontStyle, dy: 18 };

    const [isHovered, setIsHovered] = useState(false);
    const barColor = isHovered ? '#2D5BFF' : lineColor;

    return (
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative', 
        width: chartWidth, 
        height: chartHeight }}
      >
        {/* Faux axe Y HTML/CSS aligné avec le chart principal */}
        <div
          style={{
            position: 'absolute',
            left: 0,
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
        {/* Chart pour l'axe X visuel */}
        <BarChart
          width={visualWidth}
          height={chartHeight}
          data={[]}
          margin={{ left: 0, right: 0, top: 20, bottom: 20 }}
          style={{ position: 'absolute', top: 0, left: 30, pointerEvents: 'none', zIndex: 1 }}
        >
            <XAxis
                dataKey="name"
                axisLine={{ stroke: lineColor, strokeWidth: 2, dy: 18}}
                tickLine={false}
                ticks={[]}
            />
        </BarChart>
        {/* Chart principal */}
        <BarChart
          width={chartWidth}
          height={chartHeight}
          data={data}
          margin={{ left: -22, right: 0, top: 20, bottom: 20 }}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
        >
          <XAxis
            dataKey="name"
            tickLine={false}
            tick={xTickStyle}
            axisLine={false}
          />
          <YAxis 
            tickLine={false} 
            tick={false}
            domain={[0, 'dataMax']} 
            ticks={ticks} 
            padding={{ bottom: 1 }} 
            axisLine={{ stroke: lineColor, strokeWidth: 2, dx: -10 }}
          />
          <Bar 
            dataKey="uv" 
            fill={barColor} 
            radius={[30, 30, 30, 30]} 
            barSize={14} 
            activeBar={false}
          />
           <Tooltip 
           /** Opération ternaire pour afficher le tooltip uniquement lorsque la souris survole le chart */
            content={ isHovered ? CustomTooltip : <div style={{ display: 'none' }} /> }
            active={true}
          />
        </BarChart>
      </div>
    );
}

export default ChartPerformance;
