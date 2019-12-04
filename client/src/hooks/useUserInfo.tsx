import React, { useState, useEffect } from 'react';
const useUserInfo = () => {
  // state를 생성합니다.
  const [email, setEmail] = useState('');
  useEffect(() => {
    //
  }, []);
  return email;
};

export default useUserInfo;
