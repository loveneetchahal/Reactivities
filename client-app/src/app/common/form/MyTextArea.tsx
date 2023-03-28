import React from 'react';
import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

interface Props {
  name: string;
  placeholder: string;
  label?: string;
  rows: number;
}

const MyTextArea = (props: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <textarea {...field} {...props}></textarea>
      {meta.touched && meta.error? (
        <Label color={'red'} basic>{meta.error}</Label>
      ): null}
    </FormField>
  );
};

export default MyTextArea;
