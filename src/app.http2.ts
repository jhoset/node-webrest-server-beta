import http2 from 'http2';
import fs from 'fs'

const server = http2.createSecureServer({
        key: fs.readFileSync('./keys/server.key', 'utf-8'),
        cert: fs.readFileSync('./keys/server.crt', 'utf-8'),
    },
    (req, res) => {
        console.log('>>> Request: ', req.url)


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

        try {
            const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
            res.end(responseContent);
    
        } catch (e) {
            res.writeHead(404);
            res.end();

        }





    })

server.listen(8080, () => {
    console.log(`Server started at: http://localhost:${8080}`)
})