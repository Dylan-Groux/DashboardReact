import type { TooltipContentProps } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import './ToolTips.css';

function formatDate(date: Date | string) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${day}.${month}`;
}

const CustomTooltip = ({ active, payload }: TooltipContentProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const { start, end } = payload[0].payload || {};
    return (
      <div className="custom-tooltip">
        <div className="custom-tooltip-label">
          {start && end ? `${formatDate(start)} au ${formatDate(end)}` : ''}
        </div>
        <div className="custom-tooltip-value">{payload[0].value} km</div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;