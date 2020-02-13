import Page from './Page';

class Login extends Page {
    open(client){
        super.open(client + '/Account/Login');

        return this;
    }

    get username() { return $('#text1'); }
    get password() { return $('#loginPassText'); }
    get loginBtn() { return $('//button'); }

    login(userName, pass) {
        this.username.clearValue();
        this.username.addValue(userName);
        this.password.clearValue();
        this.password.addValue(pass);

        this.loginBtn.click();

        super.preloaderWait();

        return this;
    }
}

export default new Login();