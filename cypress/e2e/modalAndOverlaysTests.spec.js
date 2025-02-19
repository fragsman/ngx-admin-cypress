/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"

describe("Toastr tests", ()=>{
    it("Testing checkboxes", ()=>{
        cy.visit("/");
        navigationBar.goToToastr()

        cy.get("[type='checkbox']").then(checkboxes =>{
            cy.wrap(checkboxes).eq(0).click({force: true}).should("not.be.checked");
            //if I use check and the checkbox is checked it will remain checked. It will NOT toggle.
            //check only works with elements type='checkbox' or type='radio'
        });
    });
});

describe("Tooltip tests", ()=>{
    it("a ver a ver", ()=>{
        cy.visit("/")
        navigationBar.goToTooltip()

        cy.contains("nb-card","Tooltip With Icon").then(section =>{
            cy.wrap(section).contains("Show Tooltip").click()
            cy.get("nb-tooltip").invoke("text").then(txt =>{
                expect(txt).to.eq("This is a tooltip")
            })
        })
    })
})