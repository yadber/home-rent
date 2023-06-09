import React, { useEffect, useState } from "react";
import homeLogo from "../img/home-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState({
    headerTitle: "Sign in",
    headerLink : "/sign-in"
  });
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setPageState({headerTitle:"Profile", headerLink:"/profile"})
      }else{
        setPageState({headerTitle:"Sign in", headerLink:"/sign-in"})
      }
    })
  }, [auth])
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={homeLogo}
            alt="Home Rent Logo"
            className="h-12 cursor-pointer"
            onClick={()=>navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/") &&  "border-b-red-600 text-slate-950  bg-sky-200"
              } hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate("/")}

            >
              Home
            </li>
            <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              pathMathRoute("/offers") && "text-slate-950 border-b-red-600 bg-sky-200"
              }  hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate("/offers")}
              >
            Offers 
            </li>
            <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              (pathMathRoute("/sign-in") || pathMathRoute("/profile")) && "text-slate-950 border-b-red-600 bg-sky-200"
              }  hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate(pageState.headerLink)}
              >
            {pageState.headerTitle}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
