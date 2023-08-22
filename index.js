const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3200;

const homePage = fs.readFileSync("home.html");
const teamPage = fs.readFileSync("team.html");
const planPage = fs.readFileSync("plan.html");
const contactPage = fs.readFileSync("contact.html");

const server = http.createServer((req, res) =>{
    if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/HTML");
        res.write(homePage);
    } else if (req.url === "/team.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(teamPage);
    } else if (req.url === "/plan.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(planPage);
    } else if (req.url === "/contact.html") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write(contactPage);
    }
    else if (req.url.match("\.jpg$")){
        try{
            res.statusCode = 200;
            res.setHeader("Content-Type", "image/jpg");
            imgLoc = req.url.replace("/", "./");
            console.log(imgLoc);
            image = fs.readFileSync(imgLoc);
            res.end(image);
        } catch{
            res.statusCode = 404;
            res.write("404");
            console.log(req.url);
        }
    } else{
        res.statusCode = 404;
        res.write("404");
        console.log(req.url);
    }
    res.end();
});
server.listen(port, hostname, () =>{
    console.log("Server is now running");
})
