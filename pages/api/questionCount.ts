import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, topic } = req.query as { username: string, topic: string}
    const topicSearchName = topic.toLowerCase().replace(' ', '').replace('.', ''); 

    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    const searchTerm = username === "anon"
        ? { topicSearchString: topicSearchName }
        : { owner: username, topic: topic }

    try {
        const client = await mongo.connect();

        const questionCount = await client
            .db("stufftoknow")
            .collection("flashcards")
            .find(searchTerm)
            .count();
        
        res.status(200).json({ count: questionCount});

    } catch (error) {
        console.log(error);

        res.status(500).json({ count: 0 });
    } finally {
        mongo.close();
    }

}