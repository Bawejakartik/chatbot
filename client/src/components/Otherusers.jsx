import React from 'react'
import Otheruser from './Otheruser'
import UseGetOtherusers from '../hooks/UseGetOtherusers';
const Otherusers = () => {
  UseGetOtherusers();
  
  return (
    <div className='overflow-auto '>
      <Otheruser />
      <Otheruser />
      <Otheruser />
      <Otheruser /> <Otheruser />
      <Otheruser />
      <Otheruser />
      <Otheruser />
      <Otheruser />
      <Otheruser />
      <Otheruser />

    </div>
  );
}

export default Otherusers
