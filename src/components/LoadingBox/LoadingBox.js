import React from 'react';
import './LoadingBox.css';

const LoadingBox = (props) => {
    return ( 
        <div className="row center">
            <div className="spin">
               <span><i className="fa fa-spinner fa-spin"></i>{ props.value ? props.value : 'loading'}...</span>
            </div>
        </div>
     );
}
 
export default LoadingBox;