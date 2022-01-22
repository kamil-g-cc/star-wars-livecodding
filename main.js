let request = new XMLHttpRequest();
let responseJSON = {results: null};
let planetList = null

function createAndSendRequest(){
    request.onreadystatechange = onReadyStateChangeListener;
    request.open("GET", "https://swapi.py4e.com/api/planets/", true);
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
        for(planet of planetList){
            addPlanet(planet.name, planet.diameter);
        }

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

createAndSendRequest();