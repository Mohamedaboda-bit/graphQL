import userModel from "./models/users.js";
import todoModel from "./models/todos.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const resolvers = {
    Query:{
        getUser:async (parent,{id})=>{
            const user=await userModel.findById(id)
            return user
        },
        getAllUsers:async (parent,args)=>{
            const users=await userModel.find()
            return users
        },
        userTodos:async (_,args,context)=>{
            const user_id= context.user.id
            if(!user_id){
                throw new Error("Unauthorized")
            }
            const todos=await todoModel.find({userId:user_id})
            return todos
        }
    },
    Mutation:{
        addUser:async (parent,{user})=>{
            const newUser=await userModel.create(user)
            return newUser
        },
        addTodo:async (parent,{todo},context)=>{
            if(!context.user){
                throw new Error("Unauthorized")
            }
            todo.userId=context.user.id
            const newTodo=await todoModel.create(todo)
            return newTodo
        },
        login:async(parent,{user})=>{
            if(!user.email || !user.password){
                throw new Error("Please provide email and password")
            }
            const foundUser=await userModel.findOne({email:user.email})
            if(!foundUser){
                throw new Error("User not found")
            }
            const isMatch=await bcrypt.compare(user.password,foundUser.password)
            if(!isMatch){
                throw new Error("Invalid credentials")
            }
            const token=jwt.sign({data:foundUser},process.env.JWT_SECRET,{expiresIn:"1h"})
            return {
                message:"Login successful",
                token:token
            }
        },
        deletetodo:async(parent,{id},context)=>{
            if(context.data.role!=="admin"){
                throw new Error("Unauthorized")
            }
            const deletedTodo=await todoModel.findByIdAndDelete(id)
            if(!deletedTodo){
                throw new Error("Todo not found")
            }
            return "Todo deleted successfully"
        }

        
}
,
users:{
    todos: async (parent)=>{
            console.log(parent)
            return await todoModel.find({userId:parent._id})
    }
}
};