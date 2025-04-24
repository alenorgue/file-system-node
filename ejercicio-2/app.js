const fs = require('fs');

const data = fs.readFileSync("./files/2abril_participants_94849208356.csv", "utf-8");

const parsedData = data.split('\r\n');
console.log(parsedData)

