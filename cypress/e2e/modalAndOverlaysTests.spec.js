/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"
import { dialogPage } from "../support/page_object/modal_and_overlays/dialogPage";

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

describe("Dialog Tests", ()=>{

    beforeEach("Navigate to Dialog Page", ()=>{
        cy.openHomePage()
        navigationBar.goToDialog()
    })

    it("Verify Open Dialog with Component works correctly", ()=>{
        dialogPage.openDialog("Open Dialog with component")
        dialogPage.verifyDialogTitleIs("This is a title passed to the dialog component")
        dialogPage.dismissDialog()
        dialogPage.verifyDialogIsClosed()
    })

    it("Verify Open Without Backdrop dialog works correctly", ()=>{
        dialogPage.openDialog("Open Dialog without backdrop")
        dialogPage.verifyDialog2TitleIs("Template Dialog")
        dialogPage.closeDialog()
        dialogPage.verifyDialog2IsClosed()
    })

    it("Verify Esc dialog closes with Esc key", ()=>{
        dialogPage.openDialog("Open Dialog with esc close")
        cy.get('body').type('{esc}')
        dialogPage.verifyDialog2IsClosed()
    })

    it("Verify return result from Dialog works", ()=>{
        dialogPage.openDialog("Enter Name")
        dialogPage.enterNameInDialog("Fede")
        dialogPage.verifyNameAppears("Fede")
    })
})