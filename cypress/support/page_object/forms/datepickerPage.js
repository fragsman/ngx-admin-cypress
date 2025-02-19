class DatePickerPage{

    slideUntilFindCorrectMonthAndYear(futureDay, futureMonth, futureYear){
        cy.get("nb-calendar-view-mode").find("button").invoke("text").then(txt =>{
            if(!txt.includes(futureMonth) || !txt.includes(futureYear)){
                cy.get("nb-icon[ng-reflect-icon='chevron-right-outline']").click();
                this.slideUntilFindCorrectMonthAndYear(futureDay, futureMonth, futureYear)
            }
            else{
                //I get all date-cells but I exclude the close month dates with not
                cy.get("nb-calendar-day-cell").not(".bounding-month").contains(futureDay).click();
            }
        })
    }
}

export const datePickerPage = new DatePickerPage()