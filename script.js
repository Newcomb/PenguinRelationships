dataP = d3.json('classData.json')
dataP.then(function(data){
  makePlot(data)
}
)

var makePlot = function(data){
    var quiz = data.map(function(d,i){return data[i].quizes.map(function(h){return h.grade})})
    console.log(quiz)

}
