import React from 'react';
import { Helmet } from 'react-helmet';

const SUBJECT = 'BoostBook';
function HelmetTitle({ message }: { message: string }) {
  return (
    <Helmet>
      <title>
        {message} | {SUBJECT}
      </title>
    </Helmet>
  );
}

export default HelmetTitle;
