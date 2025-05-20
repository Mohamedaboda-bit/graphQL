import userModel from "./models/users.js";
import todoModel from "./models/todos.js";
export const resolvers = {
    Query:{
        getUser:async (parent,{id})=>{
            const user=await userModel.findById(id)
            return user
        },
        getAllUsers:async (parent,args)=>{
            const users=await userModel.find()
            return users
        }
    },
    Mutation:{
        addUser:async (parent,{user})=>{
            const newUser=await userModel.create(user)
            return newUser
        },
        addTodo:async (parent,{todo})=>{
            const newTodo=await todoModel.create(todo)
            return newTodo
        },
    }
};