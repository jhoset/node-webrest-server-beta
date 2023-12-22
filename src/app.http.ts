import http from 'http';
import fs from 'fs'

const server = http.createServer((req, res) => {
    console.log('>>> Request: ', req.url)
    // res.writeHead(200, { 'Content-Type': 'text/html' }); // Escribirmos el nivel de estado de la respuesta 200 OK
    // res.write('<h1>OK</h1>');
    // res.end();


    // const user = {
    //     name: 'Zero',
    //     age: 24,
    //     city: 'San Francisco',
    // }

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(user));

    // if (req.url === '/js/app.js') {
    //     const scriptFile = fs.readFileSync('./public/js/app.js', 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'application/javascript' })
    //     res.end(scriptFile);
    // } else if (req.url === '/css/styles.css') {
    //     const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
    //     res.writeHead(200, { 'Content-Type': 'text/css' });
    //     res.end(cssFile)
    // } else if (req.url == '/') {
    //     const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end(htmlFile);
    // } else {
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.end();
    // }


    if (req.url == '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(responseContent);




})

server.listen(8080, () => {
    console.log(`Server started at: http://localhost:${8080}`)
})