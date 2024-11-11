const ways = [
  {
    street: "Cruz das Almas"
  },
  {
    street: "Jatiúca"
  },
  {
    street: "Ponta Verde"
  },
  {
    street: "Pajuçara"
  } 
]

function updateData(update, time) {
  setTimeout(() => {
    update()

    console.clear()
    console.log(ways)
  }, time * 1000)
}

function amountCars(ways) {
  let amount = 0

  for (let way of ways) {
    amount = Math.floor(Math.random() * 31)    
    way.cars = amount
  }
}

function hasPedestrians(ways) {
  for (let way of ways) {
    let hasPedestrian = Math.floor(Math.random() * 2)
    
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

function start() {
  amountCars(ways)
  hasPedestrians(ways)

  console.log(ways)
}

start()

const updateSystem = setInterval(() => {
  console.clear()
  start()
}, 30 * 1000);
