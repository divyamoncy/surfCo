import { Box, Stack, Typography, Link } from "@mui/material";
import { Company, getAllAcquisitionsByCompanyId, getIpoByCompanyId, IPO } from "../services/CompanyService";
import { grey } from '@mui/material/colors';
import PlaceIcon from '@mui/icons-material/Place';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect, useState } from "react";
import IpoDetails from "./IpoDetails";
import AcquisitionDetails from "./AcquisitionDetails";

function CompanyDetails(props: { company: Company }) {
    const company = props.company;
    const initialIpo: IPO = {
        id: "",
        ipo_id: "",
        object_id: "",
        valuation_amount: 0,
        valuation_currency_code: "",
        raised_amount: 0,
        raised_currency_code: "",
        public_at: "",
        stock_symbol: "",
        source_url: "",
        source_description: ""
    };
    const [ipoData, setIpoData] = useState<IPO>(initialIpo);
    const [acquisitions, setAcquisitions] = useState([]);
    useEffect(()=> {
        if(company.ipos.length != 0) {
            getIpoByCompanyId(company.id).then(ipo => {
            setIpoData(ipo);
            console.log("IPO " + JSON.stringify(ipo));
          });}
        else
          setIpoData(initialIpo);

        if(company.acquired.length != 0) {
            getAllAcquisitionsByCompanyId(company.id).then(acquisitions => {
                setAcquisitions(acquisitions);
                console.log("No of acquisitions " + acquisitions.length);
            })
        }
        else 
            setAcquisitions([]);
    }, [company]);
    let locationArray = [];
    if (company.city)
        locationArray.push(company.city);
    if (company.state_code)
        locationArray.push(company.state_code);
    if (company.country_code)
        locationArray.push(company.country_code);
    if (company.id === "")
        return (
            <Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
                <img src='full-moon.png' height="250px" width="250px"></img>
                <Typography variant="h6" component="div" color="text.secondary" sx={{ mt: 2, color: grey[400] }}>
                    Click on a company to view details
                </Typography>
            </Stack>
        );
    else
        return (
            <Stack>
                <Stack direction="row" sx={{ display: 'flex', width: '100%', mb: 1.5 }}>
                    <Box width="45px" height="45px" sx={{ p: 1, boxShadow: 2, borderRadius: 1, mr: 1.5, bgcolor: "white" }}>
                        <img src='0.png' height="30px" width="30px"></img>
                    </Box>
                    <Typography variant="h4" component="div" sx={{ color: grey[900] }}>
                        {company.name}
                    </Typography>
                </Stack>
                {(company.city || company.country_code || company.state_code) &&
                    <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 1.5 }}>
                        <PlaceIcon fontSize='small' />
                        <Typography variant="body2">{locationArray.join(", ")}</Typography>
                    </Stack>}
                {company.homepage_url != "" &&
                    <Stack direction="row" gap={0.5} sx={{ mb: 1 }}>
                        <Link href={company.homepage_url} underline="always" target="_blank" rel="noreferrer" sx={{ color: "primary" }} >
                            {company.homepage_url.length < 40 ? company.homepage_url : company.homepage_url.slice(0, 40) + '...'} 
                        </Link>
                        <OpenInNewIcon color="primary" fontSize="small"/>
                    </Stack>}
                <Box sx={{ border: "1px solid", borderColor: grey[200], bgcolor: "white", px: 3.5, py: 2.5, width: '100%', borderRadius: 1 }}>
                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: grey[800] }}>
                        Overview
                    </Typography>
                    <Typography paragraph variant="body2" sx={{ color: grey[800], textAlign: 'justify', textJustify: 'inter-character' }}>
                        {company.overview != "" ? company.overview : 'No overview available for the selected company.'}
                    </Typography>
                    {   company.ipos.length != 0 &&
                    <IpoDetails ipoData={ipoData} />}
                    {   company.acquired.length != 0 &&
                    <AcquisitionDetails acquisitions={acquisitions} />}
                </Box>
                
            </Stack>
        );
}

export default CompanyDetails;
