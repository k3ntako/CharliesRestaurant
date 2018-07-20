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

function displayDate(date){
  console.log(date)
  let fullDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
  document.getElementById("day").innerHTML = fullDate;
}

function timer(){ //runs every 1 second; a day is 12 seconds
  console.log("Start")
  //Date
  let currentDate = new Date;
  displayDate(currentDate);
  //Color - Hour
  //background color changes every second (every two hours in the game)
  let bgColors = ["#000","#000","#240f00", "#F2C649", "#FED85D", "#8FD8D8","#95E0E8","#6CDAE7", "#76D7EA","#FFB97B","#E77200","#000"  ]
  let realTimeCounter = 0;

  setInterval (function(){
    //changes day count
    if(realTimeCounter === 12){
      //let day = document.getElementById("day").innerHTML.slice(3);
      //document.getElementById("day").innerHTML = "Day " + (Number(day) + 1);
      currentDate.setDate(currentDate.getDate() + 1)
      displayDate(currentDate);

      realTimeCounter = 0;
    }
    document.body.style.backgroundColor = bgColors[realTimeCounter];

    realTimeCounter += 1; //when 12 real seconds pass, it's a day
    //gets the list of active employees and has each one do their job
    for (let i = 0; i < activeStaff.length; i++) {
      let staffInfo = staff[activeStaff[i]];
      if (staffInfo.employeeType = "gofer"){
        for (let key in recipeBook["ingredientCosts"]){
          buyGroceries(key, staffInfo["discount"]);
        }
      }
      if (staffInfo.employeeType = "cook"){
        for (let key in staffInfo.cooks){
          makeFood(key);
        }
      }
    }

    //sells burger based on demand
    if(demandCalc() > 0.3){
      sell("burger", recipeBook["burger"]["cost"]);
    }


  },1000)
}

//Selling - Automated in Background
function sell (ID, price){
  if (Number(document.getElementById(ID).innerHTML) > 0){
    document.getElementById(ID).innerHTML = Number(document.getElementById(ID).innerHTML) -1;
    document.getElementById(ID + "Total").innerHTML = Number(document.getElementById(ID + "Total").innerHTML) +1;
    addToFunds(price);
  }
}

function demandCalc(){
  let num = Math.random(); //maybe a bit more complex in the future
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
  },
  bearyBear : {
    employeeType : "cook",
    wage : 10,
    cooks : {
      burger : 1,
      cheeseBurger : 1
    }
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
    lettuce : 0.10,
    cheese : 2,
    coke : 0.50
  },
  burger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 1,cheese : 0, coke : 0, cost : 3
  },
  cheeseBurger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 1,cheese : 1, coke : 0, cost : 4
  },
  lettuceBurger : {
    buns : 1, patty : 1, tomato : 1, lettuce : 3,cheese : 0, coke : 0, cost : 3
  },
  coke : {
    buns : 0, patty : 0, tomato : 0, lettuce : 0,cheese : 0, coke : 1, cost : 1.5
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

function adjustPrice(ID, adustAmount){
  let originalPrice = Number(recipeBook[ID]["cost"]);

  if (originalPrice + adustAmount > 0){
    recipeBook[ID]["cost"] = Number((originalPrice + adustAmount).toFixed(2));
    document.getElementById(ID + "Price").innerHTML =  "$" + recipeBook[ID]["cost"].toFixed(2);
  }else{
    console.log("Price has to be greater than 0.");
  }
}
