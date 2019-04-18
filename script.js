dataP = d3.json('classData.json')
dataP.then(function(data){
  makePlot(data)
}
)

var makePlot = function(data){

  var quiz = data.map(function(d,i){return data[i].quizes.map(function(h){return h.grade})})
  var penArray=["Bookworm","Crafty","Cyclist","Drunken","Easter","EBook","Farmer","Gentleman","Judo","Moana","Painter","Grill","Pharoh","Pilot","Pinga","Pixie","Sailor","Santa","Tauch","Tux","ValentineO","Valentine","Wizard"]

  var corArray = []
  quiz.forEach(function(dq,iq){
    corArray.push(data.map(function(d,i){
      return corr(quiz[iq],quiz[i])
    })
  )})

  var screen={
  width : 800,
  height : 800
};
var margins = {
  top:10,
  bottom:200,
  left:10,
  right:100
};
var height = screen.width - margins.top - margins.bottom;
var width = screen.width - margins.left - margins.right;

var xScale = d3.scaleLinear()
                .domain([0,corArray.length])
                .range([0,width]);

var yScale = d3.scaleLinear()
              .domain([0, corArray.length])
              .range([height, 0]);

   var svg = d3.select('svg')
   .attr('width',screen.width)
   .attr('height',screen.height);

var plot = svg.append('g')
                .attr('width',width)
                .attr('hieght',height)




console.log(corArray)
corArray.forEach(function(d,i){
  plot.selectAll('rect'+i)
      .data(corArray[i])
      .enter()
      .append('rect')
      .attr('id',function(){return 'a'+i})
      .attr('x',function(da,ia){return 50+xScale(ia)})
      .attr('y', function(db,ib){return yScale(i)})
      .attr('height',function(){return 590/23})
      .attr('width',function(){return 690/corArray[0].length})
      .attr('fill', function(dc,ic){return d3.interpolateOranges(dc)})



})
}

var corr = function(x,y){
console.log(1/(x.length-1))
  var xDev = d3.deviation(x)
  var yDev = d3.deviation(y)
  var bot = xDev * yDev
  var  my = d3.mean(y)
  var  mx = d3.mean(x)
  var top = x.map(function(d,i){
    return (x[i]-mx)* (y[i] - my)
  })
  var topA = d3.sum(top)
  return (1/(x.length-1)) * (topA/bot)
}
