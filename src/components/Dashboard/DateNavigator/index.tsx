import './DateNavigator.css';
import { getMonday } from '../../../utils/NormalizeDate';

export interface DateNavigatorProps {
    periodLength?: number; // nombre de jours dans la période (ex: 28 ou 7)
    startDate: Date; // date de début de la période
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    alignToMonday?: boolean;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  periodLength = 28,
  startDate,
  setStartDate,
  alignToMonday = false,
})  => {
    const effectiveStartDate = alignToMonday ? getMonday(startDate) : new Date(startDate);
    const endDate = new Date(effectiveStartDate);
    endDate.setDate(endDate.getDate() + (periodLength - 1));
    const today = new Date();
    const nextPeriodStart = new Date(effectiveStartDate);
    const navigationStep = alignToMonday ? 7 : periodLength;

    nextPeriodStart.setDate(nextPeriodStart.getDate() + navigationStep);
    const maxNavigableStartDate = alignToMonday ? getMonday(today) : today;
    const isNextDisabled = nextPeriodStart > maxNavigableStartDate;

    const handlePrevious = () => {
        const prev = new Date(effectiveStartDate);
        prev.setDate(prev.getDate() - navigationStep);
        setStartDate(alignToMonday ? getMonday(prev) : prev);
    };

    const handleNext = () => {
        const next = new Date(effectiveStartDate);
        next.setDate(next.getDate() + navigationStep);
        setStartDate(alignToMonday ? getMonday(next) : next);
    };

    const formatedStringDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const monthNames = [
            'janv', 'fév', 'mars', 'avr', 'mai', 'juin',
            'juil', 'août', 'sept', 'oct', 'nov', 'déc'
        ];
        const month = monthNames[date.getMonth()];
        return `${day} ${month}`;
    };

    return (
        <div className='date-navigator'>
            <button
                onClick={handlePrevious}
                className='active'
            >
                &lt;
            </button>
            <div>
                <span>{formatedStringDate(effectiveStartDate)} - {formatedStringDate(endDate)}</span>
            </div>
            <button
                onClick={handleNext}
                disabled={isNextDisabled}
                className={isNextDisabled ? 'disabled' : 'active'}
            >
                &gt;
            </button>
        </div>
    );
};

export default DateNavigator;
