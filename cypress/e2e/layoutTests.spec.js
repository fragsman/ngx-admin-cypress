/// <reference types="cypress"/>

import { navigationBar } from "../support/page_object/navigationPage"
import { topStepperSection } from "../support/page_object/layout/stepper/topStepperSection"
import { bottomLeftStepperSection } from "../support/page_object/layout/stepper/bottomLeftStepperSection"
import { bottomRightStepperSection } from "../support/page_object/layout/stepper/bottomRightStepperSection"
import { listPage } from "../support/page_object/layout/listPage"
import { accordionPage } from "../support/page_object/layout/accordionPage"
import { tabsPage } from "../support/page_object/layout/tabsPage"

describe("Top Stepper Tests", ()=>{

    beforeEach("Enter the website", ()=>{
        cy.visit("/")        
        navigationBar.goToStepper()
    })

    it("Verify stepper is working correctly using the Next button", ()=>{
        topStepperSection.verifyStepStatusIs(0,"selected")
        topStepperSection.verifyStepStatusIsNot(1,"selected")
    
        topStepperSection.clickOnNextButton() //Increase step using Next button     

        topStepperSection.verifyStepStatusIs(0,"completed")
        topStepperSection.verifyStepStatusIs(1,"selected")
    })

    it("Verify stepper is working correctly using the clickable Step", ()=>{
        topStepperSection.verifyStepStatusIs(0,"selected")
        topStepperSection.verifyStepStatusIsNot(1,"selected")
 
        topStepperSection.clickOnStep(1)//Increase step using Step 2 element

        topStepperSection.verifyStepStatusIs(0,"completed")
        topStepperSection.verifyStepStatusIs(1,"selected")
    })

    it("Verify stepper is working correctly using Prev button", ()=>{
        topStepperSection.clickOnNextButton() //Increase step using Next button
        topStepperSection.clickOnPrevButton() //Decrease step using Prev button

        topStepperSection.verifyStepStatusIs(0,"selected")
        topStepperSection.verifyStepStatusIs(1,"completed")
    })
})

describe("Bottom Left Stepper Tests", ()=>{
    
    beforeEach("Enter the website", ()=>{
        cy.visit("/")        
        navigationBar.goToStepper()
    })
    
    it("Verify stepper is working correctly", ()=>{
        bottomLeftStepperSection.verifyStepStatusIs(0,"selected")
        bottomLeftStepperSection.verifyStepStatusIsNot(1,"selected")

        bottomLeftStepperSection.verifyInputPlaceholderIs("Enter your name")
        bottomLeftStepperSection.writeOnInput("Federico Pantaleone")
        bottomLeftStepperSection.clickOnNextButton()

        bottomLeftStepperSection.verifyStepStatusIs(0,"completed")
        bottomLeftStepperSection.verifyStepStatusIs(1,"selected")

        bottomLeftStepperSection.verifyInputPlaceholderIs("Enter favorite movie")
    })
})

describe("Bottom Right Stepper Tests", ()=>{
    
    beforeEach("Enter the website", ()=>{
        cy.visit("/")        
        navigationBar.goToStepper()
    })
    
    it("Verify stepper is working correctly", ()=>{
        bottomRightStepperSection.verifyStepStatusIs(0,"selected")
        bottomRightStepperSection.verifyStepStatusIsNot(1,"selected")

        bottomRightStepperSection.verifyParagraphContains("Proin varius accumsan semper")
        bottomRightStepperSection.clickOnNextButton()

        bottomRightStepperSection.verifyStepStatusIs(0,"completed")
        bottomRightStepperSection.verifyStepStatusIs(1,"selected")

        bottomRightStepperSection.verifyParagraphContains("Curabitur luctus mattis risus nec condimentum")
    })
})

describe("List tests", ()=>{
    let fruitList = ["Lemons", "Raspberries", "Strawberries", "Blackberries", "Kiwis", "Grapefruit", "Avocado", "Watermelon", "Cantaloupe", "Oranges", "Peaches"]

    beforeEach("Navigate to List Page", ()=>{
        cy.visit("/")
    })

    it("Verify the fruit list is correct", ()=>{
        navigationBar.goToList()
        let index = 0
         cy.get("nb-card-header").contains("Some Fruits").siblings().eq(0).find("nb-list-item").each(fruit =>{
            cy.wrap(fruit).should("contain", fruitList[index])
            index++
         })
    })

    it("Scroll through list and verify last item", ()=>{
        navigationBar.goToList()
        listPage.scrollTheListOfUsers("bottom")
        cy.get("nb-card-header").contains("Users").siblings().eq(0).find("nb-list-item").then(users=>{
            cy.wrap(users).last().should("contain", "Ben Sullivan")
        })
    })

    it("Verify visibility using scrolling techniques", ()=>{
        navigationBar.goToInfiniteList()
        // Scroll and verify items on the left panel (this one might fail if text size changes because we are using pixels)
        cy.contains("nb-card","Own Scroll").find("nb-list-item").eq(3).should("not.be.visible")
        listPage.scrollLeftPanel(0,700)
        cy.contains("nb-card","Own Scroll").find("nb-list-item").eq(3).should("be.visible")
        
        // Scroll the whole page and verify items on right panel
        cy.contains("nb-card","Window Scroll").find("nb-list-item").eq(5).should("not.be.visible")
        cy.contains("nb-card","Window Scroll").find("nb-list-item").eq(5).scrollIntoView()
        cy.contains("nb-card","Window Scroll").find("nb-list-item").eq(5).should("be.visible")
    })
})

describe("Accordion tests", ()=>{
    
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

describe("Tab tests", ()=>{
    
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