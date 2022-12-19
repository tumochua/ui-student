import style from './MySelect.module.scss';

function MySelect({ options, onChanType, value }) {
    const selected = value;
    const handleChange = (event) => {
        onChanType(event.target.value);
    };
    return (
        <>
            {options && (
                <select value={selected} onChange={handleChange} className={style.baseSelects}>
                    {options.map((option) => (
                        <option key={option.id} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}

export default MySelect;
