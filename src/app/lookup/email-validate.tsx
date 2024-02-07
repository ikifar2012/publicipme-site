import React, { useState, useEffect } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import {z} from 'zod';
const validateEmail = (value:any) => {
  const EmailSchema = z.string().email();
  try {
    EmailSchema.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}


const EmailInput: React.FC<InputProps> = ({ value }) => {
  const [Email, setEmail] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setEmail(value);
  }, [value]);

  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setEmail(value);

    const isValidEmail = validateEmail(value);
    console.log(isValidEmail);
    setIsValid(isValidEmail);
  };

  return (
    <div>
      <Input
        type="text"
        value={Email}
        onChange={handleInputChange}
        style={{ outlineColor: isValid ? '' : 'red' }}
        placeholder='Search by Email'
      />
      {!isValid && <Label style={{ color: 'red' }}>Invalid Email Address</Label>}
    </div>
  );
};

export {EmailInput};
