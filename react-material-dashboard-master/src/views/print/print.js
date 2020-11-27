

import NavBar  from './navbar.component';
import NavBarcolor  from './color';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

 const  Example = () => {
  const componentRef = useRef();
 
 
  window.onafterprint = function(){
   alert("dd...");
 }
  return (
   <div >
     <NavBarcolor ref={componentRef}  />
     <NavBar ref={componentRef}  />

   </div>
     
    
  );
};
export default   Example;