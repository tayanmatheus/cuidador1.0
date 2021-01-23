

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( state of states) {
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
      
        }

        
    })
}


populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( city of cities) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
      
        }

        citySelect.disabled = false

        
    })


}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// itens de servicos

const itemsToCollect = document.querySelectorAll(".items-grid li")
 
for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    // adicionar ou remover
    const itemLi = event.target
   
    itemLi.classList.toggle("selected")

     // verificar se existe itens selecionados
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex( item => item == itemId)

   if(alreadySelected >= 0 ) {
            // tirar da selecao

        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })


        selectedItems = filteredItems

   } else {

    selectedItems.push(itemId)


   }

   collectedItems.value = selectedItems

    
}
