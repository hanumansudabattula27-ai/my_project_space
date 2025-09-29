// // app/layout.tsx
// import NavWrapper from "@/components/home/navbar/navwrapper";
// import "./globals.css";
// import { CommandMenu } from "@/components/ui/command-menu";
// import SmoothScrolling from "@/components/ui/smooth-scrolling";
// import { ThemeProvider } from "next-themes"; 

// export const metadata = {
//   title: 'IO Platform',
//   description: 'Modern IO Platform with Next.js',
// };
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//          {/* <div className="fixed inset-0 overflow-hidden pointer-events-none">
//            <div className="stars"></div>
//            <div className="stars2"></div>
//            <div className="stars3"></div>
//          </div> */}
             
//               <CommandMenu />
//              <SmoothScrolling> 
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <NavWrapper/>
//           {children}
//         </ThemeProvider>
//           </SmoothScrolling> 

        
//       </body>
//     </html>
//   );
// }



import { ThemeProvider } from "@/components/home/navbar/themeprovider";
import NavWrapper from "@/components/home/navbar/navwrapper";
import "./globals.css";
import { CommandMenu } from "@/components/ui/command-menu";
import SmoothScrolling from "@/components/ui/smooth-scrolling";

export const metadata = {
  title: 'IO Platform',
  description: 'Modern IO Platform with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
         <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          </div>
        <CommandMenu />
        <SmoothScrolling>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavWrapper />
            {children}
          </ThemeProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}