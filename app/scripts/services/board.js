'use strict';

angular.module('snakeApp')
  .service('Board', function Board() {
    function Board (size){
      this.display = [];
      this.size = size;
      this.initialize();
    }
    function randomNum(min,max){
      return Math.floor(Math.random()*(max-min)) + min;
    }
    Board.prototype.makeCandy = function(){
      while (!i || !j || this.display[i][j] === 1){
        var i = randomNum(1, this.size);
        var j = randomNum(1, this.size);
      } 
      this.display[i][j] = 2;
    }
    Board.prototype.update = function(coords, value) {
      var response;
      if (coords){
        if (this.display[coords[0]][coords[1]] === 0) response = 'boring';
        if (this.display[coords[0]][coords[1]] === 1) response = 'death';
        if (this.display[coords[0]][coords[1]] === 2) response = 'candy';
        this.display[coords[0]][coords[1]] = value;
      }
      return response;
    };
    Board.prototype.initialize = function() { // make a blank board of 0's, bordered by 1's.
      var border = [];
      for (var i = 0; i < this.size + 2; i++){
        border.push(1);
      }
      this.display.push(border);
      for (i = 0; i < this.size; i++){
        var row = [];
        row.push(1);
        for (var j = 0; j < this.size; j++){
          row.push(0);
        }
        row.push(1);
        this.display.push(row);
      }
      this.display.push(border);
    };
    return Board;

  });
