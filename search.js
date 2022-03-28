/******************search function**************************/
var search = document.getElementById("btn");
search.onclick = function () {
  var searchKey = document.getElementById("searchInput").value;
  var a = document.getElementById("follow");
  a.style.display = "block";
  var b = document.getElementById("unfollow");
  b.style.display = "none";
  var c = document.getElementById("table1");
  c.style.display = "none";

  //a4883d29f26fffcc4392aa0fcb9fbab8
  fetch(
    `https://gnews.io/api/v4/search?q="${searchKey}"&token=3c01ae50c603f8690af1de0050cc86f9`
  ) //1de7e656585a4edb9d1b28c6cfcfef78
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      //const len = data.articles.length;
      console.log(data);

      //table creation
      let tab = `<tr>
 <th>Image</th>
 <th>Title</th>
 <th>Date</th>
</tr>`;

      // Loop to access all rows
      for (let r of data.articles) {
        tab += `<tr> 
<td><img src= ${r.image}  height="100px"></td>
<td><a href=${r.url} target="_blank">${r.title}</a></td>
<td style="font-size:1.0rem;">${r.publishedAt}</td>  
</tr>`;
      }
      // Setting innerHTML as tab variable
      document.getElementById("table2").innerHTML = tab;
    })
    .catch((error) => {
      console.log(error);
    });
};
