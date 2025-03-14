/// <reference types="cypress" />
import { navigationBar } from "../support/page_object/navigationPage"
import { iotDashboardPage } from "../support/page_object/iot_dashboard/iotDashboardPage"

describe("IOT-Dashboard Tests", ()=>{

    beforeEach("Go to E-IOT-Dashboard section", ()=>{
        cy.openHomePage()
        navigationBar.goToIODashboard()
    })

    it("Verify moving the temperature works", ()=>{ 
        iotDashboardPage.setTemperature("19")
        iotDashboardPage.verifyTemperatureIsSetTo("19")
        iotDashboardPage.setTemperature("28")
        iotDashboardPage.verifyTemperatureIsSetTo("28")
    })

    it("Verify the progress slider works", ()=>{
        //I have tried almost everything using pure cypress but it doesn't work in this specific website.
        //I managed to simulate the circle to get moving but the number (TimeStamp) in the screen doesn't get updated
        //The next test works using 'cypress-real-events'
        cy.get("input[type='range']").eq(0).invoke('val', 50)
        cy.get("div.progress-foreground").eq(0).invoke("css","width","50%")
        cy.get("div.progress-foreground").eq(0).trigger('change',{force:true})
        cy.get("input[type='range']").eq(0).trigger('change',{force:true})
        cy.get("input[type='range']").eq(0).trigger('input',{force:true}) //move to 50% = 15 seconds
        iotDashboardPage.verifyCurrentSongTimeInreasedTo("00:15") //15 seconds
    })

    it("Verify the progress slider v2", ()=>{
        //This is using the Package 'cypress-real-events'
        iotDashboardPage.setSongProgressToHalf()
        iotDashboardPage.verifyCurrentSongTimeInreasedTo("00:15") //15 seconds
    })

    it("Verify canvas works ok",()=>{    
        let electricity = 500
        iotDashboardPage.setElecticityUsageTo(electricity)
        iotDashboardPage.verifyElectricityUsageIsSetTo(electricity)
    })
    
    it("Verify crack up the volume to max works", ()=>{
        iotDashboardPage.setSongVolumeToHalf()
        iotDashboardPage.verifySongVolumeIsAtHalf()
        //There is nothing else other than this to assert since there is no volume number indicator
    })

    it("Player test",()=>{
        iotDashboardPage.playSong()
        cy.wait(5000)//5 seconds
        iotDashboardPage.plauseSong()
        iotDashboardPage.verifyCurrentSongTimeInreasedTo("00:05") //5 seconds
    })
})