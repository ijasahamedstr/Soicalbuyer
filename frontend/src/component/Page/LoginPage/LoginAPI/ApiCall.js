import axios from "axios";

export const commonrequest = async(methods,url,body,header)=>{
    let config = {
        method:methods,
        url,
        headers:header ? header 
        :{
            "Content-Type":"application/json"
        },
        data:body,
        body: JSON.stringify({ email }),
    }

    if (!response.ok) {
        const errorDetails = await response.json();
        console.error("API Error:", errorDetails);
        throw new Error(errorDetails.error);
    }

    const data = await response.json();
    

    // axios instance
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}