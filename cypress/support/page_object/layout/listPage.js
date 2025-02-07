class ListPage{

    scrollTheListOfUsers(where){
        cy.get("nb-card-header").contains("Users").siblings().eq(0).scrollTo(where)
    }

    scrollLeftPanel(widthPx, heightPx){
        cy.get("nb-card").contains("Own Scroll").parent().find("nb-list").scrollTo(widthPx,heightPx)
    }
}

export const listPage = new ListPage()