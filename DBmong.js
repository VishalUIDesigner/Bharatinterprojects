const express=require("express");
// const bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Registration');
const db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

const app=express()


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
	extended: true
}));

app.post('/Regdform', function(req,res){
	const name = req.body.name;
	const email =req.body.email;
	const phone =req.body.phone;
    const course = req.body.course;
	const pass = req.body.password;
	


	const data = {
		"name": name,
		"email":email,
		"phone":phone,
        "course":course,
		"password":pass
		
		
	}
db.collection('data').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('Bharatintern.html');
})


app.get('/',function(req,res){
res.set({'Access-control-Allow-Origin': '*'});
return res.redirect('Registerform.html');
}).listen(3000)


console.log("server listening at port 3000");
