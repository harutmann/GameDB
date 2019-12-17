import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import css from './index.scss';
import Search from './search';
import Game from './game';

const GAMES_RATING_URL = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";

const App = () => {
	const[games, setGames] = useState([]);
	const[queryGameList, setList] = useState([]);
	const[queryEl, setQuery] = useState({});


	useEffect(() => {
		fetch(GAMES_RATING_URL, {
			"method": "GET",
			"headers": {
				'Content-Type': 'application/json'
			},
				"mode": "cors"
		})
		.then(response => response.json() )
		.then(data => {
			setGames(data.results);
		});
	}, []);

		const search = searchValue => {
			fetch(`https://api.rawg.io/api/games?search=${searchValue}`, {
				"method": "GET",
				"headers": {
					'Content-Type': 'application/json'
				},
					"mode": "cors"
			})
			.then(response => response.json() )
			.then(data => {
				setList(data.results)
			});
		};

		const handleList = (gameEl) => {
			setQuery(gameEl);
			setList([]);
		}

		useEffect(() => {
			const Card = () => {
					return (
						<div className="card query-card" style={{ background: `url(${queryEl.short_screenshots[0].image}) no-repeat`, backgroundSize:"cover", width: "100%", height: "300px"}}>

								<h2>{queryEl.name}</h2>
								<p className="genres">Rating: {queryEl.rating}</p>
								<p className="genres ">Genres: {queryEl.genres.map((el,index)=> queryEl.genres.length === index+1 ? el.name : el.name+', ')}</p>
								<p className="genres ">Platform: {queryEl.platforms.map((el,index)=> queryEl.platforms.length === index+1 ? el.platform.name : el.platform.name+', ')}</p>

						</div>
					)
				}
				if(queryEl.name==undefined){
					ReactDOM.render(<div/>,
					document.getElementById('queryCard'))
				} else {
					ReactDOM.render(<Card/>,
					document.getElementById('queryCard'))
				}
}, [queryEl])

  return (
		<div className="container">

			<div className="row flex-column ">
				<h1>GameDB</h1>
	    	<Search search={search} />

				<ul className="list-group">
				{
					queryGameList.map(
					(el,index)=> {if (index<4) {
						return <li key={`${index}-${el.name}`}
						onClick={()=>handleList(el)}
						className="list-group-item list-group-item-action">
						{el.name}
						</li>
					}})

				}
				</ul>
				<div id="queryCard"></div>
				<h1 className="col1">
				Highest rated games from  2019 list
				</h1>
				<div className="games row">
					{games.map( (game, index) => (
						<Game key={`${index}-${game.name}`} game={game} />
					) )}
				</div>
				<h2>api source
				<a href="https://rawg.io"> rawg.io</a></h2>
			</div>
		</div>
  )
};


ReactDOM.render(<App/>,
document.getElementById('root'));
