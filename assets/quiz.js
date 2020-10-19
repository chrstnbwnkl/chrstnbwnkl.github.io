var width = 384,
    height = 460.8;

    const tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(d => `<span class='details'>${d.properties.NAME}<br></span>`);

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height)

var thedatarr = thedata.objects.KFZ_d3.geometries;

svg.call(tip);

kfz_topo = '/assets/KFZ_d3_s.json'
d3.json(kfz_topo, function(error, topology) {
  if (error) throw error;
  geojson = topojson.feature(topology, topology.objects.KFZ_d3);
//   var projection = d3.geo.mercator().scale(2100).center([11.1, 51.35]).translate([width/2, height/2]);
  var projection = d3.geoAlbers()
    .rotate([-10.0, 0.0, 0])
    .center([0.0, 51.1])
    .parallels([47.0, 55.0])
    .translate([width / 2, height / 2])
    .scale(3250)
    .precision(.1);

var path = d3.geo.path().projection(projection);
  svg.selectAll("path")
      .data(geojson.features)
      .enter().append("path")
      .attr("d", path)
      .attr("id", function(d, i) { return geojson.features[i].properties.DEBKGID })
      .on('mouseover',function(d){
        if (d3.select(this).classed('guessed')) {
            tip.show(d);
            d3.select(this)
            .style('stroke-width', 3);
        }
      })
      .on('mouseout', function(d){
        if (d3.select(this).classed('guessed')) {
        tip.hide(d);
        d3.select(this)
          .style('stroke-width',0.3);
        }
        });
});

// Track user input & score
var userinput = new Array();
var score = new Array();

// Get and evaluate input
input = document.getElementById("user-input");
input.addEventListener('submit', function(e) {
        e.preventDefault();
        kfz_input = d3.select("#KFZ-input").node().value.toLowerCase().trim();
        name_input = d3.select("#Kreis-input").node().value.toLowerCase().trim();
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

// Look for user input in kfz data and return ID if exists
function inputinData(kfz, name, quiz_data) {
    var result = quiz_data.find(feature => feature.properties.NAME.toString().toLowerCase() === name && feature.properties.KFZ.toString().toLowerCase().includes(kfz));
    var scoreNode = document.getElementById("scoreCount");
    if (result) {
        updateScore(scoreNode, result);
        return result.properties.DEBKGID
    } else { 
        return false }
}

// Animate input boxes
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