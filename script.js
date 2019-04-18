dataP = d3.json('classData.json')
dataP.then(function(data){
  makePlot(data)
}
)

var makePlot = function(data){
    var quiz = data.map(function(d,i){return data[i].quizes.map(function(h){return h.grade})})
    var penArray=["Bookworm","Crafty","Cyclist","Drunken","Easter","EBook","Farmer","Gentleman","Judo","Moana","Painter","Grill","Pharoh","Pilot","Pinga","Pixie","Sailor","Santa","Tauch","Tux","ValentineO","Valentine","Wizard"]
    console.log(quiz)

}
