function RestaurantFunds(props){
  return <h2 id="money">Funds: ${props.funds}</h2>
}

ReactDOM.render(
  <RestaurantFunds funds = {"100"} />,
  document.getElementById("funds")
)

function DayCount(props){
  return <h2 id="day">Day {props.day}</h2>
}

ReactDOM.render(
  <DayCount day = {"1"} />,
  document.getElementById("dayCount")
)

//filling in boxes
function SubsectionList(props){return <p className="subsectionList">{props.item}</p>}

function CreateButton(props){
  function buyGroceries(){
    console.log("BUY!", props.food, new Date().toLocaleString())
  }
  return <p className="subsectionList"><button onClick={buyGroceries}>Buy</button></p>
}

function CreateList(props) {
  let outputList = []
  let inputList = props.listItems

  if (props.repeat != 0){
    // for columns where the starting value is the same for all rows
    for(let i = 0; i < props.repeat; i++){
      outputList.push(<SubsectionList item = {inputList} />)
    }
  }else{
    //for columns where each row is taken from the array passed through
    if (props.button){
      inputList.forEach(function(id){outputList.push(<CreateButton food = {id}/>)})
    }else{
      inputList.forEach(function(item){outputList.push(<SubsectionList item = {item} />)})
    }
  }
  return (
    outputList
  )
}

function CreateSubsection(props){
  return(
    <div className={props.sectionType}>
      <p className="subsectionListHead">{props.subsectionHead}</p>
      <CreateList listItems = {props.listItems} repeat = {props.repeat} button = {props.button} />
    </div>
  )
}

//fill in ingredient box
function IngBoxes (props){
  let ing = ["Burger Bun","Burger Patty","Tomato","Lettuce Slice","Cheese","Coke"]
  let prices = ["$3.00","$5.00","$4.00","$0.10","$2.00","$0.50"]
  let ids = ["buyGroceries('bun')","buyGroceries('patty')","buyGroceries('tomato')","buyGroceries('lettuce')","buyGroceries('cheese')","buyGroceries('coke')"]

  let listLength = ing.length
  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Ingredient"} listItems = {ing} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Cost"} listItems = {prices} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {"0"} repeat = {listLength}  button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {ids} repeat = {0} button = {true} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Demand"} listItems = {"1"} repeat = {listLength} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"# Bought"} listItems = {"0"} repeat = {listLength} button = {false} />
    </div>
  )
}

ReactDOM.render(
  <IngBoxes id = "ingredients" classN = "sectionMedium" sectionHead = "Ingredients" />,
  document.getElementById("ingredients")
)

//fill in recipe box
function RecipeBoxes (props){
  let menu = ["Burger ","Cheese Burger","Lettuce Burger"]
  let recipe = ["Tomato + Lettuce + Patty + Bun","Burger + Cheese","Patty + 3 Lettuce + Tomato"]
  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Item"} listItems = {menu} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"sectionSpanTwo"} subsectionHead = {"Recipe"} listItems = {recipe} repeat = {0} button = {false} />
    </div>
  )
}

ReactDOM.render(
  <RecipeBoxes id = "recipe" classN = "sectionSmall" sectionHead = "Recipe" />,
  document.getElementById("recipe")
)

//fill in restaurant box
function RestaurantBoxes (props){
  let menu = ["Burger","Cheese Burger","Lettuce Burger","Coke"]
  let listLength = menu.length
  let ids = ["makeFood('burger')","makeFood('cheeseBurger')","makeFood('lettuceBurger')"]
  let prices = ["$3.00","$4.00","$3.00","$1.50"]

  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Product"} listItems = {menu} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {0} repeat = {listLength} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {ids} repeat = {0} button = {true} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Price"} listItems = {prices} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {ids} repeat = {0} button = {true} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {0} repeat = {listLength} button = {false} />
    </div>
  )
}

ReactDOM.render(
  <RestaurantBoxes id = "recipe" classN = "sectionMedium" sectionHead = "Restaurant" />,
  document.getElementById("restaurant")
)

//fill in staff box
function StaffBoxes (props){
  let staff = ["Ponpon", "Beary Bear", "Malo"]
  let listLength = staff.length
  let buttonsID = ["upgrade(0)","upgrade(1)","upgrade(2)"]

  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {""} listItems = {staff} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {buttonsID} repeat = {0} button = {true} />

    </div>
  )
}

ReactDOM.render(
  <StaffBoxes id = "staff" classN = "sectionSmall" sectionHead = "Staff" />,
  document.getElementById("staff")
)

//fill in research box
function ResearchBoxes (props){
  let staff = ["Ponpon", "Beary Bear", "Malo"]
  let listLength = staff.length
  let description = ["Gofer: Will buy ingredients. Pandas are generally a little lazy, so she can only buy 10 of each at a time. She will negotiate a 5% discount.",
  "Apprentice Chef: Will prepare food, but he's still learning so he's a bit slow. Still hasn't mastered the cheeseburger or the lettuce burger.",""]

  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Staff"} listItems = {staff} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"sectionSpanThree"} subsectionHead = {"Description"} listItems = {description} repeat = {0} button = {false} />

    </div>
  )
}

ReactDOM.render(
  <ResearchBoxes id = "research" classN = "sectionLarge" sectionHead = "Research" />,
  document.getElementById("research")
)
