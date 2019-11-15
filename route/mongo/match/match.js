const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const KEY = require("../../../key/key");
const ObjectId = require("mongodb").ob

class MongoMatch{

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
            this.client.close();
            this.client = null;
            this.createConnection();
        }

    }
    async getMatchByMatchId2(_matchId){
        
        if(!this.client.isConnected()){
           this.createConnection();
        }

        const db = this.client.db("FMGG");

        try{
           return await db.collection("match").find({gameId : _matchId}).toArray();
        } catch (error) {
            console.log(error);
        }

    }
    
    async getMatchByMatchId(_matchId){
        
        if(!this.client.isConnected()){
           this.createConnection();
        }

        const db = this.client.db("FMGG");

        try{
           return await db.collection("match").find({gameId : {$in : _matchId}}).toArray();
        } catch (error) {
            console.log(error);
        } finally {
            this.destroyConnection();
        }
        
    }

    async insertMatch(_match){

        if(!this.client.isConnected()){
            this.getConnection();
        }
 
        const db = this.client.db("FMGG");
 
        try{
            return await db.collection("match").insertMany(_match)
        } catch (error) {
            console.log(error);
        } finally {
            this.destroyConnection();
        }

    }

    destroyConnection(){
        this.client.close();
        return this.client = null;
    }

}

module.exports = MongoMatch;