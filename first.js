//Essential Functions
//returns amount of funds
function getAmount(){
  let amountStr = document.getElementById("money").innerHTML
  return Number(amountStr.slice(8));
}

//checks if you have enough funds - returns boolean
function checkFunds(amount){
  console.log(amount)
  return amount <= getAmount();
}

//adds to total funds, can be negative number to subtract
function addToFunds(byAmount){
  let amount = getAmount();
  amount += byAmount;

  document.getElementById("money").innerHTML = "Funds: $" + amount.toFixed(2);
}

function timer(){ //runs every 1 second; a day is 12 seconds
  console.log("Start")
  let hourCounter = 0
  setInterval (function(){
    //changes day count
    if(hourCounter === 12){
      let day = document.getElementById("day").innerHTML.slice(3);
      document.getElementById("day").innerHTML = "Day " + (Number(day) + 1);
      hourCounter = 0;
    }
    hourCounter += 1;
    //gets the list of active employees and has each one do their job
    for (let i = 0; i < activeStaff.length; i++) {
      let staffInfo = staff[activeStaff[i]];
      if (staffInfo.employeeType = "gofer"){
        for (let key in recipeBook["ingredientCosts"]){
          buyGroceries(key, staffInfo["discount"])
        }
      }
    }

    //sells burger based on demand
    if(demandCalc() > 0.3){
      sell("burger", 3)
    }


  },1000)
}

//Selling - Automated in Background
function sell (ID, price){
  if (Number(document.getElementById(ID).innerHTML) > 0){
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) -1
    addToFunds(price)
  }
}

function demandCalc(){
  let num = Math.random();
  return num;
}

//Groceries Functions
function buyGroceries(ID, multiplier = 1){
  let cost = recipeBook["ingredientCosts"][ID] * multiplier;
  if (checkFunds(cost)){
    addToFunds(-1 * cost);
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) + 10;
    console.log(document.getElementById(ID).innerHTML);
  }else{
    console.log("Not enough funds for groceries", ID)
  }

}

//staff
//List of Active Staff; they will do their job every second in timer()
let activeStaff = [];
//List of all possible staff members
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
  ingredientCosts : {
    buns : 3,
    patty : 5,
    tomato : 4,
    lettuce : 3,
    cheese : 2,
    coke : 1
  },
  burger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 1,cheese : 0, coke : 0, cost : 3
  },
  cheeseBurger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 1,cheese : 0, coke : 0, cost : 4
  },
  lettuceBurger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 3,cheese : 0, coke : 0, cost : 3
  }
}

function makeFood(ID){
  //makes sure there's enough required ingredients
  for (let key in recipeBook["ingredientCosts"]){
    if (Number(document.getElementById(key).innerHTML) < recipeBook[ID][key]){
      console.log("not enough of", key);
      return;
    }
  }

  //subtracts appropriate number of each ingredient used from total remaining.
  for (let key in recipeBook["ingredientCosts"]){
    document.getElementById(key).innerHTML = Number(document.getElementById(key).innerHTML) - recipeBook[ID][key]
  }
  document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) +1
}
