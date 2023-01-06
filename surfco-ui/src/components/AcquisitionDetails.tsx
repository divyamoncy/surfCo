import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Acquisition } from "../services/CompanyService";
import AcquisitionCard from "./AcquisitionCard";
import { useState, useEffect } from "react";

function AcquisitionDetails(props: { acquisitions: Acquisition[] }) {
    const acquisitions = props.acquisitions;
    const [expanded, setExpanded] = useState<Boolean>(false);
    useEffect(() => {
        setExpanded(false);
    }, [acquisitions]);

    return (
        <Box sx={{ border: "1px solid", borderColor: "#e1bee7", bgcolor: "primary.light", p: 2, mt: 2, width: '100%', borderRadius: 1 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: grey[800], mb: 0.5 }}>
                Acquisitions <span style={{ color: "#9431cc", fontWeight: 'bold' }}>{acquisitions.length}</span>
            </Typography>
            {acquisitions.map(acquisition => {
                return (
                    <AcquisitionCard acquisition={acquisition} />
                )
            })}
        </Box>
    );
}
export default AcquisitionDetails;