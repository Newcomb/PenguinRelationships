dataP = d3.json('classData.json')
dataP.then(function(data){
  makePlot(data)
}
)

var makePlot = function(data){

  var quiz = data.map(function(d,i){return data[i].quizes.map(function(h){return h.grade})})

var pics = data.map(function(d,i){return data[i].picture})
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
                .attr('hieght',height);

svg.selectAll('image')
    .data(pics)
    .enter()
    .append('image')
    .attr("xlink:href", function(d,i){return d})
    .attr('x', xScale(.01))
    .attr('y', function(d,i){return yScale(i)-5})
    .attr('width',40)
    .attr('height',35)
    .on('mouseover', function(d,i){console.log('a'+i);console.log(d3.select("#a"+i).attr('id'));
  if (d3.select("#a"+i).attr('id') == 'a'+i){data.forEach(function(da,ia){if (d3.select("#a"+i).attr('id') != 'a'+ia)
    svg.selectAll("#a"+ia).classed("hidden",true)})}})
    .on('mouseout',function(d,i){data.forEach(function(db,ib){svg.selectAll("#a"+ib).classed("hidden",false)})});;

svg.selectAll('image1')
    .data(pics)
    .enter()
    .append('image')
    .attr("xlink:href", function(d,i){return d})
    .attr('y', yScale(-1.5))
    .attr('x', function(d,i){return xScale(i)+45})
    .attr('width',40)
    .attr('height',35)


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
      .on('mouseover',function(dm,im){
        plot.append('text')
      .attr('id','tooltip')
      .attr('x', function(dt,it){return 40 + 690/corArray[0].length + xScale(im)})
      .attr('y',function(){return yScale(i)+20})
      .attr('text-anchor','middle')
      .attr('font-size','16px')
      .attr('fill',function(){if (dm > .9){return 'white'}
                              else{return'black'}})
      .attr('pointer-events','none')
      // .text(function(){if (dm > .9){return "Excellent: "+Math.round(100*dm)+'%'}
      //                   if (dm >= .7){return "Acceptable: "+Math.round(100*dm)+'%'}
      //                   else{return "Needs Help: " + Math.round(100*dm)+'%'}
      .text(dm.toFixed(2))
})
.on('mouseout',function(d){
  d3.select('#tooltip')
    .remove();
})

var colors = [0,.2,.4,.6,.8,1]


var legendL = svg.selectAll('rectC2')
              .data(colors)
              .enter()
              .append('rect')
              .attr('x', function(d,i){return 745})
              .attr('y',function(d,i){return yScale(i+8)})
              .attr('fill',function(d,i){return d3.interpolateOranges((d))})
              .attr('height',20)
              .attr('width',20);
              colors.forEach(function(db,ib){
                plot.append('text')
                    .attr('x', function(){return 783})
                    .attr('y',function(){return yScale(ib+7.5)})
                    .attr('text-anchor','middle')
                    .attr('font-size','16px')
                    .attr('fill','black')
                    .attr('pointer-events','none')
                    .text(function(){return db})
              })

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
