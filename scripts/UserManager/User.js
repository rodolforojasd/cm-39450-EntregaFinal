

export class User {

    constructor(id,fname,lname,username, email, password, login){
        if(Number.isInteger(fname)) alert('First Name is not a valid input')
        if(Number.isInteger(lname)) alert('Last Name is not a valid input')
        if(email.search("@")===-1)alert ('not a valid email')

        this.id=id
        this.fname=fname
        this.lname=lname
        this.username=username
        this.email=email
        this.password=password
        this.login= false

    }
}
