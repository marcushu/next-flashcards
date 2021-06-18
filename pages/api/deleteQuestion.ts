import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Return { delted: 1, if successful, 0 if nothing was deleted }
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { userName,  question } = req.body;

    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();

        const deleteRes = await client
            .db("stufftoknow")
            .collection("flashcards")
            .deleteOne(
                { owner: userName, question: question }
            );

        res.status(200).json({ deleted: deleteRes.deletedCount });

    } catch (error) {
        console.log(error);

        res.status(500).json({ deleted: 0 });
    } finally {
        mongo.close();

    }

}