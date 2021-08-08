// let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
console.log("Before");
function processSingleMatch(url){
request(url,cb);
}
function cb(error,response,html) {
    if(error){
        console.log(error);//print error if any occured

    }
    else if(response.statuscode==404){
        console.log("Page Not Found");
    }
    else{
       singlematchdata(html);
    }
}
function singlematchdata(html){
    let searchTool=cheerio.load(html);
    let bothinningdata=searchTool(".Collapsible");
    // console.log(bothinningdata)
    for(let i=0;i<bothinningdata.length;i++){
     scoreCard = searchTool(bothinningdata[i]).html();
        let teamnameElem=searchTool(bothinningdata[i]).find("h5");
    //   console.log(teamnameElem);
        let teamname=teamnameElem.text();
        teamname=teamname.split("INNINGS")[0];//teamname ko innings
        console.log(teamname);
        //ke basis pr split krakar team name me dadia uska 0th element
        //**********/to get player data
        let batsmanbodyallrows=searchTool(bothinningdata[i]).find(".table.batsman tbody tr");
        console.log(batsmanbodyallrows.length)
        // type cohersion loop-> 
        for(let j=0;j<batsmanbodyallrows.length;j++){
            let numberoftds=searchTool(batsmanbodyallrows[i]).find("tr");
            console.log(numberoftds);
            if(numberoftds.length==8){
//                 //u are valid
let playerNAme=searchTool(numberoftds[0]).text();
console.log(playerNAme);
            }
        }
        console.log("after")
        fs.writeFileSync(`inning${i+1}`,scoreCard)
    }
   

}
module.exports=
{processSingleMatch}