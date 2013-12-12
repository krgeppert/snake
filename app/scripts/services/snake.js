'use strict';

angular.module('snakeApp')
  .service('Snake', function Snake() {
    function Snake (startCoordinates){
      this.head = new SnakeLink(startCoordinates);
      this.tail = this.head;
      this.direction = 'left';
      this.length = 1;
      this.shouldGrow = false;
    }
    Snake.prototype.changeDirection = function(direction) {
      this.direction = direction;
    };
    Snake.prototype.grow = function() {
      this.length++;
      this.shouldGrow = true;
    };
    Snake.prototype.getDirection = function() {
      return this.direction;
    };
    Snake.prototype.move = function() {
      var toChange = {1: this.addToFront()};
      if (!this.shouldGrow){
        toChange[0] = this.removeFromBack();
      } else {
        this.shouldGrow = false;
      }
      return toChange;
    };
    Snake.prototype.addToFront = function(){
      var newFront = this.head.coordinates.slice();
      newFront[0] += interpretDirection(this.direction)[0];
      newFront[1] += interpretDirection(this.direction)[1];
      newFront = new SnakeLink(newFront);
      newFront.next = this.head;
      this.head.previous = newFront;
      this.head = newFront;
      return newFront.coordinates.slice();
    };
    Snake.prototype.removeFromBack = function() {
      var result = this.tail.coordinates.slice();
      this.tail = this.tail.previous;
      this.tail.next = undefined;
      return result;
    };

    function SnakeLink (value){
      this.coordinates = value;
    }
    function interpretDirection(str){
      switch (str){
      case 'left':
        return [0,-1];
      case 'right':
        return [0,1];
      case 'up':
        return [-1,0];
      case 'down':
        return [1,0];
      }
    }
    return Snake;
  });