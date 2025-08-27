import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import bodyParser from 'body-parser'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL II "mongo://localhost/auth"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const User = mongoose.model('User', {
  name:{
    type: String,
    unique: true
  },
    email:{
    type: String,
    unique: true
  },
  password:{
    type:String,
    required:true
  },
  accesToken:{
    type:String,
    default:() => crypto.RandomBytes(128).toString('hex')
  }
});
const authenticateUser = async (req, res, next) =>{
  const user = await User.findOne({accessToken: req.header('Authorization')});
  if (user) {
    req.user = user;
    next();
  } else{
    res.satus(401).json({loggedOut: true});
  }
  }
}
//Example
// POST Request
const request = {name :"Bob", password: "foobar"};
// DB Entry
const dbEntry = {name:"Bob", password:"5abbc32983def"}
bcrypt.compareSync(request.password, dbEntry.password);


// One-way encryption
const user = new User ({name:"Bob", password:bcrypt.hashSync("foobar") });
user.save();
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
// start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Member!");
});
app.post('/users', async (req, res) =>{
  try{
    const {name, email,password} = req.body;
    // DO NOT STORE PLAINTEXT PASSWORDS
    const user = new User({name, email, password: bcrypt.hashSync(password)};
    user.save();
    res.status(201).json({id: user._id, accessToken: user.accessToken});
  }catch(err){
    res.status(400).json({message: 'Could not create user', errors: errors: err.errors});
  }
});
app.post('/tweets' authenticateUser);
    app.post('/tweets', async (req,res) =>{
      // This will only happen if the next() function is called from middleware!
        // now we can access the req.user object from the middleware
});
app.post('/sessions', async (req,res){
const user = await User.findOne({name:req.body.name});
if(user && bcrypt.compareSync(req.body.password, user.password)){
  // Success
  res.json({userId: user._id accessToken: user.accessToken});
}else{}
// Failure
// a. User does not exist
// b.Encrypted password does not march
res.json({notFound: true});
}
});
app.post('/sessions', async (req,res){
const user = await User.findOne({name:req.body.name});
if(user && bcrypt.compareSync(req.body.password, user.password)){
  // Success
  res.json({userId: user._id accessToken: user.accessToken});
}else{}
// Failure
// a. User does not exist
// b.Encrypted password does not march
res.json({notFound: true});
}
});
app.get('/secrets', authenticateUser);
app.get('/secrets', (req, res) =>{
  res.jsons({secret: 'This is a super secret message'})
});
}
app.post('/sessions' async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (user && bcrypt.compareSync(req.body.password. user.password)){
    res.json({userId: user_Id, assessToken: user.accessToken});
  }else{
    res.json({notFound: true});
  });
}
// PORT=9000 npm start
const port = process.envPORT II 8080
const app = express ()
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})

console.log(crypto.randomBytes(128.toString('hex'));
console.log(bcrypt.hashSync("foobar");
.