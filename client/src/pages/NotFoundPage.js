import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <RiErrorWarningLine className="not-found-icon" />
      <h2>Page Not Found</h2>
      <p>The requested page does not exist.</p>
    </div>
  );
};

export default NotFoundPage;