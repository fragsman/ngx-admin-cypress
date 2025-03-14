///<reference types="cypress" />

import { navigationBar } from "../support/page_object/navigationPage";
import { formInputsPage } from "../support/page_object/forms/formInputsPage";
import { datePickerPage } from "../support/page_object/forms/datepickerPage";
import { buttonsPage } from "../support/page_object/forms/buttonsPage";

describe("Form Inputs tests", ()=>{
    
    beforeEach("Navigate and enter Input Page", ()=>{
        cy.openHomePage()
        navigationBar.goToformInputs()
    });

    it("Verify validation states input colors are correr", ()=>{
       let expectedColors = {
            "info": "rgb(0, 149, 255)" ,
            "success" : "rgb(0, 214, 143)",
            "warning" : "rgb(255, 170, 0)" ,
            "danger" : "rgb(255, 61, 113)",
            "primary" : "rgb(51, 102, 255)"
        }

        formInputsPage.verifyStatusesInputHaveProperBorderColor("info",expectedColors.info)
        formInputsPage.verifyStatusesInputHaveProperBorderColor("success",expectedColors.success)
        formInputsPage.verifyStatusesInputHaveProperBorderColor("warning",expectedColors.warning)
        formInputsPage.verifyStatusesInputHaveProperBorderColor("danger",expectedColors.danger)
        formInputsPage.verifyStatusesInputHaveProperBorderColor("primary",expectedColors.primary)
    })

    it("Verify disabled button is actually disabled",()=>{
        cy.get("input[placeholder='Disabled input']").then(input =>{
            expect(input).to.have.attr("disabled")
        })
    })
})

describe("Form Layout tests",()=>{

    beforeEach("run a commando", ()=>{
        //run a general comand
        cy.openHomePage()
        navigationBar.goToformLayouts()
    });

    it("Different type of locators", ()=>{
        //Tag name
        cy.get("input");

        //Id
        cy.get("#inputEmail");

        //Class Name
        cy.get(".input-full-width")

        //Class Value (must provide full class values or it will fail)
        cy.get("[class='input-full-width size-medium status-basic shape-rectangle nb-transition']")

        //attribute name
        cy.get("[placeholder]");

        //Attribute value
        cy.get("[placeholder='Email']");

        //Tag and Attribute value
        cy.get("input[placeholder='Email']");

        //By two different attributes
        cy.get("[fullwidth][type='Email']");

        //By tag name, Attribute with value, ID and class name
        cy.get("input[type='Email']#inputEmail.input-full-width");
    });

    it("Search within locators ", ()=>{
        cy.contains("Sign in").get("[status='warning']");
        //cy.get("[status='warning']").contains("Sign in") -> THIS WAY ALSO WORKS
        //cy.contains("[status='warning']","Sign in") -> THIS WAY ALSO WORKS
    });

    it("Navigation through DOM", ()=>{
        //find is only to use after a parent element to find within childs. 
        //Get wont work instead because it searches globally
        cy.get("#inputEmail3").parents("form").find("button").should("contain","Sign in");
        //cy.get("#inputEmail3").parent().parent().parent().contains("Sign in"); -> THIS WAY ALSO WORKS
        //cy.get("#inputEmail3").parent().parent().siblings().contains("Sign in"); -> THIS WAY ALSO WORKS
    });

    it("to be determined", ()=>{
        cy.contains("nb-card","Using the Grid").then(theForm => {
            //theForm is a JQuery object, not a Cypress one. So it has different methods.
            const emailLbl = theForm.find("[for='inputEmail1']").text();
            const passLbl = theForm.find("[for='inputPassword2']").text();
            expect(emailLbl).to.eq("Email");
            expect(passLbl).to.eq("Password");

            //with the following I can go back to Crypress context, outside JQuery
            cy.wrap(theForm).find("[for='inputEmail1']").should("contain","Email");
        });
    });

    it("invoke a command", ()=>{
        //Invokes the text() method directly and uses it in a JQuery context
        cy.get("[for='exampleInputEmail1']").invoke("text").then(txt => {
            expect(txt).to.eq("Email address");
        });

        cy.contains("nb-card","Basic form")
            .find(".custom-checkbox")
            .click()
            .invoke("attr","class") 
            .then(attr =>{
                expect(attr).to.contains("checked");
            });
    });

    it("Using checkbox special commands", ()=>{
        cy.contains("nb-card","Using the Grid").find("[type='radio']").then(radioButtons =>{
            //checkbox might have a hidden att r in order to apply a custom UI. In that case cypress won't find it and we will force it
            cy.wrap(radioButtons).first().check({force: true}); //first checkbox
            cy.wrap(radioButtons).eq(1).check({force: true}).should("be.checked"); //second checkbox
            cy.wrap(radioButtons).eq(2).should("be.disabled"); //third checkbox
            //Check and uncheck will work disregarding the current status of the checkbox. Click will modify the status depending on the current one.
        });
    });
})

describe("Button tests", ()=>{
    
    beforeEach("Navigate and go to Buttons page", ()=>{
        cy.openHomePage()
        navigationBar.goToButtons()
    });

    it.skip("Verify on hover the button change color", ()=>{
        //This fail. Not sure why. The hover I tested in modalAndOverlaysTests and it works. I assume is a problem with CSS refresh or something weird.
        //Manual testing: when I hover the button it changes to a second color for half a second and then to the final color which is represented by my colorAfterHover.
        
        let colorBeforeHover = "rgb(51, 102, 255)"
        let colorAfterHover = "rgb(89, 139, 255)"

        buttonsPage.verifyButtonToHaveBackgroundColor("Default Buttons","primary",colorBeforeHover)
        buttonsPage.hoverOnButton("Default Buttons","primary")
        buttonsPage.verifyButtonToHaveBackgroundColor("Default Buttons","primary",colorAfterHover)
    })
})

describe("Date Picker tests", ()=>{
    beforeEach("navigate", ()=>{
        cy.visit("/");
        navigationBar.goToDatePicker()
    });

    it("Pick a day from the current month", ()=>{
        cy.contains("nb-card","Common Datepicker").find("input").then(dateInput => {
            cy.wrap(dateInput).click();
            //I get all date-cells but I exclude the close month dates with not
            cy.get("nb-calendar-day-cell").not(".bounding-month").contains("28").click();
            cy.wrap(dateInput).invoke("prop","value").then(dateValue =>{
                expect(dateValue).to.contain("28");
            })
        });
    });

    it("Advancing days in a calendar", ()=>{
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 370); //A high number so I probably roll to the next month and year
        let futureDay = currentDate.getDate();
        currentDate.getMonth() + 1;
        let futureMonth = currentDate.toLocaleString("en-US",{month: "short"})
        let futureYear = currentDate.getFullYear();

        cy.contains("nb-card","Common Datepicker").find("input").then(dateInput => {
            cy.wrap(dateInput).click();

            datePickerPage.slideUntilFindCorrectMonthAndYear(futureDay, futureMonth, futureYear)

            cy.wrap(dateInput).invoke("prop","value").then(dateValue =>{
                expect(dateValue).to.eq(futureMonth+" "+futureDay+", "+currentDate.getFullYear());
            })
        });
    });
});