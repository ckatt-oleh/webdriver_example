import { expect } from 'chai';

import Login from '../pageobject/Login';
import DocumentManagement from '../pageobject/DocumentManagement'

describe('Check Document Page', () => {
    let searchParams = [
        {
            attributeType: 'County',
            attributeValue: 'STARR',
            searchFilter: 'pip',
            filterTypes: [{
                    filter: 'Name'
                },
                {
                    filter: 'Extension'
                },
                {
                    filter: 'DocumentType'
                },
                {
                    filter: 'CheckOutStatus'
                },
                {
                    filter: 'Sub DocType'
                },
                {
                    filter: 'State-County'
                },
                {
                    filter: 'Well/Lease/Field Name'
                },
                {
                    filter: 'File Type'
                },
                {
                    filter: 'Databank Box'
                },
                {
                    filter: 'Agreement Number'
                },
                {
                    filter: 'Sequence Number'
                },
                {
                    filter: 'Document Number'
                }
            ]
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

    });
    searchParams.forEach(searchParam => {
        it(`Attribute search 
        Type = ${searchParam.attributeType}   
        Value = ${searchParam.attributeValue}`, () => {
            DocumentManagement
                .openAttributeSearch()
                .attributeTypeSearch(searchParam.attributeType)
                .attributeValueSearch(searchParam.attributeValue)
                .searchAndWaitResult();
            
        }).timeout(150000);
        it(`Search result filtering  
        Each row should contain = ${searchParam.searchFilter}`, () => {
            DocumentManagement
                .filteringTableResultBySearch(searchParam.searchFilter)
                .tableResultRows.forEach(row => {
                expect(row.getText().toLowerCase()).to.have.string(searchParam.searchFilter);
            });
            
        }).timeout(150000);
        let filterNames = searchParam.filterTypes;
        filterNames.forEach(filterName => {
            it(`Sorting by ${filterName.filter} 
                Each row should contain = ${searchParam.searchFilter}`, () => {
                DocumentManagement
                    .sortingSearchResultBy(filterName.filter)
                    .tableResultRows.forEach(row => {
                    expect(row.getText().toLowerCase()).to.have.string(searchParam.searchFilter);
                });
            
            }).timeout(150000);
        });
        
    });
        
});
