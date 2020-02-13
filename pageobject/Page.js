class Page {


    open(path) {
        browser.url(path);
        this.preloaderWait();
    }

    openTab(tabName) {
        this.tab = tabName;
        this.tab.click();
        this.preloaderWait();
    }

    preloaderWait(){
        if(this.pagePreloader.isExisting()){
            browser.waitUntil(() => {
                return !this.pagePreloader.isExisting();
            }, 60000, 'Page preloader still working after 60 sec');
        }        
    }

    preloader(element) {
        if(element.isDisplayed()){
            browser.waitUntil(() => {
                return !element.isDisplayed();
            }, 60000, 'Preloader still working after 60 sec');
        }
    }

    waitElemen(element) {
        browser.waitUntil(() => {
            return element.isExisting();
          });
    }

    fillMultiSelectInputVerTwo(multiSelect, valueInput, searchValue, searchResult){
        multiSelect.click();
        browser.pause(1000);
        valueInput.addValue(searchValue);
        browser.waitUntil(() => {
            return searchResult.isExisting();
        });
        searchResult.click();
    }

    fillMultiSelectInput(multiSelect, valueInput, searchValue, searchResult){
        multiSelect.click();
        browser.pause(500);
        valueInput.addValue(searchValue);
        valueInput.keys("\uE007"); /* Send ENTER*/
        browser.waitUntil(() => {
            return searchResult.isExisting();
        });
        searchResult.click();
    }

    set tab(str) { this.tabElement = $(`//a[contains(@href,"${str}")]`);}
    get tab() { return this.tabElement; }
    get pagePreloader() { return $(`//div[@id="page-loader" and @class="fade in"]`); }

    

}

export default Page;