import { Footer } from "../components/layouts/Footer";
import { Navbar } from "../components/layouts/Navbar";
import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Education } from "../components/sections/Education";
import { Experience } from "../components/sections/Experience";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";

const Home = () => {
    return (
        <div>
            <Navbar />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;