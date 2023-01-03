
import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

let companyData = new Map();
let ipoData = new Map();
let acquisitionData = new Map();

let loadCompanyData = async () => {
    fs.createReadStream(path.resolve(__dirname, 'data', 'objects.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.log(error))
        .on('data', (row: any) => companyData.set(row['id'], { 'acquired': [], 'acquiredBy': [], ...row }))
        .on('end', (rowCount: number) => { return companyData });
};

let loadIpoData = async () => {
    fs.createReadStream(path.resolve(__dirname, 'data', 'ipos.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.log(error))
        .on('data', (row: any) => ipoData.set(row['object_id'], row))
        .on('end', (rowCount: number) => {
            //console.log(`Parsed ${rowCount} rows` + [...ipoData.keys()]);
            return ipoData;
        });
};

let loadAcquisitionData = async () => {
    fs.createReadStream(path.resolve(__dirname, 'data', 'acquisitions.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.log(error))
        .on('data', (row: any) => {
            acquisitionData.set(row['acquisition_id'], row);
            if (companyData.has(row['acquiring_object_id'])) {
                companyData.get(row['acquiring_object_id']).acquired.push(row['acquisition_id']);
                //console.log("Added2  " + JSON.stringify(companyData.get(row['acquiring_object_id'])));
            }
            if (companyData.has(row['acquired_object_id']))
                companyData.get(row['acquired_object_id'])?.acquiredBy.push(row['acquisition_id']);
        })
        .on('end', (rowCount: number) => {
            //console.log(`Parsed ${rowCount} rows` + [...companyData.values()].map(x => JSON.stringify(x)));
            return [...companyData.entries()];
        });
};
loadCompanyData().then((resolved: any) => {
    loadIpoData().then((resolved: any) => console.log("success")).catch((err: any) => console.log(err));
    loadAcquisitionData().then((resolved: any) => console.log("success")).catch((err: any) => console.log(err));
}).catch((err: any) => console.log(err));


const app = express();
const PORT: Number = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})
app.get('/search', (req, res) => {
    let x = req.query.name;
    let searchResults = [...companyData.values()].filter((v) => v.name.includes(x));
    searchResults = req.query.ipo ? searchResults.filter((v) => ipoData.has(v.id)) : searchResults;
    searchResults = req.query.hasAcquired ? searchResults.filter((v) => v.acquired.length != 0) : searchResults;
    searchResults = req.query.hasBeenAcquired ? searchResults.filter((v) => v.acquiredBy.length != 0) : searchResults;
    res.send(searchResults);
})


// Server setup
app.listen(PORT, () => {
    //let x = loadIpoData().then((resolved: any) => console.log(resolved)).catch((err: any) => console.log(err));
    console.log('The application is listening '

        + 'on port http://localhost:' + PORT);
})
