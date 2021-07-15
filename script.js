const width = 28
const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const startButton = document.getElementById('start')
const result = document.getElementById('result')

let squares = []
let score = 0
let direction =1

// 0 - pacdot
// 1 - wall
// 3 - heart
// 4 - empty
const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,4,4,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,4,4,4,4,4,4,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,4,4,4,4,4,4,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,4,4,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,0,0,3,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

function createBoard(){
    for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        if(layout[i] === 0) {
            squares[i].classList.add('pac-dot')
        }else if(layout[i] === 1) {
            squares[i].classList.add('wall') 
        }else if(layout[i] === 3) {
            squares[i].classList.add('heart')
        }
    }
}
createBoard()

let pacmanCurrentIndex =  378

squares[pacmanCurrentIndex].classList.add('pac-man')


function control(e){
    squares[pacmanCurrentIndex].classList.remove('pacman')
    squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)';
    switch(e.key) {
        case "ArrowDown":
        if( 
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width ) {
            pacmanCurrentIndex+= width
            squares[pacmanCurrentIndex].style.transform = 'rotate(90deg)'
            }
        break 
        case "ArrowUp":
        if ( 
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >= 0 ) {
            pacmanCurrentIndex-=width
            squares[pacmanCurrentIndex].style.transform = 'rotate(-90deg)'
            }
        break 
        case "ArrowLeft":
        if ( 
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !== 0){
            pacmanCurrentIndex-=1
            squares[pacmanCurrentIndex].style.transform = 'rotate(180deg)'
            }
            if(pacmanCurrentIndex===364) { pacmanCurrentIndex = 391}
        break 
        case "ArrowRight":
        if ( 
            !squares[pacmanCurrentIndex +1].classList.contains('wall') && 
            pacmanCurrentIndex % width <width -1) {
            pacmanCurrentIndex+=1
            squares[pacmanCurrentIndex].style.transform = 'rotate(0deg)'
            }
            if(pacmanCurrentIndex === 391) { pacmanCurrentIndex = 364}
        break 
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacDotEaten()
    heartEaten()
    checkWin()
    gameOver()
}
document.addEventListener('keyup', control)

function pacDotEaten(){
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
        score++
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
}

function heartEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('heart')){
        squares[pacmanCurrentIndex].classList.remove('heart')
        score += 10
        ghosts.forEach(ghost => ghost.isScared = true)
        setTimeout(unScareGhosts, 5000)
    }
}

function unScareGhosts(){
    ghosts.forEach(ghost => ghost.isScared = false)
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost('blinky', 110, 2000),
    new Ghost('pinky', 30, 200),
    new Ghost('inky', 701, 200),
    new Ghost('clyde', 749, 200)
]
//draw ghosts on grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
})

//move ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost){
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random()* directions.length)]

    ghost.timerId = setInterval(function() {
        if(
            !squares[ghost.currentIndex +direction].classList.contains('ghost') &&
            !squares[ghost.currentIndex +direction].classList.contains('wall')
        ){
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        } else direction = directions[Math.floor(Math.random()* directions.length)]

        if(ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        gameOver()

    }, ghost.speed)
}

function gameOver() {
    if(
        squares[pacmanCurrentIndex].classList.contains('ghost')
        && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', control)
            result.innerHTML = `Game Over`
            document.getElementById('scoreText').remove()

        }
}

function checkWin () {
    if(score === 300){
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keyup', control)
        result.innerHTML = `You Won`
        document.getElementById('scoreText').remove('Score:')
    }
}

startButton.addEventListener('click',() => {
    window.location.reload();
})

