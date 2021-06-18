import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';

// Returns { newUser: the new user's name | "" on failure}
//
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { newUserName } = req.query;
    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

    try {
        const client = await mongo.connect();

        const { insertedCount } = await client
            .db("stufftoknow")
            .collection("users")
            .insertOne({ user: newUserName, topics: [] })

        const toReturn = insertedCount > 0 ? newUserName : ""

        res.status(200).json( { newUser: toReturn});
    } catch (error) {
        console.log(error);

        res.status(500).json({ newUser: "" });
    } finally {
        mongo.close();
    }

}