"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var path = require("path");
var csv = require("fast-csv");
var companyData = new Map();
var ipoData = new Map();
var acquisitionData = new Map();
var loadCompanyData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        fs.createReadStream(path.resolve(__dirname, 'data', 'objects.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', function (error) { return console.log(error); })
            .on('data', function (row) { return companyData.set(row['id'], __assign({ 'acquired': [], 'acquiredBy': [], 'ipos': [] }, row)); })
            .on('end', function (rowCount) { return __awaiter(void 0, void 0, void 0, function () {
            var y;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(companyData.size);
                        return [4 /*yield*/, loadIpoData()];
                    case 1:
                        y = _a.sent();
                        return [2 /*return*/, companyData];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var loadIpoData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var ipo, notFoundIPOS;
    return __generator(this, function (_a) {
        ipo = new Set();
        notFoundIPOS = [];
        fs.createReadStream(path.resolve(__dirname, 'data', 'ipos.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', function (error) { return console.log(error); })
            .on('data', function (row) {
            ipoData.set(row['object_id'], row);
            if (companyData.has(row['object_id'])) {
                companyData.get(row['object_id']).ipos.push(row['ipo_id']);
                if (companyData.get(row['object_id']).ipos.length > 1)
                    console.log("The anomaly which has 2 IPOs " + row['object_id']);
                ipo.add(row['object_id']);
            }
            else
                notFoundIPOS.push(row['object_id']);
        })
            .on('end', function (rowCount) { return __awaiter(void 0, void 0, void 0, function () {
            var z;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Not Found IPOs " + JSON.stringify(notFoundIPOS));
                        console.log("IPO inserted " + ipo.size);
                        console.log("Parsed IPO ".concat(rowCount, " rows"));
                        return [4 /*yield*/, loadAcquisitionData()];
                    case 1:
                        z = _a.sent();
                        return [2 /*return*/, ipoData];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
var loadAcquisitionData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var madeAcquisition, hasBeenAcquired, count;
    return __generator(this, function (_a) {
        madeAcquisition = new Set();
        hasBeenAcquired = new Set();
        count = 0;
        fs.createReadStream(path.resolve(__dirname, 'data', 'acquisitions.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', function (error) { return console.log(error); })
            .on('data', function (row) {
            var _a;
            acquisitionData.set(row['acquisition_id'], row);
            if (companyData.has(row['acquiring_object_id'])) {
                count++;
                madeAcquisition.add(row['acquiring_object_id']);
                companyData.get(row['acquiring_object_id']).acquired.push(row['acquisition_id']);
            }
            if (companyData.has(row['acquired_object_id'])) {
                count++;
                hasBeenAcquired.add(row['acquired_object_id']);
                (_a = companyData.get(row['acquired_object_id'])) === null || _a === void 0 ? void 0 : _a.acquiredBy.push(row['acquisition_id']);
            }
        })
            .on('end', function (rowCount) {
            console.log("Acquisition inserted " + count);
            console.log("madeAcquisition count :  " + madeAcquisition.size);
            console.log("hasBeenAcquired count :  " + hasBeenAcquired.size);
            return __spreadArray([], __read(companyData.entries()), false);
        });
        return [2 /*return*/];
    });
}); };
var convertToTimestamp = function (acquiredDate) {
    var _a = __read(acquiredDate.split('/').map(function (x) { return parseInt(x); }), 3), month = _a[0], day = _a[1], year = _a[2];
    year = (59 < year && year <= 99) ? year + 1900 : year + 2000;
    var convertedDate = new Date(year, month - 1, day).getTime();
    return convertedDate;
};
var app = express();
var PORT = process.env.port || 3000;
var appFolder = path.join(__dirname, 'surfco-ui/build');
app.get('/search', function (req, res) {
    console.log("REquest received");
    var searchResults = req.query.name ? __spreadArray([], __read(companyData.values()), false).filter(function (v) { return v.name.toLowerCase().includes(req.query.name); }) : __spreadArray([], __read(companyData.values()), false);
    searchResults = req.query.countryCode ? searchResults.filter(function (v) { return v.country_code == req.query.countryCode; }) : searchResults;
    searchResults = req.query.ipo ? searchResults.filter(function (v) { return ipoData.has(v.id); }) : searchResults;
    searchResults = req.query.hasAcquired ? searchResults.filter(function (v) { return v.acquired.length != 0; }) : searchResults;
    searchResults = req.query.hasBeenAcquired ? searchResults.filter(function (v) { return v.acquiredBy.length != 0; }) : searchResults;
    console.log("Search ReSults length : " + searchResults.length);
    res.send(searchResults);
});
app.get('/ipo', function (req, res) {
    console.log("IPO request received");
    var companyId = req.query.companyId;
    var searchResults = ipoData.has(companyId) ? ipoData.get(companyId) : {};
    res.send(searchResults);
});
app.get('/acquisitions', function (req, res) {
    console.log("Acquisition request received");
    var companyId = req.query.companyId;
    var acquisitions = [];
    companyData.get(companyId).acquired.forEach(function (acquisitionId) {
        var acquisition = acquisitionData.get(acquisitionId);
        acquisitions.push(__assign(__assign({}, acquisition), { 'acquiredCompany': companyData.has(acquisition.acquired_object_id) ? companyData.get(acquisition.acquired_object_id).name : "", 'timestamp': convertToTimestamp(acquisition.acquired_at) }));
    });
    acquisitions.sort(function (a, b) {
        return b.timestamp - a.timestamp;
    });
    res.send(acquisitions);
});
app.get('/acquirer', function (req, res) {
    console.log("Acquirer request received");
    var companyId = req.query.companyId;
    var acquisitions = [];
    companyData.get(companyId).acquiredBy.forEach(function (acquisitionId) {
        var acquisition = acquisitionData.get(acquisitionId);
        acquisitions.push(__assign(__assign({}, acquisition), { 'acquirerCompany': companyData.has(acquisition.acquiring_object_id) ? companyData.get(acquisition.acquiring_object_id).name : "", 'timestamp': convertToTimestamp(acquisition.acquired_at) }));
    });
    acquisitions.sort(function (a, b) {
        return b.timestamp - a.timestamp;
    });
    res.send(acquisitions);
});
app.use(express.static(appFolder), function (rep, res) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile('index.html', { root: appFolder });
});
// Server setup
app.listen(PORT, function () {
    loadCompanyData().then(function (resolved) {
        console.log('The application is listening '
            + 'on port http://localhost:' + PORT);
    })["catch"](function (err) { return console.log(err); });
});
