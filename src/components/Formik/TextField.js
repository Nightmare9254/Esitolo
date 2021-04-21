import { useField } from 'formik';
import { useState } from 'react';
import { AnimateItem } from '../../framer/Transitions';

const TextFiled = ({ icon, ...rest }) => {
  const [field, meta] = useField(rest);
  const error = meta.error && meta.touched ? meta.error : '';
  const [focus, setFocus] = useState(false);

  return (
    <AnimateItem>
      <label
        className={`label ${focus ? 'label--focused' : null}`}
        onClick={(e) => {
          e.preventDefault();
          setFocus(true);
        }}
        onBlur={(e) => {
          e.preventDefault();
          setFocus(false);
        }}
      >
        <i className={icon}></i>
        <input {...field} {...rest} className="label__input" />
      </label>
      <p className="error">{error}</p>
    </AnimateItem>
  );
};
export default TextFiled;
