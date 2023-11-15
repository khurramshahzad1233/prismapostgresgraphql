import express from "express";
import Errormiddleware from './middleware/error.js'
import user from "./routes/userroute.js"
import comment from "./routes/commentroute.js"
import post from "./routes/postroute.js"
import {ApolloServer} from "@apollo/server"
import {expressMiddleware} from "@apollo/server/express4";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer"
import http from "http"
import { typedef } from "./graphql/typedef.js";
import {resolver} from "./graphql/resolver.js"

// import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();

const httpServer=http.createServer(app);
const server=new ApolloServer({
    typeDefs: typedef,
    resolvers: resolver,
    plugins:[ApolloServerPluginDrainHttpServer({httpServer})]
});

await server.start()



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(cookieParser());

app.use("/graphql",expressMiddleware(server,{
    context:async({req})=>({token:req.headers.token}),
}))
await new Promise((resolve)=>httpServer.listen({port:5000},resolve))


app.use('/api',user);
app.use("/api",post);
app.use("/api",comment)

// app.use(express.static(path.join(__dirname,"../itinertip/build")));
// app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../itinertrip/build/index.html"))
// });

app.use(Errormiddleware)
export default app;