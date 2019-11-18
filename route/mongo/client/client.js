const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const KEY = require("../../../key/key");

class Client{

    constructor(){
        this.client = null;
    }

    async createConnection(){

        try {
            
            this.client = await new MongoClient(KEY.MONGO_CONN_URL.replace(/<password>/,KEY.MONGO_PASSWORD),{useNewUrlParser: true,
            useUnifiedTopology: true}).connect();

            if(this.client.isConnected()){
                return;
            }

        } catch (error) {

            console.log(error);
            if(this.client){
                await this.client.close();
            }
            this.client = null;
            return await this.createConnection();

        }

    }
   
    async destroyConnection(){
        await this.client.close();
        return this.client = null;
    }

}

module.exports = Client;