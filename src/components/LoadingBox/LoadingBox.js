import React from 'react';
import './LoadingBox.css';

const LoadingBox = (props) => {
    return ( 
        <div className="row center bg">
            <div className="spin">
               <span><i className="fa fa-spinner fa-spin"></i>Loading...</span>
            </div>
        </div>
     );
}
 
export default LoadingBox;