// 로그인 여부를 판단해서 내려주는 부분

export default function handler(req, res) {
  // 로그인 안 한 상태
  // res.status(200).json({ name: null })
  
  // 쿠키로 유저 판별 (/api/login 의 a_name 값)
  res.status(200).json({ name: req.cookies.a_name }) 
}
