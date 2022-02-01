// index.js 메인 홈 페이지

import { useEffect, useState } from 'react';
import Seo from '../components/Seo'

// noex.config.js에서 rewrites를 사용하여 api key를 숨김
// const API_KEY = 'api_key';

export default function Home(){
  const [movies, setMovies] = useState();

  useEffect(() =>{
    (async () =>{
      // data안의 results
      const { results } = await (await fetch(
        // 가짜 url 주소(next.config.js 에서 진짜 데이터를 받아옴 )
        `/api/movies`
      )).json();

      // const response = await fetch(
      //   `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      // );
      // const data = await response.json();

      // console.log(data)

      setMovies(results)
    })();
  },[])

  return (
    <div className='container'>
      <Seo title='Home' />
      {!movies && <h4>Loading...</h4>}
      {/* ? - movies가 존재하지 않으면 map이 실행되지 않음 */}
      {movies?.map((movie) =>(
        <div className="movie" key={movie.id}>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
        <h4>{movie.original_title}</h4>
      </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}