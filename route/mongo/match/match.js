const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const KEY = require("../../../key/key");
const Client = require("../client/client");

class MongoMatch extends Client{
    
    constructor(){
        super();
    }

    async getMatchByMatchId(_matchId){
        
        if(this.client === null || (this.client !== null && !this.client.isConnected())){
            await this.createConnection();
        }
       
        const db = this.client.db("FMGG");

        try{
            return await db.collection("match").find({gameId : _matchId}).toArray();
        } catch (error) {
            console.log(error);
        } finally {
            await this.destroyConnection();
        }
    }
    
    async insertMatch(_match){

        if(this.client === null || (this.client !== null && !this.client.isConnected())){
            await this.createConnection();
        }
 
        const db = this.client.db("FMGG");
 
        try{
            return await db.collection("match").insertMany(_match)
        } catch (error) {
            console.log(error);
        } finally {
            await this.destroyConnection();
        }

    }

}

module.exports = MongoMatch;