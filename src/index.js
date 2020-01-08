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
  const[cardEl, setCard] = useState({});
	const[toggle, setToggle] = useState('');

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
			fetch(`https://api.rawg.io/api/games/${queryEl.id}`, {
				"method": "GET",
				"headers": {
					'Content-Type': 'application/json'
				},
					"mode": "cors"
			})
			.then(response => response.json() )
			.then(data => {
				setCard(data)
			});

}, [queryEl])

	const oPDescription = (description) => {
		let content = document.getElementById('descriptionContent');
		if(content.style.display=='none') {
				content.style.display='block';
				content.innerHTML = description

			}else{content.style.display='none';}
}

const opPic = (pic) => {
	let popup = document.getElementById('popup-img');
	popup.style.backgroundImage = `url(${pic})`
	popup.style.display = "block"
}

const popupClose = () => {
	let popup = document.getElementById('popup-img');
	popup.style.display = "none";}

		useEffect(() => {
			const Card = () => {

				let elem;
				if (localStorage.getItem(`id- ${cardEl.id}`)){
					elem = <span className="btn like" id="delete" onClick={()=>removeFavorites(queryEl)}>❌ remove from favorites</span>;
				} else {
				  elem = <span className="btn like" id="add" onClick={()=>addFavorites(queryEl)}>💜  add to favorites</span>;
				}


					return (
						<div className="card query-card" id="query-card" style={{ background: `url(${cardEl.background_image}) no-repeat`, backgroundSize:"cover", width: "100%", height: "300px"}}>

								<h2 className="card-header" id="top" >{cardEl.name}</h2>
								{elem}
								<div className="card-body query-body">
									<p className="">Rating: {cardEl.rating}</p>
									<p className="">Genres: {cardEl.genres.map((el,index)=> cardEl.genres.length === index+1 ? el.name : el.name+', ')}</p>
									<p className="">Platform: {cardEl.platforms.map((el,index)=> cardEl.platforms.length === index+1 ? el.platform.name : el.platform.name+', ')}</p>
									<p className="">Developers: {cardEl.developers[0].name}</p>

								</div>
								<div className="row card-body">
										<div className="col-sm-3 gallery-min-pic"
										onClick={()=>opPic(queryEl.short_screenshots[1].image)}
										style={{ background: `url(${queryEl.short_screenshots[1].image}) no-repeat`, backgroundSize:"cover", width: "100%"}}></div>
										<div className="col-sm-3 gallery-min-pic"
										onClick={()=>opPic(queryEl.short_screenshots[2].image)}
										style={{ background: `url(${queryEl.short_screenshots[2].image}) no-repeat`, backgroundSize:"cover", width: "100%"}}></div>
										<div className="col-sm-3 gallery-min-pic"
										onClick={()=>opPic(queryEl.short_screenshots[3].image)}
										style={{ background: `url(${queryEl.short_screenshots[3].image}) no-repeat`, backgroundSize:"cover", width: "100%"}}></div>
										<div className="col-sm-3 gallery-min-pic"
										onClick={()=>opPic(queryEl.short_screenshots[4].image)}
										style={{ background: `url(${queryEl.short_screenshots[4].image}) no-repeat`, backgroundSize:"cover", width: "100%"}}></div>
										<div className="col-sm-3 gallery-min-pic"
										onClick={()=>opPic(queryEl.short_screenshots[5].image)}
										style={{ background: `url(${queryEl.short_screenshots[5].image}) no-repeat`, backgroundSize:"cover", width: "100%"}}></div>

								</div>
								<div id="description"  className="card-footer">
								  <h3 id="description" onClick={()=>oPDescription(cardEl.description)}>Description 💬</h3>
									<div id="descriptionContent" style={{display:'none'}}></div>
								</div>
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

}, [cardEl, toggle])


const onSubmit = (e) => {
	if(queryGameList[0]!==undefined){
	setQuery(queryGameList[0]);
	setList([]);} else {alert("enter correct title name")}
}


const addFavorites = (favorite) => {
	localStorage.setItem(`id- ${favorite.id}`, JSON.stringify(favorite));
		if(toggle=='on'){setToggle('of')}else{setToggle('on')}
}

const removeFavorites = (favorite) => {
	localStorage.removeItem(`id- ${favorite.id}`);
		if(toggle=='on'){setToggle('of')}else{setToggle('on')}
}

const removeFromList = (favorite) => {
	localStorage.removeItem(`id- ${favorite.id}`);
	document.getElementById(`${favorite.id}`).parentNode.removeChild(document.getElementById(`${favorite.id}`));
}

const opFavorites = (e) => {
	let localArr = [];
	for(let i = 0; i<localStorage.length;i++){
		let key = localStorage.key(i);
		let keyA = key.split('-');
		if(keyA[0]=="id"){
			localArr.push(JSON.parse(localStorage.getItem(key)))
		}
	}

	const handleHover = (el) => {
		let backContainer = document.getElementById('hoverContent');
		backContainer.style.backgroundImage = `url(${el.background_image})`;
	}

	const Favorite = () => {
		return (
			<div className="card favoriteCard" id="hoverContent" style={{ background: `no-repeat`, backgroundSize:"cover", width: "100%", height: "300px", overflow: 'auto'}}>
					<ul className="list-group ">
					{
						localArr.map((el,index) => {
							return <li
							  onMouseEnter={()=>handleHover(el)}
								className="favorites-list"
								key={`${el.id}`}
								id={`${el.id}`}
								>
								<span className="favTitle" onClick={()=>setQuery(el)}>{el.name}</span>
								<span className="favRemove" onClick={()=>removeFromList(el)}>❌</span>
								</li>
						})
					}
					</ul>
			</div>
		)}
	ReactDOM.render(<Favorite/>,
	document.getElementById('queryCard'))
}


  return (
		<div className="container">
			<div className="container" onClick={()=>popupClose()} id="popup-img" style={{ background: `no-repeat`, backgroundSize:"cover", width: "100%", height: "300px", overflow: 'auto'}}></div>
			<div className="row flex-column ">
				<h1 className="pageTitle">GameDB</h1>
	    	<Search search={search} onSubmit={(el)=>onSubmit()}/>
				<span className="favorites"  onClick={()=>opFavorites()}>Favorites</span>
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
						<Game key={`${index}-${game.name}`} game={game} onTitleClick={(el)=>setQuery(el)}/>
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
