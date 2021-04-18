import { useField } from 'formik';
import { AnimateItem } from '../../framer/Transitions';

const TextFiled = ({ icon, ...rest }) => {
  const [field, meta] = useField(rest);
  const error = meta.error && meta.touched ? meta.error : '';

  return (
    <AnimateItem>
      <label className="label">
        <i className={icon}></i>
        <input {...field} {...rest} className="label__input" />
      </label>
      <p className="error">{error}</p>
    </AnimateItem>
  );
};
export default TextFiled;
