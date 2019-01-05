const renderer = new Renderer()
const compManager = new complainManager(renderer)

compManager.getFooterfromDB()
const handleSearch = async () => {
   let input = $("#search-input").val()
   let inDB = await compManager.getDatafromDB(input)
   if (!inDB) {
      alert("No appropriate company will need to fill out a complaint and a new company")
      $("#mainData").empty()
      $("#mainData").append(`<button class='getForm' onclick="createNewForm()">Submit just for Record</button>`);
   }
}
const createNewForm = async () => {
   $(".getForm").empty()
   await compManager.getForm($("#search-input").val())
}
$( "body" ).on("click",".compName",async function() {
   await compManager.getDatafromDB($(this).attr("id"))
})
$("body").on("click", ".sendNewComplain",async () =>{
   let sliceHref = $('.company-Domain').attr("href")
   sliceHref ? sliceHref.slice(7) : null
   let formData = {
      userName : $('.userName').val(),
      userEmail : $('.userEmail').val(),
      complainsTitle : $('.complainTitle').val(),
      complainsText : $('.complainText').val(),
      companyName : $('.companyName').val()||$('.compNAME').text(),
      companyDomain : $('.companyDomain').val()||sliceHref,
      companyLogo : $("#company-logo").attr("src")||"./imgs/logo.png"
   }
   await compManager.saveFormData(formData)
})