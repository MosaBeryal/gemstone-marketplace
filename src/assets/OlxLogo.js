import React from 'react'
import logo from '../log.png'

export default  function OlxLogo() {
    return(  
        <div className="olxLogo">
            <img src={logo} alt=""
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
             />
        </div>
         )
}