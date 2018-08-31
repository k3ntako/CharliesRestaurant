class RestaurantFunds extends React.Component{
  constructor(props){
    super(props)
    this.state = {funds:100}
  }
  componentDidMount() {
    console.log("Funds componentDidMount!");
  }
  componentDidUpdate() {
    console.log("Funds componentDidUpdate!");
  }
  render(){
    return <h2 id="money">Funds: ${this.state.funds}</h2>
  }
}

ReactDOM.render(
  <RestaurantFunds />,
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
function SubsectionList(props){return <p className= {"subsectionList"} id = {props.id}>{props.item}</p>}

class CreateButtons extends React.Component{
  constructor(props){
    super(props);
    this.functionList = {
      buyGroceries: function(a){console.log("BUY!",a, new Date().toLocaleString());},
      upgrade: function(a){console.log("Upgrade!", a, new Date().toLocaleString());},
      makeFood: function(a){console.log("makeFood!", a, new Date().toLocaleString());},
      hire: function(a){console.log("Hire!", a, new Date().toLocaleString());},
      adjustPrice: function(a){console.log("Adjust Price!", a, new Date().toLocaleString());}
    };
  }
  render(){
    let key = Object.keys(this.props.listItems)[0];
    let outputList = [];
    let funcList = this.functionList;
    let buttonLabel = this.props.button;
    this.props.listItems[key].forEach(function(theId){
      outputList.push(
        <p className={"classNa"}>
          <button id = {theId} onClick={() => funcList[key](key)}>
            {buttonLabel}
          </button>
        </p>
      )
    });
    return(
      <div className={"subsectionCentered"}>
        <p className="subsectionListHead">Button</p>
        {outputList}
      </div>
    );

  };
};

// function CreateButton(props){
//
//   let classNa = "subsectionList"
//   if(props.classNPrice){
//     classNa += " " + props.classNPrice
//   }
//   //all the functions for buttons
//   let functionList ={
//     buyGroceries: function(a){
//       console.log("BUY!",a, props.food, new Date().toLocaleString());
//     },
//     upgrade: function(){
//       console.log("Upgrade!", props.food, new Date().toLocaleString());
//     },
//     makeFood: function(){
//       console.log("makeFood!", props.food, new Date().toLocaleString());
//     },
//     hire: function(){
//       console.log("Hire!", props.food, new Date().toLocaleString());
//     },
//     adjustPrice: function(){
//       console.log("Adjust Price!", props.food, new Date().toLocaleString());
//     }
//   }
//   return <p className={classNa}><button id = {props.food} onClick={() => functionList[props.func]("pass thru argument")}>{props.buttonLabel}</button></p>
// }

function CreateList(props) {
  let outputList = []

  if (typeof props.listItems === "string"){
    // for columns where the starting value is the same for all rows

    (props.ids).forEach((theID) => {
      outputList.push(<SubsectionList item = {props.listItems} id = {theID} />);
    });
  }else{

    //for columns where each row is taken from the array passed through
    if (props.button){
      let key = Object.keys(props.listItems)[0]
      props.listItems[key].forEach(function(theId){outputList.push(<CreateButton func = {key} food = {theId} buttonLabel = {props.button} classNPrice = {props.classNPrice}/>)})
    }else{
      props.listItems.forEach(function(item){outputList.push(<SubsectionList item = {item} />)})
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
      <CreateList listItems = {props.listItems} repeat = {props.repeat} button = {props.button} ids = {props.ids} classNPrice = {props.classNPrice}/>
    </div>
  )
}

//fill in ingredient box
function IngBoxes (props){
  let ing = ["Burger Bun","Burger Patty","Tomato","Lettuce Slice","Cheese","Coke"]
  let prices = ["$3.00","$5.00","$4.00","$0.10","$2.00","$0.50"]
  let functions = {buyGroceries: ["bun","patty","tomato","lettuce","cheese","coke"]}
  let ingIDs = ["bunTotal","pattyTotal","tomatoTotal","lettuceTotal","cheeseTotal",""]

  let listLength = ing.length
  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Ingredient"} listItems = {ing} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Cost"} listItems = {prices} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {"0"} repeat = {listLength}  button = {false} ids = {ingIDs} />
      {/* <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {functions} repeat = {0} button = {"Buy"} /> */}
      <CreateButtons sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {functions} repeat = {0} button = {"Buy"}  />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Demand"} listItems = {"1"} repeat = {listLength} button = {false} ids = {ingIDs} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"# Bought"} listItems = {"0"} repeat = {listLength} button = {false} ids = {ingIDs} />
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
  let menu = ["Burger","Cheese Burger","Lettuce Burger","Coke"];
  let listLength = menu.length;
  let ids = {makeFood: ["burger","cheeseBurger","lettuceBurger"]};
  let idsPriceAdjust = {priceAdjust: ["burger","cheeseBurger","lettuceBurger", "coke"]};
  let prices = ["$3.00","$4.00","$3.00","$1.50"];
  let resIDs = ["burger","cheeseBurger","lettuceBurger", "coke"];
  let resTotalIDs = resIDs.map(x => x + "Total");

  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {"Product"} listItems = {menu} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {"0"} repeat = {listLength} button = {false} ids = {resIDs}/>
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {ids} repeat = {0} button = {"Prepare"} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Price"} listItems = {prices} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {idsPriceAdjust} repeat = {0} button = {"+"} classNPrice = {"priceAdjust"}/>
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {"Inventory"} listItems = {"0"} repeat = {listLength} button = {false} ids = {resTotalIDs} />
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
  let buttonsID = {upgrade: ["upgrade(0)","upgrade(1)","upgrade(2)"]}
  //   let buttonsID = ["upgrade(0)","upgrade(1)","upgrade(2)"]

  return(
    <div className={props.classN}>
      <div className = "sectionHead">{props.sectionHead}</div>
      <CreateSubsection sectionType = {"subsection"} subsectionHead = {""} listItems = {staff} repeat = {0} button = {false} />
      <CreateSubsection sectionType = {"subsectionCentered"} subsectionHead = {""} listItems = {buttonsID} repeat = {0} button = {"Train"} />

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
