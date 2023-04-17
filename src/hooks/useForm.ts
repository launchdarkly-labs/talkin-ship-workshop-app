import { useState } from 'react';

const useForm = (initialValues: { [key: string]: string }) => {
  const [values, setValues] = useState(initialValues);

  const updateField = (field: string, value: string) => {
    console.log(field, value);
    setValues({
      ...values,
      [field]: value,
    });
  };

  return { values, updateField };
};

export default useForm;
