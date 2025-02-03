/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"
import { topStepperSection } from "../support/page_object/stepper/topStepperSection"
import { bottomLeftStepperSection } from "../support/page_object/stepper/bottomLeftStepperSection"
import { bottomRightStepperSection } from "../support/page_object/stepper/bottomRightStepperSection"

describe("This suite will contain Top Stepper Tests", ()=>{

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

describe("This suite will contain Bottom Left Stepper Tests", ()=>{
    
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

describe("This suite will contain Bottom Right Stepper Tests", ()=>{
    
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