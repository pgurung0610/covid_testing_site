
let inputs = 0
let testString = '12345'
const pools = []

let queryString = window.location.search
console.log(queryString)

let urlParams = new URLSearchParams(queryString)
console.log(urlParams)

let currentPoolBarcode = urlParams.get('poolBarcode')
console.log(currentPoolBarcode)

let testBarcodes = []

for(i = 1; i <= 100; i++){
    let currentTestBarcode = urlParams.get(`b${i}`)
    if(currentTestBarcode){
        console.log(currentTestBarcode)
        testBarcodes.push(currentTestBarcode)
    }
    
}

console.log(testBarcodes)

let newPool = {
    "poolBarcode" : currentPoolBarcode,
    "testBarcodes" : testBarcodes
}

pools.push(newPool)

//let query = url.parse(req.url, true).query
//let currentPoolBarcode = query.poolBarcode
//console.log(currentPoolBarcode)

for(i = 0; i < 0; i++){
    pools.push({
        "poolBarcode" : i,
        "testBarcodes" : ["111", "222", "333"]
    })
}

console.log(pools)

let poolsTable = document.getElementById('poolMappingTable')
for(i = 0; i < pools.length; i++){
    if(!pools[i].poolBarcode)
        continue

    let newTr = document.createElement('tr')

    let newTd1 = document.createElement('td')
    let newTd1Text = document.createTextNode(pools[i].poolBarcode)
    newTd1.appendChild(newTd1Text)

    let newTd2 = document.createElement('td') 
    let Td2String = ''
    for(j = 0; j < pools[i].testBarcodes.length; j++){
        Td2String += `${pools[i].testBarcodes[j]}`
        if(j != pools[i].testBarcodes.length - 1)
            Td2String += ', '

    }
    let newTd2Text = document.createTextNode(Td2String)
    newTd2.appendChild(newTd2Text)

    newTr.appendChild(newTd1)
    newTr.appendChild(newTd2)
    
    poolsTable.appendChild(newTr)
    

    
    // let newLI = document.createElement("li")
    
    // let newInput = document.createElement("input")
    // newInput.setAttribute("type", "text")
    // newInput.setAttribute("name", `b${inputs}`)

    // let newBtn = document.createElement("button")
    // let deleteTextNode = document.createTextNode("Delete")
    // newBtn.appendChild(deleteTextNode)
    // newBtn.addEventListener('click', (evt) => {
    //     evt.preventDefault()
    //     removeElement(newLI)
}

    
//     newLI.appendChild(newInput)
//     newLI.appendChild(newBtn)

//     var lst = document.getElementById("barcodesList")
//     lst.appendChild(newLI)
// }


function addRow() {
    inputs++

    let newLI = document.createElement("li")
    
    let newInput = document.createElement("input")
    newInput.setAttribute("type", "text")
    newInput.setAttribute("name", `b${inputs}`)

    let newBtn = document.createElement("button")
    let deleteTextNode = document.createTextNode("Delete")
    newBtn.appendChild(deleteTextNode)
    newBtn.addEventListener('click', (evt) => {
        evt.preventDefault()
        removeElement(newLI)
    })

    
    newLI.appendChild(newInput)
    newLI.appendChild(newBtn)

    var lst = document.getElementById("barcodesList")
    lst.appendChild(newLI)
//     var newPara = document.createElement("p");
// var content = document.createTextNode("This is a new paragraph.");
// newPara.appendChild(content);
// var divElem = document.getElementById("theDiv");
// divElem.appendChild(newPara);
}

for(i = 0; i < 2; i++)
    addRow()

function removeElement(element) {
    element.parentNode.removeChild(element)
}

document.getElementById("addRow").addEventListener('click', (evt)=>{
    evt.preventDefault()
    addRow()
})

//console.log(poolmap)