import {onBeforeLoad} from '../support/mock_chrome.js';
import {login} from '../login';
import {prepareEncryptedPrivateKey, ACCOUNT_PASSWORD, PRIVATE_KEY, mnemonic} from '../utils.js';

//This tests are in separate file because testing framework crashes when all import tests are in one file
describe('Test cases for Import 2', () => {

    it("import from keystore.json file", () => {
        cy.visit('popup/popup.html',{onBeforeLoad});
        cy.get('button.importBtn').click();
        cy.get('.ae-overlay').should('be.visible');
        cy.get('.ae-modal').should('be.visible');
        cy.get('.tabs span').eq(1).click();
        cy.uploadFile('input[type="file"]','../../keystore.json','application/json');
        cy.get('button').contains('Continue').click();
        cy.get('p').should('contain','Import From Keystore.json');
        cy.get('button').should('contain','Import');
        cy.get('input[type="password"]').should('be.visible');
        cy.get('input[type="password"]').type('123');
        cy.get('button').contains('Import').click();
        cy.get('.ae-toolbar').should('contain','Password must be at lest 4 symbols! ');
        cy.get('input[type="password"]').clear().type('12345');
        cy.get('button').contains('Import').click();
        cy.get('.ae-loader').should('be.visible');
        cy.get('.ae-toolbar').should('contain','Incorrect password !');
        cy.get('input[type="password"]').clear().type(ACCOUNT_PASSWORD);
        cy.get('button').contains('Import').click();
        cy.get('.ae-loader').should('be.visible');
        cy.get('.ae-card')
        .should('be.visible')
        .get('.ae-header')
        .should('have.class','logged')
        .get('#settings')
        .should('be.visible');
    });

    it("import from keystore incorrect file 1", () => {
        cy.visit('popup/popup.html',{onBeforeLoad})
        .get('button.importBtn').click()
        .get('.ae-overlay').should('be.visible')
        .get('.ae-modal').should('be.visible')
        .get('.tabs span').eq(1).click()
        .uploadFile('input[type="file"]','../../keystore2.csv','application/json')
        .get('button').contains('Continue').click()
        .get('.file-toolbar').should('contain','Invalid file format!')
    });

    it("import from keystore incorrect file 2", () => {
        cy.visit('popup/popup.html',{onBeforeLoad})
        .get('button.importBtn').click()
        .get('.ae-overlay').should('be.visible')
        .get('.ae-modal').should('be.visible')
        .get('.tabs span').eq(1).click()
        .uploadFile('input[type="file"]','../../keystore3.json','application/json')
        .get('button').contains('Continue').click()
        .get('.file-toolbar').should('contain','Invalid file format!');
    });

});