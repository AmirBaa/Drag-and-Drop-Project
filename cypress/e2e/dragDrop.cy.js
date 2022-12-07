/// <reference types="cypress" />


describe('Drag and Drop', () => {

    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/')
    })
    it('add quests on quests board and then delete it', () => {
        cy.get('[onclick="showInputBox(0)"] > :nth-child(2)').click()
        cy.get("li[class='drag-column backlog-column'] div[class='add-item']").type('Find a pan!')
        cy.get("li[class='drag-column backlog-column'] div[class='add-btn solid'] span").click()
        cy.get('#backlog-list > li').should('have.length', '3')
        cy.get('#backlog-list > #2').should('have.text', 'Find a pan!')
        cy.get('#backlog-list > #2').clear()
        cy.get('.backlog-column > .header').click()
        cy.get('#backlog-list > li').should('have.length', '2')

    })
    it('add quests on quest in progress board and then delete it', () => {
        cy.get('[onclick="showInputBox(1)"] > :nth-child(2)').click()
        cy.get("li[class='drag-column progress-column'] div[class='add-item']").type('Progressing the quest!')
        cy.get("li[class='drag-column progress-column'] div[class='add-btn solid'] span").click()
        cy.get('#progress-list > li').should('have.length', '3')
        cy.get('#progress-list > #2').should('have.text', 'Progressing the quest!')
        cy.get('#progress-list > #2').clear()
        cy.get('.backlog-column > .header').click()
        cy.get('#progress-list > li').should('have.length', '2')
    })
    it('add quests on completed quests board and then delete it', () => {
        cy.get('[onclick="showInputBox(2)"] > :nth-child(2)').click()
        cy.get("li[class='drag-column complete-column'] div[class='add-item']").type('Completed the quest!')
        cy.get("li[class='drag-column complete-column'] div[class='add-btn solid'] span").click()
        cy.get('#complete-list > li').should('have.length', '3')
        cy.get('#complete-list > #2').should('have.text', 'Completed the quest!')
        cy.get('#complete-list > #2').clear()
        cy.get('.backlog-column > .header').click()
        cy.get('#complete-list > li').should('have.length', '2')
    })
    it('add quests on quests on hold quests and then delete it', () => {
        cy.get('[onclick="showInputBox(3)"] > :nth-child(2)').click()
        cy.get('.on-hold-column > .add-container > .add-item').type('Quest on hold!')
        cy.get('.on-hold-column > .add-btn-group > .solid > span').click()
        cy.get('#on-hold-list > li').should('have.length', '2')
        cy.get('#on-hold-list > #1').should('have.text', 'Quest on hold!')
        cy.get('#on-hold-list > #1').clear()
        cy.get('.backlog-column > .header').click()
        cy.get('#on-hold-list > li').should('have.length', '1')
    })
    it('drags from quest board to quest in progress list', () => {
        const dataTransfer = new DataTransfer()
        cy.get('#backlog-list > li').should('have.length', '2')
        cy.get('#progress-list > li').should('have.length', '2')
        cy.get('#backlog-list > #0').trigger('mousedown').
            trigger('dragstart', {
                dataTransfer: dataTransfer
            }).get('#progress-list').trigger('dragenter', { dataTransfer: dataTransfer })
            .trigger('dragover', { dataTransfer: dataTransfer })
            .trigger('drop', {
                dataTransfer: dataTransfer
            })
        cy.get('#backlog-list > li').should('have.length', '1')
        cy.get('#progress-list > li').should('have.length', '3')

    })
    it('drags from quest in progress to completed quests', () => {
        const dataTransfer = new DataTransfer()
        cy.get('#progress-list > li').should('have.length', '2')
        cy.get('#complete-list > li').should('have.length', '2')
        cy.get('#progress-list > #0').trigger('mousedown').

            trigger('dragstart', {
                dataTransfer: dataTransfer
            }).get('#complete-list').trigger('dragenter', { dataTransfer: dataTransfer })
            .trigger('dragover', { dataTransfer: dataTransfer })
            .trigger('drop', {
                dataTransfer: dataTransfer
            })
        cy.get('#progress-list > li').should('have.length', '1')
        cy.get('#complete-list > li').should('have.length', '3')
    })
    it('drags from completed quests to on hold quests', () => {
        const dataTransfer = new DataTransfer()
        cy.get('#on-hold-list > li').should('have.length', '1')
        cy.get('#complete-list > #1').trigger('mousedown').
            trigger('dragstart', {
                dataTransfer: dataTransfer
            }).get('#on-hold-list').trigger('dragenter', { dataTransfer: dataTransfer })
            .trigger('dragover', { dataTransfer: dataTransfer })
            .trigger('drop', {
                dataTransfer: dataTransfer
            })
        cy.get('#on-hold-list > li').should('have.length', '2')
    })
    it('drags from on hold quests to quests board', () => {
        const dataTransfer = new DataTransfer()
        cy.get('#on-hold-list > li').should('have.length', '1')
        cy.get('#on-hold-list > #0').trigger('mousedown').
            trigger('dragstart', {
                dataTransfer: dataTransfer
            }).get('#backlog-list').trigger('dragenter', { dataTransfer: dataTransfer })
            .trigger('dragover', { dataTransfer: dataTransfer })
            .trigger('drop', {
                dataTransfer: dataTransfer
            })
        cy.get('#on-hold-list > li').should('have.length', '0')
        cy.get('#backlog-list > li').should('have.length', '3')
    })
    it('edit first quest on quests board', () => {
        cy.get('[onclick="showInputBox(0)"] > :nth-child(2)').click()
        cy.get("li[class='drag-column backlog-column'] div[class='add-item']").type('Find a pan!')
        cy.get("li[class='drag-column backlog-column'] div[class='add-btn solid'] span").click()
        cy.get('#backlog-list > #2').should('have.text', 'Find a pan!')
        cy.get('#backlog-list > #2').clear()
        cy.get('#backlog-list > #2').click().type('Changed the quest!')
        cy.get('#backlog-list > #2').should('have.text', 'Changed the quest!')


    })
})
