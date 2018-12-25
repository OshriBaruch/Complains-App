class Renderer {
    constructor(){
    }
    renderData(allCompanyDaa) {
        console.log(allCompanyDaa)
        $(".main").empty();
        const source = $('#weather-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({allCityData});
        $("#results-container").append(newHTML);
    }
}