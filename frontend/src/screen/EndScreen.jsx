import React from 'react';
import {Link} from 'react-router-dom';
function EndScreen() {
    return (
        <div className="content-box">
        Thank you very much for 
        shopping from our website your product will be delivered soon within 5-7 days
        <div>
        <Link to="/">
            <button className="button primary">
                Home
            </button>
            
            </Link>
            </div>
        </div>

    )
}

export default EndScreen;
