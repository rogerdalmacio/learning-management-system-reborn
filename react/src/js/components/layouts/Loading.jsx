import React from "react";
import logoPng from "/images/newLogin/logo.png";

function Loading() {
    return (
        <div class="loader">
            <div class="loading-animation">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <img src={logoPng} alt="bestlink-logo" />
                </div>
            </div>
        </div>
    );
}

export default Loading;
