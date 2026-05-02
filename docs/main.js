document.addEventListener('DOMContentLoaded', () => {
    // Reveal animation for bento cards on scroll
    const cards = document.querySelectorAll('.bento-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(card);
    });

    // Mock download button interaction
    const apkBtn = document.getElementById('apk-download-btn');
    if (apkBtn) {
        apkBtn.addEventListener('click', (e) => {
           
            const originalText = apkBtn.textContent;
            apkBtn.textContent = 'Downloading...';
            apkBtn.style.backgroundColor = 'var(--color-accent)';
            apkBtn.style.color = 'var(--color-secondary)';
            
            // Revert after 2 seconds
            setTimeout(() => {
                apkBtn.textContent = 'Downloaded!';
                setTimeout(() => {
                    apkBtn.textContent = originalText;
                    apkBtn.style.backgroundColor = '';
                    apkBtn.style.color = '';
                }, 1500);
            }, 2000);
        });
    }
});
