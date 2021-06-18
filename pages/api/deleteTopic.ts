import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Return { numTopicsDeleted: 1, if successful, 0 if nothing was deleted }
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, topicToDelete } = req.query;
    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();

        const { topics } = await client
            .db("stufftoknow")
            .collection("users")
            .findOne({ user: username });

        const editedTopicList = topics.filter((el: string) => el !== topicToDelete);

        const pushResult = await client
            .db("stufftoknow")
            .collection("users")
            .findOneAndReplace(
                { user: username },
                {
                    user: username,
                    topics: editedTopicList
                }
            );

        await client
            .db("stufftoknow")
            .collection("flashcards")
            .deleteMany(
                {
                    owner: username,
                    topic: topicToDelete
                });

        res.status(200).json({ numTopicsDeleted: pushResult.ok });

    } catch (error) {
        console.log(error);

        res.status(500).json({ topicName: "" });
    } finally {
        mongo.close();

    }

}