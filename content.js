// 网站内容配置 - 所有双语内容集中管理
// 修改此文件即可更新网站内容，无需在index.html中查找

const siteContent = {
    // 页面标题
    title: {
        zh: "学术个人主页",
        en: "Academic Homepage"
    },

    // 基本信息
    basicInfo: {
        name: {
            zh: "林旭煊",
            en: "Xuxuan Lin (林旭煊)"
        },
        school: {
            zh: "清华大学",
            en: "Tsinghua University"
        },
        grade: {
            zh: "本科 2022 级（二字班）",
            en: "Senior Undergraduate"
        },
        major: {
            zh: "电子信息科学与技术",
            en: "Electronic Information Science and Technology"
        }
    },

    // 社交媒体链接标题
    socialLinks: {
        email: {
            zh: "邮箱",
            en: "Email"
        },
        github: {
            zh: "GitHub",
            en: "GitHub"
        },
        scholar: {
            zh: "Google Scholar",
            en: "Google Scholar"
        },
        linkedin: {
            zh: "LinkedIn",
            en: "LinkedIn"
        },
        twitter: {
            zh: "Twitter",
            en: "Twitter"
        }
    },

    // 章节标题
    sectionTitles: {
        aboutMe: {
            zh: "关于我",
            en: "About Me"
        },
        news: {
            zh: "最新动态",
            en: "News"
        },
        publications: {
            zh: "研究项目与论文",
            en: "Publications"
        },
        awards: {
            zh: "获奖情况",
            en: "Awards"
        },
        services: {
            zh: "社会任职",
            en: "Services"
        }
    },

    // 关于我 / 研究基本情况
    aboutMe: {
        zh: "<p style='margin-bottom: 10px; text-align: justify; text-justify: inter-ideograph'>你好，欢迎来到我的主页！我叫<strong>林旭煊</strong>，目前是清华大学电子工程系电子信息科学与技术专业的大四学生，本科阶段的 GPA 为 <strong>3.91/4.00</strong>。我系统学习了数学与物理基础、电磁场与电磁波、微波技术与射频电路、通信原理等课程，逐步打下了扎实的理论根基，并形成了较好的工程直觉。</p><p style='margin-bottom: 10px; text-align: justify; text-justify: inter-ideograph'>我的主要研究兴趣集中在<strong>电磁与射频理论</strong>、<strong>天线理论</strong>及其在无线通信中的应用，尤其关注受限平台上的高效辐射机理、电小天线，以及宽带 / 双极化天线的设计。未来，我希望在更系统的理论框架下理解复杂电磁结构的本质规律，并将这些规律转化为可工程实现的天线与射频前端方案，为新一代无线通信与感知系统提供支撑。</p><p style='text-align: justify; text-justify: inter-ideograph'>自 2023 年 11 月起，我加入清华大学<strong><a href='https://oa.ee.tsinghua.edu.cn/~liyue/index.html' target='_blank' style='text-decoration: none;'>李越副教授</a></strong>的课题组开展相关研究，并将继续留在课题组攻读博士学位。</p>",
        en: "<p style='margin-bottom: 10px; text-align: justify'>Hi, welcome to my homepage! My name is <strong>Xuxuan Lin</strong>. I am currently a senior undergraduate student in the Department of Electronic Engineering at Tsinghua University, majoring in Electronic Information Science and Technology. My undergraduate GPA is <strong>3.91/4.00</strong>.</p><p style='margin-bottom: 10px; text-align: justify'>Through coursework in mathematics and physics, electromagnetics, microwave technology and RF circuits, and communication theory, I have built a solid theoretical foundation and developed a good sense of engineering intuition.</p><p style='margin-bottom: 10px; text-align: justify'>My primary research interests lie in <strong>electromagnetic and RF theory</strong>, <strong>antenna theory</strong>, and their applications in wireless communications. In particular, I am interested in efficient radiation mechanisms on constrained platforms, electrically small antennas, and broadband / dual-polarized antenna designs. Looking ahead, I hope to understand the fundamental behavior of complex electromagnetic structures within a more systematic theoretical framework, and translate that understanding into practical antenna and RF front-end solutions for next-generation wireless communication and sensing systems.</p><p style='text-align: justify'>Since November 2023, I have been a member of <strong><a href='https://oa.ee.tsinghua.edu.cn/~liyue/index.html' target='_blank' style='text-decoration: none;'>Assoc. Prof. Yue Li</a></strong>'s research group at Tsinghua University, and I will continue my Ph.D. studies in the same group.</p>"
    },

    // 最新动态
    news: [
        {
            date: "2025-04-21",
            content: {
                zh: "🏆 我们的项目《面向路由器应用的宽带全向双极化天线设计》荣获清华大学“挑战杯”特等奖！",
                en: "🏆 Our project, “Broadband Omnidirectional Dual-Polarized Antenna Design for Router Applications,” received the Grand Prize (Special Award) in Tsinghua University’s “Challenge Cup” competition."
            }
        }
    ],

    // 研究项目与论文
    publications: [{
        image: "files/IMG/TAP_2025.png",
        imageLink: "https://doi.org/10.1109/TAP.2025.3634985",
        title: {
            zh: "An Extended Ohmic-Biased Transistor Antenna Enabling Signal Transmission for Integrated Sensing and Communication Application",
            en: "An Extended Ohmic-Biased Transistor Antenna Enabling Signal Transmission for Integrated Sensing and Communication Application"
        },
        authors: {
            zh: "Shuyu Wang (王述宇), <strong>Xuxuan Lin (林旭煊)</strong>, Yuxuan Wang (王宇轩), Yongjian Zhang (张永健), Le Chang (常乐), Kunpeng Wei (魏鲲鹏), Yue Li (李越)",
            en: "Shuyu Wang, <strong>Xuxuan Lin</strong>, Yuxuan Wang, Yongjian Zhang, Le Chang, Kunpeng Wei, Yue Li"
        },
        venue: {
            zh: "IEEE 天线与传播汇刊 (TAP), Early Access",
            en: "IEEE Transactions on Antennas and Propagation, Early Access"
        },
        links: {
            pdf: "#",
            link: "https://doi.org/10.1109/TAP.2025.3634985"
        }
    },
    {
        image: "files/IMG/APS_2025.png",
        imageLink: "#",
        title: {
            zh: "Broadband Omnidirectional Dual-Polarized Antenna using Multimode Coupling in Wi-Fi 6 Routers",
            en: "Broadband Omnidirectional Dual-Polarized Antenna using Multimode Coupling in Wi-Fi 6 Routers"
        },
        authors: {
            zh: "<strong>Xuxuan Lin (林旭煊)</strong>, Yongjian Zhang (张永健), Yue Li (李越)",
            en: "<strong>Xuxuan Lin</strong>, Yongjian Zhang, Yue Li"
        },
        venue: {
            zh: "IEEE 国际天线与传播会议 (AP-S), 2025",
            en: "IEEE International Symposium on Antennas & Propagation (AP-S), 2025"
        },
        links: {
            pdf: "files/PDF/APS_2025_LXX.pdf",
            link: "https://doi.org/10.1109/AP-S/CNC-USNC-URSI55537.2025.11266541"
        }
    }

        // 添加更多论文：
        // {
        //     image: "publications/paper2.jpg",
        //     imageLink: "#",
        //     title: {
        //         zh: "论文标题",
        //         en: "Paper Title"
        //     },
        //     authors: {
        //         zh: "作者列表",
        //         en: "Author List"
        //     },
        //     venue: {
        //         zh: "会议/期刊, 年份",
        //         en: "Conference/Journal, Year"
        //     },
        //     links: {
        //         pdf: "#",
        //         code: "#",
        //         link: "#"
        //     }
        // }
    ],

    // 获奖情况
    awards: [
       /* {
            title: {
                zh: "奖项名称",
                en: "Award Name"
            },
            date: {
                zh: "年份",
                en: "Year"
            }
        }*/
        // 添加更多奖项：
        // {
        //     title: {
        //         zh: "奖项名称",
        //         en: "Award Name"
        //     },
        //     date: {
        //         zh: "年份",
        //         en: "Year"
        //     }
        // }
    ],

    // 社会任职
    services: [
       /* {
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
        }*/
        // 添加更多任职：
        // {
        //     title: {
        //         zh: "职位名称",
        //         en: "Position Title"
        //     },
        //     org: {
        //         zh: "组织名称",
        //         en: "Organization Name"
        //     },
        //     period: {
        //         zh: "时间段",
        //         en: "Period"
        //     }
        // }
    ],

    // 页脚
    footer: {
        zh: "版权所有",
        en: "All Rights Reserved"
    }
};

