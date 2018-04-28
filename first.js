function getAmount(){
  let amountStr = document.getElementById("funds").innerHTML;
  return Number(amountStr.slice(8));
}

function addToFunds(byAmount){
  let amount = getAmount();
  amount += byAmount;

  document.getElementById("funds").innerHTML = "Funds: $" + amount;
}



let machines = [
  [null,null,null],
  [10,100,500],
  [500, 1000, 5000]
];
function buy(id){
  let machineID = 0
  let amount = 1
  let cost = 2

  if (getAmount() >= machines[cost][id]){
    clearInterval(machines[machineID][id])
    machines[amount][id] *= 2
    sell(-1 * machines[cost][id])
    machines[machineID][id] = setInterval(function() { add(machines[amount][id]) }, 1000);
    console.log(machines)
  }
}
function make(ID){
  for(let i = 0; i < menu["burger"].length;i++){
    if (Number(document.getElementById(menu["ingredients"][i]).innerHTML) < menu[ID][i]){
      return;
    }
  }
  for(let i = 0; i < menu["burger"].length;i++){
    document.getElementById(menu["ingredients"][i]).innerHTML = Number(document.getElementById(menu["ingredients"][i]).innerHTML) - menu[ID][i]
  }
  document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) +1

}

function sell (ID, price){
  if (Number(document.getElementById(ID).innerHTML) > 0){
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) -1
    addToFunds(price)
  }
}

function buyGroceries(ID, cost){
  if (getAmount() >= cost){
    addToFunds(-1 * cost);
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) + 1
    console.log(document.getElementById(ID).innerHTML)
  }

}

let menu = {
  ingredients : ["i0","i1","i2","i3","i4"],
  burger : [1,1,1,1,0],
  cheeseBurger : [1,1,1,1,0]
}
