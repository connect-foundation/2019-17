import React from 'react';
import { Helmet } from 'react-helmet';

interface IProps {
  message: string;
}

function HelmetTitle({ message }: IProps) {
  return (
    <Helmet>
      <title>{message} | BoostBook</title>
    </Helmet>
  );
}

export default HelmetTitle;
