let food = "";
let age = "";
let id = 102;
let passangers = [];
let extra = [];

function addToList() {
    console.log(findExtras())
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let dOb = document.getElementById('DoB').value;
    dOb = new Date(dOb);
    dOb = dOb.getTime() + (1000 * 60 * 60 *7);
    dOb = new Date(dOb)
    let leaving = document.getElementById('departing').value;
    let arriving = document.getElementById('arriving').value;
    let leaveDate = document.getElementById('leaveDate').value;
    leaveDate = new Date(leaveDate);
    leaveDate = leaveDate.getTime() + (1000 * 60 * 60 *7);
    leaveDate = new Date(leaveDate)
    let arriveDate = document.getElementById('returnDate').value;
    arriveDate = new Date(arriveDate);
    arriveDate = arriveDate.getTime() + (1000 * 60 * 60 *7);
    arriveDate = new Date(arriveDate)
    let bags = document.getElementById('bags').value;
    let meal = findExtras('meal')
    let extras = findExtras('extra');
    let passanger = new Passanger(id, firstName, lastName, dOb, leaving, arriving, leaveDate, arriveDate, bags, meal, extras)
    id++
    passangers.push(passanger);

    document.getElementById('firstName').value = "";
    document.getElementById('lastName').value = "";
    document.getElementById('DoB').value = "";
    document.getElementById('departing').value = "";
    document.getElementById('arriving').value = "";
    document.getElementById('leaveDate').value = "";
    document.getElementById('returnDate').value = "";
    document.getElementById('bags').value = "";

    document.getElementById('kb').checked = false;
    document.getElementById('mcd').checked = false;
    document.getElementById('sbu').checked = false;

    document.getElementById('legroom').checked = false;
    document.getElementById('window').checked = false;
    document.getElementById('headphones').checked = false;
    document.getElementById('moreFood').checked = false;

}



class Passanger {
    constructor(id, firstName, lastName, dOb, leaving, arriving, leaveDate, arriveDate, bags, meal, extras) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dOb = dOb;
        this.leaving = leaving;
        this.arriving = arriving;
        this.leaveDate = leaveDate;
        this.arriveDate = arriveDate;
        this.bags = bags;
        this.id = id;
        this.meal = meal
        this.extras = extras
    }

    formatDate(date) {
        date = new Date(date);
        let month = "";
        let day = "";
        if(date.getMonth() + 1 < 10) {
            month = '0' + (date.getMonth()+1);
        } else {
            month = `${(date.getMonth() + 1)}`;
        }
        if (date.getDate() < 10){
            day = '0' + (date.getDate());
        }else {
            day = (date.getDate());
        }
        let newDate = `${date.getFullYear()}-${month}-${day}`;
    
        return newDate
    }

    findFood() {
        food = "";
        let kB = document.getElementById('kb').checked;
        let mcD = document.getElementById('mcd').checked;
        let sbu = document.getElementById('sbu').checked;

        if(kB) {
            food = document.getElementById('kb').value;
        }else if(mcD) {
            food = document.getElementById('mcd').value;
        }else if(sbu) {
            food = document.getElementById('sbu').value;
        }
        this.meal = food;
    }

    getAge() {
        age = "";
        let birth = new Date(this.dOb)
        let today = Date.now()

        age = today - birth.getTime();

        age = Math.floor(age / 1000 / 60/ 60/ 365.25/ 24)

        // let mm = today.getMonth() + 1;
        // let yyyy = today.getFullYear();
        // console.log(dOb)
        // let newDoB = dOb.split("-");
        // if(mm <= newDoB[1]) {
        //     age = yyyy - newDoB[0];
        // }else if(mm > newDoB[1]) {
        //     age = yyyy - newDoB[0] + 1;
        // }
        return age;
    }
}

let bean = new Passanger('100' ,'Mr.', 'Bean', '1955-01-06', 'Consett, United Kingdom', 'London, England', '2006-01-08', '2006-01-09', 69, 'Sbubby', ["testing", "more testing"]);
passangers.push(bean);

let connor = new Passanger('101', 'Connor', 'Vokel', '2001-6-21', 'Phoenix, AZ', 'Flagstaff, AZ', '2006-3-7', '2006-3-8', 0, 'Mc Dongle', [""]);
passangers.push(connor);

let passangerList = document.querySelector('#names');

function print() {
    console.log(passangers)
    let div = document.getElementById('names');
    div.innerHTML = "";
    
    for(let i = 0; i < passangers.length; i++) {
        let li = document.createElement('li');
        passangerList.appendChild(li);
        li.onclick = function(){fillInInfo(passangers[i].id ,passangers[i].firstName, passangers[i].lastName, passangers[i].formatDate(passangers[i].dOb), passangers[i].leaving, passangers[i].arriving, passangers[i].formatDate(passangers[i].leaveDate), passangers[i].formatDate(passangers[i].arriveDate), passangers[i].meal, passangers[i].bags, passangers[i].getAge(passangers[i].dOb), passangers[i].extras);}
        li.textContent = `${passangers[i].id} | ${passangers[i].firstName} ${passangers[i].lastName}`
    }
}

function fillInInfo(id, firstName, lastName, dOb, inLeaving, inArriving, inLeaveDate, inArriveDate, meal, bags, age, extras) {
    clearInfo();
    document.getElementById('outfirstName').value = firstName;
    
    document.getElementById('outlastName').value = lastName;
    document.getElementById('outDoB').value = dOb;
    document.getElementById('outbags').value = bags;
    document.getElementById('outdeparting').value = inLeaving;
    document.getElementById('outarriving').value = inArriving;
    document.getElementById('outleaveDate').value = inLeaveDate;
    document.getElementById('outreturnDate').value = inArriveDate;
    document.getElementById('outmeal').value = meal;
    document.getElementById('outextras').value = extras.join(", ");
    document.getElementById('outage').textContent = age;
    document.getElementById('outcost').textContent = `$${300 + extras.length * 10 + 20 * bags}`;
    console.log(extras.length)
    console.log(inArriveDate)
    inArriveDate = Date.parse(inArriveDate);
    inLeaveDate = Date.parse(inLeaveDate);
    let tripTIme = inArriveDate - inLeaveDate;
    document.getElementById('outdurration').textContent = tripTIme / (1000* 60 * 60 * 24)

}

function findExtras(name) {
    extra = [];
    let elemList = document.getElementsByName(name);
    for(let i = 0; i < elemList.length; i++) {
        if (elemList[i].checked){
            extra.push(elemList[i].value) 
        }
    }
    
    return extra;
}

function clearInfo() {
    document.getElementById('outfirstName').value = "";
    document.getElementById('outlastName').value = "";
    document.getElementById('outDoB').value = "";
    document.getElementById('outbags').value = "";
    document.getElementById('outdeparting').value = "";
    document.getElementById('outarriving').value = "";
    document.getElementById('outleaveDate').value = "";
    document.getElementById('outreturnDate').value = "";
    document.getElementById('outmeal').value = "";
    document.getElementById('outage').textContent = "";
    document.getElementById('outextras').value = "";
}