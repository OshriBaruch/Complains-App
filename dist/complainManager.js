class complainManager {
    constructor() {
        this.company = []

    }

    async getDatafromDB() {
        let getData = await $.get(`/Company/${companyName}`)
        if (getData === "not Found") {
            let details = await $.get(`/APIReq/${companyName}`)
            renderer.gtf(details)
        } else
            this.company.push(getData)
    }
    async getForm(data) {

    }
}