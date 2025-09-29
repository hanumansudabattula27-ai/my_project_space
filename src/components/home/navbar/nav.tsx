// "use client";
// import React from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {MenuIcon } from "lucide-react";

// type Props = {
//   openNav: () => void;
// };
// const IOIconMinimal = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="8" y="3" width="8" height="34" rx="4" fill="currentColor"/>
//     <rect x="4" y="3" width="16" height="8" rx="4" fill="currentColor"/>
//     <rect x="4" y="29" width="16" height="8" rx="4" fill="currentColor"/>
//     <circle cx="58" cy="20" r="15" stroke="currentColor" strokeWidth="7" fill="none"/>
//   </svg>
// );

// const Nav = ({ openNav }: Props) => {
//   const pathname = usePathname();
  
//   const [navBg, setNavBg] = React.useState(false);
  
//     React.useEffect(() => {   
//         const handleScroll = () => {
//             if (window.scrollY >= 90) {
//                 setNavBg(true);
//             }
//             if( window.scrollY < 90) {
//                 setNavBg(false);
//             }
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     },[]);

//     return (
//         <div className={`transition-all ${navBg ? "bg-blue-900 shadow-md" : "fixed"} 
//                 duration-200 h-[9vh] z-[100] fixed w-full to-blue-900`}
//             >
//             <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
//                 <div className="flex justify-between items-center h-16">
//                     <Link href="/" className="flex items-center space-x-2">
//                         <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 rounded-xl flex items-center 
//                         justify-center shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105">
//                             <IOIconMinimal className="w-7 h-7 text-white"/>     
//                         </div>
//                         <div className="flex flex-col">
//                             <h1 className="text-xl hidden sm:block md:text-2xl text-white font-bold bg-gradient-to-r from-white via-blue-100 
//                             to-pink-200 bg-clip-text text-transparent">
//                                 IDENTITY <span className="text-pink-400 font-light lowercase">ops</span>
//                             </h1>
//                             <span className="text-xs text-blue-200 hidden md:block font-medium">
//                                 Secure • Scalable • Smart
//                             </span>
//                         </div>
//                     </Link>
//                     <MenuIcon
//                     onClick={openNav}
//                     className="w-7 h-7 cursor-pointer lg:hidden"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Nav;


// "use client";
// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { MenuIcon, Sun, Moon } from "lucide-react";
// import { useTheme } from 'next-themes';

// type Props = { openNav: () => void; };

// const IOIconMinimal = ({ className }: { className?: string }) => (
//   <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect x="8" y="3" width="8" height="34" rx="4" fill="currentColor"/>
//     <rect x="4" y="3" width="16" height="8" rx="4" fill="currentColor"/>
//     <rect x="4" y="29" width="16" height="8" rx="4" fill="currentColor"/>
//     <circle cx="58" cy="20" r="15" stroke="currentColor" strokeWidth="7" fill="none"/>
//   </svg>
// );

// const Nav = ({ openNav }: Props) => {
//   const { theme, setTheme } = useTheme();
//   const [navBg, setNavBg] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);
//   useEffect(() => {
//     const handleScroll = () => setNavBg(window.scrollY >= 90);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Only render after 'mounted' to avoid hydration mismatch
//   if (!mounted) {
//     return (
//       <div className="transition-all duration-200 h-[9vh] z-[100] fixed w-full bg-transparent"></div>
//     );
//   }

//   const isDark = theme === 'dark';

//   return (
//     <div className={`transition-all duration-200 h-[9vh] z-[100] fixed w-full ${
//       isDark 
//         ? navBg ? "bg-blue-900 shadow-md" : "bg-transparent"
//         : navBg ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-transparent"
//     }`}>
//       <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
//         <div className="flex justify-between items-center h-16 w-full">
//           <Link href="/" className="flex items-center space-x-2">
//             <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
//               isDark 
//                 ? "bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 hover:shadow-pink-500/25"
//                 : "bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 hover:shadow-blue-500/25"
//             }`}>
//               <IOIconMinimal className="w-7 h-7 text-white"/>     
//             </div>
//             <div className="flex flex-col">
//               <h1 className={`text-xl hidden sm:block md:text-2xl font-bold ${
//                 isDark 
//                   ? "text-white bg-gradient-to-r from-white via-blue-100 to-pink-200 bg-clip-text text-transparent"
//                   : "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent"
//               }`}>
//                 IDENTITY <span className={`font-light lowercase ${isDark ? "text-pink-400" : "text-blue-500"}`}>ops</span>
//               </h1>
//               <span className={`text-xs hidden md:block font-medium ${
//                 isDark ? "text-blue-200" : "text-blue-600"
//               }`}>
//                 Secure • Scalable • Smart
//               </span>
//             </div>
//           </Link>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setTheme(isDark ? 'light' : 'dark')}
//               className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
//                 isDark 
//                   ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
//                   : "bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 border border-blue-200"
//               }`}
//               aria-label="Toggle theme"
//             >
//               {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//             <MenuIcon
//               onClick={openNav}
//               className={`w-7 h-7 cursor-pointer lg:hidden ${
//                 isDark ? "text-white" : "text-blue-700"
//               }`}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav;



"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuIcon, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
  openNav: () => void;
};

const IOIconMinimal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="3" width="8" height="34" rx="4" fill="currentColor"/>
    <rect x="4" y="3" width="16" height="8" rx="4" fill="currentColor"/>
    <rect x="4" y="29" width="16" height="8" rx="4" fill="currentColor"/>
    <circle cx="58" cy="20" r="15" stroke="currentColor" strokeWidth="7" fill="none"/>
  </svg>
);

const Nav = ({ openNav }: Props) => {
  const pathname = usePathname();
  const [navBg, setNavBg] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  
  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  React.useEffect(() => {   
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      }
      if( window.scrollY < 90) {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);

  return (
    <div className={`transition-all ${navBg ? "bg-teal-600 dark:bg-slate-800 shadow-md" : "bg-transparent"} 
            duration-200 h-[9vh] z-[100] fixed w-full`}
        >
        {/* Original colors kept in comments:
            ${navBg ? "bg-blue-900 shadow-md" : "fixed"}
        */}
        <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
            <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 rounded-xl flex items-center 
                    justify-center shadow-lg hover:shadow-teal-500/25 dark:hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                        {/* Original logo colors kept in comments:
                            from-pink-400 via-pink-500 to-purple-600
                            hover:shadow-pink-500/25
                        */}
                        <IOIconMinimal className="w-7 h-7 text-white"/>     
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl hidden sm:block md:text-2xl text-teal-900 dark:text-slate-100 font-bold">
                            {/* Original text styling kept in comments:
                                text-white font-bold bg-gradient-to-r from-white via-blue-100 to-pink-200 bg-clip-text text-transparent
                            */}
                            IDENTITY <span className="text-teal-600 dark:text-blue-400 font-light lowercase">ops</span>
                            {/* Original span styling: text-pink-400 */}
                        </h1>
                        <span className="text-xs text-teal-600 dark:text-slate-300 hidden md:block font-medium">
                            {/* Original span styling: text-blue-200 */}
                            Secure • Scalable • Smart
                        </span>
                    </div>
                </Link>
                
                {/* Theme toggle button - only show when mounted */}
                {mounted && (
                  <button
                      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                      className="p-2 rounded-lg bg-teal-100 dark:bg-slate-700 text-teal-600 dark:text-slate-300 hover:bg-teal-200 dark:hover:bg-slate-600 transition-colors mr-4"
                  >
                      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                )}
                
                <MenuIcon
                onClick={openNav}
                className="w-7 h-7 cursor-pointer lg:hidden text-teal-900 dark:text-slate-100"
                />
                {/* Original MenuIcon styling: no specific color classes */}
            </div>
        </div>
    </div>
  );
};

export default Nav;