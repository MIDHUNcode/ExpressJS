const http=require('http');
const fs=require('fs');
const _=require('lodash');

const server=http.createServer((req,res)=>{

    res.setHeader('Content-Type', 'text/html');
    console.log(req.url);
    let path='./docs';
    if ( req.url=='/'){
        path+='/index.html';
        res.statusCode=200;
    }
    else if(req.url=='/home'){
        res.statusCode=301;
        res.setHeader('Location','/');
        res.end();
    }
    else if(req.url=='/about'){
        path+='/about.html';
        res.statusCode=200;
    }
    else if(req.url=='/joinus'){
        path+='/join.html';
        res.statusCode=200;
    }
    else{
        path+='/notfound.html';
        res.statusCode=404;
    }
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err.message);
            res.end();
        } else { 
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000,'localhost',()=>{
    console.log("Server is running")
    console.log(_.random(0,20));
}) 