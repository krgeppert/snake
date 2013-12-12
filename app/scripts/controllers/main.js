'use strict';

angular.module('snakeApp')
  .controller('MainCtrl', function ($scope, Board, Snake) {
    setUpKeyBoardBindings();
    $scope.gameInProgress = false;
    $scope.score = 0;
    $scope.startGame = function(){
      $scope.gameOver = false;
      $scope.board = new Board(30);
      $scope.snake = new Snake([15,15]);
      $scope.score = 0;
      $scope.gameOver = false;
      $scope.board.update([15,15],1);
      $scope.speed = $scope.speed ||'slow';
      $scope.board.makeCandy();
      setInMotion();
    };
    var timer;
    function endGame(){
      clearInterval(timer);
      $scope.gameInProgress = false;
      $scope.gameOver = true;
      $scope.$digest();
    }
    $scope.quitGame = function(){
      endGame();
    };
    function setInMotion(){
      $scope.paused = false;
      $scope.gameInProgress = true;
      timer = setInterval(function(){
        var update = $scope.snake.move();
        $scope.board.update(update[0], 0);
        var response = $scope.board.update(update[1], 1);
        if (response === 'death'){
          endGame();
        } else if (response === 'candy'){
          $scope.score += getSpeedNum($scope.speed) * 100;
          $scope.snake.grow();
          $scope.board.makeCandy();
        }
        $scope.$digest();
      }, 200 / getSpeedNum($scope.speed));
    }
    $scope.getPixelColor = function(num){
      if (num){
        return num > 1 ? 'blue': 'black';
      } else {
        return 'white';
      }
    };
    $scope.pauseGame = function(){
      $scope.paused = true;
      $scope.gameInProgress = false;
      clearInterval(timer);
      $scope.$digest()
    };
    function setUpKeyBoardBindings(){
      var body = document.getElementById('body');
      body.onkeyup = function(event) {
        event = event || window.event;
        if (event.keyCode === 80) {
          if ($scope.gameInProgress){
            $scope.pauseGame();
          } else {
            setInMotion();
          }
        }
        if (event.keyCode === 82) {
          endGame();
          $scope.startGame();
        }
        if (event.keyCode === 81) endGame();
        if (interpretKey(event.keyCode) && !isOppositeDirection(event.keyCode)) $scope.snake.changeDirection(interpretKey(event.keyCode));
      };
    }
    function isOppositeDirection(direction){
      var badDirectionMap = {
        left: 39,
        up: 40,
        right: 37,
        down: 38
      };
      return (direction === badDirectionMap[$scope.snake.getDirection()]);
    }
    function pauseGame(){

    }
    function interpretKey (keyCode){
      var keyCodeMap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
      return keyCodeMap[keyCode];
    }
    function getSpeedNum(str){
      var speeds = {
        slow: 1,
        medium: 2,
        fast: 2.5
      };
      return speeds[str];
    }
  });
