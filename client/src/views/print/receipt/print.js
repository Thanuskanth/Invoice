

import Receipt  from './index';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

 const  Example = () => {
  const componentRef = useRef();
 
 
  window.onafterprint = function(){
   alert("dd...");
 }
  return (
   <div >
     <Receipt ref={componentRef}  />

   </div>
     
    
  );
};
export default   Example;