import React, { useEffect, useState } from 'react';
import './mainImage.css';

function MainImage(props) {

   
    const background= {
        backgroundImage:`url('${props.image}')`,
        backgroundRepeat: 'no-repeat',
        height: '500px',
        backgroundSize: 'cover',
        width: '100%',
        position: 'relative',
        transform: 'translateY(0px)'
    }
    
    return (
        <div className="top" style={background}>

        <div style={{position: 'absolute', maxWidth: '500px', bottom:'2rem', marginLeft: '2rem'}}>
            <h2 style={{color: '#fff'}}>{props.title}</h2>
            <p style={{color: '#fff', fontSize: '1rem'}}>{props.text}</p>
        </div>
        </div>
    );
}

export default MainImage;