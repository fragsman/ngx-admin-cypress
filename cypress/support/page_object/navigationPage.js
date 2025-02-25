function openMenu(menu){

    cy.get("a[title='"+menu+"']").invoke("attr","aria-expanded").then(attr=>{
        if(attr == "false")
            cy.contains(menu).click()
    })
}

class NavigationPage{

    goToAnimatedSearches(){
        openMenu("UI Features")
        cy.contains("Animated Searches").click()
    }

    goToAccordion(){
        openMenu("Layout")
        cy.contains("Accordion").click()
    }

    goToButtons(){
        openMenu("Forms")
        cy.contains("Buttons").click()
    }

    goToDialog(){
        openMenu("Modal & Overlays")
        cy.contains("Dialog").click()
    }

    goToInfiniteList(){
        openMenu("Layout")
        cy.get("a[title='Infinite List']").click()
    }

    goToformInputs(){
        openMenu("Forms")
        cy.contains("Form Inputs").click()
    }

    goToformLayouts(){
        openMenu("Forms")
        cy.contains("Form Layouts").click()
    }

    goToList(){
        openMenu("Layout")
        cy.get("a[title='List']").click()
    }

    goToTabs(){
        openMenu("Layout")
        cy.get("a[title='Tabs']").click()
    }

    goToToastr(){
        openMenu("Modal & Overlays")
        cy.contains("Toastr").click()
    }

    goToTooltip(){
        openMenu("Modal & Overlays")
        cy.contains("Tooltip").click()
    }

    goToSmartTable(){
        openMenu("Tables & Data")
        cy.contains("Smart Table").click()
    }

    goToStepper(){
        openMenu("Layout")
        cy.contains("Stepper").click()
    }

    goToDatePicker(){
        openMenu("Forms")
        cy.contains("Datepicker").click()
    }
}

export const navigationBar = new NavigationPage()