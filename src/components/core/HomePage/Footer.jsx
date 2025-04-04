import React from "react";
import "./Footer.css";
import Facebook from "../../../assests/Home/Facebook.png"
import Google from "../../../assests/Home/Google.png"
import X from "../../../assests/Home/x.png"
import Youtube from "../../../assests/Home/Youtube.png"


function Footer() {
    return(
        <div className="footerScreenBox">
            <div className="footerContainer">
                <div className="footerBox_1">
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[24px] text-richblack-50 font-semiBold">CodeKaro</ul>
                            <ul className="text-[16px] text-richblack-50 mb-2 mt-2 font-semiBold">Company</ul>
                            <ul>About</ul>
                            <ul>Careers</ul>
                            <ul>Afilliates</ul>
                        </div>
                        <div className="flex -mt-5 gap-x-5 w-[24px] h-[24px]">
                            <img src={Facebook} alt=""/>
                            <img src={Google} alt=""/>
                            <img src={X} alt=""/>
                            <img src={Youtube} alt=""/>
                        </div>
                    </div>
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Resources</ul>
                            <ul>Articles</ul>
                            <ul>Blog</ul>
                            <ul>Chart Sheet</ul>
                            <ul>Code Challenges</ul>
                            <ul>Docs</ul>
                            <ul>Projects</ul>
                            <ul>Videos</ul>
                            <ul>Workspaces</ul>
                        </div>
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Support</ul>
                            <ul>Help Center</ul>
                        </div>
                    </div>
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Plans</ul>
                            <ul>Paid memberships</ul>
                            <ul>For students</ul>
                            <ul>Business Solutions</ul>
                        </div>
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Community</ul>
                            <ul>Forums</ul>
                            <ul>Events</ul>
                            <ul>Chapters</ul>
                        </div>
                    </div>
                    <div className="borderLine border-r border-richblack-700"></div>
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Subjects</ul>
                            <ul>AI</ul>
                            <ul>Cloud Computing</ul>
                            <ul>Code Foundations</ul>
                            <ul>Computer Science</ul>
                            <ul>Cyber Security</ul>
                            <ul>Data Analytics</ul>
                            <ul>Data Science</ul>
                            <ul>Data Visualization</ul>
                            <ul>Developer Tools</ul>
                            <ul>DevOps</ul>
                            <ul>Game Development</ul>
                            <ul>IT</ul>
                            <ul>Machine Learing</ul>
                            <ul>Math</ul>
                            <ul>Mobile Development</ul>
                            <ul>Web Design</ul>
                            <ul>Web Development</ul>
                        </div>
                    </div>
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Languages</ul>
                            <ul>Bash</ul>
                            <ul>C</ul>
                            <ul>C++</ul>
                            <ul>C#</ul>
                            <ul>Go</ul>
                            <ul>HTML & CSS</ul>
                            <ul>Java</ul>
                            <ul>JavaScript</ul>
                            <ul>Kotlin</ul>
                            <ul>PHP</ul>
                            <ul>Python</ul>
                            <ul>R</ul>
                            <ul>Ruby</ul>
                            <ul>SQl</ul>
                            <ul>Swift</ul>
                        </div>
                    </div>
                    <div className="footerBoxParts">
                        <div>
                            <ul className="text-[16px] text-richblack-50 mb-2 font-semiBold">Career Building</ul>
                            <ul>Career Paths</ul>
                            <ul>Career Services</ul>
                            <ul>Interview Prep</ul>
                            <ul>Perofessional Certification</ul>
                            <ul>-</ul>
                            <ul>Full Catalog</ul>
                            <ul>Beta Content</ul>
                        </div>      
                    </div> 
                </div>      
            </div>
            <div className="w-11/12 max-w-[1250px]">
                <div className="border-t border-richblack-700 mb-10 pt-5 px-5 w-full items-center gap-y-2 
                                 mt-10 text-richblack-400 text-[14px] flex flex-wrap">
                    <div className="w-full flex justify-between flex-wrap copyRight">
                        <div className="gap-y-2 mx-4">Privacy Policy | Cookie Policy | Terms</div>
                        <div>Made with ❤️ Sunny @ 2025 CodeKaro </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        
    )
}

export default Footer;