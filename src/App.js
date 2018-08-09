import React, { Component } from 'react';
import './App.css';
import './Spinner.css'
import Movie from './Movie';

class App extends Component {

    //Render: componentWillMount >> render >> componentDidMount 순의 LifeCycle
    //Update: componentWillReceiveProps >> shouldComponentUpdate >> componentWillUpdate >> render >>

    state = {};


    componentWillMount(){ //api 요청 등을 이 때 한다.
    }

    _renderMovies = () => {
        const movies = this.state.movies.map((movie)=>{
            console.log(movie)
            return <Movie 
                key={movie.id} 
                title={movie.title_english} 
                poster={movie.medium_cover_image} 
                genres={movie.genres}
                synopsis={movie.synopsis}
                />
        })
        return movies;
    }

    _getMovies = async () => { // 비동기 함수 생성
        const movies = await this._callApi(); // 이 상수는 await 모드에서 _callApi를 return.
        //callApi 함수가 '끝나길 기다린 뒤' 그 값을 movies에 저장.
        this.setState({
            movies
        }) // 이 블럭은 await 모드의 상기 함수가 작업을 종료하기 전까진 실행되지 않음
    }  

    _callApi = () => {
        // 외부에서 영화 데이터들을 API로 받아오기
        return fetch('https://yts.am/api/v2/list_movies.json?sort_by=like_count')
        .then(response => response.json()) //위의 작업이 끝나면 결과물을 response 인자에 받아 json으로 return
        .then(json => json.data.movies) // arrow function은 return을 작성할 필요 없음. 자동으로 됨.
        // 위와 같이 then, then, then, ...
        // 하며 코드가 깊게 깊게 들어가버리면 Call back 지옥에 빠진다. sync를 이용하자.
        .catch(err => console.log(err)); // 이 과정에서 에러가 발생하면 내게 보여줘라
        //fetch하면 promise 컨셉이 생기고, promise를 이용하면 event 시나리오에 따라 관리 가능
    }

    _Spinner(){
        return(
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        )
    }

    render() {
        return (
            <div className = {this.state.movies? "App" : "App--loading" }>
                {this.state.movies? this._renderMovies() : this._Spinner() }
            </div>
        );
    }

    componentDidMount(){
        this._getMovies();
    }
}




export default App;
