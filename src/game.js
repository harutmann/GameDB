import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';


const Game = (props) => {
  let game = props.game;
  let onTitleClick = props.onTitleClick;

  const onGchange = (gameEl) => {
    onTitleClick(game);
  }



  return (
    <div className="card card-min col-md-6" style={{ background: `url(${game.background_image}) no-repeat`, backgroundSize:"cover", width: "100%", height: "300px"}}>

        <h2 onClick={()=>onGchange(game)}><a href="#top" className="titleHref">{game.name}</a></h2>
        <p className="card-body">Rating: {game.rating}</p>
        <p className="genres">Genres: {game.genres.map((el,index)=> game.genres.length === index+1 ? el.name : el.name+', ')}</p>
    </div>
  );
};

export default Game;
