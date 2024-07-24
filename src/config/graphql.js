const { gql } = require('apollo-server-express');

module.exports = gql`
type Todo {
    id: ID!
    title: String!
    idUser: String!
    isCompleted: Boolean!
}

type Query {
    findTodoById(id: ID!): Todo!,
    getTodos: [Todo]!,
    editIsCompleted(id: ID!): Todo!,
    deleteTodo(id: ID!): Boolean!
}

type Mutation {
    // addTodo: Todo!,
    // editTitle: Todo!,
}
`