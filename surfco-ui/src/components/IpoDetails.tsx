import { Box, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { IPO } from "../services/CompanyService";
import EventIcon from '@mui/icons-material/Event';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { dateConverter, getFormattedNumber } from "../util";

function IpoDetails(props: { ipoData: IPO }) {
    const ipo = props.ipoData;

    return (
        <Box sx={{ border: "1px solid", borderColor: "#e1bee7", bgcolor: "primary.light", p: 2, mt: 2, width: '100%', borderRadius: 1 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: grey[800], mb: 0.5 }}>
                IPO Details
            </Typography>
            <Stack direction="row" gap={1.5}>
                {ipo.stock_symbol != "" &&
                    <Typography variant="body2" component="div" sx={{ color: grey[600] }}>
                        Stock Symbol <span style={{ color: "#9431cc", fontWeight: 'bold' }}>{ipo.stock_symbol}</span>
                    </Typography>
                }
                {ipo.public_at != "" &&
                    <Stack direction="row" gap={0.5}>
                        <EventIcon fontSize="small" sx={{ color: grey[600] }} />
                        <Typography variant="body2" component="div" sx={{ color: "#9431cc" }}>
                            {dateConverter(ipo.public_at)}
                        </Typography>
                    </Stack>
                }
            </Stack>
            {ipo.valuation_amount != 0 &&
                <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                    Valuation Amount <span style={{ color: "#9431cc", fontWeight: 'bold' }}>{getFormattedNumber(ipo.valuation_amount) + ' ' + ipo.valuation_currency_code}</span>
                </Typography>
            }

            {ipo.raised_amount != 0 &&
                <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                    Raised Amount <span style={{ color: "#9431cc", fontWeight: 'bold' }}>{getFormattedNumber(ipo.raised_amount) + ' ' + ipo.raised_currency_code}</span>
                </Typography>
            }
            {ipo.source_url !== "" &&
                <Stack direction="row" gap={0.5}>
                    <Typography variant="body2" component="div" sx={{ color: grey[600], mt: 0.5 }}>
                        Source <span style={{ color: "#9431cc" }}>{ipo.source_description}</span>
                    </Typography>
                    <Link href={ipo.source_url} target="_blank" rel="noreferrer" sx={{ color: "primary" }} >
                        <OpenInNewIcon color="primary" fontSize="small" sx={{mt: "3px"}} />
                    </Link>
                </Stack>

            }
        </Box>
    );
}
export default IpoDetails;