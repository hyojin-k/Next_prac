export default (req, res) =>{
  // Max-Age=0 이면 쿠키가 즉시 소멸됨
  res.setHeader('Set-Cookie', 'a_name=Mike;Max-Age=0;HttpOnly,Secure');
  res.statusCode = 200;
  res.json({message:'ok'})
}