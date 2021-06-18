import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';


// Returns { insertCount: 1 on success, 0 if unable to add to cellection}
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { question, answer, user, topic } = req.body;
    const topicSearchName = topic.toLowerCase().replace(' ', '').replace('.', '');

    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();

        const addResult = await client
            .db("stufftoknow")
            .collection("flashcards")
            .insertOne({
                question: question,
                answer: answer,
                owner: user,
                topic: topic,
                topicSearchString: topicSearchName
            });

        res.status(200).json({ insertedCount: addResult.insertedCount })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({ added: 0 });
    } finally {
        mongo.close();
    }
    
}