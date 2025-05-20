export const schema  = `#graphql
 type user{
    _id:ID!
    username:String!
    email:String!
    role:String!
    todos:[Todo]
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
    userTodos:[Todo]
    use:user
}

type Mutation{
deletetodo(id:ID):String
addUser(user:NewUserInput):user
addTodo(todo:todoInput):Todo
register(usrer:userInput):String
login(user:loginInput):response
}

input userInput{
   username:String!
   password:String!
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