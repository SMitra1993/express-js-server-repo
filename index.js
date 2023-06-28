const express = require('express')
const httpStatusInstance = require('http-status-codes');
const fsInstance = require('fs');
const portNumber = 8080;

// Creates an instance of an Express application.
const app = express()

app.get('/', (req, res) => {
    // Write an html response to the client
    res.writeHead(httpStatusInstance.StatusCodes.OK, {
        "Content-Type": "text/html"
    });
    readFile(redirectToHtml(`index`), res);
});

app.get('/page1', (req, res) => {
    // Write an html response to the client
    res.writeHead(httpStatusInstance.StatusCodes.OK, {
        "Content-Type": "text/html"
    });
    readFile(redirectToHtml(`pages/page1`), res);
});

app.get('/page2', (req, res) => {
    // Write an html response to the client
    res.writeHead(httpStatusInstance.StatusCodes.OK, {
        "Content-Type": "text/html"
    });
    readFile(redirectToHtml(`pages/page2`), res);
});

// Navigate to HTML
const redirectToHtml = (url) => {
    return `${url}.html`;
};

// Read file
const readFile = (file_path, res) => {
    if (fsInstance.existsSync(file_path)) {
        fsInstance.readFile(file_path, (error, data) => {
            if (error) {
                console.log(error);
                handleError(res);
                return;
            }
            res.write(data);
            res.end();
        });
    } else {
        handleError(res);
    }
};

const handleError = res => {
    res.writeHead(httpStatusInstance.StatusCodes.NOT_FOUND, {
        "Content-Type": "text/html"
    });
    res.write(`<h1>HTML file not found!</h1>`);
    res.end();
};

// Setup the server to listen on port 8080
app.listen(portNumber, () => {
    console.log(`Server is listening on port ${portNumber}`);
})