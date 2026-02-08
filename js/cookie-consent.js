// Cookie Consent Management
(function() {
    const CONSENT_KEY = 'cookie_consent';
    
    // Check if user explicitly declined
    function hasDeclined() {
        return localStorage.getItem(CONSENT_KEY) === 'declined';
    }
    
    // Check if user made any choice
    function hasChoice() {
        return localStorage.getItem(CONSENT_KEY) !== null;
    }
    
    // Load Microsoft Clarity
    function loadClarity() {
        if (window.clarityLoaded) return;
        window.clarityLoaded = true;
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "ve6pyqy11i");
    }
    
    // Save consent
    function acceptCookies() {
        localStorage.setItem(CONSENT_KEY, 'accepted');
        hideBanner();
    }
    
    function declineCookies() {
        localStorage.setItem(CONSENT_KEY, 'declined');
        hideBanner();
        // Disable Clarity if it was loaded
        if (window.clarity) {
            window.clarity('stop');
        }
    }
    
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'none';
        }
    }
    
    function showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }
    
    // Initialize
    function init() {
        // Load Clarity unless explicitly declined
        if (!hasDeclined()) {
            loadClarity();
        }
        
        // Show banner if no choice made yet
        if (!hasChoice()) {
            showBanner();
        }
    }
    
    // Expose functions globally
    window.cookieConsent = {
        accept: acceptCookies,
        decline: declineCookies
    };
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
