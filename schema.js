const {gql} = require('apollo-server-express');

// const typeDefs = gql`
//     type Query {
//         hello : String
//     }
// `;

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    input bookInput {
        title: String
        author: String
    }

    type Query {
        books : [Book]
        
    }
    
    type Mutation {
        status : String
        addBook(title: String, author: String) : Book
        updateBook(title: String, author: String) : Book
        deleteBook(title : String, author: String) : Book
    }
`;

module.exports = {
    typeDefs
}