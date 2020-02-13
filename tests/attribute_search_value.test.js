import { expect } from 'chai';
import Login from '../pageobject/Login';
import DocumentManagement from '../pageobject/DocumentManagement'

describe('Check Document Page', () => {
    it('should get the correct page title', () => {
        Login
            .open('SkyWell') /* can't login without entering to SkyWell*/
            .open('Merit')
            .login('larysaSoftMerit', '338506as');
        DocumentManagement
            .openTab()
            .openAttributeSearch();

        let title = browser.getTitle();
        expect(title).to.equal('Document Management -Quorum Software');

    });
    it('Attribute search TX', () => {
        DocumentManagement
            .attributeValueSearch('TX')
            .searchAndWaitResult()
            .sortingSearchResultBy('Link');

        let linkedDocument = DocumentManagement.checked.isExisting();
        expect(linkedDocument).to.equal(false);
        
    }).timeout(100000);
});