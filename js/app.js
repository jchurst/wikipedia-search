console.log("start");
$("#searchForm").submit(function(event) {
  val = encodeURIComponent(document.getElementById("myId").value);
  myURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch="+val+"&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?";
  console.log(myURL);
  $.getJSON(myURL, function(data) {
    pages = data.query.pages;
    var titles = [];
    var extracts = [];
    var pageids = [];
    for (var key in pages) {
      titles.push(pages[key].title);
      extracts.push(pages[key].extract);
      pageids.push(pages[key].pageid);
    }
    var html = "";
    for (i = 0; i < titles.length; i++) {
      html += '<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"><a href="https://en.wikipedia.org/?curid=';
      html += pageids[i];
      html += '">'
      html += titles[i];
      html += '</a></h3> </div> <div class="panel-body">';
      html += extracts[i]
      html += '</div></div>'
    }
    $("#searchResults").html(html);
    
    });
  event.preventDefault();
});
function random() {
  console.log("random");
  myURL = "https://en.wikipedia.org/w/api.php?action=query&&format=json&list=random&rnlimit=1&callback=?";
  $.getJSON(myURL, function(data) {
    var id = data.query.random[0].id
    console.log("s"+id);
    var url = "https://en.wikipedia.org/?curid=" + id;
    window.open(url,"_self");  
   });
}
