function main(){
    getPlanets('http://swapi.co/api/planets/');   
}

function getPlanets(apiLink){
    $.getJSON(apiLink, function(response){
        var planetTable=response['results'];
        var previous=response['previous'];
        var next=response['next'];
        createTable(planetTable);
    })
}

function createTable(planetTable){
    for (let i=0; i<planetTable.length; i++){
        var column1 = '<td>' + planetTable[i]['name'] + '</td>';
        var column2 = '<td>' + planetTable[i]['diameter'] + '</td>';
        var column3 = '<td>' + planetTable[i]['climate'] + '</td>';
        var column4 = '<td>' + planetTable[i]['terrain'] + '</td>';
        var column5 = '<td>' + planetTable[i]['surface_water'] + '</td>';
        var column6 = '<td>' + planetTable[i]['population'] + '</td>';
        if (planetTable[i]['residents'].length !== 0) {
            let residents = planetTable[i]['residents'].length;
            column7 = '<td><button id="Modal' + i + '">' + residents + ' residents</button></td>';
        } else {
            column7 = '<td>No known residents</td>';
        }
        var tRText =column1 + column2 + column3 +  column4 + column5 + column6 + column7;
        var newTR = $(tRText);
        $('#' + i).append(newTR);

    }
}

function showResidents(planet){
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("Modal" + String(planet));

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

$(document).ready(main);