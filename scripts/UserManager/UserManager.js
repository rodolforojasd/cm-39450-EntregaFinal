// import { signOut, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../firebase/config";




// const LoginScreen = () => {
//     values=""
//     password=""
//     const handleInputChange = (e) => {
//         setValues({
//             ...values,
//             [e.target.name]: e.target.value
//         })
//     }
// }
   

    

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         login(values)
//     }

// export const LoginProvider = ({children}) => {
//     const [user, setUser] = useState({
//         email: null,
//         logged: false,
//         uid: null
//     })

//     const googleLogin = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 console.log(result)
//             })
//     }

//     const login = (values) => {
//         signInWithEmailAndPassword(auth, values.email, values.password)
//             .catch((err) => console.log(err))
//     }

//     const register = (values) => {
//         createUserWithEmailAndPassword(auth, values.email, values.password)
//             .catch((err) => console.log(err.message))
//     }

//     const logout = () => {
//         signOut(auth)
//             .then(() => {
//                 setUser({
//                     email: null,
//                     logged: false,
//                     uid: null
//                 })
//             })
//     }

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log(user)
//                 setUser({
//                     email: user.email,
//                     logged: true,
//                     uid: user.uid
//                 })
//             } else {
//                 logout()
//             }
//         })
//     }, [])


//     return (
//         <LoginContext.Provider value={{
//             user,
//             register,
//             login,
//             logout,
//             googleLogin
//         }}>
//             {children}
//         </LoginContext.Provider>
//     )


    
// export const LoginProvider = ({children}) => {
//     const [user, setUser] = useState({
//         email: null,
//         logged: false,
//         uid: null
//     })

//     const googleLogin = () => {
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 console.log(result)
//             })
//     }

//     const login = (values) => {
//         signInWithEmailAndPassword(auth, values.email, values.password)
//             .catch((err) => console.log(err))
//     }

//     const register = (values) => {
//         createUserWithEmailAndPassword(auth, values.email, values.password)
//             .catch((err) => console.log(err.message))
//     }

//     const logout = () => {
//         signOut(auth)
//             .then(() => {
//                 setUser({
//                     email: null,
//                     logged: false,
//                     uid: null
//                 })
//             })
//     }

//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
//                 console.log(user)
//                 setUser({
//                     email: user.email,
//                     logged: true,
//                     uid: user.uid
//                 })
//             } else {
//                 logout()
//             }
//         })
//     }, [])


//     return (
//         <LoginContext.Provider value={{
//             user,
//             register,
//             login,
//             logout,
//             googleLogin
//         }}>
//             {children}
//         </LoginContext.Provider>