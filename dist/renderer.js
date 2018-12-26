class Renderer {
    renderCompany(companyData) {
        $("#mainData").empty();
        let source = $('#company-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template(companyData);
        $('#mainData').append(newHTML);
    }

    renderComplain(complainData) {
        $("#mainComplain").empty();
        const source = $('#complain-template').html();
        let template = Handlebars.compile(source);
        let newHTML = template({complainData});
        $("#mainComplain").append(newHTML);
    }
 }