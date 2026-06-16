document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Theme Toggle (Dark / Light Mode)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for preference, default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        if (isLight) {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // ----------------------------------------------------
    // Mobile Hamburger Menu
    // ----------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when clicking link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // ----------------------------------------------------
    // Sticky Header Styling on Scroll
    // ----------------------------------------------------
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    });

    // ----------------------------------------------------
    // Typing Effect
    // ----------------------------------------------------
    const typingSpan = document.getElementById('typing-text');
    const roles = [
        'Web-GIS Developer',
        'Project Scientist at INCOIS',
        'Ex-Research Scientist at ISRO',
        'Geospatial Engineer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Wait before starting deletion
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start Typing Effect
    if (typingSpan) {
        setTimeout(type, 1000);
    }

    // ----------------------------------------------------
    // Skills Filter Tabs
    // ----------------------------------------------------
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            skillTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Set width transition before trigger
                const progress = card.querySelector('.skill-progress');
                if (progress) {
                    const percent = progress.getAttribute('data-percent');
                    progress.style.width = '0';
                    
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            progress.style.width = percent + '%';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Trigger skills loading animation (initialize all widths)
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            const percent = progress.getAttribute('data-percent');
            progress.style.width = percent + '%';
        });
    }, 500);

    // ----------------------------------------------------
    // Certificates Search & Filter
    // ----------------------------------------------------
    const certSearch = document.getElementById('cert-search');
    const certFilterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card-item');

    function filterCertificates() {
        const query = certSearch.value.toLowerCase().trim();
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const filterVal = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

        certCards.forEach(card => {
            const title = card.querySelector('.cert-title').textContent.toLowerCase();
            const issuer = card.querySelector('.cert-issuer').textContent.toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(query) || issuer.includes(query);
            const matchesFilter = filterVal === 'all' || category === filterVal;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (certSearch) {
        certSearch.addEventListener('input', filterCertificates);
    }

    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            certFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterCertificates();
        });
    });

    // ----------------------------------------------------
    // Active Navigation Highlight on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navA = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a little before section enters the viewport
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navA.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // Contact Form Submission Handling
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Formulate mailto body
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            const mailtoUrl = `mailto:harishballu111@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Open user's default email client
            window.location.href = mailtoUrl;

            // Provide visual feedback
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Email Client...';
            submitBtn.style.background = 'var(--accent)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
});
