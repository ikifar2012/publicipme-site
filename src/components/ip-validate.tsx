import React, { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

const validateIpAddress = (value:any) => {
  const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:([0-9a-fA-F]{1,4}:){0,5}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,6}:([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,5}:([0-9a-fA-F]{1,4}:){0,7}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,4}:([0-9a-fA-F]{1,4}:){0,8}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,3}:([0-9a-fA-F]{1,4}:){0,9}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,2}:([0-9a-fA-F]{1,4}:){0,10}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,1}:([0-9a-fA-F]{1,4}:){0,11}[0-9a-fA-F]{1,4}$|:^:((:[0-9a-fA-F]{1,4}){1,12}|:)$/;

  return ipv4Regex.test(value) || ipv6Regex.test(value);
};


interface IpAddressInputProps {
  value?: string;
}

const IpAddressInput: React.FC<IpAddressInputProps> = ({ value }) => {
  const [ipAddress, setIpAddress] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIpAddress(value);
  }, [value]);

  const handleInputChange = (event:any) => {
    const value = event.target.value;
    setIpAddress(value);

    const isValidIpAddress = validateIpAddress(value);
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
        pattern='^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$'
      />
      {!isValid && <Label style={{ color: 'red' }}>Invalid IP Address</Label>}
    </div>
  );
};

export {IpAddressInput};
