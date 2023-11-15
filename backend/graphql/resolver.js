import prisma from "../../db/db.config.js";
import {todos} from "./todo.js"
import {users} from "./user.js";


export const resolver={
    Todo:{
        user:(todo)=>users.find((user)=>user.id===todo.id)
    },
    Query:{
        getalluser:()=>users,
        getalltodo:()=>todos,
        getuserbyid(parent,args,contextValue,info){
            return users.find((user)=>user.id===args.id)
        },
    },
    Mutation:{
        createUser:async(parent,{newuser})=>{
            const createuser= await prisma.user.create({
                data:{
                    firstname:newuser.firstname,
                    lastname:newuser.lastname,
                    email:newuser.email,
                    password:newuser.password,
                    salt:newuser.salt,
                }
            })
            console.log(createuser)
            return createuser
        }
    }
    
}




