import { MongoClient } from 'mongodb'

let url = "mongodb://localhost:27017/tagmango"
const getConnection = async () => {
    let db = await MongoClient.connect(url)
        console.log("Database created!");
        return db
}
export default getConnection
