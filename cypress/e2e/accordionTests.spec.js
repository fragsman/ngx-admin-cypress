/// <reference types="cypress"/>
import { navigationBar } from "../support/page_object/navigationPage"
import { accordionPage } from "../support/page_object/accordion/accordionPage"

describe("This suite will contain tests for accordion section", ()=>{
    
    beforeEach("Log in to the website", ()=>{
        cy.visit("/")
        navigationBar.goToAccordion()
    })

    it("Verify toggle accordion button is expanding the accordion", ()=>{
        accordionPage.verifyAccordionIsVisually("Product Details","collapsed")
        accordionPage.clickToggleFirstItemButton()
        accordionPage.verifyAccordionIsVisually("Product Details","expanded")
        accordionPage.verifyAccordionBodyContains("Product Details","A nebula is an interstellar cloud of dust")
    })

    it("Verify accordion item expands itself using the item title", ()=>{
        accordionPage.clickAccordionTitle("Edit")
        accordionPage.verifyAccordionIsVisually("Edit","expanded")
        accordionPage.verifyAccordionBodyContains("Edit","A nebula is an interstellar cloud of dust")
    })
})