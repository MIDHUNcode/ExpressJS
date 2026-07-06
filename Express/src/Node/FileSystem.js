// FS---File System

const fs = require('fs'); 

// mkdir 

// if(!fs.existsSync('./docs')){
//     fs.mkdir('./docs',(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     else{
//     console.log("Folder created");
// }})
// }

// fs.writeFile('./docs/file.txt','Kootam',(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     else{
//         console.log("File created");
//     }
// });

// if(fs.existsSync('./docs/file.txt')){
//     fs.readFile('./docs/file.txt',(err,data)=>{
//         if(err){
//             console.log(err.message);
//             }
//         else{
//             console.log(data.toString());
//         }
//     });
// }
    
if(fs.existsSync('./docs/file.txt')){
    fs.unlink('./docs/file.txt',(err)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log("File deleted");
        }
    });
}

if(fs.existsSync('./docs')){
    fs.rmdir('./docs',(err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Folder deleted");
    }
});
}