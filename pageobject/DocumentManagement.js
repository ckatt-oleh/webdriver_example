import Page from './Page';

class DocumentManagement extends Page {
    openTab(){
        super.openTab('DocumentManagement');

        return this;
    }

    openAttributeSearch(){
        this.attributeSearch.isExisting();
        this.attributeSearch.click();
        super.preloader(this.searchPreloader);
        return this;
    }

    attributeValueSearch(searchValue){
        this.searchResult = searchValue;
        super.fillMultiSelectInput(this.attributeValueMSel,
             this.attributeValueInput, searchValue, this.searchResult);

        return this;
    }

    attributeTypeSearch(searchValue){
        this.searchResult = searchValue;
        super.fillMultiSelectInputVerTwo(this.attributeTypeMSel,
             this.attributeTypeInput, searchValue, this.searchResult);

        return this;
    }

    attributeDocTypeSearch(searchValue){
        this.searchResultAttributeDocType = searchValue;
        super.fillMultiSelectInputVerTwo(this.attributeDocTypeMSel,
             this.attributeDocTypeInput, searchValue, this.searchResultAttributeDocType);

        return this;
    }

    searchAndWaitResult(){
        this.searchCriteriaButton.waitForEnabled();
        this.searchCriteriaButton.click();
        super.preloader(this.searchResultPreloader);
        super.waitElemen(this.searchResultCounting);

        return this;
    }

    sortingSearchResultBy(sortVariant){
        this.sortingTableBy = sortVariant;
        this.sortingTableBy.click();
        super.preloader(this.searchResultPreloader);

        return this;
    }

    filteringTableResultBySearch(searchVariable){
        this.filterResultSearch.addValue(searchVariable);
        browser.pause(1000);
        super.preloader(this.searchResultPreloader);

        return this;
    }

    get tableResult() { return $('//div[@id="metadataSearchResults"]//tbody'); }
    get tableResultRows() { return $$('//div[@id="metadataSearchResults"]//tbody/tr'); }
    get checked() { return $('(//td//span[@checked="checked"])[1]'); }
    set sortingTableBy(str) { this.sortingTableElement = $(`//th[text()="${str}"]`); }
    get sortingTableBy() { return this.sortingTableElement; }
    get searchCriteriaButton() { return $('//button[contains(text(),"Search")]'); }
    get searchResultCounting() { return $('//div[contains(text(),"Showing ")]'); }
    set searchResult(str) { this.attributeSearchElement = $(`//span[text()='${str}']`);}
    get searchResult() { return this.attributeSearchElement; }
    set searchResultAttributeDocType(str) { this.attributeSearchElement = $(`(//span[text()='${str}'])[2]`);}
    get searchResultAttributeDocType() { return this.attributeSearchElement; }
    get attributeSearch() { return $('//input[@value="attribute"]'); }
    get filterResultSearch() { return $('//div[@id="metadatSearchResultsDiv"]//input[@type="search"]'); }

    get attributeTypeMSel() { 
        return $('//div[label="Attribute Type"]//div[@class="multiselect__tags"]'); 
    }
    get attributeTypeInput() {
        return $('//div[label="Attribute Type"]//input');
    }
    get attributeValueMSel() { 
        return $('//div[label="Attribute Value"]//div[@class="multiselect__tags"]'); 
    }
    get attributeValueInput() { 
        return $('//div[label="Attribute Value"]//input'); 
    }
    get attributeDocTypeMSel() {
        return $('(//div[@id="docTypeSearchContainer"])[2]');
    }
    get attributeDocTypeInput() { 
        return $('(//div[@id="docTypeSearchContainer"])[2]//input'); 
    }
    get searchPreloader() {
        return $('//div[@id="metadataSearch"]//div[@class="spinnerWrapper fade in"]');
    }
    get searchResultPreloader() {
        return $('//div[@id="metadataSearchResults"]//div[@class="spinnerWrapper fade in"]//img');
    }
}

export default new DocumentManagement();