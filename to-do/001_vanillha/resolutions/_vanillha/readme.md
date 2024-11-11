<div align="center">
  <h1>🌈Sinaleiro Amigável🌤️</h1>
</div>

#### História

As crianças, vendo os sinaleiros sorridentes, se sentiam seguras e começaram a chamar os semáforos de seus “amigos da travessia”. E os moradores adultos perceberam que, com o Sinaleiro Amigável, podiam andar pela cidade sem preocupações.

No fim do dia, o prefeito de Vanillha olhou para as ruas organizadas e pensou em como o Sinaleiro Amigável havia transformado a cidade. E o melhor de tudo? Com a ajuda do sistema, os habitantes de Vanillha aprenderam sobre paciência e a importância de seguir as regras para que todos pudessem ir e vir com segurança.

E assim, o Sinaleiro Amigável se tornou um herói da cidade, sempre cuidando para que tudo continuasse fluindo direitinho. E em cada esquina de Vanillha, havia um semáforo amigável, sempre com um sorriso pronto para guiar cada morador.

Referência: [001_vanillha](https://github.com/MARTINS-JS/vanillha/blob/main/issues/001_vanillha/readme.md)

#### index.js

No código fonte do projeto você vai encontrar um array e funções para te ajudar com a construção do sistema.

```javascript 
const ways = [
  {
    street: ""
  },
  ...
]
```
Se desejar, você pode adicionar, alterar ou remover os objetos neste array, fique avontade para fazer as alterações necessárias para o seu sistema.

```javascript 
function amountCars(ways) {
  let amount = 0

  for (let way of ways) {
    amount = Math.floor(Math.random() * 31)    
    way.cars = amount
  }
}
```
Essa função vai adicionar uma quantidade de carros em cada um dos objetos do array (ways), a quantidade de carros é um número aleatório que vai de 0 - 30.

```javascript 
function hasPedestrians(ways) {
  for (let way of ways) {
    let hasPedestrian = Math.floor(Math.random() * 2)

    // Se algum cidadão a pé estava com pressa para chegar a um compromisso, o semáforo mudava rapidinho para ajudá-lo a seguir caminho.
    if (hasPedestrian) {          
      way.hasPedestrian = true
      way.sign = {
        isOpen: false,
        duration: 10
      }
    } else {
      way.hasPedestrian = false
      way.sign = {
        isOpen: true,
        duration: 20
      }
    }
  }
}
```

Essa função vai informar de forma aleatória se tem ou não pedestres para atravessar a rua em cada um dos objetos do array (ways), com base nessa informação, a função também vai definir se o sinal está aberto ou fechado e qual será o tempo de duração dele em segundos.


```javascript 
function start() {
  amountCars(ways) /* Informa a quantidade de carros em cada rua do Array */
  hasPedestrians(ways) /* Informa se as ruas tem pedestres ou não para atravessar */

  /* Outras funções aqui! */

  console.log(ways)
}

start()
```

Essa função vai exercutar a lógica do sistema de forma correta, nela você pode adicionar novas funções, seja para alterar a cor do sinal depois de um tempo determinado ou definir qual das rua terá mais tempo com o sinal aberto.

```javascript 
const updateSystem = setInterval(() => {
  console.clear()
  start()
}, 30 * 1000);
```

Sabendo que esse é um sistema que funcionará 24h por dia, essa função vai atualizar o sistema a cada 30 segundos, você pode parar o sistema usando o **ctrl + c** no console.

```javascript 
function updateData(update, time) {
  setTimeout(() => {
    update()

    console.clear()
    console.log(ways)
  }, time * 1000)
}
```

Sabendo que a comunicação entre os sinais será constante, essa função pode te ajudar na alteração e exibição dos dados do Array depois de um determinado tempo em segundos.

#### Resposta

```javascript 
// Se uma rua estava muito cheia, eles ajustavam o tempo para deixar mais carros passarem.

function orderSigns(ways) { 
  for (let way of ways) {
    way.sign.isPriority = false
  }
  
  ways.sort(function(a, b) {
    return b.cars - a.cars
  })
  
  for (let way of ways) {  
    if (!way.hasPedestrian) {
      way.sign.isPriority = true
      way.sign.duration = 30
      return
    } 
  }
}
```

Essa função vai informar qual dos sinais é prioridade, também vai organizar os sinais em ordem decrescente do maior para o menor de acordo com a quantidade de carros na rua e para o sinal que está aberto e com mais carros na rua, o tempo para fechar esse sinal será bem maior.

```javascript
// Cada semáforo sabia exatamente quando precisava mudar de cor para deixar o trânsito fluir.

function changeSign(way) {
  if (way.sign.isOpen) {
    updateData(() => {
      way.sign.isOpen = false
      way.sign.duration = 10
      way.hasPedestrian = true
    }, way.sign.duration)
  } else {
    updateData(() => {
      way.hasPedestrian = false
      way.sign.duration = 20
      way.sign.isOpen = true    
    }, way.sign.duration)
  }
}
```

Essa função vai verificar o sinal e alterar ele após seu tempo de duração, para isso, usamos a função (updateData).

```javascript
function signs(ways) {
  // Havia o Verde Brilhante, que acenava feliz para os pedestres atravessarem;
  const openSigns = ways.filter(function(way) {
    return way.sign.isOpen
  })
  
  if (typeof openSigns != undefined) {
    for (let openSign of openSigns) {
      changeSign(openSign)
    }
  }

  // E o Vermelho Paciente, que gentilmente pedia para todos aguardarem um pouquinho;
  const closedSigns = ways.filter(function(way) {
    return !way.sign.isOpen
  })

  if (typeof closedSigns != undefined) {
    for (let closedSign of closedSigns) {
      changeSign(closedSign)
    }
  }
}
```
Essa função vai separar os sinais abertos dos fechados e solicitar a alteração dos sinais após seu tempo de duração.

#### Parabéns!

Te agradeço por chegar até aqui, espero que tenha aprendido algo novo ou colocado seu conhecimento em prática, fique a vontade para propor alterações e apontar melhorias no código.

---

🌈✨ Feito com 🩵 by Vanillha 🖖
