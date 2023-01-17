import React from "react";

function Footer() {
    return (
        <footer className="authFooter bg-dark text-light px-3 px-sm-5 py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2 className="footer_footerLogoFont__Lwfoy">
                            Bestlink ng Pinas
                        </h2>
                        <p>
                            This site is exclusively for Bestlink College of the
                            Philippines. It promotes quality education by the
                            use of web-based learning management.
                        </p>
                    </div>
                    <ul className="list-unstyled col-4 col-md-2 py-1">
                        <li className="pb-1">SITE MAP</li>
                        <li className="pb-1">LMS FAQ</li>
                        <li>SYSTEM</li>
                    </ul>
                    <ul className="list-unstyled col-4 col-md-2 py-1">
                        <li className="pb-1">SERVICES</li>
                        <li className="pb-1">SUPPORT</li>
                        <li>REFERENCES</li>
                    </ul>
                    <ul className="list-unstyled col-4 col-md-2 py-1">
                        <li className="pb-1">ABOUT US</li>
                        <li className="pb-1">CONTACT US</li>
                        <li className="pb-1">MISSION</li>
                        <li>VISION</li>
                    </ul>
                </div>
                <hr className="mb-0" />
                <div className="d-flex justify-content-center">
                    <a
                        href="https://www.linkedin.com/in/victor-jr-higoy-6a770320b"
                        className="footer_linkedin__T2fKv"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-linkedin p-3 fs-4 pe-none"></i>
                    </a>
                    <a
                        href="https://www.facebook.com/victor.higoy000/"
                        target="_blank"
                        rel="noreferrer"
                        className="footer_facebook__5X_ov"
                    >
                        <i className="bi bi-facebook p-3 fs-4"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/victorhigoy_/"
                        className="footer_instagram__k2e2M"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-instagram p-3 fs-4"></i>
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCFh3pDZZVNATBIk4sfJqWNw"
                        className="footer_youtube__IcE_A"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="bi bi-youtube p-3 fs-4"></i>
                    </a>
                    <a
                        href=""
                        className="footer_twitter__6QHO_"
                        target="_blank"
                    >
                        <i className="bi bi-twitter p-3 fs-4"></i>
                    </a>
                </div>
                <p className="text-center pt-2 footer_copyRight__D611A">
                    Bestlink <i className="bi bi-c-circle"></i> 2022
                </p>
                {/* <div className="footer_buttonUp__IJSuD">
                    <button
                        type="button"
                        className="btn btn-secondary btn-lg rounded-circle"
                    >
                        <a className="text-light" href="/#home">
                            <i className="bi bi-arrow-up-circle fs-2"></i>
                        </a>
                    </button>
                </div> */}
            </div>
        </footer>
    );
}

export default Footer;
