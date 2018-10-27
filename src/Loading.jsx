import React from 'react';
import { ClipLoader } from 'react-spinners';

import './Loading.scss';

export default function Loading () {
  return (
    <div className='Loading-container'>
      <ClipLoader size={60} loading />
    </div>
  );
}
