let request = new XMLHttpRequest();
let responseJSON = {results: null};
let planetList = null
let prevURL, nextURL;
let nextButton, prevButton;

function createAndSendRequest(){
    request.onreadystatechange = onReadyStateChangeListener;
    request.open("GET", "https://swapi.py4e.com/api/planets/", true);
    request.send();
}

function getNextPlanets(evnt, url){
    //console.log('jestem tylko raz')
    //this.disabled = true
    if(url === undefined) url = nextURL;
    request = new XMLHttpRequest();
    request.onreadystatechange = onReadyStateChangeListener;
    request.open("GET", url, true);
    document.getElementById('planets').innerHTML = "";
    request.send();

}
function getPreviousPlanets(event, url){
    //this.disabled = true
    if(url === undefined) url = prevURL;
    request = new XMLHttpRequest();
    request.onreadystatechange = onReadyStateChangeListener;
    request.open("GET", url, true);
    document.getElementById('planets').innerHTML = "";
    request.send();
   
}

function toCoMaBycZrobioneDlaKazdegoElementu(el,idx,list){
    addPlanet(el.name, el.diameter);
    
}



function onReadyStateChangeListener(){
    console.log(request.readyState);
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200){
        responseJSON = JSON.parse(request.response);
        planetList = responseJSON.results;
        /*
        //pierwszy sposob
        planetList.forEach(function(el){
            addPlanet(el.name, el.diameter);
        });
        
        //drugi sposob
        planetList.forEach((el) => {
            addPlanet(el.name, el.diameter)
        });
        
        //trzeci sposob
        planetList.forEach(toCoMaBycZrobioneDlaKazdegoElementu);
        
        //czwarty sposob
        for(let i = 0; i < planetList.length; i++){
            addPlanet(planetList[i].name, planetList[i].diameter);
        }
        */
        //piaty sposob
        for(let planet of planetList){
            addPlanet(planet.name, planet.diameter);

        }
        nextButton.disabled = responseJSON.next?false:true;
        prevButton.disabled = responseJSON.previous?false:true;
        nextURL = responseJSON.next;
        prevURL = responseJSON.previous;
        /*
        nextButton.removeEventListener('click', getNextPlanets);
        prevButton.removeEventListener('click', getPreviousPlanets);

        nextButton.addEventListener('click', getNextPlanets)
        prevButton.addEventListener('click', getPreviousPlanets)
        */
        /*
        document.getElementById("next").onclick = function () {
            getNextPlanets(responseJSON.next);
        }
        document.getElementById("previous").onclick = function () {
            getPreviousPlanets(responseJSON.previous);
        }*/

    }
}

function addPlanet(name, diameter){
    let tableRow = document.createElement('tr');
    let tableCell1 = document.createElement('td');
    let tableCell2 = document.createElement('td');

    tableCell1.innerText = name;
    tableCell2.innerText = diameter;

    tableRow.appendChild(tableCell1);
    tableRow.appendChild(tableCell2);

    document.getElementById('planets').appendChild(tableRow);
}


nextButton = document.getElementById("next");
prevButton = document.getElementById("previous");
/*
//pierwszy sposob, ale uwaga, bo nastepne wywolanie DODA listenera
nextButton.addEventListener('click', getNextPlanets)
prevButton.addEventListener('click', getPreviousPlanets)
*/

//drugi sposob -> zastepuje poprzednio przypisanego listernera
nextButton.onclick = getNextPlanets;
prevButton.onclick = getPreviousPlanets;
  
createAndSendRequest();