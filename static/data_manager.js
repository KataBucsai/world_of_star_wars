var getData = (function () {
    var savedData = JSON.parse(sessionStorage.getItem('savedData'));
    return function () {
        return savedData;
    }
})();

var initData = (function () {
    var savedData = {'modal':{}, 'user':[]};
    if(!  getData() ){
        sessionStorage.setItem('savedData', JSON.stringify(savedData));
    } else {
        savedData = getData();
    }
    return function () {
        return savedData;
    }   
})();