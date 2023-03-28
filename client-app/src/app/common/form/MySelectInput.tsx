import React from 'react';
import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

interface Props {
  placeholder: string;
  options: any;
  name: string;
  label?: string;
}

const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label htmlFor=''>{props.label}</label>
      <Select clearable
              options={props.options}
              value={field.value || null}
              onChange={(e, d) => helpers.setValue(d.value)}
              onBlur={() => helpers.setTouched(true)}
              placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color={'red'}>{meta.error}</Label>
      ): null}
    </Form.Field>
  );
};

export default MySelectInput;
