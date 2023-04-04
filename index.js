// Задаем переменные в которые помещаем id кнопки и блока границ купика
var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')

var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

// Задаем прослушку действия при клике на конпку
$start.addEventListener('click', startGem)
$game.addEventListener('click', headlerClick)
$gameTime.addEventListener('input', setGemsTime)

var isGameStart = false
var scrool = 0
// Что делаем при клике на кнопку 
function startGem(){
   // isGameStart = true

    scrool = 0
    setGemsTime()
    $gameTime.setAttribute('disabled', 'true')
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    var interval = setInterval(function(){
        var time = parseFloat($time.textContent)
        
        if(time <= 0){
            clearInterval(interval)
            endGame()
        }else{
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()
}

// Считаем и выводим результат кликов 
function setGameScrol(){
    $result.textContent = scrool.toString()
}

//
function setGemsTime(){
   
    var time = +$gameTime.value /// EROR!!!
    console.log($gameTime.value)
    $time.textContent = time.toFixed(1)
}
//
function endGame() {
    isGameStart = false
    setGameScrol() 
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = "#ccc"
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')

}
// Создаем div каждый раз как нажимаем
function headlerClick(event) {
    if(!isGameStart){
        return
    }
    if(event.target.dataset.box){
        scrool++
        renderBox()
    }
}

// При клике на кнопку у нас появляется кубик с определнными стилями и параметрами
function renderBox() {
    $game.innerHTML = '' // удаляет ранее созданный div и оставляет тольько один
    var box = document.createElement('div')
    var boxSize = getRendom(30, 100)

    // Получаем Дом с данными для вычисления top/left
    var gameSize = $game.getBoundingClientRect()
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#010101'
    box.style.top = getRendom(0, maxTop) + 'px'
    box.style.left =  getRendom(0, maxLeft) + 'px'

    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

// Создание динамически цыфр без остатка
function getRendom(min, max){
    return Math.floor(Math.random() * (max - min) + min)
}