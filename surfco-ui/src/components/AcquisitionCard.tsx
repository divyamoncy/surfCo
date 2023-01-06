import { Box, Typography, Stack, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { Acquisition } from "../services/CompanyService";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { dateConverter, getFormattedNumber } from "../util";
import EventIcon from '@mui/icons-material/Event';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function AcquisitionCard(props: { acquisition: Acquisition, isAcquirer: boolean }) {
    const acquisition = props.acquisition;
    const isAcquirer = props.isAcquirer;
    const [expanded, setExpanded] = useState<Boolean>(false);
    useEffect(() => {
        setExpanded(false);
    }, [acquisition, isAcquirer]);

    return (
        <Box sx={{ border: "1px solid", borderColor: grey[100], bgcolor: grey[50], p: 2, width: '100%', borderRadius: 1 }} >
            <Stack direction="row" gap={1.5} sx={{ display: "flex", mb: expanded ? 1 : 0 }} onClick={() => { console.log("Insisde"); setExpanded((expanded) => !expanded); }} >
                {acquisition.acquiredCompany != "" &&
                    <Typography variant="subtitle2" component="div" sx={{ color: grey[700], fontWeight: "bold" }} >
                        {!isAcquirer && acquisition.acquiredCompany} {isAcquirer && acquisition.acquirerCompany}
                    </Typography>
                }
                {acquisition.acquired_at != "" &&
                    <Stack direction="row" gap={0.5}>
                        <EventIcon fontSize="small" sx={{ color: "#9431cc" }} />
                        <Typography variant="subtitle2" component="div" sx={{ color: grey[600] }}>
                            {dateConverter(acquisition.acquired_at)}
                        </Typography>
                    </Stack>
                }
                <Box sx={{ flexGrow: 1 }}>
                    {!expanded &&
                        <ExpandMoreIcon fontSize="small" sx={{ float: "right", color: grey[700] }} />}
                    {
                        expanded &&
                        <ExpandLessIcon fontSize="small" sx={{ float: "right", color: grey[700] }} />

                    }
                </Box>

            </Stack>
            {
                expanded &&
                acquisition.price_amount != 0 &&
                <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                    Price Amount <span style={{ color: "#9431cc", fontWeight: 'bold' }}>{getFormattedNumber(acquisition.price_amount) + ' ' + acquisition.price_currency_code}</span>
                </Typography>

            }
            {
                expanded &&
                acquisition.source_url !== "" &&
                <Stack direction="row" gap={0.5}>
                    <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                        Source <span style={{ color: "#9431cc" }}>{acquisition.source_description}</span>
                    </Typography>
                    <Link href={acquisition.source_url} target="_blank" rel="noreferrer" sx={{ color: "primary" }} >
                        <OpenInNewIcon color="primary" fontSize="small" sx={{ mt: "3px" }} />
                    </Link>
                </Stack>

            }
            {
                expanded &&
                acquisition.price_amount == 0 &&
                acquisition.source_url === "" &&
                <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                    No details available.
                </Typography>

            }
        </Box>
    );
}
export default AcquisitionCard;