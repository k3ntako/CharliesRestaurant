function getAmount(){
  let amountStr = document.getElementById("funds").innerHTML;
  return Number(amountStr.slice(8));
}

function sell(byAmount){
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
