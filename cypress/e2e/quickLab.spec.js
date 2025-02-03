/// <reference types="cypress" />

import { navigationBar } from "../support/page_object/navigationPage"

describe("This suite will contain random things for quick try", ()=>{

    it("Get some element and save it into an aliased object", ()=>{
        cy.openHomePage()
        navigationBar.goToformLayouts()
        cy.get("nb-card").contains("Using the Grid").as("usingTheGrid")
        cy.get("@usingTheGrid").invoke("text").then(text =>{
            cy.wrap(text).should("eq","Using the Grid")
        })
    })

    it("Try to use the previously generated alias", ()=>{
        cy.openHomePage()
        navigationBar.goToformLayouts()
        //Trying to reuse the alias above, this WILL FAIL
        cy.get("@usingTheGrid").should("eq","Using the Grid")
    })

    it.skip("List and dropdown", ()=>{ 
        //This test is broken. The web doesn't have RGB anymore, it shows RGBA and I currently don't know how to fix it. 
        cy.visit("/");
        cy.get("div.header-container").find("button.select-button").click()
        cy.get("ul nb-option").each(option => {
            let optionTxt = option.text().trim();
            cy.wrap(option).click();
            let propiedades = {
                "Light" : { "color" : "rgb(255, 255, 255)",
                            "theme" : "nb-theme-default" },
                "Dark" : { "color" : "rgb(34, 43, 69)",
                            "theme" : "nb-theme-dark" },
                "Cosmic" : { "color" : "rgb(50, 50, 89)",
                            "theme" : "nb-theme-cosmic" },
                "Corporate" : { "color" : "rgb(255, 255, 255)",
                            "theme" : "nb-theme-corporate" },
            }
            cy.get("nb-layout-header nav").should("have.css","border-bottom-color",propiedades[optionTxt].color)
            cy.get("body").invoke("attr", "class").then(attr =>{
                expect(attr).to.contain(propiedades[optionTxt].theme);
            })
            cy.get("button.select-button").click();
        })
    })
})