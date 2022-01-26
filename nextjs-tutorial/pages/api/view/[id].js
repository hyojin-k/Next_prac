export default function handler(req, res) {
    res.status(200).json({ id: req.query.id }) // dynamic api 설정
  }
  