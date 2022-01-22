let request = new XMLHttpRequest();
let responseJSON = {results: null};
let planetList = null

function createAndSendRequest(){
    request.onreadystatechange = onReadyStateChangeListener;
    request.open("GET", "https://swapi.py4e.com/api/planets/", true);
    request.send();
}

function onReadyStateChangeListener(){
    console.log(request.readyState);
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200){
        responseJSON = JSON.parse(request.response);
        planetList = responseJSON.results;

        planetList.forEach( (planet) => {
            // console.log(item);
            addPlanet(planet.name, planet.diameter);
        });
        //
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