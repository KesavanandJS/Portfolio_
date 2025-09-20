/**
 * Liquid Fill Scroll to Top Button
 * Advanced scroll-to-top functionality with liquid fill animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get scroll percentage
    function getScrollPercent() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return docHeight === 0 ? 0 : Math.min(scrollTop / docHeight, 1);
    }

    let currentFill = 0;
    let targetFill = 0;
    let wavePhase = 0;
    const waveSpeed = 0.06; // Smooth wave animation

    function animateLiquid() {
        // Smoothly animate fill
        currentFill += (targetFill - currentFill) * 0.1;
        wavePhase += waveSpeed;
        updateLiquidFill(currentFill, wavePhase);
        requestAnimationFrame(animateLiquid);
    }

    function updateLiquidFill(percent, phase) {
        const liquidPath = document.getElementById('liquidPath');
        const liquidHighlight = document.getElementById('liquidHighlight');
        
        if (!liquidPath || !liquidHighlight) return;

        const radius = 28;
        const centerY = 30;
        const maxFill = 2 * radius;
        const fillHeight = maxFill * percent;
        const y = centerY + radius - fillHeight;

        // Animated wave path with smoother curves
        const waveWidth = 56;
        const waveHeight = 1.5 + 0.8 * Math.sin(phase/3);
        const waveCount = 2.8;
        let path = `M2,${y}`;
        
        for (let i = 0; i <= waveCount * 25; i++) {
            const x = 2 + (i * waveWidth) / (waveCount * 25);
            const angle = phase + (i / (waveCount * 25)) * waveCount * Math.PI * 2;
            const waveY = y + Math.sin(angle) * waveHeight * (1 - Math.abs(x - 30) / 30);
            path += ` L${x},${waveY}`;
        }
        path += ` L58,58 L2,58 Z`;

        liquidPath.setAttribute('d', path);

        // Move the highlight to follow the liquid surface
        const highlightY = Math.max(y - 6, 15);
        liquidHighlight.setAttribute('cy', highlightY);
        liquidHighlight.setAttribute('opacity', percent > 0.05 ? 0.3 : 0);
    }

    function handleScrollToTop() {
        targetFill = getScrollPercent();
        const btn = document.getElementById('back-to-top');
        if (btn) {
            if (targetFill > 0.1) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }
    }

    // Enhanced scroll to top with smooth animation
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click effect
            this.style.transform = 'translateY(-2px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Event listeners
    window.addEventListener('scroll', handleScrollToTop, { passive: true });
    window.addEventListener('resize', handleScrollToTop);

    // Initialize
    targetFill = getScrollPercent();
    handleScrollToTop();
    animateLiquid();
});
