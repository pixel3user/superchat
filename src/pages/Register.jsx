import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, getAuth, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm,setshowForm] = useState("email")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    

    try {
        if(showForm === "email"){
          console.log("email")
          const email = e.target[1].value;
          const password = e.target[2].value;
          const file = e.target[3].files[0];
          //Create user
          const res = await createUserWithEmailAndPassword(auth, email, password);

          //Create a unique image name
          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);

          await uploadBytesResumable(storageRef, file).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
                } catch (err) {
                  console.log(err);
                  setErr(true);
                  setLoading(false);
                }
              })
            })
        }
        
        if(showForm === "google"){
          const provider = new GoogleAuthProvider()
          const auth = getAuth()
          signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            async function updateUser(){
              try{
                await updateProfile(user, {
                  displayName,
                })
                console.log(user)
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                })
                await setDoc(doc(db, "userChats", user.uid), {})
              } catch(err){
                console.log(err)
              }
              navigate("/")
            }
            updateUser()
          }).catch((error) => {
            const errorCode = error.Code
            const errorMessage = error.message;
            const email = error.customData.email
            const credential = GoogleAuthProvider.credentialFromError(error)
          })
        }
        
        if(showForm === "facebook"){
          const provider = new FacebookAuthProvider()
          const auth = getAuth()
          signInWithPopup(auth,provider)
          .then((result) => {
            const user = result.user
            const credential = FacebookAuthProvider.credentialFromResult(result)
            const accessToken = credential.accessToken

            async function updateUser(){
              try{
                await updateProfile(user, {
                  displayName,
                })
                console.log("yoo")
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                })
                await setDoc(doc(db, "userChats", user.uid), {})
              } catch(err){
                console.log(err)
              }
              navigate("/")
            }
            updateUser()

          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credential = FacebookAuthProvider.credentialFromError(error)
          })
        }

        if(showForm === "twitter"){
          const provider = new TwitterAuthProvider()
          const auth = getAuth()
          signInWithPopup(auth,provider)
          .then((result) => {
            const credential = TwitterAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const secret = credential.secret
            const user = result.user
            async function updateUser(){
              try{
                await updateProfile(user, {
                  displayName,
                })
                console.log("yoo")
                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                })
                await setDoc(doc(db, "userChats", user.uid), {})
              } catch(err){
                console.log(err)
              }
              navigate("/")
            }
            updateUser()
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            const email = error.customData.email
            const credential = TwitterAuthProvider.credentialFromError(error)
          })
        }

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-dashboard-image justify-center items-center">
      <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 h-fit p-4 rounded-xl bg-gray-100">
        <span className="mx-auto my-3 font-bold text-xl text-gray-500">Super Chat</span>
        <span className="text-sm my-2 mx-auto font-semibold text-gray-600">Register</span>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" required type="text" placeholder="display name" />

          {showForm === "email" && (
            <>
              <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" required type="email" placeholder="email" />
              <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" required type="password" placeholder="password" />
              <input className="mx-5 my-3 p-3 text-md border-b-[2px] border-green-400 rounded-lg" required style={{ display: "none" }} type="file" id="file" />
              <label className="mx-auto my-4" htmlFor="file">
                <span className="flex justify-center items-center hover:cursor-pointer">
                  <img className="w-8" src={Add} alt="" />
                  Add profile pic
                </span>
              </label>
            </>
          )}

          <button className="w-fit mt-2 mx-auto bg-[#1a73e8] text-white text-sm p-2 rounded-lg hover:bg-[#1557ad]" disabled={loading}>Sign up with {showForm}</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>


        <span className="mx-auto mt-6 text-sm text-gray-600">or register with</span>
        <div className="flex flex-row mx-auto mt-2">
          <button className="rounded-lg p-1 mx-1 hover:bg-gray-300" onClick={() => setshowForm("google")}>
            <img className="w-8 h-8" src="/images/googleicon.svg" />
          </button>
          <button className="rounded-lg p-1 mx-1 hover:bg-gray-300" onClick={() => setshowForm("facebook")}>
            <img className="w-8 h-8" src="/images/facebookicon.svg" />
          </button>
          <button className="rounded-lg p-1 mx-1 hover:bg-gray-300" onClick={() => setshowForm("twitter")}>
            <img className="w-8 h-8" src="/images/twittericon.svg" />
          </button>
        </div>
        <p className="mx-auto mt-4 text-sm text-gray-600">
          You do have an account? <Link className="hover:text-[#1557ad]" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
