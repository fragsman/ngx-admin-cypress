/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"

describe("Smart Table tests", ()=>{
    beforeEach("navig", ()=>{
        cy.visit("/");
        navigationBar.goToSmartTable()
    })

    it("Change Larry's age and verify it afterwards", ()=>{
        cy.get("[placeholder='First Name']").type("Larry")
        //wait for filter to be applied and work with that row
        cy.get("tbody tr").should("have.length","1").then(tRow =>{ 
            cy.wrap(tRow.find("a .nb-edit")).click() //here i use jquery, in the rest i cant because those elements were updated and don't exist anymore within the tRow element
            cy.wrap(tRow).find("[placeholder='Age']").clear().type("15")
            cy.wrap(tRow).find("a .nb-checkmark").click()
            cy.wrap(tRow).find("div.ng-star-inserted").eq(5).invoke("text").then(txt=>{
                expect(txt).to.eq("15")
            })
        })
    });

    it("Verify filter in the table", ()=>{
        cy.get("[placeholder='Age']").type("20")
        cy.wait(500)
        cy.get("tbody").find("tr").each(tRows =>{
            cy.wrap(tRows).find("td").eq(6).invoke("text").then(cellText=>{
                expect(cellText).to.eq("20")
            })
        })
    })

    it("Work with an alert box from the browser",()=>{
        cy.get("tbody").find("tr").then(tRow =>{
            let rowToWorkWith = tRow.eq(0)
            let rowId = rowToWorkWith.find("td div.ng-star-inserted").eq(0).text()
            cy.wrap(rowToWorkWith).find("i.nb-trash").click()
            cy.on("window:confirm", ()=> true) //por defecto en Cypress acepta el Alert
            //cy.on("window:confirm", ()=> true) cancela el Alert

            cy.get("tbody").find("tr").then(tRowUpdated =>{
                expect(tRowUpdated.find("td div.ng-star-inserted").eq(0).text()).to.not.eq(rowId)
            })
        })
    })
});