import React from "react";
import homeLogo from "../img/home-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }
  
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
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
                pathMathRoute("/") &&  "text-slate-950 border-b-red-600"
              } hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate("/")}

            >
              Home
            </li>
            <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              pathMathRoute("/offers") && "text-slate-950 border-b-red-600"
              }  hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate("/offers")}
              >
            Offers
            </li>
            <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              pathMathRoute("/sign-in") && "text-slate-950 border-b-red-600"
              }  hover:bg-sky-50 hover:ring-sky-50`}
              onClick={()=>navigate("/sign-in")}
              >
            Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
