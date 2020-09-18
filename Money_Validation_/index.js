let netBanking = `<div class="netBanking">
<div class="card">
    <h5>Bank Details</h5>
    <form>
    <div class="form-group">
        <input type="text" name="aName" class="form-control" autocomplete="off" required placeholder="Account Holders Full Name">
        <div class="invalid-feedback">
        <small>Please provide a valid name.</small>
        </div>
    </div>
    <div class="form-group">
        <input type="text" name="aNum" class="form-control" autocomplete="off" required placeholder="Account Number">
        <div class="invalid-feedback">
        <small>Please provide a valid Account number.</small>
    </div>
    </div>
    <div class="form-group">
        <input type="text" name="aCode" class="form-control" autocomplete="off" required placeholder="Ifsc Code">
        <div class="invalid-feedback">
        <small>Please provide a valid Ifsc code. Example - SBIN0999999</small>
    </div>
    </div>
    <button type="submit" id="submitBtn" class="btn btn-primary">Add</button>
    </form>
</div>
</div>`;
let Paytm = `<div class="Paytm">
<div class="card">
    <h5>Paytm Details</h5>
    <form>
    <div class="form-group">
        <input type="text" name="aName" class="form-control" required autocomplete="off" placeholder="Full Name">
        <div class="invalid-feedback">
            <small>Please provide a valid name.</small>
        </div>
        </div>
    <div class="form-group">
        <input type="number" name="aNum" class="form-control" required autocomplete="off" placeholder="Paytm Number">
        <div class="invalid-feedback">
            <small>Please provide a valid Paytm number.</small>
        </div>
    </div>
    <div class="form-group kyc">
        <p>*KYC-verified Paytm accounts only</p>
    </div>
    <button type="submit" id="submitBtn" class="btn btn-primary">Add</button>
    </form>
</div>
</div>`;
let googlePay = `<div class="googlePay">
<div class="card">
    <h5>Google Pay Details</h5>
<form>
    <div class="form-group">
        <input type="text" name="aName" class="form-control" required autocomplete="off" placeholder="Full Name">  
        <div class="invalid-feedback">
        <small>Please provide a valid name.</small>
        </div>  
    </div>
    <div class="form-group">
        <input type="text" name="aNum" class="form-control" required autocomplete="off" placeholder="Google Pay Number">
        <div class="invalid-feedback">
            <small>Please provide a valid Google pay number.</small>
        </div>
    </div>
    
    <button type="submit" id="submitBtn" class="btn btn-primary">Add</button>
</form>
</div>
</div>`;
let upi = `<div class="upi">
<div class="card">
    <h5>UPI Details</h5>
<form>
    <div class="form-group">
        <input type="text" name="aName" class="form-control" required autocomplete="off" placeholder="Full Name">
        <div class="invalid-feedback">
            <small>Please provide a valid name.</small>
        </div>
    </div>
    <div class="form-group">
        <input type="text" name="aNum" class="form-control" required autocomplete="off" placeholder="UPI">        
        <div class="invalid-feedback">
            <small>Please provide a valid UPI. Example - John_Doe.021@axis</small>
        </div>
    </div>
    <button type="submit" id="submitBtn" class="btn btn-primary">Add</button>
</form>
</div>
</div>`;
let paymentForm = document.querySelector(".paymentForm");

function accountElement(string) {
    let div = document.createElement('div')
    div.className = 'account'
    div.innerHTML = string
    return div
}

let validName = false
let validNumber = false
let validCode = false

let radioInputs = document.getElementsByClassName("form-check-input");
Array.from(radioInputs).forEach(function (element) {
    element.addEventListener("click", function () {
        if (element.value == "netBanking") {
            paymentForm.innerHTML = netBanking;
        } else if (element.value == "Paytm") {
            paymentForm.innerHTML = Paytm;
        } else if (element.value == "googlePay") {
            paymentForm.innerHTML = googlePay;
        } else {
            paymentForm.innerHTML = upi;
        }

        let submitBtn = paymentForm.querySelector("#submitBtn")
        submitBtn.addEventListener("click", function (event) {
            event.preventDefault();

            let string = ''
            let name = ''
            let number = ''
            let code = ''
            if (element.value == 'netBanking') {
                name = paymentForm.querySelector('input[name="aName"]')
                number = paymentForm.querySelector('input[name="aNum"]')
                code = paymentForm.querySelector('input[name="aCode"]')

                let regexNumber = /^([0-9]){8,18}$/
                let regexCode = /^[A-Z]{4}0[A-Z0-9]{6}$/
                let regexName = /^([a-zA-Z\s])+$/

                if (regexNumber.test(number.value)) {
                    number.classList.remove('is-invalid')
                    validNumber = true
                } else {
                    number.classList.add('is-invalid')
                    validNumber = false
                }

                if (regexName.test(name.value)) {
                    name.classList.remove('is-invalid')
                    validName = true
                } else {
                    name.classList.add('is-invalid')
                    validName = false
                }
                if (regexCode.test(code.value)) {
                    code.classList.remove('is-invalid')
                    validCode = true
                } else {
                    code.classList.add('is-invalid')
                    validCode = false
                }

                if (validNumber && validName && validCode) {
                    string = `
                            <h5>
                                <span>Banking Detail</span>
                                <span class='removeAccount'>
                                    <i class="fa fa-close"></i>
                                </span>
                            </h5>
                            <ul>
                                <li>Name:<b>${name.value}</b></li>
                                <li>Account:<b>${number.value}</b></li>                                   
                                <li>Ifsc code:<b>${code.value}</b></li>                                   
                            </ul>`
                    let accountDiv = accountElement(string)
                    document.querySelector('.accountDetails').append(accountDiv)
                    paymentForm.getElementsByTagName('form')[0].reset()
                }
            } else if (element.value == 'Paytm') {
                name = paymentForm.querySelector('input[name="aName"]')
                number = paymentForm.querySelector('input[name="aNum"]')

                let regexNumber = /^([0-9]){10}$/
                let regexName = /^([a-zA-Z\s])+$/

                if (regexNumber.test(number.value)) {
                    number.classList.remove('is-invalid')
                    validNumber = true
                } else {
                    number.classList.add('is-invalid')
                    validNumber = false
                }

                if (regexName.test(name.value)) {
                    name.classList.remove('is-invalid')
                    validName = true
                } else {
                    name.classList.add('is-invalid')
                    validName = false
                }

                if (validNumber && validName) {
                    string = `
                            <h5>
                                <span>Paytm Detail</span>
                                <span class='removeAccount'>
                                    <i class="fa fa-close"></i>
                                </span>
                            </h5>
                            <ul>
                                <li>Name:<b>${name.value}</b></li>
                                <li>Number:<b>${number.value}</b></li>                                   
                            </ul>`
                    let accountDiv = accountElement(string)
                    document.querySelector('.accountDetails').append(accountDiv)
                    paymentForm.getElementsByTagName('form')[0].reset()
                }
            } else if (element.value == 'googlePay') {
                name = paymentForm.querySelector('input[name="aName"]')
                number = paymentForm.querySelector('input[name="aNum"]')

                let regexNumber = /^([0-9]){10}$/
                let regexName = /^([a-zA-Z\s])+$/

                if (regexNumber.test(number.value)) {
                    number.classList.remove('is-invalid')
                    validNumber = true
                } else {
                    number.classList.add('is-invalid')
                    validNumber = false
                }

                if (regexName.test(name.value)) {
                    name.classList.remove('is-invalid')
                    validName = true
                } else {
                    name.classList.add('is-invalid')
                    validName = false
                }

                if (validNumber && validName) {
                    string = `
                            <h5>
                                <span>Google Pay Detail</span>
                                <span class='removeAccount'>
                                    <i class="fa fa-close"></i>
                                </span>
                            </h5>
                            <ul>
                                <li>Name:<b>${name.value}</b></li>
                                <li>Number:<b>${number.value}</b><li>                                   
                            </ul>`
                    let accountDiv = accountElement(string)
                    document.querySelector('.accountDetails').append(accountDiv)
                    paymentForm.getElementsByTagName('form')[0].reset()
                }
            } else {
                name = paymentForm.querySelector('input[name="aName"]')
                number = paymentForm.querySelector('input[name="aNum"]')

                let regexNumber = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
                let regexName = /^([a-zA-Z\s])+$/

                if (regexNumber.test(number.value)) {
                    number.classList.remove('is-invalid')
                    validNumber = true
                } else {
                    number.classList.add('is-invalid')
                    validNumber = false
                }

                if (regexName.test(name.value)) {
                    name.classList.remove('is-invalid')
                    validName = true
                } else {
                    name.classList.add('is-invalid')
                    validName = false
                }

                if (validNumber && validName) {
                    string = `
                            <h5>
                                <span>UPI Detail</span>
                                <span class='removeAccount'>
                                    <i class="fa fa-close"></i>
                                </span>
                            </h5>
                            <ul>
                                <li>Name:<b>${name.value}</b></li>
                                <li>UPI:<b>${number.value}</b></li>                                   
                            </ul>`
                    let accountDiv = accountElement(string)
                    document.querySelector('.accountDetails').append(accountDiv)
                    paymentForm.getElementsByTagName('form')[0].reset()
                }
            }

            let removeAccount = document.getElementsByClassName('removeAccount')
            Array.from(removeAccount).forEach(element => {
                element.addEventListener('click', event => {
                    event.target.parentElement.parentElement.parentElement.remove()
                })
            })
        });
    });
});
