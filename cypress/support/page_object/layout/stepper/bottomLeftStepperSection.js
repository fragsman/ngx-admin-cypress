class BottomLeftStepperSection{

    verifyStepStatusIs(stepIndex,status){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).invoke("attr","class").then(attr=>{
                expect(attr).to.contain(status)
            })
        })
    }

    verifyStepStatusIsNot(stepIndex,status){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).invoke("attr","class").then(attr=>{
                expect(attr).to.not.contain(status)
            })
        })
    }

    clickOnNextButton(){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("button").contains("next").click() 
        })
    }

    clickOnPrevButton(){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("button").contains("prev").click() 
        })
    }

    clickOnStep(stepIndex){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).click()
        })
    }

    verifyInputPlaceholderIs(placeholderText){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("input").then(input =>{
                cy.wrap(input).invoke("attr","placeholder").should("eq",placeholderText)
            })
        })
    }

    writeOnInput(text){
        cy.get("nb-stepper").eq(1).then(stepper =>{
            cy.wrap(stepper).find("input").then(input =>{
                cy.wrap(input).type(text)
            })
        })
    }
    
}

export const bottomLeftStepperSection= new BottomLeftStepperSection()