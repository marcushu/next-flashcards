import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from 'mongodb';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username } = req.query;
    var url = process.env.DB_HOST as string;

    const mongo = new MongoClient(url, { useUnifiedTopology: true });

  try {
    const client = await mongo.connect();

    const numberOfUsers = await client
        .db("stufftoknow")
        .collection("users")
        .find({user: username})
        .count();

    res.status(200).json(
        { 
            userExists: numberOfUsers > 0 ? true : false
        }); 
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  } finally {
    mongo.close();
  }
}