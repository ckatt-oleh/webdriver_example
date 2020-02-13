import { expect } from 'chai';
import Login from '../pageobject/Login';
import DocumentManagement from '../pageobject/DocumentManagement'

describe('Check Document Page', () => {
    let searchParams = [
        {
            attributeType: 'State',
            attributeValue: 'TX',
            attributeDocTyp: 'Analysis'
        }
    ];
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
    searchParams.forEach(searchParam => {
        it(`Attribute search 
        Type = ${searchParam.attributeType}   
        Value = ${searchParam.attributeValue}
        DocType = ${searchParam.attributeDocTyp}`, () => {
            browser.refresh();
            DocumentManagement
                .openAttributeSearch()
                .attributeTypeSearch(searchParam.attributeType)
                .attributeValueSearch(searchParam.attributeValue)
                .attributeDocTypeSearch(searchParam.attributeDocTyp)
                .searchAndWaitResult()
                .sortingSearchResultBy('Link');
    
            let linkedDocument = DocumentManagement.checked.isExisting();
            expect(linkedDocument).to.equal(false);
            
        }).timeout(150000);
    });
        
});
