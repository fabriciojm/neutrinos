const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const allowed=new Set(['index.html','style.css','app.js','visuals.js','animations.js','favicon.svg']);
http.createServer((req,res)=>{let file;try{file=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html'}catch{res.writeHead(400);return res.end('Bad request')}if(!allowed.has(file)){res.writeHead(404);return res.end('Not found')}fs.readFile(path.join(root,file),(err,data)=>{if(err){res.writeHead(500);return res.end('Server error')}res.writeHead(200,{'Cache-Control':'no-store','Content-Type':{'html':'text/html; charset=utf-8','css':'text/css; charset=utf-8','js':'application/javascript; charset=utf-8','svg':'image/svg+xml'}[file.split('.').pop()]});res.end(data)})}).listen(7654,'0.0.0.0',()=>console.log('Presentation running at http://localhost:7654'));
