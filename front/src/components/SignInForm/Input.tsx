import React, { useState, useCallback, memo } from 'react';

import { InputWrapper } from './styled';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'email' | 'password';
}

const Input = memo(({ placeholder, value, onChange, type }: InputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  return (
    <InputWrapper focus={isFocus}>
      <input
        placeholder={placeholder || ''}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        type={type}
      />
    </InputWrapper>
  );
});

export default Input;
