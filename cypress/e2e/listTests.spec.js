/// <reference types="cypress"/>
import { navigationBar } from "../support/page_object/navigationPage"
import { listPage } from "../support/page_object/layout/listPage"

describe("This suite will contain tests for List page", ()=>{

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