// index.js 메인 홈 페이지

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

// noex.config.js에서 rewrites를 사용하여 api key를 숨김
// const API_KEY = 'api_key';

export default function Home({ results }) {// SSR props로 받아온 results
  // getServerSideProps 사용하여 필요없어지는 부분
  // const [movies, setMovies] = useState();

  // useEffect(() =>{
  //   (async () =>{
  //     // data안의 results
  //     const { results } = await (await fetch(
  //       // 가짜 url 주소(next.config.js 에서 진짜 데이터를 받아옴 )
  //       `/api/movies`
  //     )).json();

  //     // const response = await fetch(
  //     //   `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  //     // );
  //     // const data = await response.json();

  //     // console.log(data)

  //     setMovies(results)
  //   })();
  // },[])

  const router = useRouter();
  const onClick =( id, title) =>{
    // // URL을 string으로 보내기
    // router.push(`/movies/${id}`);

    // // URL을 객체로 보내 query 형식으로 정보 제공
    // router.push({
    //   pathname: `/movies/${id}`,
    //   query: {
    //     title
    //   }
    // },
    // // URL의 query 부분 숨기기 (as)
    // `/movies/${id}`
    // )

    // [id].js 파일을 [...params].js 로 바꾸고 난 후, url에 타이틀을 보여주도록
    router.push(`/movies/${title}/${id}`)
  }

  return (
    <div className="container">
      <Seo title="Home" />
      {/* {!movies && <h4>Loading...</h4>} */}
      {/* ? - movies가 존재하지 않으면 map이 실행되지 않음 */}
      {results?.map((movie) => (
        <div 
          onClick={() => onClick(movie.id, movie.original_title)} 
          className="movie" 
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link href = {`/movies/${movie.original_title}/${movie.id}`}>
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}

      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
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
  );
}

// SSR(서버사이드 렌더링)
// 서버에서 실행되는 부분
// 페이지가 유저에게 보여지기 전에 props를 받아오는 function 생성

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();

  return {
    // props를 page에 넘겨줌
    props: {
      results,
    },
  };
}
