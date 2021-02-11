const dino = document.querySelector('.dino'); // coloca o elemento dino dentro da const dino
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {   // ve se a tecla pressionada foi o espaço
        if(!isJumping) {          // se ja não estive no ar pula
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {    //a cada 20ms
        if (position >= 150) {
            clearInterval(upInterval);

            // descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            // subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;   // gera um numero aleatorio

    cactus.classList.add('cactus');   // adiciona classe chamada cactus
    cactus.style.left = 1000 + 'px'   // inicia o cactus na posição 1000px
    background.appendChild(cactus);   // coloca o cactus no background

    let leftInterval = setInterval(() => {
        // remove cactus quando sai da tela
        if (cactusPosition <= -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus); // remove o cactus do background

        // checa colisao
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';

        // move o cactus pra esquerda
        } else {
            cactusPosition -= 10;   // velocidade que o anda, maior mais rapido
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    // executa uma determinada função depois de um determiado tempo
    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);