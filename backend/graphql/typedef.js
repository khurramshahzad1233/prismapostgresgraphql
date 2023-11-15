export const typedef=
`type User{
    firstname:String
    lastname:String
    email:String
    password:String
    salt:String
}
type Todo{
    id:ID
    title:String
    completed:Boolean
    user:User
}
type Query{
    getalltodo:[Todo]
    getalluser:[User]
    getuserbyid(id:ID):User
}

input userinput{
    firstname:String! 
    lastname:String!
    email:String!
    password:String
    salt:String
}
type Mutation{
    createUser(newuser:userinput):User
}

`



