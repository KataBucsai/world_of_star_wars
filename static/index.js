function main(){
    getPlanets('https://swapi.co/api/planets/');   
}

function getPlanets(apiLink){
    var previous;
    var next;
    $.getJSON(apiLink, function(response){
        var planetTable=response['results'];
        previous=response['previous'];
        if (previous) {
            previous = previous.replace("http", "https");
        };
        next=response['next'];
        if (next) {
            next = next.replace("http", "https");
        };
        createTable(planetTable);
    }).then(function(){
        $('#previous').on('click', function() {
            console.log(previous);
            getPlanets(previous);
        });
        $('#next-page').on('click', function() {
            console.log(next);
            getPlanets(next);
        });
    });
}

function createTable(planetTable){
    for (var i=0; i<planetTable.length; i++){
        $('#' + i).empty();
        var column1 = '<td>' + planetTable[i]['name'] + '</td>';
        var column2Data = toLocaleStringSupportsLocales(planetTable[i]['diameter'], ' km');
        var column2 = '<td>' + column2Data + '</td>';
        var column3 = '<td>' + planetTable[i]['climate'] + '</td>';
        var column4 = '<td>' + planetTable[i]['terrain'] + '</td>';
        var column5Data = toLocaleStringSupportsLocales(planetTable[i]['surface_water'], ' %');
        var column5 = '<td>' + column5Data + '</td>';
        var column6Data = toLocaleStringSupportsLocales(planetTable[i]['population'], ' people');
        var column6 = '<td>' + column6Data + '</td>';
        if (planetTable[i]['residents'].length !== 0) {
            var residentsNumber = planetTable[i]['residents'].length;
            column7 = '<td><button class="modalbutton" id="Modalbutton' + i + '">' + residentsNumber + ' resident(s)</button></td>';
            getResidentModal(i, column1);
            for (resident=0; resident<residentsNumber; resident++){
                var residentLink = planetTable[i]['residents'][resident].replace("http", "https"); 
                getResident(residentLink, i);   
            }
        } else {
            column7 = '<td>No known residents</td>';
        }
        var tRText =column1 + column2 + column3 +  column4 + column5 + column6 + column7;
        
        var newTR = $(tRText);
        $('#' + i).append(newTR);
        if (column7 !== '<td>No known residents</td>'){
            showResidents(i);
        }   
    }    
}

function showResidents(orderNumber){
        var modal_id = String(orderNumber) + 'Modal';
        var modal = document.getElementById(modal_id);
        var modal_button_id = "Modalbutton" + String(orderNumber);
        var btn = document.getElementById(modal_button_id);
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
        };
        span.onclick = function() {
            modal.style.display = "block";
        };
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
}

function getResidentModal(orderNumber, planetName){
                var modalMainText1 = '<div id="' + orderNumber + 'Modal" class="modal"><div class="modal-content"><div class="modal-header"><span class="close" id="close">&times;</span><h2>Resident(s) of ' + planetName + '</h2>';
                var modalMainText2 = '</div><div class="modal-body"><table class="table-bordered"><thead><tr><th>Name</th><th>Height</th><th>Mass</th><th>Skin color</th><th>Hair color</th><th>Eye color</th><th>Birth year</th><th>Gender</th></tr>';
                var modalMainText3 = '</thead><tbody id="' + orderNumber + 'planet"></tbody></table></div></div></div>';
                var modalText = modalMainText1 + modalMainText2 + modalMainText3;
                $('body').append(modalText);
}

function getResident(residentLink, orderNumber){
    $.getJSON(residentLink, function(response){
                var modalcolumn1 = '<td>' + response['name'] + '</td>';
                var modalcolumn2Data = toLocaleStringSupportsLocales(response['height'], " cm");
                var modalcolumn2 = '<td>' + modalcolumn2Data + '</td>';
                var modalcolumn3Data = toLocaleStringSupportsLocales(response['mass'], " kg");
                var modalcolumn3 = '<td>' + modalcolumn3Data + '</td>';
                var modalcolumn4 = '<td>' + response['skin_color'] + '</td>';
                var modalcolumn5 = '<td>' + response['hair_color'] + '</td>';
                var modalcolumn6 = '<td>' + response['eye_color'] + '</td>';
                var modalcolumn7 = '<td>' + response['birth_year'] + '</td>';
                var modalcolumn8 = '<td>' + response['gender'] + '</td>';
                var modalcolumns = modalcolumn1 + modalcolumn2 + modalcolumn3 + modalcolumn4 + modalcolumn5 + modalcolumn6 +modalcolumn7 + modalcolumn8;
                var modalText =  "<tr>" + modalcolumns + "</tr>";
                modal_id = '#' + String(orderNumber) + 'planet';
                $(modal_id).append(modalText);
    });
}

function toLocaleStringSupportsLocales(data, suffix) {
    if (! isNaN(data)){
        return (Number(data).toLocaleString() + suffix)
    }
    return data;
}

$(document).ready(main);