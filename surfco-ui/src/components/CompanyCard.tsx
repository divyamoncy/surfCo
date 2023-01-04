import PlaceIcon from '@mui/icons-material/Place';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, SetStateAction, useState } from 'react';

function CompanyCard(props: { company: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; city: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; overview: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; }) {
    // const [company, setCompany] = useState({});
    // setCompany(props.company);
    return (
        <Card sx={{ minWidth: 275, mb: 1.5 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.company.name}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1} color="text.secondary" sx={{ mb: 1.5 }}>
                    <PlaceIcon fontSize='small' />
                    <Typography variant="body2">{props.company.city}</Typography>
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