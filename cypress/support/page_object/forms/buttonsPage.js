class ButtonsPage{

    verifyButtonToHaveBackgroundColor(section, buttonName, backgroundColor){
        cy.contains("nb-card-header",section).parent().find("button[ng-reflect-status='"+buttonName+"']").then(button =>{
            expect(button).to.have.css("background-color",backgroundColor)
        })
    }

    hoverOnButton(section, buttonName){
        cy.contains("nb-card-header",section).parent().find("button[ng-reflect-status='"+buttonName+"']").trigger('mouseenter')
    }
}

export const buttonsPage = new ButtonsPage()