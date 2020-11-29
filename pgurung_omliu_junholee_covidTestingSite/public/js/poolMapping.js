let inputs = 0

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

