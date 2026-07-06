const exp = require('express');
const app = exp();
const morgan = require('morgan');

app.listen(3000);

app.use(morgan('dev'));

app.get('/',(req,res)=>{ 
    res.status(200).sendFile('./docs/index.html',{root:__dirname});
})

app.get('/home',(req,res)=>{ 
    res.status(200).sendFile('./docs/index.html',{root:__dirname});
})

app.get('/about',(req,res)=>{
    res.status(200).sendFile('./docs/about.html',{root:__dirname});
})

app.get('/join',(req,res)=>{
    res.status(200).sendFile('./docs/join.html',{root:__dirname});
})

app.get('/joinus',(req,res)=>{
    res.status(301).redirect('/join');
})

app.use((req,res)=>{
    res.status(404).sendFile('./docs/notfound.html',{root:__dirname});
})