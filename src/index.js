const red = document.getElementById('red');
const blue = document.getElementById('blue');
const green = document.getElementById('green');
const yellow = document.getElementById('yellow');
const btnStart = document.getElementById('btnStart');
const levelBoard = document.getElementById('level')
const LAST_LEVEL = 10;


class Game{
    constructor(){
        this.starting();
        this.sequenceGen();
        this.levelOne();
        this.nextLevel();
    }
    
    starting(){
        this.chooseColor = this.chooseColor.bind(this)
        // this.levelBoard = this.levelBoard.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toogleBtnStart()
        this.toogleDivStart()
        this.level = 1;
        this.colors = {
            red,
            blue,
            green,
            yellow
        }
    }
    
    levelOne(){
        levelBoard.classList.add('modal')
        levelBoard.innerHTML = `        <div class="box-inside">
        <h1 class="level">You are in level 1</h1>
        <p>Pick the pokemon</p>
    </div>`
        setTimeout(()=> {
            levelBoard.innerHTML = ''
            levelBoard.classList.remove('modal')
        }, 3000)
    }
    
    toogleDivStart(){
        if(!red.classList.contains('red')){
            red.classList.add('red')
        } else{
            red.classList.remove('red')
        }
        
        if(!blue.classList.contains('blue')){
            blue.classList.add('blue')
        } else{
            blue.classList.remove('blue')
        }
        
        if(!green.classList.contains('green')){
            green.classList.add('green')
        } else{
            green.classList.remove('green')
        }
        
        if(!yellow.classList.contains('yellow')){
            yellow.classList.add('yellow')
        } else{
            yellow.classList.remove('yellow')
        }
    }
    
    toogleBtnStart(){
        if(btnStart.classList.contains('hide')){
            btnStart.classList.remove('hide')
        }else{
            btnStart.classList.add('hide')
        }
    }
    
    sequenceGen(){
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
        console.log(this.sequence)
    }
    
    nextLevel(){
        this.sublevel = 0;
        this.lightSequence()
        this.addClickEvent()
    }

    transformNumber(number){
        switch (number){
            case 0:
                return 'red'
            case 1: 
                return 'blue'
            case 2: 
                return 'green'
            case 3:
                return 'yellow'
        }
    }

    transformColor(color){
        switch (color){
            case 'red':
                return 0
            case 'blue': 
                return 1
            case 'green': 
                return 2
            case 'yellow':
                return 3
        }
    }

    lightSequence(){
        for(let i = 0; i < this.level; i++){
            const color = this.transformNumber(this.sequence[i]);
            setTimeout(() =>{
                this.lightColor(color);
            }, 4000+1000 * i)  
        }
    }

    lightColor(color){
        this.colors[color].classList.add('light');
        setTimeout(() => this.turnDownColor(color),350) 
    }

    turnDownColor(color){
        this.colors[color].classList.remove('light');
    }

    addClickEvent(){
        this.colors.red.addEventListener('click',this.chooseColor);
        this.colors.blue.addEventListener('click',this.chooseColor);
        this.colors.green.addEventListener('click',this.chooseColor);
        this.colors.yellow.addEventListener('click',this.chooseColor);
    }

    deleteClickEvent(){
        this.colors.red.removeEventListener('click',this.chooseColor);
        this.colors.blue.removeEventListener('click',this.chooseColor);
        this.colors.green.removeEventListener('click',this.chooseColor);
        this.colors.yellow.removeEventListener('click',this.chooseColor);
        
    }

    chooseColor(ev){
         console.log(ev)
        const colorChosen = ev.target.dataset.color
        console.log(colorChosen)
        const numberColor = this.transformColor(colorChosen)
        this.lightColor(colorChosen)
        if (numberColor === this.sequence[this.sublevel]){
            this.sublevel++;
            if(this.sublevel === this.level){
                const newLevel = this.level++;
                this.newLevelAdvanced(newLevel)
                this.deleteClickEvent();
                if(this.level === LAST_LEVEL + 1){
                    this.gameWon()
                } else{
                    setTimeout(()=>this.nextLevel(), 2000); 
                }
            }
        }else {
            this.gameLost()
        }
    }

    newLevelAdvanced(level){
        setTimeout(()=> {
            levelBoard.classList.add('modal')
            levelBoard.innerHTML = `        <div class="box-inside">
            <h1 class="level">You passed to level ${level + 1}</h1>
            <p>Pick the pokemon and REMEMBER the sequence</p>
        </div>`
        }, 1000)
        setTimeout(()=> {
            levelBoard.innerHTML = ''
            levelBoard.classList.remove('modal')
        }, 4000)
    }

    gameLost(){
        swal('Pokemon Game', 'You lose', 'error')
        .then(()=>{
            this.deleteClickEvent()
            this.starting()
        })
    }

    gameWon(){
        swal('Pokemon Game', 'Congrats, you have won', 'success')
        .then(()=> this.starting())
    }
}

function startGame () {
    window.game = new Game()
}

