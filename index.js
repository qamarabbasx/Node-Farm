const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');
// const hello ='Hello World !';
// console.log(hello);

////////////////////////////////////////////////////////////
// File System
/*
// Blocking, Synchronous way
const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);
const textOut=(`This is everything we knew about avocado: ${textIn}.\n Created on ${Date.now()}`);
fs.writeFileSync('./txt/output.txt',textOut);
console.log('File written');
// Non-blocking, Asynchronous Way
fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
    if(err) return console.log('error 💥');
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
        console.log(data2);
        fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
            console.log(data3);
            fs.writeFile('./txt/final.txt',`${data1}.\n${data2}.\n${data3}.`,err=>{
                console.log('new file written');
            });
        });
    });
});
console.log('Will Read this code first then Asynchronous ❤  ');
*/

////////////////////////////////////////////////////////////
// Server
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj= JSON.parse(data);

const server= http.createServer((req,res)=>{
    const pathName=req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is Overview Tab!');
    }
    else if (pathName === '/products'){
        res.end('This is Products Page!');
    }else if(pathName === '/api'){
        res.writeHead(200,{'content-type' :'application/json'});
            res.end(data);
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header': 'Hello world from my own header'
        });
        res.end('<h1>Page Not found</h1>');
    }
});
server.listen(8000,'127.0.0.1',()=>{
    console.log('Listening to requests on port 8000');
});