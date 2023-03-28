export class UserManager{

    constructor(){
        this.users= []
    }

    getUsers(){
        return this.users
    }

    addUser(id,fname,lname,username, email, password){


       let res = prompt("Quieres hacer un usuario: 1.si/ 2.no")

        res = parseInt(res)
       
        console.log(res)
     
       while(res!==1 && res!==2){
            alert("entre un valor valido")
            this.addUser()
       }
       if(res === 1){
            let user = null
            fname= prompt(`Dame tu primer nombre`)
            lname= prompt(`Dame tu primer apellido`)
            username= prompt(`Escribe tu nombre de usuario`)
            while(username.length>20){username = prompt(`Escribe un nombre de usuario que puedas recordar: `)}
            password = prompt(`Dame una clave de por lo menos 8 caracteres`)
            while(password.length < 8){password=prompt(`Dame una clave de por lo menos 8 caracteres`)}
            email= prompt(`Dame un correo`) 
            while(email.search("@")===-1) { email= prompt(`Dame un correo, valido`)}

            try{
                if(this.users.length === 0){
                    user = new User (1, fname,lname,username,email,password, false)
                    this.users.push(user) 
                    alert(`Eres nuestro primer cliente!: ${username}`) 
                    this.loginUser()   
                }else if(this.users.some((user)=> users.username===username||this.users.some((user)=> user.email===email))){
                    alert ('usuario ya existe')  
                    this.addUser()
                }else{
                    user = new User (this.users.length+1, fname, lname, username,email,password, false)
                    this.users.push(user)  
                    alert(`Bienvenido ${username}`)  
                    this.loginUser()   
                }
               
            }catch(error){ alert(error)}   
       }
       if(res===2){ 
            alert('Quizas en otro momento') 
            return
        }
    }
        

    getUserById(id){
       
        try{
            let searched = this.users.findIndex((user)=>user.id === id)
            if(searched !== -1){return searched}
        }catch(error){console.log(error)}
      
    }  
    
    loginUser(){

        let resp = prompt('Quieres iniciar sesion?: 1.si / 2.no')
        resp = parseInt(resp)

     
        while(resp !==1 && resp !==2 ){
            alert('respuesta invalida')
            resp = prompt('Quieres iniciar sesion?: 1.si / 2.no')
            resp = parseInt(resp)  
        }

        if(resp === 1){

            let userCheck =prompt(`dame tu usuario o correo`)
            let password = prompt(`Dame tu contrasena`) 
            let index =this.users.findIndex((user)=> (user.email === userCheck || user.username === userCheck))
            let validateUser = this.users[index !== -1? index: undefined]
            let validatePassword = validateUser.password

            if(validateUser=== undefined || validatePassword!== password ){
                alert('usuario o contrasena incorrecta') 
                return this.loginUser()
            }

            this.users[ validateUser.id-1].login= true 
            cartManager.addCart()
            userId=validateUser.id
            alert(`Feliz compra: ${validateUser.username}`)
            return console.log("carrito asignado")
        }
        
        if(resp === 2){ return alert(`Quizas en otro momento`)}
        
    }
}
    