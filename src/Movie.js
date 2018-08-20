import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'
import './Movie.css';


// class Movie extends Component{

//     // 부모 Component에서 받은 prop data의 형태를 체크할 수 ProTypes를 사용하며 먼저 확인할 수 있다.
//     static propTypes={
//         title: PropTypes.string.isRequired, //PropTypes의 isRequired 메소드를 이용하여 prop에 필수적으로 포함되어야 하는 data를 설정할 수 있다.
//         poster: PropTypes.string
//     };

//     render() {
//         return(
//             <div>
//                 <MoviePoster poster={this.props.poster}/>
//                 <h1> {this.props.title} </h1>
//             </div>
//         );
//     }
// }

function Movie({title, poster, genres, synopsis}) {
    return(
        <div className="Movie">
            <div className="Movie__Columns">
                <MoviePoster poster={poster} alt={title}/>
            </div>
            <div className="Movie__Columns">
                <h1> {title} </h1>
                <div className="Movie__Genres">
                    {genres.map((genre, index) => <MovieGenre genre={genre} key={index}/>)}
                </div>
                <div className="Movie__Synopsis">
                <LinesEllipsis
                    text={synopsis}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                /> 
                </div>
            </div>
        </div>
    )
}

function MovieGenre({genre}){
    return(
        <span className="Movie__Genre">{genre}</span>
    )
}


function MoviePoster({poster, alt}) {
    //Life Cycle을 이용할 필요 없이, 무언가를 render할 필요도 없이, state도 필요없이(dumb), this를 쓸 필요 없이 그저 return해주기만 하면 되는 경우 class 대신 function을 이용
    return(
        <img src={poster} alt={alt} title={alt} className="Movie__Poster"/> // title: img을 hover했을 때 뜨는 string
    )
}

//function의 PropType을 확인하는 법

Movie.propTypes={
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
}

MovieGenre.propTypes={
    genre: PropTypes.string.isRequired
}

MoviePoster.propTypes={
    poster: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}


export default Movie;
