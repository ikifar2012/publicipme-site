import React, { useState, useEffect } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import {z} from 'zod';
const validateDomain = (value:any) => {
  const DomainSchema = z.string().url();
  try {
    DomainSchema.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}


const DomainInput: React.FC<InputProps> = ({ value }) => {
  const [Domain, setDomain] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setDomain(value);
  }, [value]);

  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setDomain(value);

    const isValidDomain = validateDomain(value);
    console.log(isValidDomain);
    setIsValid(isValidDomain);
  };

  return (
    <div>
      <Input
        type="text"
        value={Domain}
        onChange={handleInputChange}
        style={{ outlineColor: isValid ? '' : 'red' }}
        placeholder='Search by Domain'
      />
      {!isValid && <Label style={{ color: 'red' }}>Invalid Domain Address</Label>}
    </div>
  );
};

export {DomainInput};
