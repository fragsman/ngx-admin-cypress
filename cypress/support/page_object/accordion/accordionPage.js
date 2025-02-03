class AccordionPage{

    clickToggleFirstItemButton(){
        cy.contains("Toggle First Item").click()
    }

    verifyAccordionIsVisually(accordionItem, status){
        cy.get("nb-accordion-item-header").contains(accordionItem).invoke("attr","class").then(attr =>{
            expect(attr).to.contain("accordion-item-header-"+status)
        })
    }

    verifyAccordionBodyContains(accordionItem, text){        
        cy.get("nb-accordion-item-header").contains(accordionItem).parent().find(".item-body").should("contain",text)
    }

    clickAccordionTitle(title){
        cy.contains("nb-accordion-item-header",title).parent().click()
    }
}

export const accordionPage = new AccordionPage()