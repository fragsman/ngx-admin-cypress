class IOTDashboardPage{
    
    playSong(){
        cy.get("div.controls g[data-name='play-circle']").parent().parent().parent().click()
    }

    plauseSong(){
        cy.get("div.controls g[data-name='pause-circle']").parent().parent().parent().click()
    }

    setElecticityUsageTo(electricity){
        //This will only work using cypress-real-events
        //x = Horizontal, y = Vertical pixels (For this test it won't matter as it the horizontal position works due how to this canvas works)
        cy.get("ngx-electricity-chart").find("canvas").realClick({x:50,y:50,scrollBehavior: false})
    }

    setTemperature(temp){
        //This will only work using cypress-real-events (x=horizontal, y=vertical within the element)
        cy.fixture("tempCoordinates").then(data=>{
            cy.get("ngx-temperature-dragger").realClick({x:data.coordinates[temp].x,y:data.coordinates[temp].y,scrollBehavior: false})
        })
    }

    setSongProgressToHalf(){
        cy.get("input[type='range']").eq(0).focus()
        cy.wait(500) //Without this, god knows there it clicks and, the slider doesn't update the timestamp properly 
        cy.get("input[type='range']").eq(0).realClick({x:180,y:8,scrollBehavior: false})
    }

    setSongVolumeToHalf(){
        cy.get("div.volume input").invoke('val', 50)
        cy.get("div.volume input").trigger('input',{force:true})
    }

    verifySongVolumeIsAtHalf(){
        cy.get('div.volume input').should('have.value', 50);
    }

    verifyElectricityUsageIsSetTo(electricity){
        cy.get("ngx-electricity-chart div div").eq(1).should("have.text",electricity+" kWh")
    }

    verifyCurrentSongTimeInreasedTo(time){
        //As the web might be imprecise I will give 1 second difference below and above the expected. 
        // Despite this test might fail because web is buggy and player takes time to update the time. The test is COOL!!
        let lowerSecondThreshold = Number(time.slice(3))-1
        let upperSecondThreshold = Number(time.slice(3))+1
        cy.get("div.timing small.current").invoke("text").then(currentTime=>{
            let currentSecond = Number(currentTime.slice(3))
            expect(currentSecond).to.be.within(lowerSecondThreshold,upperSecondThreshold)
        })
    }

    verifyTemperatureIsSetTo(temp){
        cy.get("ngx-temperature-dragger").invoke("attr","ng-reflect-set-value").then(val=>{
            expect(val).to.be.eq(temp)
        })
    }

}

export const iotDashboardPage = new IOTDashboardPage()