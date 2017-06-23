function main(){
    getPlanets('http://swapi.co/api/planets/');   
}

function getPlanets(apiLink){
    $.getJSON(apiLink, function(response){
        var planetTable=response['results'];
        var previous=response['previous'];
        var next=response['next'];
        var planetWithResident =  createTable(planetTable);
        showResidents(planetWithResident);
    })
}

function createTable(planetTable){
    var planetWithResident = [];
    for (var i=0; i<planetTable.length; i++){
        var column1 = '<td>' + planetTable[i]['name'] + '</td>';
        var column2 = '<td>' + planetTable[i]['diameter'] + '</td>';
        var column3 = '<td>' + planetTable[i]['climate'] + '</td>';
        var column4 = '<td>' + planetTable[i]['terrain'] + '</td>';
        var column5 = '<td>' + planetTable[i]['surface_water'] + '</td>';
        var column6 = '<td>' + planetTable[i]['population'] + '</td>';
        if (planetTable[i]['residents'].length !== 0) {
            var residentsNumber = planetTable[i]['residents'].length;
            column7 = '<td><button id="Modalbutton' + i + '">' + residentsNumber + ' residents</button></td>';
            for (resident=0; resident<residentsNumber; resident++){
                var residentLink = planetTable[i]['residents'][resident];
                console
                getResident(residentLink, i);
            }
            planetWithResident.push(i);
        } else {
            column7 = '<td>No known residents</td>';
        }
        var tRText =column1 + column2 + column3 +  column4 + column5 + column6 + column7;
        var newTR = $(tRText);
        $('#' + i).append(newTR);
        
        
    }
    return planetWithResident;
    
}

function showResidents(planetWithResident){
    for (let i=0; i<planetWithResident.length; orderNumber++){
        orderNumber = planetWithResident[i];
        var modal = document.getElementById(orderNumber + 'Modal');
        var btn = document.getElementById("Modalbutton" + orderNumber);
        var span = document.getElementsByClassName("close")[0];
        console.log(modal,"+", btn,"+", span);
        btn.onclick = function() {
            modal.style.display = "block";
        }
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

function getResident(residentLink, orderNumber){
    $.getJSON(residentLink, function(response){
                var modalMainText1 = '<div id="' + orderNumber + 'Modal" class="modal"><div class="modal-content"><span class="close">&times;</span><table class=table-bordered id="planets"><tr><td>Name</td><td>Height</td><td>Mass</td><td>Skin color</td><td>Hair color</td><td>Eye color</td><td>Birth year</td><td>Gender</td></tr>';
                var modalMainText2 = '</table></div></div>';
                var modalcolumn1 = '<td>' + response['name'] + '</td>';
                var modalcolumn2 = '<td>' + response['height'] + '</td>';
                var modalcolumn3 = '<td>' + response['mass'] + '</td>';
                var modalcolumn4 = '<td>' + response['skin color'] + '</td>';
                var modalcolumn5 = '<td>' + response['hair color'] + '</td>';
                var modalcolumn6 = '<td>' + response['eye color'] + '</td>';
                var modalcolumn7 = '<td>' + response['birth year'] + '</td>';
                var modalcolumn8 = '<td>' + response['gender'] + '</td>';
                var modalcolumns = modalcolumn1 + modalcolumn2 + modalcolumn3 + modalcolumn4 + modalcolumn5 + modalcolumn6 +modalcolumn7 + modalcolumn8;
                var modalText = modalMainText1 + modalcolumns + modalMainText2;
                $('body').append(modalText);
            })
    
}

$(document).ready(main);