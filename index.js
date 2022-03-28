/***********************On page load, it will fetch Top-headline from API and it will display in table view*************************/
var butn = document.getElementById("unfollow");
butn.style.display = "none";

fetch(
  "https://gnews.io/api/v4/top-headlines?&token=3c01ae50c603f8690af1de0050cc86f9"
)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((data) => {
    console.log(data);

    let tab =
      //Creation of tableview
      `<tr>
          <th>Image</th>
          <th>Title</th>
          <th>Date</th>
         </tr>`;

    // Loop to access all rows

    for (let r of data.articles) {
      //can use map() also
      tab += `<tr> 
    <td><img src= ${r.image} height="100px"></td>
    <td><a href=${r.url} target="_blank">${r.title}</a></td> 
    <td style="font-size:1.0rem;">${r.publishedAt}</td></tr>`;
    }
    //anchor tag is used to redirect the selected headline to detailed view.
    // Setting innerHTML as tab variable

    document.getElementById("table1").innerHTML = tab;
  })
  .catch((error) => {
    console.log(error);
  });

//unfollow button will be hidden till any dropdown value get selected
var butn = document.getElementById("unfollow");
butn.style.display = "none";

const name = document.querySelector("#searchInput");
const btnAdd = document.querySelector("#follow");
const btnRemove = document.querySelector("#unfollow");
const sb = document.querySelector("#list");

/*****************************btnAdd Event: If user clicks on follow button,
 *the value written in searchbox will get added to dropdown list************************/
btnAdd.onclick = (e) => {
  e.preventDefault();

  // validate the option
  if (searchInput.value == "") {
    alert("Please enter the name.");
    return;
  }
  // create a new option
  const option = new Option(searchInput.value, searchInput.value);
  // add it to the list
  sb.add(option, undefined);

  // reset the value of the input
  searchInput.value = "";
  searchInput.focus();
};

/*****************************btnRemove Event: If user clicks on unfollow button,
 *the selected value of dropdown will get removed from dropdown list************************/
// remove selected option
btnRemove.onclick = (e) => {
  e.preventDefault();
  // save the selected option
  let selected = [];
  for (let i = 0; i < sb.options.length; i++) {
    selected[i] = sb.options[i].selected;
  }
  // remove all selected option
  let index = sb.options.length;
  while (index--) {
    if (selected[index]) {
      sb.remove(index);
    }
  }
};
/**********************selectedDropValue function : When user select any value from dropdown list,it will search 
  and display news related to selected value.****************************/
function selectedDropvalue(str) {
  var b = document.getElementById("follow");
  var c = document.getElementById("unfollow");
  var d = document.getElementById("table1");
  var e = document.getElementById("table2");
  b.style.display = "none"; //property hides content
  c.style.display = "block"; //property shows content
  d.style.display = "none";
  e.style.display = "none";
  fetch(
    `https://gnews.io/api/v4/search?q=${str}&token=3c01ae50c603f8690af1de0050cc86f9`
  ) //1de7e656585a4edb9d1b28c6cfcfef78
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);

      let ab = `<tr>
          <th>Image</th>
          <th>Title</th>
          <th>Date</th>
         </tr>`;

      // Loop to access all rows
      for (let r of data.articles) {
        ab += `<tr> 
    <td><img src= ${r.image}  height="100px"></td>
    <td><a href=${r.url} target="_blank">${r.title}</a></td>
    <td style="font-size:1.0rem;">${r.publishedAt}</td>        
    </tr>`;
      }
      // Setting innerHTML as ab variable
      document.getElementById("table3").innerHTML = ab;
    })
    .catch((error) => {
      console.log(error);
    });
}

/***************************************Local Storage***********************************/
var selectElem = document.getElementById("list");
selectElem.addEventListener("change", function () {
  var index = selectElem.selectedIndex;
  console.log(selectElem[index].text);
  if (typeof Storage !== "undefined") {
    // Stores value in local storage
    localStorage.setItem("selected", `${selectElem[index].text}`);
    var a = localStorage.getItem("selected");
    console.log(a);
    return selectedDropvalue(a);
  } else {
    alert("Sorry, your browser does not support Web Storage...");
  }
});
