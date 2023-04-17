import React from 'react';
import { FormField, FormLabel, FormMessage, Input, Flex } from './component-library';

interface NameFieldProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  export const NameField: React.FC<NameFieldProps> = ({ value, onChange })  => (
  <FormField name="name">
    <Flex css={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
      <FormLabel>Name</FormLabel>
      <FormMessage match="valueMissing">Please enter your name</FormMessage>
    </Flex>
    <Input type="name" required value={value} onChange={onChange} />
  </FormField>
);

export const EmailField: React.FC<NameFieldProps> = ({ value, onChange }) => (
  <FormField name="email">
    <Flex css={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
      <FormLabel>Email</FormLabel>
      <FormMessage match="valueMissing">Please enter your email</FormMessage>
      <FormMessage match="typeMismatch">Please enter a valid email</FormMessage>
    </Flex>
    <Input type="email" required value={value} onChange={onChange} />
  </FormField>
);