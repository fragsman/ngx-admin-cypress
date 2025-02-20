class AnimatedSearches{

    clickOnSearchButton(sectionName){
        cy.contains("nb-card-header",sectionName).siblings().eq(0).find("nb-search").click()
    }

    clickCloseButton(){
        cy.get("div.cdk-overlay-container").find("button.close-button").click()
    }

    triggerSearch(text, sectionName){

        cy.get("nb-search-field."+sectionName).find("input.search-input").type(text+'{enter}')
    }

    verifyPageLayoutToHaveClass(expectedClass){
        cy.wait(200)
        cy.get("ngx-app").find("nb-layout").eq(0).invoke("attr","class").then(attr =>{
            expect(attr).to.eq(expectedClass)
        })
    }
}

export const animatedSearches = new AnimatedSearches()