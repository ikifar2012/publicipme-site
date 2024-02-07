import React, { useState, useEffect } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import {z} from 'zod';
import revalidateResults from './revalidate-results';
const validateIpAddress = (value:any) => {
  const ipAddressSchema = z.string().ip();
  try {
    ipAddressSchema.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}


const IpAddressInput: React.FC<InputProps> = ({ value }) => {
  const [ipAddress, setIpAddress] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIpAddress(value);
  }, [value]);

  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setIpAddress(value);

    const isValidIpAddress = validateIpAddress(value);
    console.log(isValidIpAddress);
    setIsValid(isValidIpAddress);
  };

  return (
    <div>
      <Input
        type="text"
        value={ipAddress}
        onChange={handleInputChange}
        style={{ outlineColor: isValid ? '' : 'red' }}
        placeholder='Search by IP'
      />
      {!isValid && <Label style={{ color: 'red' }}>Invalid IP Address</Label>}
    </div>
  );
};

export {IpAddressInput};
