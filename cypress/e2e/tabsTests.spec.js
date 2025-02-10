/// <reference types="cypress"/>
import { navigationBar } from "../support/page_object/navigationPage"
import { tabsPage } from "../support/page_object/layout/tabsPage"

describe("This suite will contain Tab tests", ()=>{
    
    beforeEach("Navigate to List Page", ()=>{
        cy.visit("/")
        navigationBar.goToTabs()
    })

    it("Verify simple tabs changes correctly", ()=>{
        let originalTab = "Simple Tab #1"
        let tabToChange = "Simple Tab #2"
        tabsPage.verifySimplePanelTabContains(originalTab,"In 1975, the first general purpose home automation network technology, X10, was developed")
        tabsPage.selectSimplePanelTab(tabToChange)
        tabsPage.verifySimplePanelTabContains(tabToChange,"Content #2")
    })

    it("Verify route tabs changes correctly", ()=>{
        let originalTabNumber = "1"
        let tabNameToChange = "Route tab #2"
        let tabNumberToChange = "2"
        tabsPage.verifyRoutePanelTabContains(originalTabNumber, "Early home automation began with labor-saving machines")
        tabsPage.selectRoutePanelTab(tabNameToChange)
        tabsPage.verifyRoutePanelTabContains(tabNumberToChange, "Tab 2 works!")
    })

    it("Verify witdth tabs changes correctly",()=>{
        //In this test I won't direclty verify the content since the page has it always there I will only verify the panel is active (being shown to the user)
        let originalTabNumer = "0"
        let tabNumberToChange = "1"
        let tabNameToChange = "Full width tab #2"
        tabsPage.verifyWidthPanelContentIsActiveFor(originalTabNumer)
        tabsPage.selectWitdhPanelTab(tabNameToChange)
        tabsPage.verifyWidthPanelContentIsActiveFor(tabNumberToChange)
        
    })
})