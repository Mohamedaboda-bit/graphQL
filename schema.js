export const schema  = `#graphql
 type user{
    _id:ID!
    username:String!
    email:String!
    role:String!
 }

 enum role {
    user
    admin
 }
enum status{
    todo
    inprogress
    done
 }

 type Todo{
    title:String!
    status:String!
    userId:ID
 }

type Query{
    getUser(id:ID!):user
    getAllUsers:[user]
    todo(id:ID):Todo
}

type Mutation{
deleteUser(id:ID):String
addUser(user:NewUserInput):user
login(user:loginInput):response
addTodo(todo:todoInput):Todo
deleteTodo(id:ID):String
}

input NewUserInput {
  username: String!
  password: String!
  email: String!
  role: String!
}
input loginInput{
email:String
password:String
}

input todoInput{
title:String
status:status
}

type response{
message:String
token:String
}

`