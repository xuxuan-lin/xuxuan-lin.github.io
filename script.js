// 语言切换功能
let currentLanguage = localStorage.getItem('language') || 'zh';
const NEWS_PREVIEW_LIMIT = 5;
const PUBLICATIONS_PREVIEW_LIMIT = 5;
const setLoadingState = (isLoading) => {
    const overlay = document.getElementById('loadingOverlay');
    const container = document.querySelector('.container');

    if (overlay) {
        overlay.classList.toggle('hidden', !isLoading);
    }

    if (container) {
        container.setAttribute('aria-busy', isLoading ? 'true' : 'false');
    }
};

function placeNewsLinksOnNewLine(contentElement) {
    if (!contentElement) return;

    // Remove previously inserted breaks to avoid duplicates when switching languages
    contentElement.querySelectorAll('.news-link-break').forEach(br => br.remove());

    const links = contentElement.querySelectorAll('.news-link');
    if (links.length === 0) return;

    const br = document.createElement('br');
    br.classList.add('news-link-break');
    contentElement.insertBefore(br, links[0]);
}

// 设置当前年份
document.getElementById('currentYear').textContent = new Date().getFullYear();

// 语言切换函数
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // 更新按钮状态
    document.getElementById('langZh').classList.toggle('active', lang === 'zh');
    document.getElementById('langEn').classList.toggle('active', lang === 'en');

    // 先更新section-title中的span元素（特殊处理）
    const sectionTitles = document.querySelectorAll('.section-title[data-zh][data-en]');
    sectionTitles.forEach(title => {
        const span = title.querySelector('span');
        if (span) {
            const text = lang === 'zh' ? title.getAttribute('data-zh') : title.getAttribute('data-en');
            span.textContent = text;
        }
    });

    // 更新所有带有data-zh和data-en属性的元素
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
        if (element.id === 'easterEggToggle') return;
        // 跳过section-title（已经处理过了）和它的子元素，"更多"链接除外
        if (
            element.classList.contains('section-title') ||
            (element.closest('.section-title') && !element.classList.contains('more-link'))
        ) {
            return;
        }

        const content = lang === 'zh' ? element.getAttribute('data-zh') : element.getAttribute('data-en');
        if (element.tagName === 'TITLE') {
            document.title = content;
        } else if (
            element.id === 'researchText' ||
            element.classList.contains('research-content') ||
            element.classList.contains('publication-authors') ||
            element.classList.contains('news-content') ||
            element.classList.contains('award-name') ||
            element.classList.contains('award-note')
        ) {
            // 这些区域支持HTML内容（例如包含链接、加粗等）
            element.innerHTML = content;
            if (element.classList.contains('news-content')) {
                placeNewsLinksOnNewLine(element);
            }
        } else {
            element.textContent = content;
        }
    });

    // 更新社交媒体链接的title属性
    const socialLinks = document.querySelectorAll('[data-title-zh][data-title-en]');
    socialLinks.forEach(link => {
        const title = lang === 'zh' ? link.getAttribute('data-title-zh') : link.getAttribute('data-title-en');
        link.setAttribute('title', title);
    });
    updateEasterEggToggleText(lang);
}

function updateEasterEggToggleText(lang) {
    const toggleBtn = document.getElementById('easterEggToggle');
    if (!toggleBtn) return;

    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    const textZh = isExpanded
        ? (toggleBtn.getAttribute('data-zh-hide') || toggleBtn.getAttribute('data-zh'))
        : toggleBtn.getAttribute('data-zh');
    const textEn = isExpanded
        ? (toggleBtn.getAttribute('data-en-hide') || toggleBtn.getAttribute('data-en'))
        : toggleBtn.getAttribute('data-en');

    toggleBtn.textContent = lang === 'zh' ? textZh : textEn;
}

// 在 Publications 中插入“彩蛋”论文：通过小按钮切换显示/隐藏
function injectEasterEggPublication(lang) {
    const publicationsSection = document.getElementById('publications');
    const publicationsList = document.getElementById('publicationsList');
    if (!publicationsSection || !publicationsList) return;

    const sectionContent = publicationsSection.querySelector('.section-content');
    if (!sectionContent) return;

    // 可选：如果 content.js 里提供了 siteContent.easterEggPublication，则优先使用
    const defaultEgg = {
        title: {
            zh: '基于谷歌街景的印度语言景观调查研究',
            en: 'An Investigation of the Linguistic Landscape of Indian Multilingualism Based on Google Street View'
        },
        authors: {
            zh: '苏婧, <strong>林旭煊</strong>',
            en: 'SU Jing, <strong>LIN Xuxuan</strong>'
        },
        venue: {
            zh: '《南亚学》第 4 辑, 商务印书馆, 2024 年',
            en: 'South Asian Review, Vol. 4, The Commercial Press, 2024'
        },
        links: {
            pdf: 'files/PDF/基于谷歌街景的印度语言景观调查研究_苏婧.pdf',
            link: 'https://kns.cnki.net/kcms2/article/abstract?v=8XsFQqBkIewHUqKLyKWqAga_t5D5k_XUrhE7Vd02dx5T_5WiTxOXEo32z3cqlI2mZ1osMGvY7u6eB7BCUKT1BHQ0AtYMS4oN8k2bsLsCHdIgGiXLF0wyLzZt7c0Q86TtanCanp7ecTPOcbBIrtVDXhW8S4HqItKQ37pk4Mv0hu-c5CdGnJm5bjHA60kUSFUB'
        }
    };

    const eggData = (typeof siteContent !== 'undefined' && siteContent.easterEggPublication)
        ? siteContent.easterEggPublication
        : defaultEgg;

    // 1) 小按钮（避免重复插入）
    let toggleBtn = document.getElementById('easterEggToggle');
    if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'easterEggToggle';
        toggleBtn.type = 'button';
        toggleBtn.className = 'easter-egg-toggle';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('data-zh', '🤔 一篇“不务正业”的论文');
        toggleBtn.setAttribute('data-en', '🤔 A \"side hustle\" Paper');
        toggleBtn.setAttribute('data-zh-hide', '🙈 隐藏');
        toggleBtn.setAttribute('data-en-hide', '🙈 Hide');

        // 放在 publicationsList 之后（整个 Publications 区域最下面）
        sectionContent.insertBefore(toggleBtn, publicationsList.nextSibling);

        toggleBtn.addEventListener('click', () => {
            const egg = document.getElementById('easterEggPublication');
            if (!egg) return;
            const hidden = egg.style.display === 'none' || egg.style.display === '';
            egg.style.display = hidden ? 'flex' : 'none';
            toggleBtn.setAttribute('aria-expanded', hidden ? 'true' : 'false');
            updateEasterEggToggleText(currentLanguage);
        });
    }

    // 确保按钮始终位于 publicationsList 之后（列表重建后也保持在最下面）
    if (toggleBtn.parentElement === sectionContent && publicationsList.nextSibling !== toggleBtn) {
        sectionContent.insertBefore(toggleBtn, publicationsList.nextSibling);
    }

    // 让按钮文案与当前语言一致（同时也方便首次 loadContent 之后立即正确显示）
    updateEasterEggToggleText(lang);

    // 2) “彩蛋”论文条目（每次 publicationsList 被重建后都能重新注入）
    let eggItem = document.getElementById('easterEggPublication');
    if (!eggItem) {
        eggItem = document.createElement('div');
        eggItem.id = 'easterEggPublication';
        eggItem.className = 'publication-item easter-egg-publication';
        eggItem.style.display = 'none';

        const titleZh = eggData.title?.zh ?? defaultEgg.title.zh;
        const titleEn = eggData.title?.en ?? defaultEgg.title.en;
        const authorsZh = eggData.authors?.zh ?? defaultEgg.authors.zh;
        const authorsEn = eggData.authors?.en ?? defaultEgg.authors.en;
        const venueZh = eggData.venue?.zh ?? defaultEgg.venue.zh;
        const venueEn = eggData.venue?.en ?? defaultEgg.venue.en;
        const link = eggData.links?.link ?? defaultEgg.links.link;
        const pdf = eggData.links?.pdf ?? defaultEgg.links.pdf;

        eggItem.innerHTML = `
            <div class="publication-content">
                <div class="publication-title" data-zh="${titleZh}" data-en="${titleEn}">${lang === 'zh' ? titleZh : titleEn}</div>
                <div class="publication-authors" data-zh="${authorsZh}" data-en="${authorsEn}">${lang === 'zh' ? authorsZh : authorsEn}</div>
                <div class="publication-venue" data-zh="${venueZh}" data-en="${venueEn}">${lang === 'zh' ? venueZh : venueEn}</div>
                <div class="publication-links">
                    <a href="${pdf}" class="pub-link" target="_blank" rel="noopener">
                        <i class="fas fa-file-pdf"></i> 
                        <span data-zh="PDF" data-en="PDF">PDF</span>
                    </a>
                    <a href="${link}" class="pub-link" target="_blank" rel="noopener">
                        <i class="fas fa-link"></i>
                        <span data-zh="Link" data-en="Link">Link</span>
                    </a>
                </div>
            </div>
        `;

        publicationsList.appendChild(eggItem);
    } else {
        // 如果已存在但不在列表里，确保挂回去
        if (eggItem.parentElement !== publicationsList) {
            publicationsList.appendChild(eggItem);
        }
    }
}

function renderSocialLinks(links, lang) {
    const container = document.getElementById('socialLinks');
    if (!container) return;

    container.innerHTML = '';
    if (!Array.isArray(links)) return;

    links.forEach(link => {
        const anchor = document.createElement('a');
        anchor.className = 'social-link';

        if (link.url) {
            anchor.href = link.url;
        }

        const titleZh = link.title?.zh || '';
        const titleEn = link.title?.en || titleZh;
        if (titleZh || titleEn) {
            anchor.setAttribute('data-title-zh', titleZh);
            anchor.setAttribute('data-title-en', titleEn);
            anchor.setAttribute('title', lang === 'zh' ? titleZh : titleEn);
        }

        const icon = document.createElement('i');
        icon.className = link.icon || 'fas fa-link';
        anchor.appendChild(icon);

        container.appendChild(anchor);
    });
}

function removeElementById(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function renderMoreLink(sectionTitle, id, href, lang, textConfig) {
    if (!sectionTitle) return;
    removeElementById(id);

    const link = document.createElement('a');
    link.id = id;
    link.className = 'more-link';
    link.href = href;
    link.setAttribute('data-zh', textConfig.zh);
    link.setAttribute('data-en', textConfig.en);
    link.textContent = lang === 'zh' ? textConfig.zh : textConfig.en;

    sectionTitle.appendChild(link);
}

// 从content.js加载内容并应用到页面
function loadContent() {
    if (typeof siteContent === 'undefined') {
        console.error('siteContent is not defined. Make sure content.js is loaded before script.js');
        return;
    }

    const lang = currentLanguage;

    // 设置页面标题
    const titleEl = document.querySelector('title');
    if (titleEl) {
        titleEl.textContent = siteContent.title[lang];
        titleEl.setAttribute('data-zh', siteContent.title.zh);
        titleEl.setAttribute('data-en', siteContent.title.en);
    }

    // 设置基本信息
    const nameEl = document.getElementById('name');
    if (nameEl) {
        nameEl.textContent = siteContent.basicInfo.name[lang];
        nameEl.setAttribute('data-zh', siteContent.basicInfo.name.zh);
        nameEl.setAttribute('data-en', siteContent.basicInfo.name.en);
    }

    const schoolEl = document.getElementById('school');
    if (schoolEl) {
        schoolEl.textContent = siteContent.basicInfo.school[lang];
        schoolEl.setAttribute('data-zh', siteContent.basicInfo.school.zh);
        schoolEl.setAttribute('data-en', siteContent.basicInfo.school.en);
    }

    const gradeEl = document.getElementById('grade');
    if (gradeEl) {
        gradeEl.textContent = siteContent.basicInfo.grade[lang];
        gradeEl.setAttribute('data-zh', siteContent.basicInfo.grade.zh);
        gradeEl.setAttribute('data-en', siteContent.basicInfo.grade.en);
    }

    const majorEl = document.getElementById('major');
    if (majorEl) {
        majorEl.textContent = siteContent.basicInfo.major[lang];
        majorEl.setAttribute('data-zh', siteContent.basicInfo.major.zh);
        majorEl.setAttribute('data-en', siteContent.basicInfo.major.en);
    }

    renderSocialLinks(siteContent.socialLinks, lang);

    // 设置章节标题
    const aboutMeTitle = document.querySelector('#researchOverview .section-title');
    if (aboutMeTitle) {
        aboutMeTitle.setAttribute('data-zh', siteContent.sectionTitles.aboutMe.zh);
        aboutMeTitle.setAttribute('data-en', siteContent.sectionTitles.aboutMe.en);
        const span = aboutMeTitle.querySelector('span');
        if (span) span.textContent = siteContent.sectionTitles.aboutMe[lang];
    }

    const newsTitle = document.querySelector('#news .section-title');
    if (newsTitle) {
        newsTitle.setAttribute('data-zh', siteContent.sectionTitles.news.zh);
        newsTitle.setAttribute('data-en', siteContent.sectionTitles.news.en);
        const span = newsTitle.querySelector('span');
        if (span) span.textContent = siteContent.sectionTitles.news[lang];
    }

    const publicationsTitle = document.querySelector('#publications .section-title');
    if (publicationsTitle) {
        publicationsTitle.setAttribute('data-zh', siteContent.sectionTitles.publications.zh);
        publicationsTitle.setAttribute('data-en', siteContent.sectionTitles.publications.en);
        const span = publicationsTitle.querySelector('span');
        if (span) span.textContent = siteContent.sectionTitles.publications[lang];
    }

    const awardsTitle = document.querySelector('#awards .section-title');
    if (awardsTitle) {
        awardsTitle.setAttribute('data-zh', siteContent.sectionTitles.awards.zh);
        awardsTitle.setAttribute('data-en', siteContent.sectionTitles.awards.en);
        const span = awardsTitle.querySelector('span');
        if (span) span.textContent = siteContent.sectionTitles.awards[lang];
    }

    const servicesTitle = document.querySelector('#services .section-title');
    if (servicesTitle) {
        servicesTitle.setAttribute('data-zh', siteContent.sectionTitles.services.zh);
        servicesTitle.setAttribute('data-en', siteContent.sectionTitles.services.en);
        const span = servicesTitle.querySelector('span');
        if (span) span.textContent = siteContent.sectionTitles.services[lang];
    }

    // 设置关于我内容
    const researchTextEl = document.getElementById('researchText');
    if (researchTextEl) {
        researchTextEl.innerHTML = siteContent.aboutMe[lang];
        researchTextEl.setAttribute('data-zh', siteContent.aboutMe.zh);
        researchTextEl.setAttribute('data-en', siteContent.aboutMe.en);
    }

    // 加载新闻
    const newsSection = document.getElementById('news');
    const newsSectionTitle = newsSection?.querySelector('.section-title');
    const newsList = document.getElementById('newsList');
    if (newsList && siteContent.news) {
        newsList.innerHTML = '';
        const newsItems = Array.isArray(siteContent.news) ? siteContent.news : [];
        const limit = document.body.dataset.newsView === 'full' ? Infinity : NEWS_PREVIEW_LIMIT;
        removeElementById('newsMoreLink');

        newsItems.slice(0, limit).forEach(news => {
            const li = document.createElement('li');
            li.className = 'news-item';
            const dateSpan = document.createElement('span');
            dateSpan.className = 'news-date';
            dateSpan.textContent = news.date;
            const contentSpan = document.createElement('span');
            contentSpan.className = 'news-content';
            contentSpan.innerHTML = news.content[lang];
            contentSpan.setAttribute('data-zh', news.content.zh);
            contentSpan.setAttribute('data-en', news.content.en);
            placeNewsLinksOnNewLine(contentSpan);
            li.appendChild(dateSpan);
            li.appendChild(contentSpan);
            newsList.appendChild(li);
        });

        if (newsSectionTitle && newsItems.length > limit) {
            renderMoreLink(newsSectionTitle, 'newsMoreLink', 'news.html', lang, {
                zh: '更多',
                en: 'More'
            });
        }
    }

    // 加载论文
    const publicationsSection = document.getElementById('publications');
    const publicationsSectionTitle = publicationsSection?.querySelector('.section-title');
    const publicationsList = document.getElementById('publicationsList');
    if (publicationsList && siteContent.publications) {
        publicationsList.innerHTML = '';
        const publicationItems = Array.isArray(siteContent.publications) ? siteContent.publications : [];
        const limit = document.body.dataset.publicationsView === 'full' ? Infinity : PUBLICATIONS_PREVIEW_LIMIT;
        removeElementById('publicationsMoreLink');

        publicationItems.slice(0, limit).forEach(pub => {
            const div = document.createElement('div');
            div.className = 'publication-item';

            // 图片容器
            const imageContainer = document.createElement('div');
            imageContainer.className = 'publication-image-container';
            const imageLink = document.createElement('a');
            imageLink.href = pub.imageLink || '#';
            imageLink.className = 'publication-image-link';

            const img = document.createElement('img');
            img.src = pub.image || '';
            img.alt = '论文图片';
            img.className = 'publication-image';
            img.onerror = function () {
                this.style.display = 'none';
                const placeholder = this.nextElementSibling;
                if (placeholder) placeholder.style.display = 'flex';
            };

            const placeholder = document.createElement('div');
            placeholder.className = 'publication-image-placeholder';
            placeholder.style.display = 'none';
            placeholder.innerHTML = '<i class="fas fa-image"></i>';

            imageLink.appendChild(img);
            imageLink.appendChild(placeholder);
            imageContainer.appendChild(imageLink);

            // 内容容器
            const contentDiv = document.createElement('div');
            contentDiv.className = 'publication-content';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'publication-header';

            if (pub.badge && (pub.badge[lang] || pub.badge.zh || pub.badge.en)) {
                const badgeSpan = document.createElement('span');
                badgeSpan.className = 'publication-badge';
                badgeSpan.textContent = pub.badge[lang] || pub.badge.zh || pub.badge.en;
                if (pub.badge.zh) badgeSpan.setAttribute('data-zh', pub.badge.zh);
                if (pub.badge.en) badgeSpan.setAttribute('data-en', pub.badge.en);
                headerDiv.appendChild(badgeSpan);
            }

            const titleDiv = document.createElement('div');
            titleDiv.className = 'publication-title';
            titleDiv.textContent = pub.title[lang];
            titleDiv.setAttribute('data-zh', pub.title.zh);
            titleDiv.setAttribute('data-en', pub.title.en);
            headerDiv.appendChild(titleDiv);

            const authorsDiv = document.createElement('div');
            authorsDiv.className = 'publication-authors';
            authorsDiv.innerHTML = pub.authors[lang];
            authorsDiv.setAttribute('data-zh', pub.authors.zh);
            authorsDiv.setAttribute('data-en', pub.authors.en);

            const venueDiv = document.createElement('div');
            venueDiv.className = 'publication-venue';
            venueDiv.textContent = pub.venue[lang];
            venueDiv.setAttribute('data-zh', pub.venue.zh);
            venueDiv.setAttribute('data-en', pub.venue.en);

            const linksDiv = document.createElement('div');
            linksDiv.className = 'publication-links';
            linksDiv.innerHTML = `
                <a href="${pub.links.pdf}" class="pub-link"><i class="fas fa-file-pdf"></i> <span data-zh="PDF" data-en="PDF">PDF</span></a>
                <a href="${pub.links.link}" class="pub-link"><i class="fas fa-link"></i> <span data-zh="Link" data-en="Link">Link</span></a>
            `;

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(authorsDiv);
            contentDiv.appendChild(venueDiv);
            contentDiv.appendChild(linksDiv);

            div.appendChild(imageContainer);
            div.appendChild(contentDiv);
            publicationsList.appendChild(div);
        });
        injectEasterEggPublication(lang);

        if (publicationsSectionTitle && publicationItems.length > limit) {
            renderMoreLink(publicationsSectionTitle, 'publicationsMoreLink', 'publications.html', lang, {
                zh: '更多',
                en: 'More'
            });
        }
    }

    // 加载获奖情况
    const awardsList = document.getElementById('awardsList');
    if (awardsList && siteContent.awards) {
        awardsList.innerHTML = '';
        siteContent.awards.forEach(award => {
            const li = document.createElement('li');
            li.className = 'award-item';

            const dateSpan = document.createElement('span');
            dateSpan.className = 'award-date';
            dateSpan.textContent = award.date[lang];
            dateSpan.setAttribute('data-zh', award.date.zh);
            dateSpan.setAttribute('data-en', award.date.en);

            const nameSpan = document.createElement('span');
            nameSpan.className = 'award-name';
            nameSpan.innerHTML = award.name[lang];
            nameSpan.setAttribute('data-zh', award.name.zh);
            nameSpan.setAttribute('data-en', award.name.en);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'award-info';
            infoDiv.appendChild(nameSpan);

            if (award.note) {
                const noteSpan = document.createElement('span');
                noteSpan.className = 'award-note';
                noteSpan.innerHTML = award.note[lang];
                noteSpan.setAttribute('data-zh', award.note.zh);
                noteSpan.setAttribute('data-en', award.note.en);
                infoDiv.appendChild(noteSpan);
            }

            li.appendChild(dateSpan);
            li.appendChild(infoDiv);
            awardsList.appendChild(li);
        });
    }

    // 加载社会任职
    const servicesList = document.getElementById('servicesList');
    if (servicesList && siteContent.services) {
        servicesList.innerHTML = '';
        siteContent.services.forEach(service => {
            const li = document.createElement('li');
            li.className = 'service-item';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'service-title';
            titleDiv.textContent = service.title[lang];
            titleDiv.setAttribute('data-zh', service.title.zh);
            titleDiv.setAttribute('data-en', service.title.en);

            const orgDiv = document.createElement('div');
            orgDiv.className = 'service-org';
            orgDiv.textContent = service.org[lang];
            orgDiv.setAttribute('data-zh', service.org.zh);
            orgDiv.setAttribute('data-en', service.org.en);

            const periodDiv = document.createElement('div');
            periodDiv.className = 'service-period';
            periodDiv.textContent = service.period[lang];
            periodDiv.setAttribute('data-zh', service.period.zh);
            periodDiv.setAttribute('data-en', service.period.en);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'service-content';
            contentDiv.appendChild(titleDiv);
            contentDiv.appendChild(orgDiv);
            contentDiv.appendChild(periodDiv);

            li.innerHTML = '<i class="fas fa-briefcase"></i>';
            li.appendChild(contentDiv);
            servicesList.appendChild(li);
        });
    }

    // 设置页脚
    const footerText = document.querySelector('.footer span[data-zh]');
    if (footerText) {
        footerText.textContent = siteContent.footer[lang];
        footerText.setAttribute('data-zh', siteContent.footer.zh);
        footerText.setAttribute('data-en', siteContent.footer.en);
    }
}

// 页面加载时应用保存的语言设置并加载内容
document.addEventListener('DOMContentLoaded', function () {
    setLoadingState(true);

    try {
        // 先加载内容
        loadContent();
        // 然后应用语言设置
        switchLanguage(currentLanguage);
    } finally {
        setLoadingState(false);
    }
});

// 检查照片是否存在
const profilePhoto = document.getElementById('profilePhoto');
const photoPlaceholder = document.getElementById('photoPlaceholder');

profilePhoto.onload = function () {
    profilePhoto.classList.add('show');
    photoPlaceholder.classList.add('hidden');
};

profilePhoto.onerror = function () {
    profilePhoto.classList.remove('show');
    photoPlaceholder.classList.remove('hidden');
};

// 初始化时检查照片
if (profilePhoto.complete) {
    if (profilePhoto.naturalWidth > 0) {
        profilePhoto.classList.add('show');
        photoPlaceholder.classList.add('hidden');
    }
}

// 示例数据 - 您可以根据需要修改这些数据（支持双语）
const exampleData = {
    name: {
        zh: "您的姓名",
        en: "Your Name"
    },
    school: {
        zh: "学校名称",
        en: "University Name"
    },
    grade: {
        zh: "年级",
        en: "Grade/Year"
    },
    major: {
        zh: "专业",
        en: "Major"
    },
    socialLinks: [
        {
            title: { zh: "邮箱", en: "Email" },
            url: "mailto:your.email@example.com",
            icon: "fas fa-envelope",
        },
        {
            title: { zh: "GitHub", en: "GitHub" },
            url: "https://github.com/yourusername",
            icon: "fab fa-github",
        },
        {
            title: { zh: "Google Scholar", en: "Google Scholar" },
            url: "https://scholar.google.com/citations?user=yourid",
            icon: "fas fa-graduation-cap",
        },
        {
            title: { zh: "LinkedIn", en: "LinkedIn" },
            url: "https://www.linkedin.com/in/yourprofile",
            icon: "fab fa-linkedin",
        },
        {
            title: { zh: "Twitter", en: "Twitter" },
            url: "https://twitter.com/yourusername",
            icon: "fab fa-twitter",
        },
    ],
    research: {
        zh: "在这里填写您的研究方向、研究兴趣和主要研究内容。可以包括您的研究领域、方法论、以及您感兴趣的具体问题。",
        en: "Fill in your research directions, research interests, and main research content here. You can include your research areas, methodologies, and specific questions you are interested in."
    },
    news: [
        {
            date: "2024-01-15",
            content: {
                zh: "论文被XX会议接收",
                en: "Paper accepted by XX Conference"
            }
        },
        {
            date: "2024-01-10",
            content: {
                zh: "参加XX学术会议并做报告",
                en: "Attended XX academic conference and gave a presentation"
            }
        },
        {
            date: "2023-12-20",
            content: {
                zh: "获得XX奖学金",
                en: "Received XX Scholarship"
            }
        }
    ],
    publications: [
        {
            image: "publications/example.jpg",
            imageLink: "#",
            title: {
                zh: "论文标题示例",
                en: "Example Paper Title"
            },
            authors: {
                zh: "作者1, 作者2, 您的姓名",
                en: "Author1, Author2, Your Name"
            },
            venue: {
                zh: "会议/期刊名称, 年份",
                en: "Conference/Journal Name, Year"
            },
            links: {
                pdf: "#",
                code: "#",
                link: "#"
            }
        }
    ],
    awards: [
        {
            name: {
                zh: "奖项名称",
                en: "Award Name"
            },
            date: {
                zh: "年份",
                en: "Year"
            },
            note: {
                zh: "可选说明",
                en: "Optional note"
            }
        }
    ],
    services: [
        {
            title: {
                zh: "职位名称",
                en: "Position Title"
            },
            org: {
                zh: "组织/机构名称",
                en: "Organization Name"
            },
            period: {
                zh: "时间段",
                en: "Period"
            }
        }
    ]
};

// 如果您想使用示例数据，可以取消下面的注释
// loadExampleData();

function loadExampleData() {
    const lang = currentLanguage;

    // 加载基本信息
    const nameEl = document.getElementById('name');
    nameEl.textContent = exampleData.name[lang];
    nameEl.setAttribute('data-zh', exampleData.name.zh);
    nameEl.setAttribute('data-en', exampleData.name.en);

    const schoolEl = document.getElementById('school');
    schoolEl.textContent = exampleData.school[lang];
    schoolEl.setAttribute('data-zh', exampleData.school.zh);
    schoolEl.setAttribute('data-en', exampleData.school.en);

    const gradeEl = document.getElementById('grade');
    gradeEl.textContent = exampleData.grade[lang];
    gradeEl.setAttribute('data-zh', exampleData.grade.zh);
    gradeEl.setAttribute('data-en', exampleData.grade.en);

    const majorEl = document.getElementById('major');
    majorEl.textContent = exampleData.major[lang];
    majorEl.setAttribute('data-zh', exampleData.major.zh);
    majorEl.setAttribute('data-en', exampleData.major.en);

    renderSocialLinks(exampleData.socialLinks, lang);

    // 加载研究内容（支持HTML）
    const researchEl = document.getElementById('researchText');
    researchEl.innerHTML = exampleData.research[lang];
    researchEl.setAttribute('data-zh', exampleData.research.zh);
    researchEl.setAttribute('data-en', exampleData.research.en);

    // 加载新闻
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    exampleData.news.forEach(news => {
        const li = document.createElement('li');
        li.className = 'news-item';
        const contentSpan = document.createElement('span');
        contentSpan.className = 'news-content';
        contentSpan.innerHTML = news.content[lang];
        contentSpan.setAttribute('data-zh', news.content.zh);
        contentSpan.setAttribute('data-en', news.content.en);
        placeNewsLinksOnNewLine(contentSpan);
        li.innerHTML = `<span class="news-date">${news.date}</span>`;
        li.appendChild(contentSpan);
        newsList.appendChild(li);
    });

    // 加载论文
    const publicationsList = document.getElementById('publicationsList');
    publicationsList.innerHTML = '';
    exampleData.publications.forEach(pub => {
        const div = document.createElement('div');
        div.className = 'publication-item';

        // 图片容器
        const imageContainer = document.createElement('div');
        imageContainer.className = 'publication-image-container';
        const imageLink = document.createElement('a');
        imageLink.href = pub.imageLink || '#';
        imageLink.className = 'publication-image-link';

        const img = document.createElement('img');
        img.src = pub.image || '';
        img.alt = '论文图片';
        img.className = 'publication-image';
        img.onerror = function () {
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder) placeholder.style.display = 'flex';
        };

        const placeholder = document.createElement('div');
        placeholder.className = 'publication-image-placeholder';
        placeholder.style.display = 'none';
        placeholder.innerHTML = '<i class="fas fa-image"></i>';

        imageLink.appendChild(img);
        imageLink.appendChild(placeholder);
        imageContainer.appendChild(imageLink);

        // 内容容器
        const contentDiv = document.createElement('div');
        contentDiv.className = 'publication-content';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'publication-title';
        titleDiv.textContent = pub.title[lang];
        titleDiv.setAttribute('data-zh', pub.title.zh);
        titleDiv.setAttribute('data-en', pub.title.en);

        const authorsDiv = document.createElement('div');
        authorsDiv.className = 'publication-authors';
        authorsDiv.textContent = pub.authors[lang];
        authorsDiv.setAttribute('data-zh', pub.authors.zh);
        authorsDiv.setAttribute('data-en', pub.authors.en);

        const venueDiv = document.createElement('div');
        venueDiv.className = 'publication-venue';
        venueDiv.textContent = pub.venue[lang];
        venueDiv.setAttribute('data-zh', pub.venue.zh);
        venueDiv.setAttribute('data-en', pub.venue.en);

        const linksDiv = document.createElement('div');
        linksDiv.className = 'publication-links';
        linksDiv.innerHTML = `
            <a href="${pub.links.pdf}" class="pub-link"><i class="fas fa-file-pdf"></i> <span data-zh="PDF" data-en="PDF">PDF</span></a>
            <a href="${pub.links.code}" class="pub-link"><i class="fas fa-code"></i> <span data-zh="Code" data-en="Code">Code</span></a>
            <a href="${pub.links.link}" class="pub-link"><i class="fas fa-link"></i> <span data-zh="Link" data-en="Link">Link</span></a>
        `;

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(authorsDiv);
        contentDiv.appendChild(venueDiv);
        contentDiv.appendChild(linksDiv);

        div.appendChild(imageContainer);
        div.appendChild(contentDiv);
        publicationsList.appendChild(div);
    });
    injectEasterEggPublication(lang);

    // 加载获奖情况
    const awardsList = document.getElementById('awardsList');
    awardsList.innerHTML = '';
    exampleData.awards.forEach(award => {
        const li = document.createElement('li');
        li.className = 'award-item';

        const icon = document.createElement('i');
        icon.className = 'fas fa-medal';
        li.appendChild(icon);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'award-date';
        dateSpan.textContent = award.date[lang];
        dateSpan.setAttribute('data-zh', award.date.zh);
        dateSpan.setAttribute('data-en', award.date.en);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'award-name';
        nameSpan.textContent = award.name[lang];
        nameSpan.setAttribute('data-zh', award.name.zh);
        nameSpan.setAttribute('data-en', award.name.en);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'award-info';
        infoDiv.appendChild(nameSpan);

        if (award.note) {
            const noteSpan = document.createElement('span');
            noteSpan.className = 'award-note';
            noteSpan.textContent = award.note[lang];
            noteSpan.setAttribute('data-zh', award.note.zh);
            noteSpan.setAttribute('data-en', award.note.en);
            infoDiv.appendChild(noteSpan);
        }

        li.appendChild(dateSpan);
        li.appendChild(infoDiv);
        awardsList.appendChild(li);
    });

    // 加载社会任职
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = '';
    exampleData.services.forEach(service => {
        const li = document.createElement('li');
        li.className = 'service-item';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'service-title';
        titleDiv.textContent = service.title[lang];
        titleDiv.setAttribute('data-zh', service.title.zh);
        titleDiv.setAttribute('data-en', service.title.en);

        const orgDiv = document.createElement('div');
        orgDiv.className = 'service-org';
        orgDiv.textContent = service.org[lang];
        orgDiv.setAttribute('data-zh', service.org.zh);
        orgDiv.setAttribute('data-en', service.org.en);

        const periodDiv = document.createElement('div');
        periodDiv.className = 'service-period';
        periodDiv.textContent = service.period[lang];
        periodDiv.setAttribute('data-zh', service.period.zh);
        periodDiv.setAttribute('data-en', service.period.en);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'service-content';
        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(orgDiv);
        contentDiv.appendChild(periodDiv);

        li.innerHTML = '<i class="fas fa-briefcase"></i>';
        li.appendChild(contentDiv);
        servicesList.appendChild(li);
    });

    // 重新应用语言设置以确保所有新添加的元素也使用正确的语言
    switchLanguage(currentLanguage);
}

