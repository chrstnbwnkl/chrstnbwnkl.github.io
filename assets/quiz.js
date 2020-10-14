var width = 384,
    height = 460.8;

// var projection = d3.geo.mercator().scale(width).center([10.4515, 51.1657]);


var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", "0 0 960 500")
    .attr("preserveAspectRatio", "xMidYMid meet");

var thedatarr = thedata.objects.KFZ_d3.geometries;


kfz_topo = '/assets/KFZ_d3_s.json'
d3.json(kfz_topo, function(error, topology) {
  if (error) throw error;
  geojson = topojson.feature(topology, topology.objects.KFZ_d3);
//   var projection = d3.geoConicConformal().parallels([7, 15]).center([0.4515, 40.1657]).fitSize([width, height], geojson).scale(3000)
  var projection = d3.geo.mercator().scale(5500).center([8.9, 48.3]).translate([width/1.3, height/0.639]);
  var path = d3.geo.path().projection(projection);
  svg.selectAll("path")
      .data(geojson.features)
      .enter().append("path")
      .attr("d", path)
      .attr("id", function(d, i) { return geojson.features[i].properties.DEBKGID });

  console.log(geojson.type);
  console.log(path.bounds(geojson))
});

// Track user input
var userinput = new Array();
var score = [];

// Start quiz
// var quiz_head = document.getElementById("quiz-head");
// var start_btn = document.getElementById("stbtn");
// start_btn.addEventListener("click", function(e) {
//     var time_div = document.createElement("div").classList.add('timer');   
// })

// Get input
input = document.getElementById("user-input");
input.addEventListener('submit', function(e) {
        e.preventDefault();
        kfz_input = d3.select("#KFZ-input").node().value;
        name_input = d3.select("#Kreis-input").node().value;
        d3.select("#KFZ-input").node().value = '';
        d3.select("#Kreis-input").node().value = '';
        if (inputRepeated(kfz_input, name_input)) {
            errorShake(d3.select("#KFZ-input").node());
            errorShake(d3.select("#Kreis-input").node());
        } else {
            var inlist = inputinData(kfz_input, name_input, thedatarr);
            if (inlist.length) {
                var DEBKGID = inlist;
                d3.select(`#${DEBKGID}`).attr('class', function(i, d) { return "guessed" })
            } else {
                errorShake(d3.select("#KFZ-input").node());
                errorShake(d3.select("#Kreis-input").node());
            }
        }
    });



// Check if input repeated
function inputRepeated(kfz, kreis) {
    if (userinput.includes(`${kfz} ${kreis}`)) {
        return true
    } else {
        userinput.push(`${kfz} ${kreis}`);
        return false
    }
}

//Look for user input in kfz data and return ID if exists
function inputinData(kfz, name, quiz_data) {
    var result = quiz_data.find(feature => feature.properties.NAME === name && feature.properties.KFZ.includes(kfz));
    var scoreNode = document.getElementById("scoreCount");
    if (result) {
        updateScore(scoreNode, result);
        return result.properties.DEBKGID
    } else { 
        return false }
}

function errorShake(node) {
    node.classList.add('error');
    setTimeout(function() {
        node.classList.remove('error');
    }, 300);
}

function updateScore(node, result) {
    score.push(`${result.properties.KFZ}  ${result.properties.NAME}`);
    node.innerHTML = `Erratene Kombinationen: ${score.length}<br>(${Math.round((score.length/770*100)*100)/100}%)`
}

function calculateScaleCenter(features) {
    // Get the bounding box of the paths (in pixels!) and calculate a
    // scale factor based on the size of the bounding box and the map
    // size.
    var bbox_path = path.bounds(features),
        scale = 0.95 / Math.max(
          (bbox_path[1][0] - bbox_path[0][0]) / width,
          (bbox_path[1][1] - bbox_path[0][1]) / height
        );
  
    // Get the bounding box of the features (in map units!) and use it
    // to calculate the center of the features.
    var bbox_feature = d3.geo.bounds(features),
        center = [
          (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
          (bbox_feature[1][1] + bbox_feature[0][1]) / 2];
  
    return {
      'scale': scale,
      'center': center
    };
  }

var laenge = 0;
for (i=0;i<thedatarr.length;i++) {
    laenge += thedatarr[i].properties.KFZ.length;
    console.log(laenge);
}
console.log("Ende");