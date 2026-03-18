document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0)`;

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover effects
    const links = document.querySelectorAll('a, .work-item, .back-to-top');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.backgroundColor = 'rgba(201, 166, 107, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
        });
    });

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.hero h1, .hero p, .section-header, .work-item, .about-image, .about-text');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Image Lazy Loading & Fade-in
    const images = document.querySelectorAll('.lazy-load');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        // Handle images already cached
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // 5. Project Modal Logic
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Project Data Mapping
    const projectData = {
        'project1': {
            title: '黑皮诺',
            category: '包装设计',
            date: '2026.01',
            size: '750ml / 礼盒装',
            artist: '设计师姓名',
            desc: '这款典藏版红酒包装设计旨在通过极简的视觉语言传达品牌的百年传承。黑白红的高对比色调不仅提升了货架辨识度，更赋予了产品一种深邃而优雅的仪式感。材质上选用了触感特种纸与烫金工艺，触手生温。',
            image: 'pinot-noir.jpg'
        },
        'project2': {
            title: '武夷岩茶 | 大红袍',
            category: '茶叶包装',
            date: '2025.11',
            size: '300g（100g×3）/ 礼盒装',
            artist: '设计师姓名',
            desc: '选自武夷山核心三坑两涧产区，包装设计灵感源于岩茶的炭焙工艺。通过深棕色调与岩石纹理的结合，展现大红袍“岩韵花香”的独特魅力。三款独立罐装规格，适合高端礼赠场景。',
            image: 'box-tea-premium.jpg'
        },
        'project3': {
            title: '醉客清酒',
            category: '酒类包装',
            date: '2025.08',
            size: '720ml / 磨砂玻璃',
            artist: '设计师姓名',
            desc: '以“醉客”为核心概念，采用磨砂瓶身配合宣纸质感的酒标。设计上运用了苍劲的书法字体与大面积留白，展现东方饮酒文化中那份洒脱与克制的平衡之美。',
            image: 'zuike.jpg'
        },
        'project4': {
            title: '苏格兰威士忌',
            category: '酒类包装',
            date: '2025.05',
            size: '700ml / 皮革纹理礼盒',
            artist: '设计师姓名',
            desc: '这款威士忌包装设计通过深琥珀色调与皮革纹理质感，传达出跨越世纪的匠心传承。考究的金属标签与复古火漆封印元素，进一步锁定了产品的尊享感与收藏价值。',
            image: 'sugelanweishiji.jpg'
        }
    };

    const workItems = document.querySelectorAll('.work-item');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalSize = document.getElementById('modalSize');
    const modalArtist = document.getElementById('modalArtist');
    const modalDesc = document.getElementById('modalDesc');
    const modalViewCase = document.getElementById('modalViewCase');
    const modalBackToDetail = document.getElementById('modalBackToDetail');
    const modalWrapper = document.querySelector('.modal-content-wrapper');
    const modalCase = document.getElementById('modalCase');
    const caseTitle = document.getElementById('caseTitle');
    const caseCategory = document.getElementById('caseCategory');
    const caseStatus = document.getElementById('caseStatus');
    const caseGrid = document.getElementById('caseGrid');
    const caseBackToDetail = document.getElementById('caseBackToDetail');
    let currentProjectId = null;

    workItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-id');
            const data = projectData[projectId];
            
            if (data) {
                currentProjectId = projectId;
                if (projectModal) {
                    projectModal.dataset.currentId = projectId;
                }
                modalWrapper.classList.remove('show-case');

                // Populate Modal
                modalImage.src = data.image;
                modalCategory.textContent = data.category;
                modalTitle.textContent = data.title;
                modalDate.textContent = data.date;
                modalSize.textContent = data.size;
                modalArtist.textContent = data.artist;
                modalDesc.textContent = data.desc;

                // Open Modal
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            }
        });
    });

    function setCaseStatus(text) {
        if (!caseStatus) return;
        caseStatus.textContent = text;
    }

    function clearCaseGrid() {
        if (!caseGrid) return;
        caseGrid.innerHTML = '';
    }

    function createCaseItem(src, variant) {
        const wrapper = document.createElement('div');
        wrapper.className = `case-item ${variant || ''}`.trim();

        const img = document.createElement('img');
        img.alt = '案例图片';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = src;

        img.addEventListener('load', () => {
            wrapper.classList.add('loaded');
        });

        wrapper.appendChild(img);
        return wrapper;
    }

    function setImgSrcWithFade(imgEl, src) {
        if (!imgEl) return;
        imgEl.classList.remove('loaded');
        imgEl.src = src;
        if (imgEl.complete) {
            imgEl.classList.add('loaded');
        }
    }

    function tryLoadImage(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    async function findFirstZuikeImage() {
        const folder = 'zuikejia';
        const exts = ['jpg', 'jpeg', 'png', 'webp'];
        const patterns = [
            (i) => `${i}`,
            (i) => `${String(i).padStart(2, '0')}`,
            (i) => `${String(i).padStart(3, '0')}`,
            (i) => `zuike-${i}`,
            (i) => `case-${i}`
        ];

        const maxCount = 30;
        for (let i = 1; i <= maxCount; i += 1) {
            for (const p of patterns) {
                const base = p(i);
                for (const ext of exts) {
                    const url = `${folder}/${base}.${ext}`;
                    // eslint-disable-next-line no-await-in-loop
                    const ok = await tryLoadImage(url);
                    if (ok) return url;
                }
            }
        }
        return null;
    }

    async function loadZuikeGallery() {
        if (!caseGrid || !modalWrapper) return;

        const folder = 'zuikejia';
        const exts = ['jpg', 'jpeg', 'png', 'webp'];
        const patterns = [
            (i) => `${i}`,
            (i) => `${String(i).padStart(2, '0')}`,
            (i) => `${String(i).padStart(3, '0')}`,
            (i) => `zuike-${i}`,
            (i) => `case-${i}`
        ];

        clearCaseGrid();
        caseCategory.textContent = '案例画廊';
        caseTitle.textContent = '醉客清酒 · 案例展示';
        setCaseStatus('正在加载图片…');

        const maxCount = 30;
        let loadedCount = 0;
        const variants = ['case-wide', 'case-square', 'case-tall', 'case-square', 'case-square', 'case-wide'];

        for (let i = 1; i <= maxCount; i += 1) {
            let found = false;

            for (const p of patterns) {
                const base = p(i);
                for (const ext of exts) {
                    const url = `${folder}/${base}.${ext}`;
                    // eslint-disable-next-line no-await-in-loop
                    const ok = await tryLoadImage(url);
                    if (ok) {
                        const variant = variants[(loadedCount) % variants.length];
                        caseGrid.appendChild(createCaseItem(url, variant));
                        loadedCount += 1;
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }
        }

        if (loadedCount === 0) {
            setCaseStatus('未找到图片。请将图片放入“zuikejia”文件夹，并命名为 1.jpg / 2.jpg / 3.jpg…（也支持 01.jpg、001.jpg、png/webp）。');
        } else {
            setCaseStatus(`已加载 ${loadedCount} 张图片`);
        }
    }

    (async () => {
        const firstZuike = await findFirstZuikeImage();
        if (!firstZuike) return;

        if (projectData.project3) {
            projectData.project3.image = firstZuike;
        }

        const project3CardImg = document.querySelector('.work-item[data-id="project3"] .work-image img');
        setImgSrcWithFade(project3CardImg, firstZuike);
    })();

    function openCaseView() {
        if (!modalWrapper) return;
        modalWrapper.classList.add('show-case');
        modalWrapper.scrollTop = 0;
    }

    function backToDetailView() {
        if (!modalWrapper) return;
        modalWrapper.classList.remove('show-case');
    }

    if (modalViewCase) {
        modalViewCase.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const pid = currentProjectId || (projectModal ? projectModal.dataset.currentId : null);

            if (pid !== 'project3') {
                openCaseView();
                clearCaseGrid();
                caseCategory.textContent = '案例画廊';
                caseTitle.textContent = '暂无案例';
                setCaseStatus('该作品暂未配置本地案例图片。');
                return;
            }

            openCaseView();
            await loadZuikeGallery();
        });
    }

    if (modalBackToDetail) {
        modalBackToDetail.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            backToDetailView();
        });
    }

    if (caseBackToDetail) {
        caseBackToDetail.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            backToDetailView();
        });
    }

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
        currentProjectId = null;
        if (modalWrapper) modalWrapper.classList.remove('show-case');
    }

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 6. Smooth Scrolling for Links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
