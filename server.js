require('dotenv').config()
const express=require('express')
const jwt=require('jsonwebtoken')
const app=express()
app.use(express.json())

posts=[
    {
        name:"ahsan",
        title:"Post 1"
    },
    {
        name:"ali",
        title:"Post 2"
    },
    {
        name:"ahmed",
        title:"Post 3"
    }
]
app.get("/users", authenticateToken, (req,res)=>{
    console.log(req)
    res.json(posts.filter(post=> post.name ==req.user.name))
})
app.post("/login",(req,res)=>{
    console.log(process.env.ACCESS_TOKEN_SECRET)
    const user={
        name:req.body.name
    }
    const accesstoken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accesstoken:accesstoken})

})


function authenticateToken(req,res,next){





    const authHeader=req.headers['authorization']   //this will get the authorization part from req body   --->>>>> Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

//authHeader.split(' ') splits the string into an array ['Bearer', '<token>'].
//authHeader.split(' ')[1] retrieves the token part of the array.
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(401)
    req.user=user
    console.log(req.user)
    next()
})
}


app.listen(3000)