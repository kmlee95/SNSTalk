import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Outter } from './styled';

const Loading = () => {
  return (
    <Outter>
      <FontAwesomeIcon icon={faSpinner} size="3x" color={'#e3344e'} spin={true} />
    </Outter>
  );
};

export default Loading;
