import PlaceIcon from '@mui/icons-material/Place';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Company } from '../services/CompanyService';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import { CardActionArea, Chip } from '@mui/material';

function CompanyCard(props: { company: Company, changeCurrentlySelectedCompany: any, activeCompanyId: string}) {
    const company = props.company;
    const activeCompanyId = props.activeCompanyId;
    const maxCharsInOverview = 150;
    let locationArray = [];
    if (company.city)
        locationArray.push(company.city);
    if (company.state_code)
        locationArray.push(company.state_code);
    if (company.country_code)
        locationArray.push(company.country_code);

    return (
        <Card sx={{ minWidth: 275, mb: 1.5 }} style={{ borderTop: activeCompanyId === company.id ? "4px solid #9431cc" : 0 }} elevation={activeCompanyId === company.id ? 4 : 1}>
            <CardActionArea onClick={()=>props.changeCurrentlySelectedCompany(company)}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ mb: 0.5 }}>
                    {props.company.name}
                </Typography>
                {(company.city || company.country_code || company.state_code) &&
                    <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 1.5 }}>
                        <PlaceIcon fontSize='small' />
                        <Typography variant="body2">{locationArray.join(", ")}</Typography>
                    </Stack>}
                <Stack direction="row">
                    {
                        company.acquired.length !== 0 &&
                        <Chip label={'has acquired ' + company.acquired.length + ' company(s)'} icon={<MergeTypeIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", color: "text.secondary", mb: 1.5, mr: 1, borderRadius: 1 }} />
                    }
                    {
                        company.acquiredBy.length !== 0 &&
                        <Chip label={'has been acquired'} icon={<WorkIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", color: "text.secondary", mb: 1.5, mr: 1, borderRadius: 1 }} />
                        }
                        {
                        company.ipos.length !== 0 &&
                        <Chip label={'IPO'} icon={<PaidIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", color: "text.secondary", mb: 1.5, mr: 1, borderRadius: 1 }} />
                        }
                </Stack>

                <Typography paragraph variant="body2">
                    {props.company.overview.length > maxCharsInOverview ? props.company.overview.slice(0, maxCharsInOverview) + '...' : props.company.overview}
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CompanyCard;