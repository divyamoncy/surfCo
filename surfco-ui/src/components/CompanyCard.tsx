import PlaceIcon from '@mui/icons-material/Place';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Company } from '../services/CompanyService';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import WorkIcon from '@mui/icons-material/Work';
import PaidIcon from '@mui/icons-material/Paid';
import { Chip } from '@mui/material';

function CompanyCard(props: { company: Company }) {
    const company = props.company
    let locationArray = [];
    if (company.city)
        locationArray.push(company.city);
    if (company.state_code)
        locationArray.push(company.state_code);
    if (company.country_code)
        locationArray.push(company.country_code);

    return (
        <Card sx={{ minWidth: 275, mb: 1.5 }}>
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
                        // <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 1.5, mr: 0.5 }}>
                        //     <MergeTypeIcon fontSize='small' color="primary" />
                        //     <Typography variant="body2">has acquired {company.acquired.length} company(s) </Typography>
                        // </Stack>
                        <Chip label={'has acquired ' + company.acquired.length + ' company(s)'} icon={<MergeTypeIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", mb: 1.5, mr: 1, borderRadius: 1 }} />
                    }
                    {
                        company.acquiredBy.length !== 0 &&
                        // <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 1.5, mr: 0.5 }}>
                        //     <WorkIcon fontSize='small' color="primary" />
                        //     <Typography variant="body2">has been acquired </Typography>
                        // </Stack>
                        <Chip label={'has been acquired'} icon={<WorkIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", mb: 1.5, mr: 1, borderRadius: 1 }} />
                        }
                        {
                        company.ipos.length !== 0 &&
                        // <Stack direction="row" alignItems="center" gap={0.5} color="text.secondary" sx={{ mb: 1.5 }}>
                        //     <PaidIcon fontSize='small' color="primary" />
                        //     <Typography variant="body2">IPO</Typography>
                        // </Stack>
                        <Chip label={'IPO'} icon={<PaidIcon fontSize='small' color="primary" />} sx={{ bgcolor: "primary.light", mb: 1.5, mr: 1, borderRadius: 1 }} />
                        }
                </Stack>

                <Typography paragraph variant="body2">
                    {props.company.overview}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default CompanyCard;