const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,

  // redirection
  // redirects - redirect 되고, url이 바뀌는 것을 유저가 알 수 있음
  async redirects(){
    return [
      {
        // 유저가 old로 이동하면 (*은 path 뒤의 전부를 그대로 가져감)
        source: '/old/:path*',
        // new로 보냄
        destination: '/new/:path*',
        // 영구적인지 아닌지에 따라 브라우저나 검색엔진이 기억하는지 여부 결정
        permanent: false, 
      }
    ]
  },
  // rewrites - redirect 시키지만 url이 바뀌지 않음(유저가 알 수 없음)
  // api key를 숨길 때 사용
  async rewrites(){
    return [
      { // 메인페이지
        source : '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      },
      { // detail 페이지
        source : '/api/movies/:id',
        // source에 들어가는 명칭과 등일하게 
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      },
    ]
  }
}
