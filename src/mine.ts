interface Datapoint {
    name: string,
    requestUrl: string
};

const axios = require('axios');
const fs = require('fs');

let funnelId = "";

axios.get("https://www.autoscout24.de/detailsuche").then((response : any) => {
    const re = RegExp('"buildId":"[^"]*"');
    const res = re.exec(response.data);
    if(res){
        funnelId = JSON.parse("{"+res[0]+"}")?.buildId;
        const urlPrefix = `https://www.autoscout24.de/_next/data/${funnelId}/refinesearch.json?`;
        

        const results : [any] = [ [ "Datenpunkt", "Anzahl" ] ];

        for(const datapoint of datapoints){

            const newEntry = [ datapoint.name, 0];

            axios.get(urlPrefix+datapoint.requestUrl).then((response : any) => {
                newEntry[1] = response.data?.pageProps?.numberOfResults;

                results.push(newEntry);
                if(results.length === datapoints.length+1){
                    fs.writeFile("./data/raw/"+new Date().toISOString().slice(0,10)+'.json', JSON.stringify(results), function (err: any) {
                        if (err) return console.log(err);
                    });
                }
            });
        }
    }
});

export const datapoints : Datapoint[] = [
    {
        name: "DE",
        requestUrl: `sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=hp&ocs_listing=include&search_id=wc6n0yw1fj`
    },
    {
        name: "Alle, 250km",
        requestUrl: `sort=standard&desc=0&cy=D&zipr=250&zip=69124+Kirchheim+%28Heidelberg%29&lon=8.665607&lat=49.3773075&atype=C&ustate=N%2CU&powertype=hp&ocs_listing=include&search_id=1gq5bozfkho`
    },
    {
        name: "Yaris GR, 250km",
        requestUrl: `mmmv=70|15663||&sort=standard&desc=0&cy=D&zipr=250&zip=69124 Kirchheim (Heidelberg)&lon=8.665607&lat=49.3773075&atype=C&ustate=N,U&powertype=hp&powerfrom=184&ocs_listing=include&search_id=et15mjee9a`
    },
    {
        name: "Supra MK4 3.0 Turbo, DE",
        requestUrl: `fregfrom=1993&fregto=1996&mmmv=70%7C2063%7C%7C&sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=hp&powerfrom=221&ocs_listing=include&search_id=1besfjs55cn`
    },
    {
        name: "Rx7 Gen3, DE",
        requestUrl: `fregfrom=1991&fregto=2002&mmmv=46%7C1844%7C%7C&sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=hp&powerfrom=169&ocs_listing=include&search_id=14euch57bzo`
    },
    {
        name: "Hyundai i30N Aut., 250km",
        requestUrl: `mmmv=33%7C19065%7C%7C&sort=standard&desc=0&cy=D&zipr=275&zip=Heidelberg&lon=8.6803&lat=49.40192&atype=C&ustate=N%2CU&powertype=hp&powerfrom=184&gear=A&ocs_listing=include&search_id=1clclnnb0y3`
    },
    {
        name: "Supra MK5 3.0 Turbo, 250km",
        requestUrl: `fregfrom=2020&mmmv=70%7C2063%7C%7C&sort=standard&desc=0&cy=D&zipr=250&zip=Heidelberg&lon=8.6803&lat=49.40192&atype=C&ustate=N%2CU&powertype=hp&powerfrom=250&gear=A&ocs_listing=include&search_id=1flmhi5d3px`
    },
    {
        name: "Gebrauchte bis 150kkm, 3-15k€, 250km",
        requestUrl: `kmfrom=10000&kmto=150000&sort=standard&desc=0&cy=D&zipr=250&zip=69124+Kirchheim+%28Heidelberg%29&lon=8.665607&lat=49.3773075&atype=C&ustate=N%2CU&powertype=kw&pricefrom=3000&priceto=15000&ocs_listing=include&search_id=hfxo6j9bac`
    },
    {
        name: "Gebrauchte bis 150kkm, 3-15k€, DE",
        requestUrl: `kmfrom=10000&kmto=150000&sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=kw&pricefrom=3000&priceto=15000&ocs_listing=include&search_id=1jsg3e69x76`
    },
    {
        name: "Gebrauchte bis 150kkm, 15-25k€, DE",
        requestUrl: `kmfrom=10000&kmto=150000&sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=kw&pricefrom=15000&priceto=25000&ocs_listing=include&search_id=1jsg3e69x76`
    },
    {
        name: "Gebrauchte bis 150kkm, 25-40k€, DE",
        requestUrl: `kmfrom=10000&kmto=150000&sort=standard&desc=0&cy=D&atype=C&ustate=N%2CU&powertype=kw&pricefrom=25000&priceto=40000&ocs_listing=include&search_id=1jsg3e69x76`
    }
];

