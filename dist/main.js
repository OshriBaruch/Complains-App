const renderer = new Renderer()
const compManager = new complainManager(renderer)

let company;

const handleSearch = async function(){
    let input = $("#search-input").val()
    console.log(input)
    company = input
    compManager.getDatafromDB(input)
}

const newComplain = function(company) {
    compManager.getForm(company)
}
