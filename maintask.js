let request=require("request");
let cheerio=require("cheerio");
let objforscorecard=require("./scorecard")
console.log("Before");
request("https://www.espncricinfo.com/series/ipl-2020-21-1210595",cb);
function cb(error,response,html) {
    if(error){
        console.log(error);//print error if any occured

    }
    else if(response.statuscode==404){
        console.log("Page not Found");
    }
    else{
        dataExtractor(html);
    }
}
function dataExtractor(html){
 let searchTool=cheerio.load(html);   
let anchorrep=searchTool('a[data-hover="View All Results"]');
let link=anchorrep.attr("href");
// console.log("link",link);
let fullAllMatchLink=`https://www.espncricinfo.com${link}`;
console.log(fullAllMatchLink);
//go to all match page
request(fullAllMatchLink,allMatchPageCb);
function allMatchPageCb(error,response,html){
    if(error){
        console.log(error);
    }
    else if(response.statuscode==404){
        console.log("Page not Found");
         
    }
    else{
        console.log(html);
        getAllScoreCardLink(html);
    }
}
function getAllScoreCardLink(html){
   let  scorecardsearch=cheerio.load(html);
   let linkforsc=scorecardsearch('a[data-hover="Scorecard"]')
//    let scorecardlinks=
for(let i=0;i<linkforsc.length;i++){
 let arraylinks=scorecardsearch(linkforsc[i]).attr("href");
 let fullAllmatchPageLink=`https://www.espncricinfo.com${arraylinks}`;
 
 console.log(fullAllmatchPageLink);//this contains exact links to score card of every match
objforscorecard.processSingleMatch(fullAllmatchPageLink)
}
console.log("****");
}

}