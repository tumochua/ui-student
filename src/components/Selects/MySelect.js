import style from './MySelect.module.scss';

function MySelect({ options, onChanType, value }) {
    const selected = value;
    const handleChange = (event) => {
        onChanType(event.target.value);
    };
    return (
        <div>
            <select value={selected} onChange={handleChange} className={style.baseSelects}>
                {options.map((option) => (
                    <option key={option.id} value={option.value}>
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default MySelect;
