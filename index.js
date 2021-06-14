const { MongoClient } = require('mongodb');
async function main(){

    const uri =  "URI";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect(useUnifiedTopology=true);
        //console.log("connection established");
        //await listDatabases(client);
        //await listName(client);
        //await lisbyGrade(client);
        //await listbycoord(client);
        await listbyscore(client);

 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

//Function to list all databases
async function listDatabases(client){
    const dblist = await client.db().admin().listDatabases();
    console.log(dblist);
}

//Function to list all restaurants with with name:"Riviera Caterer",cuisine:"American"
async function listName(client){
const result = client.db("sample_restaurants").collection("restaurants").find({
    name:"Riviera Caterer",cuisine:"American"
});
const res = await result.toArray();
if(result){
    console.log(res);
}
}

//function to list out restaurants on the basis of Grades
async function lisbyGrade(client){
    const result = client.db("sample_restaurants").collection("restaurants").find({
          "grades.grade":"A"
    }).limit(5);
    const res = await result.toArray();
    if(result){
        console.log(res);
    }
    }
    //function to list restaurants by nearby coordinates
    async function listbycoord(client){
        const result = client.db("sample_restaurants").collection("restaurants").aggregate([
            {
                "$geoNear":{
                    near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
                    distanceField: "dist.calculated" ,
                    spherical: true
            }
            }
            ]);
        const res = await result.toArray();
        if(result){
            console.log(res);
        }
        }

    //list by score hreate than 5 
    async function listbyscore(client){
        const result = client.db("sample_restaurants").collection("restaurants").aggregate([
            {"$project":"$name:0"},
            { "grades.score":{$gt:5}}
            ]);
        const res = await result.toArray();
        if(result){
            console.log(res);
        }
        }
    

main().catch(console.error);