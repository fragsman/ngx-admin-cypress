class ListPage{

    //This is for "List" Menu
    scrollTheListOfUsers(where){
        cy.get("nb-card-header").contains("Users").siblings().eq(0).scrollTo(where)
    }

    //This is for "Infinite List" Menu
    scrollLeftPanel(widthPx, heightPx){
        cy.get("nb-card").contains("Own Scroll").parent().find("nb-list").scrollTo(widthPx,heightPx)
    }
}

//I created only one class for "List" and "Infinite List" since both are so simple it wouldn't worth creating two classes
export const listPage = new ListPage()