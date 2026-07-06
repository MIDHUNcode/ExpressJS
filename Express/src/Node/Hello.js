const Hello=(hname)=>{
    console.log(`Hello ${hname}`);
}

// Hello("World");

// console.log(global);

global.setTimeout(()=>{
    console.log("Hello World");
    clearInterval(intervalId);
}, 5000);

const intervalId = setInterval(()=>{
    console.log("Hello World");
}, 1000);

console.log(__dirname);
console.log(__filename);