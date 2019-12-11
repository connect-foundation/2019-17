import React, { useEffect } from 'react';

interface Props {
  onEffect: () => void | (() => void);
}

const NewAlarm = ({ onEffect }: Props) => {
  useEffect(() => {
    return onEffect();
  }, [onEffect]);

  return <div> adf</div>;
};

export default NewAlarm;
