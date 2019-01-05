class complainManager {
    constructor(render) {
        this.render = render
        this.company = {}
        this.complain = []
    }
    async getDatafromDB(companyName) {
        companyName = this.toUpperFunc(companyName)
        this.company = {}
        this.complain = []
        let getData = await $.get(`/Company/${companyName}`)
        if (getData.length > 0) {
            this.company = {
                companyName: getData[0].companyName,
                companyDomain: getData[0].companyDomain,
                companyLogo: getData[0].companyLogo,
            }
            getData.forEach(g => this.complain.push({
                name: g.complains[0].user.name,
                title: g.complains[0].title,
                date: g.complains[0].date,
                text: g.complains[0].text
            }))
            this.render.renderCompany(this.company)
            this.render.renderComplain(this.complain)
            this.render.renderComplainForm()
            return true
        } else {
            return false
        }
    }
    async getForm(companyName) {
        companyName = this.toUpperFunc(companyName)
        this.company = {}
        this.complain = []
        let getData = await $.get(`/APIReq/${companyName}`)
        if (getData == "not found") {
            this.render.renderCompanyForm()
            this.render.renderComplain(this.complain)
            this.render.renderComplainForm()
        } else {
            this.company = {
                companyName: getData.name,
                companyDomain: getData.domain,
                companyLogo: getData.logo,
                updated: getData.updated,
            }
            this.render.renderCompany(this.company)
            this.render.renderComplain(this.complain)
            this.render.renderComplainForm()
        }
    }
    async saveFormData(companyOBJ) {
        for (let key in companyOBJ) { key = this.toUpperFunc(key) }
        await $.post(`company`, companyOBJ, (response) => { })
        let getData = await $.get(`/Company/${companyOBJ.companyName}`)
        this.company = {
            companyName: getData[0].companyName,
            companyDomain: getData[0].companyDomain,
            companyLogo: getData[0].companyLogo,
        }
        getData.forEach(g => this.complain.push({
            name: g.complains[0].user.name,
            title: g.complains[0].title,
            date: g.complains[0].date,
            text: g.complains[0].text
        }))
        this.render.renderCompany(this.company)
        this.render.renderComplain(this.complain.reverse())
        this.render.renderComplainForm()
    }
    async getFooterfromDB() {
        let getData = await $.get(`/CompanyFooter/`)
        this.render.renderFooter(getData)
    }
    toUpperFunc(str) {
        let res = str.split(" ");
        let arr = "";
        res.forEach(re => { 
            re = re.split("-"); 
            re.forEach(r => arr += `${r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()} `) 
        })
        return (arr)
    }
}
