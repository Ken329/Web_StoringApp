var btn = document.getElementById('body_button')
var fillCon = document.getElementById('fill_container')
var infoCon = document.getElementById('info_container')

function fill(){
    btn.style.left = "0"
    fillCon.style.display = 'block'
    infoCon.style.display = 'none'
}
function info(){
    btn.style.left = "150px"
    infoCon.style.display = 'block'
    fillCon.style.display = 'none'
}
// get all info from database
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getInfoData')
    .then(response => response.json())
    .then(data => loadedInfoHtml(data['data']))
})
function loadedInfoHtml(data){
    const table = document.getElementById('info_tbody')

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>"
        return
    }

    let tableHtml = ""
    data.forEach(function({id, first_name, last_name, age, kg, height}){
        tableHtml += "<tr>"
        tableHtml += `<td>${id}</td>`
        tableHtml += `<td>${first_name}</td>`
        tableHtml += `<td>${last_name}</td>`
        tableHtml += `<td>${age}</td>`
        tableHtml += `<td>${kg}</td>`
        tableHtml += `<td>${height}</td>`
        tableHtml += "</td>"
    })
    table.innerHTML = tableHtml
}