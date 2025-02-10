class TabsPage{

    selectSimplePanelTab(tabName){
        cy.contains("a",tabName).click()
    }

    selectRoutePanelTab(tabName){
        cy.contains("span",tabName).parent().click()
    }

    selectWitdhPanelTab(tabName){
        cy.contains("span",tabName).parent().click()
    }

    verifySimplePanelTabContains(tabName, expectedText){
        if(tabName == "Simple Tab #1")
            cy.get("nb-tab[tabtitle='"+tabName+"']").find("p").should("contain",expectedText)
        else
            cy.get("nb-tab[tabtitle='"+tabName+"']").find("span").should("contain",expectedText)
    }

    verifyRoutePanelTabContains(tabNumber, expectedText){
        cy.get("ngx-tab"+tabNumber).find("p").should("contain",expectedText)
    }

    verifyWidthPanelContentIsActiveFor(tabNumber){
        cy.get("ngx-tabs div div").eq(2).find("li").eq(tabNumber).invoke("attr","class").then(classAttr=>{
            expect(classAttr).contains("active")
        })
    }
}

export const tabsPage = new TabsPage()