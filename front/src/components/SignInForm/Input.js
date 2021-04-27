import React, { useState, useCallback, memo } from 'react';

import { InputWrapper } from './styled';

const Input = memo(({ placeholder, value, onChange, type }) => {
  const [isFocus, setIsFocus] = useState(false);

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
