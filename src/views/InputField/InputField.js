import {useState} from 'react';

const InputField = (props) => {
    const [focus, setFocus] = useState('false');
    const {id, label, errorMessage, ...restAttribute} = props.data;
    return (
        <div className='form-style'>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" onBlur={()=>setFocus('true')} focused={focus} onChange={props.onChange} {...restAttribute} />
            <span>{errorMessage}</span>
        </div>
    );
};

export default InputField;