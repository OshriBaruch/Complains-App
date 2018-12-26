class complainManager {
    constructor(render) {
        this.render=render
        this.company = {}
        this.complain = []
 
    }
    async getDatafromDB(companyName) {
        let getData = await $.get(`/Company/${companyName}`)
        if (!(getData === "not Found")) {
            this.company = {
                companyName: getData[0].companyName,
                companyDomain: getData[0].companyDomain,
                companyLogo: getData[0].companyLogo,
            }
            getData.forEach(g =>this.complain.push(g.complains[0]))
            this.render.renderCompany(this.company)
            renderer.renderComplain(this.complain)
        } else {console.log("doing find data") }
    }
    async getForm(companyName) {
        let getData = await $.get(`/APIReq/${companyName}`)
        if (!(getData === "not Found")) {
            this.company = {
                companyName: getData[0].companyName,
                companyDomain: getData[0].companyDomain,
                companyLogo: getData[0].companyLogo,
            }
            getData.forEach(g =>this.complain.push(g.complains[0]))
            this.render.renderCompany(this.company)
            renderer.renderComplain(this.complain)
        } else { console.log("doing find data") }
 
 
    }
 }