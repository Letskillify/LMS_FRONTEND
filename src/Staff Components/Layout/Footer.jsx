import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            {/* <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                    <div className="mb-2 mb-md-0">
                        © 
                         {year}
                        , made with ❤️ by
                        <a href="https://brigasys.brigatech.com/" target="_blank" className="footer-link fw-bolder ms-1">Brigatech</a>
                    </div>
                    <div>
                        <a href="https://brigasys.brigatech.com/notfound" className="footer-link me-4" target="_blank">Terms & Conditions</a>
                        <a href="https://brigasys.brigatech.com/notfound" target="_blank" className="footer-link me-4">Privacy Policy</a>
                        <a href="https://brigasys.brigatech.com/notfound" target="_blank" className="footer-link me-4" >Documentation</a>
                        <a href="https://brigasys.brigatech.com/notfound" target="_blank" className="footer-link me-4">Support</a>
                    </div>
                </div>
            </footer> */}
        </>
    )
}

export default Footer
