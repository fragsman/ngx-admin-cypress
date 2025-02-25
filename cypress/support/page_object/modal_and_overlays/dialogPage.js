class DialogPage{

    enterNameInDialog(name){
        cy.get("input[placeholder='Name']").type(name)
        cy.contains("button","Submit").click()
    }

    openDialog(dialogName){
        cy.contains("button",dialogName).click()
    }

    verifyDialogTitleIs(expectedText){
        cy.get("ngx-showcase-dialog").find("nb-card-header").should("contain.text", expectedText)
    }

    verifyDialog2TitleIs(expectedText){
        cy.get("nb-dialog-container").find("nb-card-header").should("contain.text", expectedText)
    }

    dismissDialog(){
        cy.contains("button","Dismiss Dialog").click()
    }

    closeDialog(){
        cy.contains("button","Close Dialog").click()
    }

    verifyDialogIsClosed(){
        cy.get("ngx-showcase-dialog").should("not.exist")
    }

    verifyDialog2IsClosed(){
        cy.get("nb-dialog-container").should("not.exist")
    }

    verifyNameAppears(expectedName){
        cy.get("nb-card-body.result-from-dialog").find("li").should("contain.text",expectedName)
    }
}

export const dialogPage = new DialogPage()