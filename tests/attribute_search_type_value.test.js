import { expect } from 'chai';
import Login from '../pageobject/Login';
import DocumentManagement from '../pageobject/DocumentManagement'

describe('Check Document Page', () => {
    let searchParams = [
        {
            attributeType: 'State',
            attributeValue: 'TX'
        },
        {
            attributeType: 'County',
            attributeValue: 'STARR'
        },
        {
            attributeType: 'API12',
            attributeValue: '422153257200'
        },
        {
            attributeType: 'Accounting ID',
            attributeValue: '29450-01'
        },
        {
            attributeType: 'Accounting Code',
            attributeValue: 'A_BOBWEST'
        },
        {
            attributeType: 'Division',
            attributeValue: 'D_SOUTH'
        },
        {
            attributeType: 'Production Status',
            attributeValue: 'PD'
        },
        {
            attributeType: 'Region',
            attributeValue: 'R_LAREDO'
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
        it(`Attribute search Type = ${searchParam.attributeType} + 
        Value=${searchParam.attributeValue}`, () => {
            browser.refresh();
            DocumentManagement
                .openAttributeSearch()
                .attributeTypeSearch(searchParam.attributeType)
                .attributeValueSearch(searchParam.attributeValue)
                .searchAndWaitResult()
                .sortingSearchResultBy('Link');
    
            let linkedDocument = DocumentManagement.checked.isExisting();
            expect(linkedDocument).to.equal(false);
            
        }).timeout(150000);
    });
        
});
