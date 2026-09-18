import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Asterisk,
  Camera,
  Check,
  Clapperboard,
  Mail,
  Menu,
  MonitorPlay,
  Phone,
  Play,
  Sparkles,
  X,
} from 'lucide-react'

const projects = [
  {
    id: '01',
    title: '红土之上',
    category: '坚持与风格的生活态度',
    description: '阳光洒在赭红色的红土球场上，球鞋与地面摩擦出细碎的尘土，每一次触地都写满专注。',
    metric: '品牌宣传',
    image: '/assets/project-red-clay-cover.png',
    hoverVideo: '/assets/hongtu-zhishang.mp4',
    modalVideo: '/assets/commercial-ad.mp4',
    tone: 'red',
  },
  {
    id: '02',
    title: '教育内容矩阵',
    category: '短视频 / 讲师 IP / 课程',
    description: '围绕讲师专业表达建立可持续的视频内容体系，兼顾信息密度、节奏与平台传播效率。',
    metric: '每周 6–10 条',
    image: '/assets/project-education-douyin.jpg',
    link: 'https://v.douyin.com/3GBd40-cbvc/',
    tone: 'blue',
  },
  {
    id: '03',
    title: '品牌活动影像',
    category: '拍摄 / 快剪 / 直播协作',
    description: '记录现场，也重构现场。完成活动拍摄、直播流程协作与多平台版本交付。',
    metric: '全流程执行',
    image: '/assets/three-minutes-cover.png',
    video: '/assets/three-minutes-thirty-years.mp4',
    clickToPlay: true,
    tone: 'yellow',
  },
]

const capabilities = [
  {
    number: '01',
    icon: Clapperboard,
    title: '叙事剪辑',
    text: '从素材筛选到结构重组，把复杂信息剪成清晰、好看且有记忆点的内容。',
    tags: ['节奏把控', '信息流', '情绪设计'],
    color: 'yellow',
    video: '/assets/life-not-one-way.mp4',
    videoLabel: '人生不是单行道',
  },
  {
    number: '02',
    icon: Camera,
    title: '拍摄执行',
    text: '能独立完成脚本拆解、人物采访、现场拍摄和基础灯光场景搭建。',
    tags: ['人物采访', '活动记录', '场景搭建'],
    color: 'red',
    video: '/assets/allow-breakdown-before-dawn.mp4',
    videoLabel: '允许自己崩溃，但别倒在天亮前',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'AI 工作流',
    text: '将 AI 用于素材生成、画面优化和创意迭代，提升产能与内容质感。',
    tags: ['素材生成', '画面优化', '创意提效'],
    color: 'blue',
    collection: true,
  },
  {
    number: '04',
    icon: MonitorPlay,
    title: '多端交付',
    text: '根据不同平台的尺寸、时长和字幕规范，完成统一又准确的版本适配。',
    tags: ['版本管理', '字幕包装', '平台适配'],
    color: 'cream',
    platformCollection: true,
  },
]

const process = ['需求拆解', '脚本与素材', '剪辑成片', '反馈精修', '多端交付']

const aiCollection = [
  {
    number: '01',
    category: 'PRODUCT FILM / 2026',
    title: '耳机广告',
    description: '用声音、节奏和细节，把产品的触感剪成一段可以被记住的画面。',
    video: '/assets/headphone-ad.mp4',
    tone: 'pink',
  },
  {
    number: '02',
    category: 'BRAND FILM / 2026',
    title: '香水广告',
    description: '让气味拥有视觉性，在光影、材质和情绪之间建立一条叙事线。',
    video: '/assets/perfume-ad.mp4',
    tone: 'aqua',
  },
  {
    number: '03',
    category: 'AI STORY / 2026',
    title: 'AI 小漫剧',
    description: '从角色设定到镜头节奏，探索 AI 参与内容创作后的新型叙事方式。',
    video: '/assets/ai-mini-series.mp4',
    tone: 'orange',
  },
  {
    number: '04',
    category: 'SHORT FORM / 2026',
    title: '广告（搞笑）',
    description: '把反差、节奏和笑点放在同一条剪辑线上，让信息更轻地抵达观众。',
    video: '/assets/funny-ad.mp4',
    tone: 'lime',
  },
]

const platformCollection = [
  {
    number: '01',
    category: 'DOUYIN / ACCOUNT OPERATION',
    title: '抖音账号运营',
    description: '围绕教育品牌建立短视频内容矩阵，统一封面表达、栏目节奏与账号视觉识别。',
    image: '/assets/platform-douyin.png',
    tone: 'pink',
  },
  {
    number: '02',
    category: 'XIAOHONGSHU / CONTENT DESIGN',
    title: '小红书内容运营',
    description: '用清晰的信息层级和系列化版式，让课程与备考内容更易阅读、收藏和传播。',
    image: '/assets/platform-xiaohongshu.png',
    tone: 'aqua',
  },
  {
    number: '03',
    category: 'WECHAT CHANNEL / VIDEO MATRIX',
    title: '视频号内容矩阵',
    description: '覆盖人物、基地与栏目内容，在多种选题中保持统一的品牌形象与交付标准。',
    image: '/assets/platform-wechat-channel.png',
    tone: 'orange',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [playingProject, setPlayingProject] = useState(null)
  const [modalProject, setModalProject] = useState(null)
  const [capabilityVideo, setCapabilityVideo] = useState(null)
  const [collectionOpen, setCollectionOpen] = useState(false)
  const [platformCollectionOpen, setPlatformCollectionOpen] = useState(false)
  const hoverVideoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.14 },
    )

    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!modalProject && !capabilityVideo && !collectionOpen && !platformCollectionOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModalProject(null)
        setCapabilityVideo(null)
        setCollectionOpen(false)
        setPlatformCollectionOpen(false)
      }
    }
    document.body.classList.add('modal-open')
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [modalProject, capabilityVideo, collectionOpen, platformCollectionOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleProjectHover = (project) => {
    if (!project.hoverVideo) return
    setPlayingProject(project.id)
    window.requestAnimationFrame(() => {
      hoverVideoRef.current?.play().catch(() => {})
    })
  }

  const handleProjectLeave = (project) => {
    if (!project.hoverVideo) return
    hoverVideoRef.current?.pause()
    hoverVideoRef.current = null
    setPlayingProject(null)
  }

  return (
    <main>
      <section className="hero" id="home">
        <header className="nav shell">
          <a className="brand" href="#home" aria-label="返回首页">
            <span className="brand-mark">ZX.</span>
            <span>ZHANG XIAOYING<br /><small>VIDEO EDITOR</small></span>
          </a>

          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
            <a href="#about" onClick={closeMenu}>关于</a>
            <a href="#work" onClick={closeMenu}>作品</a>
            <a href="#skills" onClick={closeMenu}>能力</a>
            <a href="#contact" onClick={closeMenu}>联系</a>
          </nav>

          <a className="contact-pill" href="mailto:2726713214@qq.com">
            开始合作 <ArrowUpRight size={17} strokeWidth={2.4} />
          </a>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </header>

        <div className="hero-content shell">
          <div className="hero-copy">
            <div className="hero-kicker"><span /> VIDEO EDITOR · SHENZHEN</div>
            <h1>
              STORIES<br />
              <span>THAT STICK.</span>
            </h1>
            <h2>剪出会留下的故事。</h2>
            <p className="hero-intro">把零散素材变成有节奏、有重点，也有人格感的内容。</p>
            <a className="showreel-link" href="#work">
              <span className="play-orbit"><Play size={20} fill="currentColor" /></span>
              看我的作品
            </a>
          </div>

          <div className="hero-character" aria-label="张晓英卡通形象">
            <div className="character-backdrop" />
            <img src="/assets/hero-character.png" alt="张晓英卡通形象" />
            <div className="character-label">FRAME BY FRAME</div>
          </div>

          <div className="hero-notes">
            <div className="speech-bubble">HI! I'M<br /><strong>XIAOYING</strong></div>
            <div className="burst-note">GOOD<br />IDEAS!</div>
            <div className="idea-note">
              <span>IDEAS WITH</span>
              <strong>PERSONALITY</strong>
            </div>
            <ul>
              <li>SHORT VIDEO</li>
              <li>BRAND STORY</li>
              <li>IP CONTENT</li>
              <li>AI WORKFLOW</li>
            </ul>
            <div className="squiggle" aria-hidden="true">〰</div>
          </div>
        </div>

        <div className="hero-meta shell">
          <div><strong>3+</strong><span>年影像经验</span></div>
          <p>短视频 / 品牌宣传 / IP 内容 / 直播视觉</p>
          <a href="#about" aria-label="向下浏览">继续认识我 <ArrowDownRight size={22} /></a>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="shell">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">01 / ABOUT</span>
            <h2>剪辑不只是拼接，<br /><span>是重新组织观看的方式。</span></h2>
          </div>

          <div className="about-grid">
            <figure className="portrait-wrap" data-reveal>
              <div className="portrait-frame">
                <img src="/assets/zhang-xiaoying-portrait.jpg" alt="张晓英个人照片" />
                <span className="portrait-label">HI, I'M XIAOYING!</span>
              </div>
              <figcaption>
                <span>张晓英</span>
                <span>视频剪辑师</span>
              </figcaption>
            </figure>

            <div className="about-copy" data-reveal>
              <Asterisk className="about-star" size={35} />
              <p className="lead">
                你好，我是张晓英。一名专注于短视频、品牌宣传与 IP 内容的剪辑师。
              </p>
              <p>
                我熟悉从内容策划、拍摄到后期交付的完整链路，擅长把零散素材整理成有节奏、
                有重点、有传播力的影像。也持续研究 AI 视频工作流，让创意和效率一起发生。
              </p>

              <div className="off-duty-note">
                <strong>不剪片的时候</strong>
                <span>观察生活 · 收集灵感 · 研究 AI · 听好音乐</span>
              </div>

              <div className="experience-line">
                <span>2023.08 — 2026.05</span>
                <div>
                  <strong>杭州展鸿教育服务有限公司</strong>
                  <small>视频剪辑专员</small>
                </div>
              </div>
              <div className="experience-line">
                <span>2023.04 — 2023.06</span>
                <div>
                  <strong>实在智能</strong>
                  <small>导演 / 编导</small>
                </div>
              </div>

              <div className="quick-contact">
                <a href="tel:13085215295"><Phone size={17} /> 130 8521 5295</a>
                <a href="mailto:2726713214@qq.com"><Mail size={17} /> 2726713214@qq.com</a>
              </div>
            </div>
          </div>

          <div className="stats" data-reveal>
            <div><strong>3<sup>+</sup></strong><span>年行业经验</span></div>
            <div><strong>1000W<sup>+</sup></strong><span>项目总播放</span></div>
            <div><strong>100+</strong><span>每周稳定产出</span></div>
            <div><strong>1000<sup>+</sup></strong><span>有效转化线索</span></div>
          </div>
        </div>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <div className="section-heading work-heading" data-reveal>
            <span className="eyebrow">02 / SELECTED WORK</span>
            <h2>精选项目</h2>
            <p>从人物表达到品牌现场，找到每个项目独有的情绪与节奏。</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card ${project.tone}`} key={project.id} data-reveal>
                {project.modalVideo ? (
                  <div
                    className="project-image project-hover-media"
                    onMouseEnter={() => handleProjectHover(project)}
                    onMouseLeave={() => handleProjectLeave(project)}
                  >
                    {project.hoverVideo && playingProject === project.id ? (
                      <video
                        ref={hoverVideoRef}
                        src={project.hoverVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${project.title}悬停预览`}
                      />
                    ) : (
                      <img src={project.image} alt={`${project.title}项目封面`} />
                    )}
                    <span className="concept-tag">{playingProject === project.id ? '悬停预览' : '品牌影像'}</span>
                    <div className="project-index">{project.id}</div>
                  </div>
                ) : project.video && project.clickToPlay && playingProject !== project.id ? (
                  <button
                    className="project-image play-cover"
                    type="button"
                    onClick={() => setPlayingProject(project.id)}
                    aria-label={`播放${project.title}项目视频`}
                  >
                    <img src={project.image} alt={`${project.title}视频封面`} />
                    <span className="concept-tag">点击播放</span>
                    <span className="project-play"><Play size={25} fill="currentColor" /></span>
                    <div className="project-index">{project.id}</div>
                  </button>
                ) : project.video ? (
                  <div className={project.clickToPlay ? 'project-image is-playing' : 'project-image'}>
                    <video
                      src={project.video}
                      poster={project.image}
                      autoPlay
                      controls={project.clickToPlay}
                      muted={!project.clickToPlay}
                      loop={!project.clickToPlay}
                      playsInline
                      preload="metadata"
                      aria-label={`${project.title}项目视频`}
                    />
                    <span className="concept-tag">{project.clickToPlay ? '正在播放' : '品牌影像'}</span>
                    {!project.clickToPlay && <div className="project-index">{project.id}</div>}
                  </div>
                ) : project.link ? (
                  <a
                    className="project-image is-linked"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`在抖音观看${project.title}`}
                  >
                    <img src={project.image} alt={`${project.title}作品封面`} />
                    <span className="concept-tag">点击观看 ↗</span>
                    <div className="project-index">{project.id}</div>
                  </a>
                ) : (
                  <div className="project-image">
                    <img src={project.image} alt="" />
                    <span className="concept-tag">概念封面</span>
                    <div className="project-index">{project.id}</div>
                  </div>
                )}
                <div className="project-info">
                  <div>
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-metric">{project.metric}</div>
                  {project.modalVideo ? (
                    <button
                      className="round-arrow"
                      type="button"
                      onClick={() => setModalProject(project)}
                      aria-label={`播放${project.title}视频`}
                    >
                      <Play size={21} fill="currentColor" />
                    </button>
                  ) : (
                    <span className="round-arrow" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modalProject && (
        <div
          className="video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalProject.title}视频播放器`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setModalProject(null)
          }}
        >
          <div className="video-modal-panel">
            <header>
              <div>
                <span>NOW PLAYING / {modalProject.id}</span>
                <strong>{modalProject.title}</strong>
              </div>
              <button type="button" onClick={() => setModalProject(null)} aria-label="关闭视频">
                <X size={25} />
              </button>
            </header>
            <div className="video-modal-stage">
              <video
                src={modalProject.modalVideo}
                poster={modalProject.image}
                autoPlay
                controls
                playsInline
                aria-label={`${modalProject.title}商业广告视频`}
              />
              <span className="modal-index">{modalProject.id}</span>
            </div>
            <footer>
              <span>{modalProject.category}</span>
              <span>ESC / CLOSE</span>
              <span>{modalProject.metric}</span>
            </footer>
          </div>
        </div>
      )}

      {capabilityVideo && (
        <div
          className="video-modal capability-video-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${capabilityVideo.title}示例视频`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCapabilityVideo(null)
          }}
        >
          <div className="video-modal-panel">
            <header>
              <div>
                <span>CAPABILITY / {capabilityVideo.number}</span>
                <strong>{capabilityVideo.title}</strong>
              </div>
              <button type="button" onClick={() => setCapabilityVideo(null)} aria-label="关闭视频">
                <X size={25} />
              </button>
            </header>
            <div className="video-modal-stage">
              <video
                src={capabilityVideo.video}
                controls
                playsInline
                preload="auto"
                aria-label={`${capabilityVideo.videoLabel}视频`}
              />
              <span className="modal-index">{capabilityVideo.number}</span>
            </div>
            <footer>
              <span>{capabilityVideo.videoLabel}</span>
              <span>ESC / CLOSE</span>
              <span>{capabilityVideo.tags.join(' · ')}</span>
            </footer>
          </div>
        </div>
      )}

      {collectionOpen && (
        <div
          className="work-collection-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="AI 影像作品集"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCollectionOpen(false)
          }}
        >
          <div className="work-collection-shell">
            <header className="collection-topbar">
              <span>03 / SELECTED WORK</span>
              <button type="button" onClick={() => setCollectionOpen(false)} aria-label="返回能力模块">
                <ArrowLeft size={16} /> 返回能力
              </button>
            </header>
            <div className="collection-layout">
              <aside className="collection-intro">
                <span className="collection-kicker">AI WORKFLOW / 2026</span>
                <h2>A few things<br />worth keeping.</h2>
                <p>把想象变成画面，把技术变成有温度的表达。</p>
                <span className="collection-hint">CLICK A FILM TO PLAY</span>
              </aside>
              <section className="collection-list" aria-label="AI 影像作品列表">
                {aiCollection.map((item) => (
                  <article className={`collection-item ${item.tone}`} key={item.number}>
                    <span className="collection-number">{item.number}</span>
                    <div className="collection-copy">
                      <span className="collection-category">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span className="collection-action">点击视频播放 <ArrowUpRight size={16} /></span>
                    </div>
                    <div className="collection-media">
                      <video
                        src={item.video}
                        controls
                        playsInline
                        preload="metadata"
                        aria-label={`${item.title}视频`}
                      />
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </div>
      )}

      {platformCollectionOpen && (
        <div
          className="work-collection-overlay platform-collection-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="多端内容作品集"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPlatformCollectionOpen(false)
          }}
        >
          <div className="work-collection-shell">
            <header className="collection-topbar">
              <span>04 / PLATFORM WORK</span>
              <button type="button" onClick={() => setPlatformCollectionOpen(false)} aria-label="返回能力模块">
                <ArrowLeft size={16} /> 返回能力
              </button>
            </header>
            <div className="collection-layout">
              <aside className="collection-intro">
                <span className="collection-kicker">MULTI-PLATFORM / 2026</span>
                <h2>One story.<br />Many screens.</h2>
                <p>让同一套品牌表达，在不同平台里保持准确，也各自生长。</p>
                <span className="collection-hint">PLATFORM CONTENT ARCHIVE</span>
              </aside>
              <section className="collection-list" aria-label="多端内容案例列表">
                {platformCollection.map((item) => (
                  <article className={`collection-item platform-item ${item.tone}`} key={item.number}>
                    <span className="collection-number">{item.number}</span>
                    <div className="collection-copy">
                      <span className="collection-category">{item.category}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span className="collection-action">平台案例 <ArrowUpRight size={16} /></span>
                    </div>
                    <figure className="collection-media collection-image">
                      <img src={item.image} alt={`${item.title}案例截图`} />
                    </figure>
                  </article>
                ))}
              </section>
            </div>
          </div>
        </div>
      )}

      <section className="skills section" id="skills">
        <div className="shell">
          <div className="section-heading skills-heading" data-reveal>
            <span className="eyebrow">03 / CAPABILITIES</span>
            <h2>WHAT I DO<br /><span>我能做什么</span></h2>
          </div>

          <div className="capability-grid">
            {capabilities.map(({ number, icon: Icon, title, text, tags, color, video, videoLabel, collection, platformCollection: hasPlatformCollection }) => (
              <article className={`capability ${color}`} key={number} data-reveal>
                <div className="capability-top">
                  <span>{number}</span>
                  {video ? (
                    <button
                      className="capability-icon-button"
                      type="button"
                      onClick={() => setCapabilityVideo({ number, title, video, videoLabel, tags, color })}
                      aria-label={`播放${videoLabel}`}
                    >
                      <Icon size={31} strokeWidth={1.8} />
                    </button>
                  ) : collection ? (
                    <button
                      className="capability-icon-button"
                      type="button"
                      onClick={() => setCollectionOpen(true)}
                      aria-label="打开 AI 影像作品集"
                    >
                      <Icon size={31} strokeWidth={1.8} />
                    </button>
                  ) : hasPlatformCollection ? (
                    <button
                      className="capability-icon-button"
                      type="button"
                      onClick={() => setPlatformCollectionOpen(true)}
                      aria-label="打开多端内容作品集"
                    >
                      <Icon size={31} strokeWidth={1.8} />
                    </button>
                  ) : <Icon size={31} strokeWidth={1.8} />}
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {tags.map((tag) => <li key={tag}><Check size={15} /> {tag}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div className="process" data-reveal>
            <div className="process-title">MY PROCESS <span>从想法到交付</span></div>
            <ol>
              {process.map((item, index) => (
                <li key={item}>
                  <span>{index + 1}</span>
                  <strong>{item}</strong>
                  {index < process.length - 1 && <b>→</b>}
                </li>
              ))}
            </ol>
          </div>

          <div className="ticker" aria-hidden="true">
            <div>STORY FIRST ★ FRAME BY FRAME ★ STORY FIRST ★ FRAME BY FRAME ★&nbsp;</div>
          </div>
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-noise" />
        <div className="shell contact-inner">
          <div className="contact-top">
            <span className="eyebrow light">04 / CONTACT</span>
            <span>SHENZHEN · CHINA</span>
          </div>
          <div className="contact-title" data-reveal>
            <span>READY TO MAKE SOMETHING?</span>
            <h2>有好故事？<br /><i>一起剪出来。</i></h2>
          </div>
          <div className="contact-actions" data-reveal>
            <a className="contact-mail" href="mailto:2726713214@qq.com">
              <span>发邮件给我</span>
              2726713214@qq.com
              <ArrowUpRight />
            </a>
            <a className="contact-phone" href="tel:13085215295">
              <Phone size={19} /> 130 8521 5295
            </a>
          </div>
          <div className="contact-footer">
            <span>© {new Date().getFullYear()} ZHANG XIAOYING</span>
            <a href="#home">BACK TO TOP ↑</a>
            <span>VIDEO EDITOR · PORTFOLIO</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
