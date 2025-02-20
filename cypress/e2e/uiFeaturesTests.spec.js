/// <reference types="cypress"/>
import { navigationBar } from "../support/page_object/navigationPage"
import { animatedSearches } from "../support/page_object/ui_features/animatedSearchesPage"

describe("Animated Searches tests", ()=>{

    beforeEach("Enter app and go to Animated Searches page",()=>{
        cy.openHomePage()
        navigationBar.goToAnimatedSearches()
    })

    it("Verify Layout rotate search works properly", ()=>{
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll")

        animatedSearches.clickOnSearchButton("Layout Rotate Search")
        let sectionClass = "rotate-layout"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Modal Zoomin Search")
        sectionClass = "modal-zoomin"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Modal Move Search")
        sectionClass = "modal-move"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Modal Drop Search")
        sectionClass = "modal-drop"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Modal Half Search")
        sectionClass = "modal-half"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Curtain Search")
        sectionClass = "curtain"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)

        animatedSearches.clickOnSearchButton("Column Curtain Search")
        sectionClass = "column-curtain"
        animatedSearches.verifyPageLayoutToHaveClass("window-mode with-scroll "+sectionClass+" with-search")
        animatedSearches.triggerSearch("Alexa",sectionClass)
    })

})