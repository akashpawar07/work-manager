import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar"
export default function porfileLayout({ children }) {

    return (
        <div>
            <Navbar />
            <div className="mx-4 my-4">
                {children}
            </div>
            <Footer/>
        </div>
    );
}