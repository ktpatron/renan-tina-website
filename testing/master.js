// ==========================================
// 1. GLOBAL SECURITY (Iwas Hackers)
// ==========================================
function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// ==========================================
// 2. ROHAN AI CHAT LOGIC
// ==========================================
function handleChatEnter(event) {
    if (event.key === 'Enter') sendChatMessage();
}

async function sendChatMessage() {
    const chatInputBox = document.getElementById('chatInput');
    const chatBodyArea = document.getElementById('chatBody');
    const typingStatus = document.getElementById('typingIndicator');
    const btnSend = document.querySelector('.chat-send');

    if (!chatInputBox) return;

    const rawMessage = chatInputBox.value.trim();
    if (!rawMessage) return;

    const safeMessage = sanitizeHTML(rawMessage); // Linisin ang text!

    appendMessage(safeMessage, 'user');
    chatInputBox.value = '';

    if (btnSend) btnSend.disabled = true;
    if (typingStatus) typingStatus.style.display = 'block';
    if (chatBodyArea) chatBodyArea.scrollTop = chatBodyArea.scrollHeight;

    try {
        const aiResponse = await askRohanAI(safeMessage); 
        if (typingStatus) typingStatus.style.display = 'none';
        appendMessage(aiResponse, 'bot');
    } catch (error) {
        console.error("AI Error:", error);
        if (typingStatus) typingStatus.style.display = 'none';
        appendMessage("Sorry, Captain Rohan is having signal issues.", 'bot');
    } finally {
        if (btnSend) btnSend.disabled = false;
    }
}

function appendMessage(text, sender) {
    const chatBodyArea = document.getElementById('chatBody');
    const typingStatus = document.getElementById('typingIndicator');
    if (!chatBodyArea) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerText = text; 
    
    if (typingStatus) {
        chatBodyArea.insertBefore(msgDiv, typingStatus);
    } else {
        chatBodyArea.appendChild(msgDiv);
    }
    chatBodyArea.scrollTop = chatBodyArea.scrollHeight; 
}

// ==========================================
// 3. SANITY CMS LOGIC (Para sa Homepage lang)
// ==========================================
async function loadHomepageData() {
    const pkgContainer = document.getElementById('sanityPackagesContainer');
    const advContainer = document.getElementById('sanityAdvisoryContainer');
    const dotsContainer = document.getElementById('sanityAdvisoryDots');
    
    if (!pkgContainer && !advContainer) return; 

    const PROJECT_ID = 'e4giu1sx'; 
    const DATASET = 'production';
    
    try {
        // --- A. HIGUPIN ANG PACKAGES ---
        if (pkgContainer) {
            const packagesQuery = encodeURIComponent('*[_type == "tourPackage"][0...10]{title, "slug": slug.current, category, duration, description, "imageUrl": mainImage.asset->url}');
            const packagesURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${packagesQuery}`;
            
            const pkgRes = await fetch(packagesURL);
            const pkgData = await pkgRes.json();
            
            if (pkgData.result.length > 0) {
                pkgContainer.innerHTML = ''; 
                pkgData.result.forEach((pkg, index) => {
                    const delayClass = `delay-${index + 1}`; 
                    const pkgCategory = pkg.category ? pkg.category.toLowerCase() : 'all'; 
                    pkgContainer.innerHTML += `
                        <div class="new-pkg-card ${delayClass} reveal active" data-category="${pkgCategory}">
                            <div class="new-pkg-img-wrap">
                                <img src="${pkg.imageUrl || 'https://via.placeholder.com/600x400'}" alt="${pkg.title}">
                                <a href="package-details.html?id=${pkg.slug}" class="booking-badge">Booking Open</a>
                            </div>
                            <div class="new-pkg-header">
                                <h3 class="new-pkg-title">${pkg.title}</h3>
                                <span class="new-pkg-price">${pkg.duration}</span>
                            </div>
                            <p class="new-pkg-desc" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">${pkg.description}</p>
                            <a href="package-details.html?id=${pkg.slug}" class="btn-outline-new">View Details ↗</a>
                        </div>`;
                });
                
                initFilters();
            }
        }

        // --- B. HIGUPIN ANG ADVISORIES AT PAGANAHIN ANG SLIDER ---
        if (advContainer && dotsContainer) {
            const advisoryQuery = encodeURIComponent('*[_type == "travelAdvisory"] | order(_createdAt desc)[0...3]{title, badge, description, bullets, "imageUrl": image.asset->url}');
            const advisoryURL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${advisoryQuery}`;

            const advRes = await fetch(advisoryURL);
            const advData = await advRes.json();

            if (advData.result.length > 0) {
                advContainer.innerHTML = '';
                dotsContainer.innerHTML = '';

                advData.result.forEach((adv, index) => {
                    let bulletsHTML = '';
                    if (adv.bullets) {
                        adv.bullets.forEach(b => bulletsHTML += `<li><i class="fas fa-check-circle"></i> ${b}</li>`);
                    }

                    const badgeColor = (adv.badge && adv.badge.toLowerCase() === 'update') ? 'background:var(--accent-neon);' : '';
                    const isActive = index === 0 ? 'active' : '';

                    advContainer.innerHTML += `
                        <div class="advisory-slide ${isActive}">
                            <div class="advisory-visual">
                                <div class="new-pkg-card">
                                    <div class="new-pkg-img-wrap" style="margin-bottom:0;">
                                        <img src="${adv.imageUrl || 'https://via.placeholder.com/800x600'}" alt="Travel Advisory">
                                        <div class="booking-badge" style="${badgeColor}">${adv.badge || 'Notice'}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="advisory-text">
                                <h3>${adv.title}</h3>
                                <p>${adv.description}</p>
                                <ul class="advisory-list">${bulletsHTML}</ul>
                            </div>
                        </div>`;

                    dotsContainer.innerHTML += `<div class="advisory-dot ${isActive}" data-slide="${index}"></div>`;
                });

                initAdvisorySlider();
            }
        }

    } catch (e) { 
        console.error("Sanity Fetch Error:", e); 
    }
}

// SLIDER LOGIC 
function initAdvisorySlider() {
    let currentAdvisory = 0;
    const advisorySlides = document.querySelectorAll('.advisory-slide');
    const advisoryDots = document.querySelectorAll('.advisory-dot');
    let advisoryInterval;

    if (advisorySlides.length === 0) return; 

    function showAdvisory(index) {
        advisorySlides.forEach(slide => slide.classList.remove('active'));
        advisoryDots.forEach(dot => dot.classList.remove('active'));
        advisorySlides[index].classList.add('active');
        advisoryDots[index].classList.add('active');
        currentAdvisory = index;
    }

    function startAdvisoryTimer() {
        advisoryInterval = setInterval(() => {
            let next = (currentAdvisory + 1) % advisorySlides.length;
            showAdvisory(next);
        }, 10000); 
    }

    advisoryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(advisoryInterval); 
            showAdvisory(index);
            startAdvisoryTimer(); 
        });
    });
    
    startAdvisoryTimer();
}

// ==========================================
// 4. LOAD EVERYTHING ON PAGE START
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Paganahin ang Filter sa KAHIT ANONG PAGE!
    initFilters();

    // B. Init Sanity CMS (Kung nasa homepage)
    loadHomepageData();

    // C. Chat UI Toggles
    const chatBtnOpen = document.getElementById('chatOpenBtn');
    const chatBtnClose = document.getElementById('chatCloseBtn');
    const chatWindowBox = document.getElementById('chatWindow');

    if (chatBtnOpen && chatWindowBox) {
        chatBtnOpen.onclick = () => {
            chatWindowBox.style.setProperty('display', 'flex', 'important');
            chatWindowBox.classList.add('active');
        };
    }
    if (chatBtnClose && chatWindowBox) {
        chatBtnClose.onclick = () => {
            chatWindowBox.style.setProperty('display', 'none', 'important');
            chatWindowBox.classList.remove('active');
        };
    }

    // D. Mobile Menu Toggle (SAFE MODE)
    // Palitan mo na lang yung '.mobile-menu-btn' at '.nav-links' ng totoong class names mo sa HTML
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); 
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // E. Form Security (Honeypot)
    const gSheetForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwCTMMxQts0wN0B-VzUn-6lEIfoZqHoWTxnrFC_d79wLJSCB7EiHqW7Lr419RS2xVJqDw/exec'; 

    if (gSheetForm) {
        gSheetForm.addEventListener('submit', e => {
            e.preventDefault(); 
            
            const trap = gSheetForm.querySelector('input[name="bot_catcher"]');
            if (trap && trap.value !== "") {
                console.log("Bot blocked.");
                alert('Success! Your inquiry has been sent.'); 
                gSheetForm.reset();
                return; 
            }

            if (submitBtn) {
                submitBtn.innerText = 'Sending securely...';
                submitBtn.disabled = true; 
            }

            fetch(scriptURL, { method: 'POST', body: new FormData(gSheetForm)})
                .then(() => {
                    alert('Success! Your inquiry has been sent.');
                    gSheetForm.reset();
                })
                .catch(error => console.error('Form Error:', error))
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.innerText = 'Connect Now';
                        submitBtn.disabled = false;
                    }
                });
        });
    }
});

// ==========================================
// 5. UNIVERSAL PACKAGE FILTERING LOGIC
// ==========================================
function initFilters() {
    const filterButtons = document.querySelectorAll('.new-filter-pill');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. Tanggalin yung "active" class sa lahat ng buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Ilagay yung "active" class sa mismong pinindot mo
            button.classList.add('active');

            // 3. Kunin kung anong category ang pinindot mo
            const targetCategory = button.getAttribute('data-filter').toLowerCase();

            // 4. Hanapin ang cards
            const packageCards = document.querySelectorAll('.new-pkg-card'); 

            // 5. I-check ang bawat package card
            packageCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category').toLowerCase();

                if (targetCategory === 'all' || targetCategory === cardCategory) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none'; 
                }
            });
        });
    });
}