import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Return { topicName: the topic name | "" (on error) }
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, topic } = req.query;
    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();
        
        const pushResult = await client
            .db("stufftoknow")
            .collection("users")
            .findOneAndUpdate(
                { user: username }, 
                { $addToSet: { topics: topic } }
            );

        const success = pushResult.lastErrorObject.updatedExisting; // false on error
        const toReturn = success ? topic : ""

        res.status(200).json({ topicName: toReturn });

    } catch (error) {
        console.log(error);

        res.status(500).json({ topicName: "" });
    } finally {
        mongo.close();

    }

}