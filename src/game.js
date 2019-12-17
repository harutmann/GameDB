import React, {useState, useEffect, useRef} from "react";
import ReactDOM from 'react-dom';


const Game = ({game}) => {
  const[pickedGame, setPicked] = useState({});


  const onTitleClick = (e) => {
    setPicked(e);
    const Card = () => {
        return (
          <div className="card query-card" style={{ background: `url(${e.short_screenshots[1].image}) no-repeat`, backgroundSize:"cover", width: "100%", height: "300px"}}>

              <h2  id="hmm">{e.name}</h2>
              <p className="genres ">Rating: {e.rating}</p>
              <p className="genres ">Genres: {game.genres.map((el,index)=> game.genres.length === index+1 ? el.name : el.name+', ')}</p>
              <p className="genres ">Platform: {game.platforms.map((el,index)=> game.platforms.length === index+1 ? el.platform.name : el.platform.name+', ')}</p>

          </div>
        )
      };

        ReactDOM.render(<Card/>,
        document.getElementById('queryCard'));
}

  return (

    <div className="card col-md-6" style={{ background: `url(${game.background_image}) no-repeat`, backgroundSize:"cover", width: "100%", height: "300px"}}>

        <h2 onClick={()=>onTitleClick(game)}>{game.name}</h2>
        <p className="card-body">Rating: {game.rating}</p>
        <p className="genres">Genres: {game.genres.map((el,index)=> game.genres.length === index+1 ? el.name : el.name+', ')}</p>
    </div>
  );
};

export default Game;
