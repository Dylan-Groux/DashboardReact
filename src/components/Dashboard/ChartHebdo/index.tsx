import { PieChart, Pie, Cell} from 'recharts';

const ChartHebdo: React.FC<{ objectif: number, totalHebdoActivities: number }> = ({ objectif, totalHebdoActivities }) => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={[
          { value: totalHebdoActivities },
          { value: Math.max(objectif - totalHebdoActivities, 0) }
        ]}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={50}
        startAngle={0}
        endAngle={360}
        isAnimationActive={false}
        paddingAngle={0}
        cornerRadius={4}
        stroke='none'
      >
        <Cell fill="#0B23F4" /> {/* bleu foncé */}
        <Cell fill="#B6BDFC" />    {/* partie non réalisée, bleu clair */}
      </Pie>
    </PieChart>
  );
};

export default ChartHebdo;