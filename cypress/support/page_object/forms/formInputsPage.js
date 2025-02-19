class FormInputsPage{

    verifyStatusesInputHaveProperBorderColor(inputStatus, color){
        cy.get("input[status='"+inputStatus+"']").then(input =>{
            expect(input).to.have.css("border-left-color",color)
        })
    }
}

export const formInputsPage = new FormInputsPage()