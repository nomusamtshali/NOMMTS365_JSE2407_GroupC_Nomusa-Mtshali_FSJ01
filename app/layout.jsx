import Footer from "./components/Footer";
import Header from "./components/Header";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head></head>
          <body><Header/>
          {children}
            
            <Footer />
 
          </body>
        
      </html>
    )
  }