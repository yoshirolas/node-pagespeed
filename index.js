const http = require('http');
const https = require('https');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

fs.stat('./urls', (err, stats) => {
  if (err) throw err;
  console.log('THE LIST OF URLS EXISTS');
  // console.log(`stats: ${JSON.stringify(stats, '', 2)}`);
});

const entriesUrls = fs.readFileSync('./urls/urls.txt', "utf8");

const arrUrls = entriesUrls.split('\n');
console.log('first url: ' + arrUrls[0]);
console.log('second url: ' + arrUrls[1]);
console.log('third url: ' + arrUrls[2]);
console.log(arrUrls.length);


fs.open('./results/report.txt', 'a+', (err) => {
  if (err) throw err;
  console.log('CREATED REPORT FILE')
});



// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
//   console.log('work');
//   console.log(req.headers);
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });


const url = arrUrls[0];

https.get(
  `https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=${arrUrls[0]}`,
  (res) => {

  console.log('Status: ' + res.statusCode);

  let info = '';

  res.on('data', (data) => {
    // process.stdout.write(d);
    info += Buffer.from(data).toString('utf8');
  });

  res.on('end', () => {
    // console.log(info);
    fs.writeFile('./results/report.txt', `${info}`, (err) => {
      if (err) throw error; 
      console.log("THE RESULTS WERE WRITTEN TO THE FILE");
    });
  });

}).on('error', (e) => {
  console.error(e);
});
