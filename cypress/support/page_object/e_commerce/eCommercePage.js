class ECommercePage{

    selectSpain(){
        let spainCoordinates = "M485 191L484 186L488 183L506 185L516 189L519 188L520 191L513 194L510 200L511 202L505 210L499 210L494 212L490 208L490 199L493 192L490 190L488 191L487 189L486 190z"
        //I've seen these numbers change somehow, however is the only way I found to select a country.
        cy.get("path[d='"+spainCoordinates+"']").click()
    }

    verifyCurrentCountryIs(countryName){
        cy.get("ngx-country-orders-chart div h2").should("have.text",countryName)
    }
}

export const eCommercePage = new ECommercePage()