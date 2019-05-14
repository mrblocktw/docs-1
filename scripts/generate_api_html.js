const fs = require('fs');
const apiData = require('./api_data.json');
const ejs = require('ejs');
const path = require('path');

let gettingStartedBlock = '';
let endpointsBlock = '';
let sidebarBlock = '';
let page = '';

// apiData.GettingStarted.articles.forEach(article => {
//     const url = path.join(__dirname, '../templates/api/article.ejs');
//     ejs.renderFile(url, article, (err, html) => {
//         articlesHtml += html;
//     });
// });

const gettingStartedPath = path.join(__dirname, '../templates/api/getting_started.ejs');
ejs.renderFile(gettingStartedPath, apiData.GettingStarted, (err, html) => {
    if (err) console.log(err);
    gettingStartedBlock = html;
});

const endpointsPath = path.join(__dirname, '../templates/api/endpoints.ejs');
ejs.renderFile(endpointsPath, apiData, (err, html) => {
    if (err) console.log(err);
    endpointsBlock = html;
});

const sidebarPath = path.join(__dirname, '../templates/api/sidebar.ejs');
ejs.renderFile(sidebarPath, apiData, (err, html) => {
    if (err) console.log(err);
    sidebarBlock = html;
});

const boilerplatePath = path.join(__dirname, '../templates/boilerplate.ejs');
ejs.renderFile(boilerplatePath, {documentationContent: gettingStartedBlock + endpointsBlock, sidebar: sidebarBlock}, (err, html) => {
    if (err) console.log(err);
    page = html;
});

const destPath = path.join(__dirname, '../app/docs/api.html');
fs.writeFile(destPath, page, (err) => {
    if (err) throw err;
    process.exit();
});
