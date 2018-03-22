
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

let pop = []
let popis =[];
let popis2 = [];

var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://api.themoviedb.org/3/movie/upcoming?page=1&language=en-US&api_key=d804025b0d9d4a8764c9f6676ad3a500",
  "method": "GET",
  "headers": {},
  "data": "{}"
}

var respuesta = []



$.ajax(settings).done(function (response) {
    for (var i = 0; i < response.results.length; i++) {
      respuesta.push(response.results[i]);
  }
});


let i = 0;

const base_url = 'https://image.tmdb.org/t/p/w500/';

for (i = 0; i < respuesta.length; i++) {
 pop.push(<div className={"movie"} key={i}>
   <h1>{respuesta[i].original_title}</h1>
   <div className={"resumen"} >
      <img
      src={base_url+respuesta[i].poster_path}
      alt={respuesta[i].original_title}
      />
      <span>{"Overview: " + respuesta[i].overview} <br/> {"Realease Date " + respuesta[i].release_date}</span>
   </div>
 </div>)
}

let k = i


let popl = Math.floor(respuesta.length / 5);
let dif = popl*5 -respuesta.length;


i = 0;
if (respuesta.length > 5) {
  for (i = 0; i < popl; i++) {
    for (let p = 0; p < 5; p++) {
      popis.push (
        <div>
          {pop[p+i*5]}
        </div>
        )
      }
      popis2.push (
        <li className={"slide"} key={k} style={{display:"grid"}}>
          {popis}
        </li>
        )
        popis = []
        k = k + 1
    }//Esto guarda lo cargado en respuesta en li's cada 5 elementos
  if (dif > 0) {
    for (let p = 0; p < dif; p++) {
      popis.push (
        <div>
          {pop[p+i*5]}
        </div>
        )
      }
      popis2.push (
        <li className={"slide"} key={k+1} style={{display:"none"}}>
          {popis[i]}
        </li>
      )//esto guarda si la cantidad de elementos en
       //respuesta no es divisible por 5
    }
}



let currentSlide= 0

let length = popis2.length-1
class Element extends React.Component{
  constructor(props){
    super(props);
    this.state={slide:0}
  }
  plusSlides(q){
    currentSlide = currentSlide+q
    if (currentSlide > length){
      currentSlide = 0
    }
    if (currentSlide < 0){
      currentSlide = length
    }
    this.setState({
      slide: currentSlide
    })
    if (currentSlide > length){
      currentSlide = 0
    }
  }
  render(){
    return (
      <div>
        {popis2[this.state.slide]}
        <button className={"prev"} onClick={n => this.plusSlides(-1)}>&#10094;</button>
        <button className={"next"} onClick={n => this.plusSlides(1)}>&#10095;</button>
      </div>
    )
  }
}

ReactDOM.render(<Element />, document.getElementById('root'))
