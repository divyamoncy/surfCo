import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CompanyCard from './components/CompanyCard';
import { Company, getAllCompanies, SearchParams } from './services/CompanyService';
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Pagination, Stack, TextField } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: '#9431cc',
      light: '#f2e6f9'
    },
    secondary: {
      main: '#4831cc',
    }
  },
});

const drawerWidth = 240;
const companyInitialValue: Company = {
name: "",
country_code: "",
state_code: "",
id: "",
entity_type: "",
homepage_url: "",
city: "",
overview: "",
entity_id: "",
ipos: [],
acquired: [],
acquiredBy: []};
let companyCodes = { "BD": "BGD", "BE": "BEL", "BF": "BFA", "BG": "BGR", "BA": "BIH", "BB": "BRB", "WF": "WLF", "BL": "BLM", "BM": "BMU", "BN": "BRN", "BO": "BOL", "BH": "BHR", "BI": "BDI", "BJ": "BEN", "BT": "BTN", "JM": "JAM", "BV": "BVT", "BW": "BWA", "WS": "WSM", "BQ": "BES", "BR": "BRA", "BS": "BHS", "JE": "JEY", "BY": "BLR", "BZ": "BLZ", "RU": "RUS", "RW": "RWA", "RS": "SRB", "TL": "TLS", "RE": "REU", "TM": "TKM", "TJ": "TJK", "RO": "ROU", "TK": "TKL", "GW": "GNB", "GU": "GUM", "GT": "GTM", "GS": "SGS", "GR": "GRC", "GQ": "GNQ", "GP": "GLP", "JP": "JPN", "GY": "GUY", "GG": "GGY", "GF": "GUF", "GE": "GEO", "GD": "GRD", "GB": "GBR", "GA": "GAB", "SV": "SLV", "GN": "GIN", "GM": "GMB", "GL": "GRL", "GI": "GIB", "GH": "GHA", "OM": "OMN", "TN": "TUN", "JO": "JOR", "HR": "HRV", "HT": "HTI", "HU": "HUN", "HK": "HKG", "HN": "HND", "HM": "HMD", "VE": "VEN", "PR": "PRI", "PS": "PSE", "PW": "PLW", "PT": "PRT", "SJ": "SJM", "PY": "PRY", "IQ": "IRQ", "PA": "PAN", "PF": "PYF", "PG": "PNG", "PE": "PER", "PK": "PAK", "PH": "PHL", "PN": "PCN", "PL": "POL", "PM": "SPM", "ZM": "ZMB", "EH": "ESH", "EE": "EST", "EG": "EGY", "ZA": "ZAF", "EC": "ECU", "IT": "ITA", "VN": "VNM", "SB": "SLB", "ET": "ETH", "SO": "SOM", "ZW": "ZWE", "SA": "SAU", "ES": "ESP", "ER": "ERI", "ME": "MNE", "MD": "MDA", "MG": "MDG", "MF": "MAF", "MA": "MAR", "MC": "MCO", "UZ": "UZB", "MM": "MMR", "ML": "MLI", "MO": "MAC", "MN": "MNG", "MH": "MHL", "MK": "MKD", "MU": "MUS", "MT": "MLT", "MW": "MWI", "MV": "MDV", "MQ": "MTQ", "MP": "MNP", "MS": "MSR", "MR": "MRT", "IM": "IMN", "UG": "UGA", "TZ": "TZA", "MY": "MYS", "MX": "MEX", "IL": "ISR", "FR": "FRA", "IO": "IOT", "SH": "SHN", "FI": "FIN", "FJ": "FJI", "FK": "FLK", "FM": "FSM", "FO": "FRO", "NI": "NIC", "NL": "NLD", "NO": "NOR", "NA": "NAM", "VU": "VUT", "NC": "NCL", "NE": "NER", "NF": "NFK", "NG": "NGA", "NZ": "NZL", "NP": "NPL", "NR": "NRU", "NU": "NIU", "CK": "COK", "XK": "XKX", "CI": "CIV", "CH": "CHE", "CO": "COL", "CN": "CHN", "CM": "CMR", "CL": "CHL", "CC": "CCK", "CA": "CAN", "CG": "COG", "CF": "CAF", "CD": "COD", "CZ": "CZE", "CY": "CYP", "CX": "CXR", "CR": "CRI", "CW": "CUW", "CV": "CPV", "CU": "CUB", "SZ": "SWZ", "SY": "SYR", "SX": "SXM", "KG": "KGZ", "KE": "KEN", "SS": "SSD", "SR": "SUR", "KI": "KIR", "KH": "KHM", "KN": "KNA", "KM": "COM", "ST": "STP", "SK": "SVK", "KR": "KOR", "SI": "SVN", "KP": "PRK", "KW": "KWT", "SN": "SEN", "SM": "SMR", "SL": "SLE", "SC": "SYC", "KZ": "KAZ", "KY": "CYM", "SG": "SGP", "SE": "SWE", "SD": "SDN", "DO": "DOM", "DM": "DMA", "DJ": "DJI", "DK": "DNK", "VG": "VGB", "DE": "DEU", "YE": "YEM", "DZ": "DZA", "US": "USA", "UY": "URY", "YT": "MYT", "UM": "UMI", "LB": "LBN", "LC": "LCA", "LA": "LAO", "TV": "TUV", "TW": "TWN", "TT": "TTO", "TR": "TUR", "LK": "LKA", "LI": "LIE", "LV": "LVA", "TO": "TON", "LT": "LTU", "LU": "LUX", "LR": "LBR", "LS": "LSO", "TH": "THA", "TF": "ATF", "TG": "TGO", "TD": "TCD", "TC": "TCA", "LY": "LBY", "VA": "VAT", "VC": "VCT", "AE": "ARE", "AD": "AND", "AG": "ATG", "AF": "AFG", "AI": "AIA", "VI": "VIR", "IS": "ISL", "IR": "IRN", "AM": "ARM", "AL": "ALB", "AO": "AGO", "AQ": "ATA", "AS": "ASM", "AR": "ARG", "AU": "AUS", "AT": "AUT", "AW": "ABW", "IN": "IND", "AX": "ALA", "AZ": "AZE", "IE": "IRL", "ID": "IDN", "UA": "UKR", "QA": "QAT", "MZ": "MOZ" };
const countryCodes = Object.values(companyCodes);
function App() {
  const [companyList, setCompanyList] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [page, setPage] = React.useState(1);
  const filterParams = useRef<SearchParams>({ name: "", countryCode: "", ipo: "", hasAcquired: "", hasBeenAcquired: "" });
  const [currentlySelectedCompany, setCurrentlySelectedCompany] = useState<Company>(companyInitialValue);
  const changeCurrentlySelectedCompany = (company: Company) => {
    setCurrentlySelectedCompany(company);
    console.log("changed state : " + currentlySelectedCompany);
  };
  const applyFilters = () => {
    getAllCompanies(filterParams.current).then(list => {
      setFullList(list);
      setCompanyList(list.slice(0, Math.min(20, list.length)));
      setPage(1);
      setCurrentlySelectedCompany(companyInitialValue);
      console.log(companyList);
    });
  };
  useEffect(() => {
    getAllCompanies(filterParams.current).then(list => {
      setFullList(list);
      setCompanyList(list.slice(0, Math.min(20, list.length)));
      setPage(1);
      setCurrentlySelectedCompany(companyInitialValue);
      console.log(companyList);
    });
  }, []);

  useEffect(() => {
    setCompanyList(fullList.slice(20 * (page - 1), Math.min(20 * page, fullList.length)));
  }, [page]);
  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="default">
          <Toolbar>
            <img src='surfco-512.png' height={30}></img>
            <Typography variant="h6" noWrap component="div" color="primary">
              surfCo
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto', px: 2 }}>
            <Stack spacing={2}>
              <TextField id="outlined-basic" label="Company Name" variant="outlined" margin="normal" sx={{ mt: 5 }} size="small" onChange={(e) => filterParams.current = { ...filterParams.current, name: e.target.value }} />
              <Autocomplete
                disablePortal
                id="combo-box-country-code"
                options={countryCodes}
                onChange={(e, value) => filterParams.current = { ...filterParams.current, countryCode: value || "" }}
                sx={{ mt: 2 }}
                renderInput={(params) => <TextField {...params} label="Country Code" size="small" />}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox name="hasBeenAcquired" value={1} onChange={(e) => {
                      filterParams.current = { ...filterParams.current, hasBeenAcquired: e.target.checked ? "1" : "" };
                      console.log(JSON.stringify(filterParams.current));
                    }
                    } />
                  }
                  label="Has been acquired"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="hasAcquired" value={1} onChange={(e) => filterParams.current = { ...filterParams.current, hasAcquired: e.target.checked ? "1" : "" }} />
                  }
                  label="Has made an acquisition"
                />
                <FormControlLabel
                  control={
                    <Checkbox name="ipo" value={1} onChange={(e) => filterParams.current = { ...filterParams.current, ipo: e.target.checked ? "1" : "" }} />
                  }
                  label="Has gone IPO"
                />
              </FormGroup>
              <Button variant="outlined" onClick={applyFilters}>Apply Filters</Button>
              <Button variant="outlined" color="secondary">Reset</Button>
            </Stack>
          </Box>
        </Drawer>
        <Box component="main" sx={{ maxHeight: '100vh', overflow: 'auto', p: 3, width: 600, flexShrink: 0, bgcolor: "#f8f6f9" }}>
          <Toolbar />

          {fullList.length > 0 &&
            <Pagination count={Math.ceil(fullList.length / 20.0)} page={page}
              onChange={handleChange} color="primary" sx={{ mb: 1.5}} />}
          {companyList.map(company => {
            return (
              <CompanyCard company={company} changeCurrentlySelectedCompany={changeCurrentlySelectedCompany} activeCompanyId={currentlySelectedCompany.id} />)
          }
          )}
        </Box>
        <Box component="main" sx={{ p: 3, maxHeight: '100vh', overflow: 'auto', bgcolor: "#f8f6f9" }}>
          <Toolbar />
          <Stack>
            <Stack direction="row" sx={{ display: 'flex', alignItems: 'center', mb: 1.5}}>
              <Box width="45px" height="45px" sx={{ p: 1, boxShadow: 2, borderRadius: 1, mr: 1.5, bgcolor: "white" }}>
                <img src='0.png' height="30px" width="30px"></img></Box>
              <Typography variant="h4" component="div">
                {currentlySelectedCompany.name}
              </Typography>
            </Stack>
            <Typography variant="subtitle1" component="div">
                Overview
              </Typography>
              <Typography paragraph variant="body2">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </Typography>
              {companyList.map(company => {
            return (
              <CompanyCard company={company} changeCurrentlySelectedCompany={changeCurrentlySelectedCompany} activeCompanyId={currentlySelectedCompany.id} />)
          }
          )}
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
