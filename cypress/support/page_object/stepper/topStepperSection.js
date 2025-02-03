class TopStepperSection{

    verifyStepStatusIs(stepIndex,status){
        cy.get("nb-stepper").eq(0).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).invoke("attr","class").then(attr=>{
                expect(attr).to.contain(status)
            })
        })
    }

    verifyStepStatusIsNot(stepIndex,status){
        cy.get("nb-stepper").eq(0).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).invoke("attr","class").then(attr=>{
                expect(attr).to.not.contain(status)
            })
        })
    }

    clickOnNextButton(){
        cy.get("nb-stepper").eq(0).then(stepper =>{
            cy.wrap(stepper).find("button").contains("next").click() 
        })
    }

    clickOnPrevButton(){
        cy.get("nb-stepper").eq(0).then(stepper =>{
            cy.wrap(stepper).find("button").contains("prev").click() 
        })
    }

    clickOnStep(stepIndex){
        cy.get("nb-stepper").eq(0).then(stepper =>{
            cy.wrap(stepper).find("div.step").eq(stepIndex).click()
        })
    }
}

export const topStepperSection= new TopStepperSection()