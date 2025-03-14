/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"
import { eCommercePage } from "../support/page_object/e_commerce/eCommercePage"

describe("E-commerce Tests", ()=>{

    beforeEach("Go to E-commerce section", ()=>{
        cy.openHomePage()
        navigationBar.goToECommerce()
    })

    it("Verify country change works in the graphical panel", ()=>{
        eCommercePage.selectSpain()
        eCommercePage.verifyCurrentCountryIs("Spain")
    })
})