//Essential Functions
function getAmount(){
  let amountStr = document.getElementById("money").innerHTML
  return Number(amountStr.slice(8));
}

function checkFunds(amount){
  console.log(amount)
  return amount <= getAmount();
}

function addToFunds(byAmount){
  let amount = getAmount();
  amount += byAmount;

  document.getElementById("money").innerHTML = "Funds: $" + amount.toFixed(2);
}

function timer(){
  setInterval (function(){
    let day = document.getElementById("day").innerHTML.slice(3);
    document.getElementById("day").innerHTML = "Day " + (Number(day) + 1);
    for (let i = 0; i < activeStaff.length; i++) {
      let staffInfo = staff[activeStaff[i]]
      if (staffInfo.employeeType = "gofer"){
        for(let j = 0; j < recipeBook["ingredients"].length; j++){
          buyGroceries(recipeBook["ingredients"][j], recipeBook["ingredientCosts"][j] * staffInfo["discount"])
        }
      }
    }
  },5000)
}

//Groceries Functions
function buyGroceries(ID, cost){
  if (checkFunds(cost)){
    addToFunds(-1 * cost);
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) + 10;
    console.log(document.getElementById(ID).innerHTML);
  }else{
    console.log("Not enough funds for groceries")
  }

}

//staff
let activeStaff = [];

let staff = {
  ponpon : {
    employeeType : "gofer",
    wage : 10,
    buys : 10,
    discount : 0.95
  }
}

function hire(ID){
  if(checkFunds(staff[ID]["wage"])){
    addToFunds(-1 * staff[ID]["wage"]);
    activeStaff.push(ID)
  }else{
    console.log("Not enough funds to hire.");
  };
};

//Kitchen
let recipeBook = {
  ingredients : ["buns","patty","tomato","lettuce","cheese","coke"],
  ingredientCosts : [3,5,4,3,2,1],
  burger : [1,1,1,1,0,0],
  cheeseBurger : [1,1,1,1,1,0],
  lettuceBurger : [1,1,1,3,1,0]

}

function makeFood(ID){
  for(let i = 0; i < recipeBook["ingredients"].length;i++){
    if (Number(document.getElementById(recipeBook["ingredients"][i]).innerHTML) < recipeBook[ID][i]){
      console.log(ID)
      return;
    }
  }
  for(let i = 0; i < recipeBook["ingredients"].length;i++){
    document.getElementById(recipeBook["ingredients"][i]).innerHTML = Number(document.getElementById(recipeBook["ingredients"][i]).innerHTML) - recipeBook[ID][i]
  }
  document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) +1
}

//Selling - Automated in Background
function sell (ID, price){
  if (Number(document.getElementById(ID).innerHTML) > 0){
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) -1
    addToFunds(price)
  }
}
