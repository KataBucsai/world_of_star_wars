var getBoardList = (function () {
    var boardList = JSON.parse(localStorage.getItem('boardList'));
    return function () {
        return boardList;
    }
})();

var initBoardList = (function () {
    var boardList = {"boards": []};
    if(!  getBoardList() ){
        localStorage.setItem('boardList', JSON.stringify(boardList));
    } else {
        boardList = getBoardList();
    }
    return function () {
        return boardList;
    }   
})();