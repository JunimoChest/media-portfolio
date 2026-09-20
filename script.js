const PASSWORD_HASH = "c1c89f0f71b1caf9706060ea339b7ec12d618f2db4306927d8123d71a14ba2dc";
const FALLBACK_BASE64 = "cWR5";
const SESSION_KEY = "integrated-media-portfolio-unlocked";

const sections = [
  {
    id: "news",
    number: "01",
    title: "新闻作品",
    accent: "#123f32",
    hideType: true,
    description: "现场报道、人物采访、专题报道等，独立完成稿件撰写、脚本撰写、采访拍摄、视频剪辑工作。",
    groups: [
      {
        label: "视频作品",
        eyebrow: "",
        columns: 2,
        items: [
          {
            id: "news-opening-day",
            kind: "video",
            typeLabel: "视频作品",
            title: "采访短视频：开学日",
            summary: "在校参与学生组织时期作品(校研究生新闻中心)。记录开学日现场与人物采访。",
            cover: "assets/thumbs/news-opening-day.jpg?v=20260920b",
            src: "assets/videos/news-opening-day.mp4"
          },
          {
            id: "news-yangtze-swimmer",
            kind: "video",
            typeLabel: "视频作品",
            title: "专题报道：长江“泳”士",
            summary: "在校课程项目。围绕长江横渡人物展开专题叙事，讲述武汉城市故事。",
            cover: "assets/thumbs/news-yangtze-swimmer-opening.jpg",
            src: "assets/videos/news-yangtze-swimmer.mp4"
          }
        ]
      },
      {
        label: "文字作品",
        eyebrow: "",
        columns: 2,
        items: [
          {
            id: "news-media-forum",
            kind: "external",
            typeLabel: "文字作品",
            title: "新闻稿撰写：百余学者武汉论道传媒经济新赛道新动能",
            summary: "在校研究生期间作品，参与学术年会现场报道。",
            cover: "assets/thumbs/news-media-forum-cover.jpg?v=20260920b",
            href: "http://m.cnhubei.com/content/2023-03/26/content_15622742.html"
          },
          {
            id: "news-zhang-wenhong",
            kind: "external",
            typeLabel: "文字作品",
            title: "新闻编辑：“硬核”医生张文宏：如果隐藏病例数，武汉敢打开吗？",
            summary: "人民日报新媒体中心实习期间作品，参与人物专访文字整理。",
            cover: "assets/thumbs/news-zhang-wenhong-cover.jpg?v=20260920b",
            href: "https://www.peopleapp.com/column/30037025027-500002074722"
          }
        ]
      }
    ]
  },
  {
    id: "creative-video",
    number: "02",
    title: "创意视频",
    accent: "#8e391c",
    hideType: true,
    description: "游戏公司工作时期、个人账号运营作品。使用工具：PR、AE、剪映、AIGC工具。",
    groups: [
      {
        label: "",
        eyebrow: "",
        columns: 3,
        items: [
          {
            id: "creative-video-bilibili",
            kind: "external",
            typeLabel: "创意视频",
            title: "媒介融合：交互式电影游戏、人机交互与虚拟偶像",
            summary: "在校课程项目，使用PR、AE制作。",
            cover: "assets/thumbs/creative-media-fusion-cover.jpg",
            href: "https://www.bilibili.com/video/BV1Jb411z7tt/?spm_id_from=333.1387.homepage.video_card.click&vd_source=d0496f728d87bda86623ee1b6806936d"
          },
          {
            id: "creative-video-cat-meme",
            kind: "video",
            typeLabel: "创意视频",
            title: "猫meme游戏广告",
            summary: "游戏公司工作期间作品，使用剪映制作。借用猫meme的网络热梗包装产品，实现高消耗、高转化的传播效果。",
            cover: "assets/thumbs/cat-meme-ad-opening.jpg",
            src: "assets/videos/cat-meme-ad.mp4",
            hls: "assets/hls/cat-meme/master.m3u8"
          },
          {
            id: "creative-video-launch",
            kind: "video",
            typeLabel: "创意视频",
            title: "AI视频",
            summary: "个人小红书账号内容，使用即梦生成AI视频。借用网络热点iPhone Duo宣传片，制作潮玩玩偶的创意视频。",
            cover: "assets/thumbs/creative-launch-cover.jpg",
            src: "assets/videos/creative-launch.mp4"
          }
        ]
      }
    ]
  },
  {
    id: "strategy",
    number: "03",
    title: "运营分析",
    accent: "#765104",
    description: "通过数据分析、热点复盘与选题规划，为内容策略和运营动作提供依据。",
    groups: [
      {
        label: "",
        eyebrow: "",
        columns: 3,
        items: [
          {
            id: "strategy-ad-dashboard",
            kind: "external",
            typeLabel: "BI看板",
            title: "游戏广告素材数据看板",
            summary: "游戏公司工作时期项目，搭建创意数据分析看板。内容已脱敏，非真实数据。",
            cover: "assets/thumbs/ad-dashboard-cover.jpg?v=20260920a",
            href: "analytics/index.html",
            sameTab: true
          },
          {
            id: "strategy-hot-meme",
            kind: "ebook",
            typeLabel: "热点月报",
            title: "2026年2月网络热梗月报",
            summary: "游戏公司工作时期报告，为产品营销与运营提供热点创意支持。",
            cover: "assets/thumbs/hot-meme-cover.jpg?v=20260920b",
            pages: Array.from({ length: 7 }, (_, i) => `assets/previews/hot-meme/page-${i + 1}.webp`)
          },
          {
            id: "strategy-topic-calendar",
            kind: "ebook",
            typeLabel: "内容规划",
            title: "微信公众号选题日历",
            summary: "在校参与学生组织时期项目。为微信公众号运营提供选题支持。",
            cover: "assets/thumbs/topic-calendar-cover.jpg?v=20260920b",
            pages: Array.from({ length: 7 }, (_, i) => `assets/previews/topic-calendar/page-${i + 1}.webp`)
          }
        ]
      }
    ]
  }
];

const state = {
  currentItem: null,
  lastFocused: null,
  rendered: false,
  hls: null
};

const gate = document.getElementById("passwordGate");
const siteShell = document.getElementById("siteShell");
const form = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const gateError = document.getElementById("gateError");
const sectionNav = document.getElementById("sectionNav");
const sectionsRoot = document.getElementById("sections");
const viewer = document.getElementById("viewer");
const viewerBody = document.getElementById("viewerBody");
const viewerTitle = document.getElementById("viewerTitle");
const viewerType = document.getElementById("viewerType");
const viewerClose = document.getElementById("viewerClose");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sha256(value) {
  if (!window.crypto || !window.crypto.subtle) return null;
  const data = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function isValidPassword(value) {
  const hash = await sha256(value);
  if (hash) return hash === PASSWORD_HASH;
  try {
    return btoa(value) === FALLBACK_BASE64;
  } catch {
    return false;
  }
}

function iconFor(item) {
  if (item.kind === "external") return "external-link";
  if (item.kind === "video") return "play";
  if (item.kind === "image") return "images";
  return "book-open";
}

function actionText(item) {
  return item.kind === "external" ? "点击跳转" : "点击查看";
}

function mediaMarkup(item, section) {
  const coverClass = item.coverClass ? ` ${item.coverClass}` : "";
  const typeLabel = section.hideType
    ? ""
    : `<span class="card-type">${escapeHtml(item.typeLabel)}</span>`;
  if (!item.cover) {
    return `
      <div class="card-media card-media--blank${coverClass}">
        ${typeLabel}
      </div>`;
  }
  return `
    <div class="card-media${coverClass}">
      <img src="${escapeHtml(item.cover)}" alt="" loading="lazy">
      ${typeLabel}
    </div>`;
}

function cardMarkup(item, section) {
  const body = `
    ${mediaMarkup(item, section)}
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="card-summary">${escapeHtml(item.summary)}</p>
      <div class="card-footer">
        <span class="card-open">
          <i data-lucide="${iconFor(item)}" aria-hidden="true"></i>
          <span>${actionText(item)}</span>
        </span>
      </div>
    </div>`;

  if (item.kind === "external") {
    const target = item.sameTab ? "" : ' target="_blank" rel="noopener noreferrer"';
    return `
      <a class="work-card" href="${escapeHtml(item.href)}"${target} style="--section-color:${section.accent}" aria-label="${escapeHtml(item.title)}">
        ${body}
      </a>`;
  }

  return `
    <article class="work-card" style="--section-color:${section.accent}">
      <button class="work-card__action" type="button" data-local-id="${escapeHtml(item.id)}" aria-label="打开 ${escapeHtml(item.title)}">
        ${body}
      </button>
    </article>`;
}

function renderNavigation() {
  sectionNav.innerHTML = sections.map((section) => `
    <a class="nav-link" href="#${section.id}" data-section-link="${section.id}">
      <span class="nav-number">${section.number}</span>
      <span>${escapeHtml(section.title)}</span>
    </a>
  `).join("");
}

function groupMarkup(group, section) {
  const head = group.label ? `
    <div class="group-head">
      <h3>${escapeHtml(group.label)}</h3>
      ${group.eyebrow ? `<span>${escapeHtml(group.eyebrow)}</span>` : ""}
    </div>` : "";
  return `
    <section class="group">
      ${head}
      <div class="card-grid" data-columns="${group.columns}">
        ${group.items.map((item) => cardMarkup(item, section)).join("")}
      </div>
    </section>`;
}

function renderSections() {
  if (state.rendered) return;
  sectionsRoot.innerHTML = sections.map((section) => `
    <section class="section" id="${section.id}" style="--section-color:${section.accent}">
      <div class="section-head">
        <span class="section-index">${section.number}</span>
        <div>
          <h2 class="section-title">${escapeHtml(section.title)}</h2>
          <p class="section-description">${escapeHtml(section.description)}</p>
        </div>
      </div>
      ${section.groups.map((group) => groupMarkup(group, section)).join("")}
    </section>
  `).join("");
  state.rendered = true;
  if (window.lucide) window.lucide.createIcons();
}

function findItem(id) {
  for (const section of sections) {
    for (const group of section.groups) {
      const item = group.items.find((entry) => entry.id === id);
      if (item) return item;
    }
  }
  return null;
}

function unlock({ persist = true } = {}) {
  gate.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
  siteShell.setAttribute("aria-hidden", "false");
  siteShell.inert = false;
  siteShell.classList.add("is-visible");
  renderNavigation();
  renderSections();
  setupActiveNavigation();
  if (persist) {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
  }
  setTimeout(() => passwordInput.blur(), 0);
}

function lock() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch {}
  closeViewer();
  gate.classList.remove("is-hidden");
  document.body.classList.add("is-locked");
  siteShell.setAttribute("aria-hidden", "true");
  siteShell.inert = true;
  siteShell.classList.remove("is-visible");
  passwordInput.value = "";
  gateError.textContent = "";
  setTimeout(() => passwordInput.focus(), 0);
}

function arrivedFromDashboard() {
  if (!document.referrer) return false;
  return document.referrer === new URL("analytics/index.html", window.location.href).href;
}

function openLocalItem(id) {
  const item = findItem(id);
  if (!item) return;
  state.currentItem = item;
  state.lastFocused = document.activeElement;
  viewerTitle.textContent = item.title;
  viewerType.textContent = item.typeLabel;
  viewerBody.className = "viewer-body";

  if (item.kind === "video") {
    viewerBody.classList.add("is-video");
    viewerBody.innerHTML = `
      <video src="${escapeHtml(item.src)}" controls playsinline preload="metadata" controlsList="nodownload noremoteplayback" disablePictureInPicture></video>`;
    const video = viewerBody.querySelector("video");
    if (item.hls && window.Hls && window.Hls.isSupported()) {
      video.removeAttribute("src");
      video.preload = "auto";
      const hls = new window.Hls({ startLevel: -1 });
      state.hls = hls;
      hls.loadSource(item.hls);
      hls.attachMedia(video);
      hls.on(window.Hls.Events.ERROR, (event, data) => {
        if (data && data.fatal) {
          hls.destroy();
          if (state.hls === hls) state.hls = null;
          video.src = item.src;
        }
      });
    }
  } else if (item.kind === "image") {
    viewerBody.innerHTML = `
      <div class="image-view">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
      </div>`;
  } else if (item.kind === "ebook") {
    viewerBody.innerHTML = `
      <div class="ebook-view">
        ${item.pages.map((page, index) => `
          <figure class="ebook-page">
            <img src="${escapeHtml(page)}" alt="第 ${index + 1} 页" loading="${index < 2 ? "eager" : "lazy"}">
          </figure>`).join("")}
      </div>`;
  }

  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(fitViewerVideo);
  if (window.lucide) window.lucide.createIcons();
  viewerClose.focus();
}

function fitViewerVideo() {
  const video = viewerBody.querySelector("video");
  if (!video || !viewer.classList.contains("is-open")) return;
  const maxWidth = Math.max(160, viewerBody.clientWidth - 48);
  const maxHeight = Math.max(90, viewerBody.clientHeight - 48);
  let width = maxWidth;
  let height = width * 9 / 16;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * 16 / 9;
  }
  const snappedWidth = Math.max(160, Math.floor(width / 16) * 16);
  video.style.width = `${snappedWidth}px`;
  video.style.height = `${snappedWidth * 9 / 16}px`;
}

function closeViewer() {
  if (!viewer.classList.contains("is-open")) return;
  if (state.hls) {
    state.hls.destroy();
    state.hls = null;
  }
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  viewerBody.innerHTML = "";
  viewerBody.className = "viewer-body";
  document.body.style.overflow = "";
  state.currentItem = null;
  if (state.lastFocused && document.contains(state.lastFocused)) {
    state.lastFocused.focus();
  }
}

function setupActiveNavigation() {
  const links = Array.from(document.querySelectorAll("[data-section-link]"));
  let ticking = false;

  function updateActiveNavigation() {
    const marker = window.scrollY + Math.min(window.innerHeight * 0.3, 260);
    let currentId = sections[0].id;
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= marker) currentId = section.id;
    });
    links.forEach((link) => {
      const active = link.dataset.sectionLink === currentId;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateActiveNavigation);
  }, { passive: true });
  window.addEventListener("resize", updateActiveNavigation);
  updateActiveNavigation();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  gateError.textContent = "";
  const allowed = await isValidPassword(passwordInput.value);
  if (!allowed) {
    gateError.textContent = "密码错误，请重新输入。";
    passwordInput.select();
    return;
  }
  unlock();
});

document.addEventListener("click", (event) => {
  const localButton = event.target.closest("[data-local-id]");
  if (localButton) openLocalItem(localButton.dataset.localId);
  if (event.target.closest("[data-close-viewer]") || event.target.closest("#viewerClose")) {
    closeViewer();
  }
});

document.addEventListener("contextmenu", (event) => {
  if (event.target.closest("video")) event.preventDefault();
});

document.getElementById("lockButton").addEventListener("click", lock);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeViewer();
});

window.addEventListener("resize", fitViewerVideo);

async function boot() {
  let unlocked = false;
  try { unlocked = sessionStorage.getItem(SESSION_KEY) === "1"; } catch {}
  if (unlocked || arrivedFromDashboard()) {
    unlock({ persist: false });
  } else {
    siteShell.inert = true;
    passwordInput.focus();
  }
  if (window.lucide) window.lucide.createIcons();
}

boot();
