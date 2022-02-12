// /api/new-meetup - 서버 사이드 코드를 포함하는 함수를 정의

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if(req.method === 'POST'){
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://<id>:<password>@cluster0.o97xd.mongodb.net/meetups?retryWrites=true&w=majority')
        const db = client.db();
    
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result)
        client.close();

        res.status(201).json({message: 'Meetup inserted'})
    }
}

export default handler;