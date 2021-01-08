import React from 'react';
import {Col} from 'antd';
import  './movieDetail.css'

function GridCard(props) {
    if(props.landingPage){
        return (
            <Col lg={6} md={8} xs={24}>
                 <div style={ {position: 'relative'}}>
                     <a href={`/movie/${props.movieId}`}>
                         <img style={{minWidth: '100%', height: '400px'}} src={props.image} alt={props.name}/>
                     </a>
                 </div>
            </Col>
         );
    }
    if(props.MovieDetail) {
        return (
            <Col lg={6} md={8} xs={24}>
            <div className="item"style={ {position: 'relative'}}>
                <img style={{minWidth: '100%', height: '400px'}}src={props.image} alt={props.actorName}/>
            </div>
            <div className="dimmed popup">
                <div className="dimmend_txt">{props.actorName}</div>
            </div>
            </Col>
        );
    }
}

export default GridCard;