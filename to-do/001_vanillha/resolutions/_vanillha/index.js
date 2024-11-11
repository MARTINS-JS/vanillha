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

function signs(ways) {
  const openSigns = ways.filter(function (way) {
    return way.sign.isOpen
  })
  
  if (typeof openSigns != undefined) {
    for (let openSign of openSigns) {
      changeSign(openSign)
    }
  }

  const closedSigns = ways.filter(function (way) {
    return !way.sign.isOpen
  })

  if (typeof closedSigns != undefined) {
    for (let closedSign of closedSigns) {
      changeSign(closedSign)
    }
  }
}

function start() {
  amountCars(ways)
  hasPedestrians(ways)
  orderSigns(ways) 
  signs(ways)

  console.log(ways)
}

start()

const updateSystem = setInterval(() => {
  console.clear()
  start()
}, 30 * 1000);
