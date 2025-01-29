
function Calculadora () { // funçao construtora
    this.display = document.querySelector('.display');
    this.contaFinalizada = false; // flag para controlar se a conta foi finalizada

    this.inicia = () => { //incia as funçoes 
        this.display.focus();// vai colocar o foco no display ao iniciar a tela 

        this.capturaClick();
        this.capturaTecla();
    };

    // Vai capturar os clicks 
    this.capturaClick = () => { 
        document.addEventListener('click', event =>{
            const el = event.target; // salva na variavel o elemento que clicado

            if(el.classList.contains('btn-num')) this.addNumDisplay(el);
            if(el.classList.contains('btn-clear')) this.clear();
            if(el.classList.contains('btn-del')) this.delet();
            if(el.classList.contains('btn-eq'))  this.realizaCalculo();
        });
    }; // fim captura click 

    // captura tecla precionadas
    this.capturaTecla = () => {
        document.addEventListener('keypress', e =>{
            if(e.key !== 'Enter') return; // se a tecla clicada nao for o enter ele sai da function
            this.realizaCalculo();
        });
    };

    // Vai realizar o calculo 
    this.realizaCalculo = () => {
        try{
            if (this.display.value === '') { //se o display estiver vasio vai dar erro
                this.display.value = 'ERR';
                setTimeout(() => this.clear(), 1000); //mostrara a mensagem por 1 segundo
            }

            const conta = eval(this.display.value); // transforma as string em codigo e executa o que estiver dentro (noa é uma forma segura de se fazer)
            
            if (conta === undefined || conta === null || isNaN(conta)){
                this.display.value = 'ERR';
                setTimeout(() => this.clear(), 1000);
            }

            this.display.value = conta; //se a conta for real, exibe na tela
            this.contaFinalizada = true;// atualiza a variavel de controle do display
            
        }   
        catch {
            this.display.value = 'ERR';
            setTimeout(() => this.clear(), 1000);
        }
    };

    this.addNumDisplay = el => {
        if (this.contaFinalizada){ //verifica a variavel de controle é true or false
            this.clear(); // se for true ele vai limpar o display
            this.contaFinalizada = false; // atualiza novamente para false
        }
        this.display.value += el.innerText; // add o numero no display
        // this.display.focus(); //coloca o foco novamente para que ele nao exiba novamente o ultimo botao clicado toda vez
    }

    this.clear = () => { // limpa a tela
        this.display.value = '';
        this.contaFinalizada = false;
    };

    //limpa o ultimo numero clicado
    this.delet = () => this.display.value = this.display.value.slice(0,-1);
    
}

const calculadora = new Calculadora();
calculadora.inicia();