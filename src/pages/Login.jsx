import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const [err, setErr] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  }

  const googleLogin = async () => {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()
      signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user

        async function fetchUser(){
          const ref = doc(db,"users",user.uid)
          const docSnap = await getDoc(ref)
          if(!docSnap.exists()){
            signOut(auth)
            setErr("User not found, Please make a new account")
          }else{
            navigate("/")
          }
        }
        fetchUser()

      }).catch((error) => {
        const errorCode = error.Code
        const errorMessage = error.message;
        const email = error.customData.email
        const credential = GoogleAuthProvider.credentialFromError(error)
      })
  }

  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider()
          const auth = getAuth()
          signInWithPopup(auth,provider)
          .then((result) => {
            const user = result.user
            const credential = FacebookAuthProvider.credentialFromResult(result)
            const accessToken = credential.accessToken

            async function fetchUser(){
              const ref = doc(db,"users",user.uid)
              const docSnap = await getDoc(ref)
              if(!docSnap.exists()){
                signOut(auth)
                setErr("User not found, Please make a new account")
              }else{
                navigate("/")
              }
            }
            fetchUser()

          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credential = FacebookAuthProvider.credentialFromError(error)
          })
  }

  return (
    <div className="flex h-screen w-full bg-dashboard-image justify-center items-center">
      <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 h-fit p-4 rounded-xl bg-gray-100">
        <span className="mx-auto my-3 font-bold text-xl text-gray-500">Super Chat</span>
        <span className="text-sm my-2 mx-auto font-semibold text-gray-600">Login</span>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" type="email" placeholder="email" />
          <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" type="password" placeholder="password" />
          <button className="w-fit mx-auto bg-[#1a73e8] text-white text-sm p-2 rounded-lg hover:bg-[#1557ad]">Sign in</button>
          {err && <span>{err}</span>}
        </form>
        <span className="mx-auto mt-6 text-sm text-gray-600">or login with</span>
        <div className="flex flex-row mx-auto mt-2">
          <button className="rounded-lg p-1 mx-1 hover:bg-gray-300" onClick={googleLogin}>
            <img className="w-8 h-8" src="/images/googleicon.svg" />
          </button>
          <button className="rounded-lg p-1 mx-1 hover:bg-gray-300" onClick={facebookLogin}>
            <img className="w-8 h-8" src="/images/facebookicon.svg" />
          </button>
        </div>
        <p className="mx-auto mt-4 text-sm text-gray-600">You don't have an account? <Link className="hover:text-[#1557ad]" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
