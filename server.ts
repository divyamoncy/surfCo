
import * as express from 'express';
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
        .on('data', (row: any) => companyData.set(row['id'], { 'acquired': [], 'acquiredBy': [], 'ipos': [], ...row }))
        .on('end', async (rowCount: number) => {
            console.log(companyData.size);
            let y = await loadIpoData();
            return companyData;
        });
};

let loadIpoData = async () => {
    let ipo = new Set();
    let notFoundIPOS: any[] = [];
    fs.createReadStream(path.resolve(__dirname, 'data', 'ipos.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.log(error))
        .on('data', (row: any) => {
            ipoData.set(row['object_id'], row);
            if (companyData.has(row['object_id'])) {
                companyData.get(row['object_id']).ipos.push(row['ipo_id']);
                if(companyData.get(row['object_id']).ipos.length > 1) 
                console.log("The anomaly " + row['object_id']);
                ipo.add(row['object_id']);
            }
            else
                notFoundIPOS.push(row['object_id']);
        })
        .on('end', async (rowCount: number) => {
            console.log("NotFoundIPOS " + JSON.stringify(notFoundIPOS));
            console.log("IPO inserted " + ipo.size);
            console.log(`Parsed IPO ${rowCount} rows`);
            let z = await loadAcquisitionData();
            return ipoData;
        });
};

let loadAcquisitionData = async () => {
    let madeAcquisition = new Set();
    let hasBeenAcquired = new Set();
    let count = 0;
    fs.createReadStream(path.resolve(__dirname, 'data', 'acquisitions.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', (error: any) => console.log(error))
        .on('data', (row: any) => {
            acquisitionData.set(row['acquisition_id'], row);
            if (companyData.has(row['acquiring_object_id'])) {
                count++;
                madeAcquisition.add(row['acquiring_object_id']);
                companyData.get(row['acquiring_object_id']).acquired.push(row['acquisition_id']);
                //console.log("Added2  " + JSON.stringify(companyData.get(row['acquiring_object_id'])));
            }
            if (companyData.has(row['acquired_object_id'])) {
                count++;
                hasBeenAcquired.add(row['acquired_object_id']);
                companyData.get(row['acquired_object_id'])?.acquiredBy.push(row['acquisition_id']);
            }
        })
        .on('end', (rowCount: number) => {
            console.log("Acquisition inserted " + count);
            console.log("madeAcquisition count :  " + madeAcquisition.size);
            console.log("hasBeenAcquired count :  " + hasBeenAcquired.size);
            //console.log(`Parsed ${rowCount} rows` + [...companyData.values()].map(x => JSON.stringify(x)));
            return [...companyData.entries()];
        });
};


// loadCompanyData().then((resolved: any) => {
//     console.log("Company success");
//     loadIpoData().then((resolved: any) => {
//         console.log("IPO success");
//         loadAcquisitionData().then((resolved: any) => console.log("Acquisition success")).catch((err: any) => console.log(err));
//     }).catch((err: any) => console.log(err));
// }).catch((err: any) => console.log(err));


const app = express();
const PORT: Number = 3000;

const appFolder = path.join(__dirname, 'surfco-ui/build');

// app.get('/', (req, res) => {
//     res.send('Welcome to typescript backend!');
// })

app.get('/search', (req, res) => {
    console.log("REquest received");
    let searchResults = req.query.name ? [...companyData.values()].filter((v) => v.name.toLowerCase().includes(req.query.name)) : [...companyData.values()];
    searchResults = req.query.countryCode ? searchResults.filter((v) => v.country_code == req.query.countryCode) : searchResults;
    searchResults = req.query.ipo ? searchResults.filter((v) => ipoData.has(v.id)) : searchResults;
    searchResults = req.query.hasAcquired ? searchResults.filter((v) => v.acquired.length != 0) : searchResults;
    searchResults = req.query.hasBeenAcquired ? searchResults.filter((v) => v.acquiredBy.length != 0) : searchResults;
    console.log("SearchRESults length : " + searchResults.length);
    res.send(searchResults);
})

app.get('/ipo', (req, res) => {
    console.log("IPO request received");
    let companyId = req.query.companyId;
    let searchResults = ipoData.has(companyId) ? ipoData.get(companyId) : {};
    res.send(searchResults);
})

app.use(express.static(appFolder), (rep, res) => {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile('index.html', { root: appFolder });
});


// Server setup
app.listen(PORT, () => {
    loadCompanyData().then((resolved: any) => {
        console.log('The application is listening '

            + 'on port http://localhost:' + PORT);
    }).catch((err: any) => console.log(err));

    // loadCompanyData().then((resolved: any) => {
    //     console.log("Company success");
    //     loadIpoData().then((resolved: any) => {
    //         console.log("IPO success");
    //         loadAcquisitionData().then((resolved: any) => console.log("Acquisition success")).catch((err: any) => console.log(err));
    //     }).catch((err: any) => console.log(err));
    // }).catch((err: any) => console.log(err));
    //let x = loadIpoData().then((resolved: any) => console.log(resolved)).catch((err: any) => console.log(err));

})
