import './DateNavigator.css';

export interface DateNavigatorProps {
    periodLength?: number; // nombre de jours dans la période (ex: 28 ou 7)
    startDate: Date; // date de début de la période
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({
  periodLength = 28,
  startDate,
  setStartDate,
})  => {

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (periodLength - 1));
    const today = new Date();
    const nextPeriodStart = new Date(startDate);

    nextPeriodStart.setDate(nextPeriodStart.getDate() + periodLength);
    const isNextDisabled = nextPeriodStart > today;

    const handlePrevious = () => {
        const prev = new Date(startDate);
        prev.setDate(prev.getDate() - periodLength);
        setStartDate(prev);
    };

    const handleNext = () => {
        const next = new Date(startDate);
        next.setDate(next.getDate() + periodLength);
        setStartDate(next);
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
                <span>{formatedStringDate(startDate)} - {formatedStringDate(endDate)}</span>
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
