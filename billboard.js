let chartData=[]
let urls =[{chartType: "songs", 
url: 'https://billboard-api5.p.rapidapi.com/api/charts/hot-100?week=2022-10-08',

},{chartType:"singers", url: 'https://billboard-api5.p.rapidapi.com/api/charts/artist-100?week=2022-10-08',
},{chartType: "albums", url:'https://billboard-api5.p.rapidapi.com/api/charts/catalog-albums?week=2022-10-08',
}
]
async function getData(a){
    const url=urls[a].url;
    const options={ 
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b9f428b5d1mshdbf50c038d077c7p106f17jsnc2d85793fe7c',
            'X-RapidAPI-Host': 'billboard-api5.p.rapidapi.com'
        }}
    
    
    try {
        const response = await fetch(url, options);
        chartData = await response.json();
    } catch (error) {
        console.error(error);
    }
}
async function fillCards(a,b){
    await getData(b);
    const formattedData=chartData.chart.entries.slice(a-10,a)
    .map((song)=>
    `
    <div>
    <div class="content-card">
    <div class="content-style" onclick="showCard(event)">
        <div class="image"style="background-image:  url('${song.cover}')" ></div>
        <div >
        <div class="description-style" style="display:flex; glex-direction:row;justify-content;center">
             <div class="rank">${song.rank}</div>
        <div>
             <div class="songTitle" style="display:${song.title!=undefined ? "block" :"none"}">${song.title!=undefined ? song.title :""}</div>
            <div class="singer" style="font-family:${song.title!=undefined ? " 'Montserrat', sans-serif" :"'Anton', sans-serif"}"> ${song.artist}</div></div>
        </div>
        <hr/>
        <br/>
        <div class="deeper-description-style">
            <div class="position-style" > 
                <div class="position-title">Last Week <br/>Position <br/> </div>
                <div class="position" >${song.position.positionLastWeek!=null ? song.position.positionLastWeek : "-"}</div>
            </div>  <div class="position-style" > 
                <div class="position-title">Peak<br/>Position <br/></div>
                <div class="position">${song.position.peakPosition}</div>
            </div> 
            <div class="position-style" > 
                <div class="position-title">Weeks On <br/>Chart <br/></div>
                <div class="position">${song.position.weeksOnChart}</div>
            </div> 
        </div>
        </div>
    </div>
</div>
</div>
    `
    ).join("")
    document.querySelector('#cards').innerHTML=formattedData

}

async function showPrevious(){
    if (document.getElementById("prevPageNumber").innerText != "0")
{
    let pageNumber=Number(document.querySelector("#pageNumber").innerText);
    let prevPageNumber=Number(document.querySelector("#prevPageNumber").innerText);
    let nextPageNumber=Number(document.querySelector("#nextPageNumber").innerText);
    let name=document.getElementById("searchContent").value;
    let chartTypeIndex=0
    switch(name) {
    case "songs":
        chartTypeIndex=0;
      break;
    case "artists":
        chartTypeIndex=1;
      break;
      case "albums":
        chartTypeIndex=2;
    default:
      chartTypeIndex=0;
}
    await fillCards((prevPageNumber)*10,chartTypeIndex)
    if (pageNumber==10){
        document.getElementById("nextPageNumber").style.display="block"
    }
    document.querySelector("#pageNumber").innerText= pageNumber-1
    document.querySelector("#prevPageNumber").innerText= prevPageNumber-1;
    if (prevPageNumber-1==0){
        document.getElementById("prevPageNumber").style.display="none"
    }
    document.querySelector("#nextPageNumber").innerText= nextPageNumber-1;
   

}

}
async function showNext(){

    if (document.getElementById("nextPageNumber").innerText != "11")
{
    let pageNumber=Number(document.querySelector("#pageNumber").innerText);
    let prevPageNumber=Number(document.querySelector("#prevPageNumber").innerText);
    let nextPageNumber=Number(document.querySelector("#nextPageNumber").innerText);
    let name=document.getElementById("searchContent").value;
    let chartTypeIndex=0
    switch(name) {
    case "songs":
        chartTypeIndex=0;
      break;
    case "artists":
        chartTypeIndex=1;
      break;
      case "albums":
        chartTypeIndex=2;
        break;
    default:
      chartTypeIndex=0;
}
console.log(chartTypeIndex)
    await fillCards((nextPageNumber)*10,chartTypeIndex)
    if (pageNumber==1){
        document.getElementById("prevPageNumber").style.display="block"
    }
    document.querySelector("#pageNumber").innerText= pageNumber+1;
    document.querySelector("#prevPageNumber").innerText= prevPageNumber+1;
    document.querySelector("#nextPageNumber").innerText= nextPageNumber+1;
    if (nextPageNumber+1==11){
        document.getElementById("nextPageNumber").style.display="none"
    }
   

}

}
fillCards(10,0);


function updateThingy(){
    document.getElementById("pagination-thingy").innerHTML=`<button onclick="showPrevious()"><i class="fa-solid fa-angle-left" style="color: #b7c8e6; font-size: 50px;" id="previous"></i></button>
    <div style="display:flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    gap:3px;">
        <div id="prevPageNumber" class="prevNext" style="display:none">0</div>
        <div id="pageNumber">1</div>
        <div id="nextPageNumber" class="prevNext">2</div>
    </div>
    <button onclick="showNext()"><i class="fa-solid fa-angle-right" style="color: #b7c8e6; font-size: 50px;" id="next"></i></button>`
}
async function searchFunction()
{
let name=document.getElementById("searchContent").value;
switch(name) {
    case "songs":
        chartTypeIndex=0;
      break;
    case "artists":
        chartTypeIndex=1;
      break;
      case "albums":
        chartTypeIndex=2;
        break;
    default:
      chartTypeIndex=0;
  }
  await fillCards(10,chartTypeIndex);
  updateThingy()

}
window.onscroll = function () {
    scrollFunction();
  };
  function scrollFunction() {
    if (
      document.body.scrollTop > 530 ||
      document.documentElement.scrollTop > 530
    ) {
      document.getElementById("nav").style.transform="translateY(0px)";
    } else {
      document.getElementById("nav").style.transform="translateY(-70px)";
    }
  }
function showCard(event)
{
    let cardToBe=event.target;
    
    while (cardToBe.innerHTML.includes("content-card")===false)
    {
        cardToBe=cardToBe.parentElement
    }
    
    document.querySelector('#cards').innerHTML=cardToBe.innerHTML
    document.getElementById("pagination-thingy").style.display="none"
    
}