const AWS = require('aws-sdk');
const { title } = require('process');
require('dotenv').config();
const {} = require('apollo-server')
AWS.config.update({
    region : "eu-west-1",
    //  accessKeyId : process.env.AWS_ACCESS_KEY,
    //  secretAccessKey : process.env.AWS_SECRET_KEY,
    endpoint : "http://localhost:8000"
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const tableName = "book"

// const resolvers = {
//     Query : {
//         hello :  () => 'How are you ok Done'
//     }
//  };

const resolvers = {
    Query: {
       
        books : async (root,args) =>{
            try {
                const params = {
                    TableName : tableName,
                }
                const data = await dynamoClient.scan(params).promise()
                return data.Items
            } catch (e) {
                console.log("e..",e);
            }
        }
    },

    Mutation : {
        addBook : async (root,input) => {
            try {
                const params = {
                    TableName : tableName,
                    Item: input
                }
                const result =  await dynamoClient.put(params).promise()
                console.log(result);
            status : () => "create successfully...!"
            } catch (e) {
                console.log("e..",e);
            }
        },

        updateBook : async (root,input) => {
    
            const title = input.title;
            const author = input.author

            try {
                var params = {
                    TableName : tableName,
                    Key : {
                        "title" : title
                    },
                    UpdateExpression: 'SET #author = :author_val',
                    ExpressionAttributeNames:{
                        '#author' : 'author'
                    },
                        ExpressionAttributeValues : {
                            ":author_val" : author
                        },
                    ReturnValues: "UPDATED_NEW"
                };
                const data = await dynamoClient.update(params).promise()
                console.log("data..",data);
                return data
            } catch (e) {
                console.log("e..",e);
            }
        },

        deleteBook : async (root,input) =>{
            try {
                const title = input.title
                const author = input.author

                const params = {
                    TableName : tableName,
                    Key : {
                        title : title,
                        author : author
                    }
                }
                await dynamoClient.delete(params).promise()
                return "deleted Successfully...!"
                // return res.status(200).json({msg : "delete item successfully..!"})
            } catch (e) {
                console.log("e...",e)
            }
        } 
    }
 };

 module.exports = {
     resolvers
 }