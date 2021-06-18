import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Returns a question object chosen by an offset value, or empty object. 
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, topic, offset } = req.query as { username: string, topic: string, offset: string };
    const topicSearchName = topic.toLowerCase().replace(' ', '').replace('.', '');

    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    const searchTerm = username === "anon"   
        ? { topicSearchString: topicSearchName }     
        : { owner: username, topic: topic}

    try {
        const client = await mongo.connect();

        const questionRes = await client
            .db("stufftoknow")
            .collection("flashcards")
            .find(searchTerm)
            .skip(parseInt(offset))
            .limit(1)
            .toArray();

        const toReturn = questionRes.length ? questionRes[0] : { question: "", answer: ""};
       
        res.status(200).json(toReturn);

    } catch (error) {
        console.log(error);

        res.status(500).json({ count: 0 });
    } finally {
        mongo.close();
    }

}