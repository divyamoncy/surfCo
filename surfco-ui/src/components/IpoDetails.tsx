import { useEffect, useState } from "react";
import { isExportDeclaration } from "typescript";
import { getIpoByCompanyId, IPO } from "../services/CompanyService";

function IpoDetails(props: { ipoData: IPO }) {
    
    // const [ipoData, setIpoData] = useState<IPO>();
    // useEffect(()=> {
    //     getIpoByCompanyId(companyId).then(ipo => {
    //         setIpoData(ipo);
    //         console.log(ipo);
    //         console.log(ipoData);
    //       });
    // }, []);
    return (
        <h6>Hello   {props.ipoData.id}</h6>
    );
}
export default IpoDetails;