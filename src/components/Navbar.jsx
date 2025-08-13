import logo from "../assets/yoLogo.png"
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"
import { FaFacebook } from "react-icons/fa"


const Navbar = () => {
  return <nav className="mb-20 flex items-center justify-between py-6">
    <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-25 "src={logo} alt="logo" />
    </div>
    <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href="https://www.linkedin.com/in/yogev-ofir" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
        </a>
        <a href="https://github.com/YogevOfir" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.facebook.com/yogev.ofir" target="_blank" rel="noreferrer" aria-label="FaceBook">
          <FaFacebook />
        </a>
    </div>
  </nav>
}

export default Navbar