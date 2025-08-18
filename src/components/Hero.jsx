import { HERO_CONTENT } from "../constants"
import profilePic from "../assets/Hero.jpeg"
import { motion } from "framer-motion"
import { FaDownload } from "react-icons/fa"
import cvFile from "../assets/YogevOfir_CV.pdf"

const container = (delay) => ({
    hidden: {x: -100, opacity: 0},
    visible: {
        x: 0, 
        opacity: 1,
        transition: {duration: 0.5, delay: delay},
    },
});

const Hero = () => {
  return <div className="border-b border-neutral-900 pb-4 lg:mb-35">
    <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
            <div className="flex flex-col items-center lg:items-start">
                <motion.h1
                 variants={container(0)}
                 initial="hidden"
                 animate="visible"
                 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
                 >
                    Yogev Ofir
                </motion.h1>
                <motion.span
                 variants={container(0.5)}
                 initial="hidden"
                 animate="visible"
                 className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">
                    Full Stack Developer
                </motion.span>
                <motion.p 
                 variants={container(1)}
                 initial="hidden"
                 animate="visible"
                 className="my-2 max-w-xl py-6 font-light tracking-tighter"
                >
                    {HERO_CONTENT}
                </motion.p>

                <motion.div
                 variants={container(1.3)}
                 initial="hidden"
                 animate="visible"
                 className="mt-6"
                >
                    <a
                     href={cvFile}
                     download="Yogev_Ofir_CV.pdf"
                     className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 px-6 py-3 text-white transition-all duration-300 hover:from-pink-300 hover:via-slate-600 hover:to-purple-600 hover:scale-105 hover:shadow-lg"
                    >
                        <FaDownload className="text-lg" />
                        Download Resume
                    </a>
                </motion.div>

            </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
            <div className="flex justify-center">
                <motion.img 
                 initial={{x: 100, opacity: 0}}
                 animate={{x: 0, opacity: 1}}
                 transition={{duration: 1, delay: 1.5}}
                 src={profilePic} alt="Yogev Ofir" />
            </div>
        </div>
    </div>
  </div>
}

export default Hero