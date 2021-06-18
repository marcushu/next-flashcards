import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, topic } = req.query;

    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();

        const randQuestion = await client
            .db("stufftoknow")
            .collection("flashcards")
            .aggregate([
                { $match: { owner: username, topic: topic } },
                { $sample: { size: 1 } }
            ])
            .toArray()

        if (randQuestion.length) {
            const { question, answer } = randQuestion[0];

            res.status(200).json({ question: question, answer: answer });
        } else {
            res.status(200).json({ question: "", answer: "" });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ added: 0 });
    } finally {
        mongo.close();
    }

}