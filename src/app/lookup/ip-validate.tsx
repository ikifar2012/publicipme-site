import React, { useState, useEffect } from 'react';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import {z} from 'zod';
const validateIpAddress = (value: any) => {
  // z.string().ip() was removed in newer zod versions.
  // Use z.union([z.ipv4(), z.ipv6()]) to accept both IPv4 and IPv6 strings.
  const ipAddressSchema = z.union([z.ipv4(), z.ipv6()]);
  try {
    // Coerce non-string values to string for validation, but only if not null/undefined
    if (value === null || value === undefined) return false;
    ipAddressSchema.parse(String(value));
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
