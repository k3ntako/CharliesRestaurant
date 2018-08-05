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

  if ( props.repeat != 0){
    // for columns where the starting value is the same for all rows
    for(let i = 0; i < props.repeat; i++){
      outputList.push(<SubsectionList item = {inputList} />)
    }
  }else{
    //for columns where each row is taken from the array passed through
    if (props.button){
      console.log("Button")
      inputList.forEach(function(id){outputList.push(<CreateButton food = {id}/>)})
      console.log("Button Done")
    }else{
      inputList.forEach(function(item){outputList.push(<SubsectionList item = {item} />)})
    }
  }
  return outputList
}

//fill in ingredient box
function IngBoxes (props){
  let ing = ["Burger Bun","Burger Patty","Tomato","Lettuce Slice","Cheese","Coke"]
  let prices = ["$3.00","$5.00","$4.00","$0.10","$2.00","$0.50"]
  let ids = ["buyGroceries('bun')","buyGroceries('patty')","buyGroceries('tomato')","buyGroceries('lettuce')","buyGroceries('cheese')","buyGroceries('coke')"]

  let listLength = ing.length
  return(
    <div class="sectionMedium">
      <div className = "sectionHead">{props.sectionHead}</div>
      <div className = "subsection">
        <p class="subsectionListHead">Ingredient</p>
        <CreateList listItems = {ing} repeat = {0} button = {false} />
      </div>
      <div className = "subsectionCentered">
        <p class="subsectionListHead">Cost</p>
        <CreateList listItems = {prices} repeat = {0} button = {false} />
      </div>
      <div className = "subsectionCentered">
        <p class="subsectionListHead">Inventory</p>
        <CreateList listItems = {"0"} repeat = {listLength}  button = {false}/>
      </div>
      <div className = "subsectionCentered">
        <p class="subsectionListHead"></p>
        <CreateList  listItems = {ids} repeat = {0} button = {true}/>
      </div>
      <div className = "subsectionCentered">
        <p class="subsectionListHead">Demand</p>
        <CreateList listItems = {"1"} repeat = {listLength} button = {false}/>
      </div>
      <div className = "subsectionCentered">
        <p class="subsectionListHead"># Bought</p>
        <CreateList listItems = {"0"} repeat = {listLength} button = {false}/>
      </div>
    </div>
  )
}

ReactDOM.render(
    <IngBoxes id = "ingredients" classN = "sectionMedium" sectionHead = "Ingredients" />,
    document.getElementById("ingredients")
)

//fill in recipe box
function RecipeBoxes (props){
  let menu = ["Burger","Cheese","Lettuce Burger"]
  let recipe = ["Tomato + Lettuce + Patty + Bun","Burger + Cheese","Patty + 3 Lettuce + Tomato"]
  return(
    <div class="sectionSmall">
      <div className = "sectionHead">{props.sectionHead}</div>


        <div className = "subsection">
          <p class="subsectionListHead">Item</p>
          <CreateList listItems = {menu} repeat = {0} button = {false} />
        </div>
        <div className = "sectionSpanTwo">
          <p class="subsectionListHead">Recipe</p>
          <CreateList listItems = {recipe} repeat = {0} button = {false} />
        </div>


    </div>
  )
}

ReactDOM.render(
    <RecipeBoxes id = "recipe" classN = "sectionMedium" sectionHead = "Recipe" />,
    document.getElementById("recipe")
)
