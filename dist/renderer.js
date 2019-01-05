class Renderer {
    renderStuff(a,b,c){
        $(a).empty();
        let source = $(b).html();
        let template = Handlebars.compile(source);
        let newHTML = template(c);
        $(a).append(newHTML)
    }
    renderCompany(companyData) {
        $("#companyForm").empty();
        this.renderStuff("#mainData",'#company-template',companyData)
    }
    renderComplain(complainData) {
        $(".numOfComp").append(complainData.length+" Complains");
        this.renderStuff("#mainComplain",'#complain-template',{complainData})
    }
    renderCompanyForm() {
        $("#mainData").empty();
        this.renderStuff("#companyForm",'#CompanyForm-template',{})
    }
    renderComplainForm() {
        this.renderStuff("#complainForm",'#ComplainForm-template',{})
    }
    renderFooter(getData) {
        this.renderStuff(".footer",'#footer-template',{getData})
    }
 }