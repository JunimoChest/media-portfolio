const PASSWORD_HASH = "c1c89f0f71b1caf9706060ea339b7ec12d618f2db4306927d8123d71a14ba2dc";
const FALLBACK_BASE64 = "cWR5";
const SESSION_KEY = "integrated-media-portfolio-unlocked";

const CHANNELS = [
  {
    id: "huawei",
    name: "华为",
    color: "#174b78",
    volume: 1.18,
    benchmark: { ctr: 0.034, clickDownloadRate: 0.108, impressionDownloadRate: 0.00367, cpm: 24, roi: 1.14 },
  },
  {
    id: "taptap",
    name: "TapTap",
    color: "#16604a",
    volume: 0.62,
    benchmark: { ctr: 0.029, clickDownloadRate: 0.122, impressionDownloadRate: 0.00354, cpm: 20, roi: 1.26 },
  },
  {
    id: "ocean",
    name: "巨量（字节系）",
    color: "#c45a24",
    volume: 1.72,
    benchmark: { ctr: 0.024, clickDownloadRate: 0.091, impressionDownloadRate: 0.00218, cpm: 34, roi: 0.97 },
  },
  {
    id: "gdt",
    name: "广点通（腾讯系）",
    color: "#8a650c",
    volume: 1.36,
    benchmark: { ctr: 0.022, clickDownloadRate: 0.086, impressionDownloadRate: 0.00189, cpm: 31, roi: 0.92 },
  },
];

const CREATIVES = [
  { id: "CR-001", name: "开局一把刀", thumbnail: "../assets/creative-thumbs/cr-001.jpg", ctr: 1.18, download: 1.03, roi: 1.12, cpm: 0.94, volume: 1.08 },
  { id: "CR-002", name: "人物大字报", thumbnail: "../assets/creative-thumbs/cr-002.jpg", ctr: 1.07, download: 0.96, roi: 0.92, cpm: 1.02, volume: 0.94 },
  { id: "CR-003", name: "刷宝词条", thumbnail: "../assets/creative-thumbs/cr-003.jpg", ctr: 1.22, download: 1.08, roi: 1.20, cpm: 0.96, volume: 1.05 },
  { id: "CR-004", name: "游戏界面演示", thumbnail: "../assets/creative-thumbs/cr-004.jpg", ctr: 0.91, download: 1.05, roi: 0.98, cpm: 0.91, volume: 0.88 },
  { id: "CR-005", name: "装备对比", thumbnail: "../assets/creative-thumbs/cr-005.jpg", ctr: 1.04, download: 0.89, roi: 0.88, cpm: 1.06, volume: 0.83 },
  { id: "CR-006", name: "选择英雄", thumbnail: "../assets/creative-thumbs/cr-006.jpg", ctr: 0.96, download: 1.12, roi: 1.08, cpm: 0.97, volume: 0.91 },
  { id: "CR-007", name: "小帅口播", thumbnail: "../assets/creative-thumbs/cr-007.jpg", ctr: 1.26, download: 1.16, roi: 1.24, cpm: 1.01, volume: 1.16 },
  { id: "CR-008", name: "玩法不基础", thumbnail: "../assets/creative-thumbs/cr-008.jpg", ctr: 1.13, download: 1.09, roi: 1.15, cpm: 1.03, volume: 1.02 },
  { id: "CR-009", name: "猫meme", thumbnail: "../assets/creative-thumbs/cr-009.jpg", ctr: 1.31, download: 0.93, roi: 0.95, cpm: 1.08, volume: 1.12 },
  { id: "CR-010", name: "爽感休闲", thumbnail: "../assets/creative-thumbs/cr-010.jpg", ctr: 0.88, download: 1.18, roi: 1.09, cpm: 0.9, volume: 0.78 },
  { id: "CR-011", name: "角色展示", thumbnail: "../assets/creative-thumbs/cr-011.jpg", ctr: 0.93, download: 0.84, roi: 0.82, cpm: 1.12, volume: 0.74 },
  { id: "CR-012", name: "游戏荒", thumbnail: "../assets/creative-thumbs/cr-012.jpg", ctr: 1.09, download: 1.02, roi: 1.04, cpm: 0.98, volume: 0.97 },
];

const SAMPLE_START = "2026-07-01";
const SAMPLE_END = "2026-08-31";

const state = {
  rows: [],
  filteredRows: [],
  channelIds: new Set(CHANNELS.map((channel) => channel.id)),
  chartInstances: new Map(),
  detailChart: null,
  topChannelId: CHANNELS[0].id,
  sortKey: "spend",
  sortDirection: "desc",
  page: 1,
  pageSize: 10,
};

const gate = document.getElementById("passwordGate");
const analyticsShell = document.getElementById("analyticsShell");
const form = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const gateError = document.getElementById("gateError");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const channelFilters = document.getElementById("channelFilters");
const creativeSearch = document.getElementById("creativeSearch");
const resetFilters = document.getElementById("resetFilters");
const primaryMetrics = document.getElementById("primaryMetrics");
const secondaryMetrics = document.getElementById("secondaryMetrics");
const tableBody = document.getElementById("creativeTableBody");
const topChannelTabs = document.getElementById("topChannelTabs");
const topCreativesList = document.getElementById("topCreativesList");
const pageStatus = document.getElementById("pageStatus");
const pageNumbers = document.getElementById("pageNumbers");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const detailDrawer = document.getElementById("detailDrawer");
const detailKicker = document.getElementById("detailKicker");
const detailTitle = document.getElementById("detailTitle");
const detailBody = document.getElementById("detailBody");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6D2B79F5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function eachDate(start, end) {
  const dates = [];
  const cursor = new Date(`${start}T00:00:00Z`);
  const last = new Date(`${end}T00:00:00Z`);
  while (cursor <= last) {
    dates.push(isoDate(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return dates;
}

function generateSampleRows() {
  const random = seededRandom(20260920);
  const rows = [];
  const dates = eachDate(SAMPLE_START, SAMPLE_END);

  dates.forEach((date, dayIndex) => {
    const dayFactor = 0.88 + Math.sin(dayIndex / 7) * 0.14 + random() * 0.16;
    CHANNELS.forEach((channel, channelIndex) => {
      CREATIVES.forEach((creative, creativeIndex) => {
        const creativeRamp = clamp((dayIndex + creativeIndex * 3) / 18, 0.55, 1.18);
        const weekendFactor = [0, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay()) ? 0.88 : 1;
        const impressions = Math.max(
          800,
          Math.round(26000 * channel.volume * creative.volume * dayFactor * creativeRamp * weekendFactor * (0.82 + random() * 0.38)),
        );
        const ctr = clamp(channel.benchmark.ctr * creative.ctr * (0.84 + random() * 0.31), 0.008, 0.085);
        const clicks = Math.max(1, Math.round(impressions * ctr));
        const clickDownloadRate = clamp(
          channel.benchmark.clickDownloadRate * creative.download * (0.84 + random() * 0.28),
          0.025,
          0.22,
        );
        const downloads = Math.max(1, Math.round(clicks * clickDownloadRate));
        const cpm = clamp(channel.benchmark.cpm * creative.cpm * (0.91 + random() * 0.18), 10, 65);
        const spend = impressions / 1000 * cpm;
        const roi = clamp(channel.benchmark.roi * creative.roi * (0.82 + random() * 0.34), 0.35, 2.3);
        rows.push({
          date,
          channelId: channel.id,
          channelName: channel.name,
          creativeId: creative.id,
          creativeName: creative.name,
          thumbnail: creative.thumbnail,
          adGroupId: `AG-${channel.id.toUpperCase()}-${String((creativeIndex % 3) + 1).padStart(2, "0")}`,
          spend,
          impressions,
          clicks,
          downloads,
          revenue: spend * roi,
        });
      });
    });
  });
  return rows;
}

function aggregate(rows) {
  const totals = rows.reduce((acc, row) => {
    acc.spend += row.spend;
    acc.impressions += row.impressions;
    acc.clicks += row.clicks;
    acc.downloads += row.downloads;
    acc.revenue += row.revenue;
    return acc;
  }, { spend: 0, impressions: 0, clicks: 0, downloads: 0, revenue: 0 });

  return {
    ...totals,
    ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    clickDownloadRate: totals.clicks ? totals.downloads / totals.clicks : 0,
    impressionDownloadRate: totals.impressions ? totals.downloads / totals.impressions : 0,
    cpm: totals.impressions ? totals.spend / totals.impressions * 1000 : 0,
    roi: totals.spend ? totals.revenue / totals.spend : 0,
    cpc: totals.clicks ? totals.spend / totals.clicks : 0,
    costPerDownload: totals.downloads ? totals.spend / totals.downloads : 0,
  };
}

function formatCurrency(value) {
  return `¥${Math.round(value).toLocaleString("zh-CN")}`;
}

function formatDecimal(value, digits = 2) {
  return Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatInteger(value) {
  return Math.round(value || 0).toLocaleString("zh-CN");
}

function formatPercent(value) {
  return `${formatDecimal(value * 100, 2)}%`;
}

function formatMetric(metric, value) {
  if (["spend", "cpc", "costPerDownload"].includes(metric)) return formatCurrency(value);
  if (["impressions", "clicks", "downloads"].includes(metric)) return formatInteger(value);
  if (metric === "ctr" || metric === "clickDownloadRate" || metric === "impressionDownloadRate") return formatPercent(value);
  if (metric === "cpm") return formatCurrency(value);
  if (metric === "roi") return `${formatDecimal(value, 2)}x`;
  return formatDecimal(value, 2);
}

function groupBy(rows, keyFn) {
  const groups = new Map();
  rows.forEach((row) => {
    const key = keyFn(row);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  });
  return groups;
}

function currentDateRange() {
  return {
    start: startDateInput.value || SAMPLE_START,
    end: endDateInput.value || SAMPLE_END,
  };
}

function rowsInDateRange(rows, start, end) {
  return rows.filter((row) => row.date >= start && row.date <= end);
}

function applyFilters() {
  const { start, end } = currentDateRange();
  const query = creativeSearch.value.trim().toLowerCase();
  state.filteredRows = state.rows.filter((row) => {
    if (!state.channelIds.has(row.channelId)) return false;
    if (row.date < start || row.date > end) return false;
    if (query) {
      const haystack = `${row.creativeId} ${row.creativeName} ${row.adGroupId}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
  state.page = 1;
  renderDashboard();
}

function metricCard(label, value, detail, color) {
  return `
    <article class="metric-card" style="--metric-color:${color}">
      <span class="metric-label">${escapeHtml(label)}</span>
      <strong class="metric-value">${escapeHtml(value)}</strong>
      <span class="metric-detail">${escapeHtml(detail)}</span>
    </article>`;
}

function renderMetrics() {
  const totals = aggregate(state.filteredRows);
  primaryMetrics.innerHTML = [
    metricCard("消耗", formatCurrency(totals.spend), `${new Set(state.filteredRows.map((row) => row.channelId)).size} 个渠道`, "#16604a"),
    metricCard("曝光量", formatInteger(totals.impressions), "全渠道累计", "#246b9e"),
    metricCard("曝光点击率", formatPercent(totals.ctr), "点击量 ÷ 曝光量", "#c45a24"),
    metricCard("点击下载率", formatPercent(totals.clickDownloadRate), "下载量 ÷ 点击量", "#8a650c"),
    metricCard("曝光下载率", formatPercent(totals.impressionDownloadRate), "下载量 ÷ 曝光量", "#39706a"),
    metricCard("CPM", formatCurrency(totals.cpm), "每千次曝光成本", "#6c4f91"),
    metricCard("ROI", `${formatDecimal(totals.roi, 2)}x`, "收入 ÷ 消耗", "#a43b3b"),
  ].join("");

  secondaryMetrics.innerHTML = [
    ["点击量", formatInteger(totals.clicks)],
    ["下载量", formatInteger(totals.downloads)],
    ["点击成本", formatCurrency(totals.cpc)],
    ["下载成本", formatCurrency(totals.costPerDownload)],
  ].map(([label, value]) => `
    <div class="secondary-metric"><span>${label}</span><strong>${value}</strong></div>
  `).join("");
}

function renderChannelFilters() {
  channelFilters.innerHTML = CHANNELS.map((channel) => `
    <label class="channel-filter">
      <input type="checkbox" value="${channel.id}" checked>
      <span>${escapeHtml(channel.name)}</span>
    </label>
  `).join("");
}

function chartInstance(id) {
  const element = document.getElementById(id);
  if (!element) return null;
  if (state.chartInstances.has(id)) state.chartInstances.get(id).dispose();
  const chart = window.echarts.init(element, null, { renderer: "canvas" });
  state.chartInstances.set(id, chart);
  return chart;
}

function renderTrendChart() {
  const chart = chartInstance("trendChart");
  if (!chart) return;
  const groups = groupBy(state.filteredRows, (row) => row.date);
  const dates = [...groups.keys()].sort();
  const totals = dates.map((date) => aggregate(groups.get(date)));

  chart.setOption({
    animationDuration: 500,
    color: ["#246b9e"],
    tooltip: { trigger: "axis" },
    grid: { left: 58, right: 26, top: 42, bottom: 42 },
    xAxis: {
      type: "category",
      data: dates.map((date) => date.slice(5)),
      axisLabel: { color: "#58635f", interval: Math.max(0, Math.floor(dates.length / 8) - 1) },
      axisLine: { lineStyle: { color: "#d4dbd8" } },
    },
    yAxis: {
      type: "value",
      name: "消耗",
      axisLabel: { formatter: (value) => `¥${(value / 10000).toFixed(0)}w` },
    },
    series: [{
      name: "消耗",
      type: "bar",
      data: totals.map((item) => Math.round(item.spend)),
      barMaxWidth: 22,
      itemStyle: { color: "#246b9e", borderRadius: [3, 3, 0, 0] },
    }],
  });
}

function renderChannelChart() {
  const chart = chartInstance("channelChart");
  if (!chart) return;
  const activeChannels = CHANNELS.filter((channel) => state.channelIds.has(channel.id));
  const values = activeChannels.map((channel) => aggregate(state.filteredRows.filter((row) => row.channelId === channel.id)));

  chart.setOption({
    animationDuration: 500,
    tooltip: { trigger: "axis", valueFormatter: (value) => `${Number(value).toFixed(2)}%` },
    legend: { top: 4, right: 8, data: ["曝光点击率", "点击下载率"] },
    grid: { left: 48, right: 18, top: 52, bottom: 54 },
    xAxis: {
      type: "category",
      data: activeChannels.map((channel) => channel.name.replace("（字节系）", "").replace("（腾讯系）", "")),
      axisLabel: { color: "#58635f", interval: 0 },
      axisLine: { lineStyle: { color: "#d4dbd8" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: (value) => `${value}%` },
      splitLine: { lineStyle: { color: "#e8ecea" } },
    },
    series: [
      { name: "曝光点击率", type: "bar", data: values.map((item) => Number((item.ctr * 100).toFixed(2))), itemStyle: { color: "#246b9e" } },
      { name: "点击下载率", type: "bar", data: values.map((item) => Number((item.clickDownloadRate * 100).toFixed(2))), itemStyle: { color: "#c45a24" } },
    ],
  });
}

function renderTopCreatives() {
  const { start, end } = currentDateRange();
  const query = creativeSearch.value.trim().toLowerCase();
  const rows = state.rows.filter((row) => {
    if (row.date < start || row.date > end) return false;
    if (!query) return true;
    return `${row.creativeId} ${row.creativeName}`.toLowerCase().includes(query);
  });
  const channel = CHANNELS.find((item) => item.id === state.topChannelId) || CHANNELS[0];

  topChannelTabs.innerHTML = CHANNELS.map((item) => `
    <button class="channel-tab${item.id === channel.id ? " is-active" : ""}" type="button" data-top-channel="${item.id}">
      ${escapeHtml(item.name.replace("（字节系）", "").replace("（腾讯系）", ""))}
    </button>
  `).join("");

  const creativeGroups = groupBy(
    rows.filter((row) => row.channelId === channel.id),
    (row) => row.creativeId,
  );
  const topThree = [...creativeGroups.values()]
    .map((items) => ({ items, totals: aggregate(items) }))
    .sort((a, b) => b.totals.spend - a.totals.spend)
    .slice(0, 3);

  topCreativesList.innerHTML = topThree.map(({ items, totals }, index) => {
    const row = items[0];
    return `
      <article class="top-creative-item" data-top-material="${escapeHtml(`${row.channelId}|${row.creativeId}|${row.adGroupId}`)}">
        <img src="${escapeHtml(row.thumbnail)}" alt="">
        <div class="top-creative-copy">
          <strong>${index + 1}. ${escapeHtml(row.creativeName)}</strong>
          <span>${escapeHtml(row.creativeId)} · ${formatInteger(totals.downloads)} 次下载</span>
          <span class="top-creative-spend">${formatCurrency(totals.spend)}</span>
        </div>
      </article>`;
  }).join("") || `<div class="empty-state">当前渠道没有素材数据</div>`;
}

function renderScatterChart() {
  const chart = chartInstance("scatterChart");
  if (!chart) return;
  const channelGroups = groupBy(state.filteredRows, (row) => row.channelId);
  const series = CHANNELS.filter((channel) => channelGroups.has(channel.id)).map((channel) => {
    const creativeGroups = groupBy(channelGroups.get(channel.id), (row) => row.creativeId);
    const points = [...creativeGroups.entries()].map(([creativeId, rows]) => {
      const totals = aggregate(rows);
      return {
        name: rows[0].creativeName,
        value: [Number(totals.cpm.toFixed(2)), Number((totals.impressionDownloadRate * 100).toFixed(3)), Math.round(totals.downloads), creativeId],
      };
    });
    return {
      name: channel.name,
      type: "scatter",
      symbolSize: (value) => clamp(Math.sqrt(value[2]) * 0.7, 10, 42),
      data: points,
      itemStyle: { color: channel.color, opacity: 0.78 },
      emphasis: { focus: "series" },
    };
  });

  chart.setOption({
    animationDuration: 500,
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const [cpm, downloadRate, downloads, creativeId] = params.value;
        return `${params.marker}${params.data.name}<br>${creativeId}<br>CPM：¥${cpm.toFixed(2)}<br>曝光下载率：${downloadRate.toFixed(3)}%<br>下载量：${formatInteger(downloads)}`;
      },
    },
    legend: { top: 4, right: 8 },
    grid: { left: 62, right: 24, top: 50, bottom: 48 },
    xAxis: {
      type: "value",
      name: "CPM / 元",
      axisLabel: { color: "#58635f" },
      splitLine: { lineStyle: { color: "#e8ecea" } },
    },
    yAxis: {
      type: "value",
      name: "曝光下载率 / %",
      axisLabel: { formatter: (value) => `${value}%` },
      splitLine: { lineStyle: { color: "#e8ecea" } },
    },
    series,
  });
}

function renderRoiRankChart() {
  const chart = chartInstance("roiRankChart");
  if (!chart) return;
  const creativeGroups = groupBy(state.filteredRows, (row) => `${row.channelId}|${row.creativeId}`);
  const ranking = [...creativeGroups.values()]
    .map((rows) => {
      const totals = aggregate(rows);
      return { name: `${rows[0].creativeName}`, roi: totals.roi, spend: totals.spend };
    })
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 8)
    .reverse();

  chart.setOption({
    animationDuration: 500,
    grid: { left: 110, right: 42, top: 20, bottom: 34 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const item = params[0];
        return `${item.name}<br>ROI：${item.value.toFixed(2)}x`;
      },
    },
    xAxis: {
      type: "value",
      axisLabel: { formatter: (value) => `${value.toFixed(1)}x` },
      splitLine: { lineStyle: { color: "#e8ecea" } },
    },
    yAxis: {
      type: "category",
      data: ranking.map((item) => item.name),
      axisLabel: { color: "#58635f" },
      axisLine: { show: false },
    },
    series: [{
      type: "bar",
      data: ranking.map((item) => Number(item.roi.toFixed(3))),
      barMaxWidth: 18,
      itemStyle: {
        color: (params) => CHANNELS[params.dataIndex % CHANNELS.length].color,
        borderRadius: [0, 3, 3, 0],
      },
      label: { show: true, position: "right", formatter: (params) => `${params.value.toFixed(2)}x` },
    }],
  });
}

function materialGroups() {
  return [...groupBy(
    state.filteredRows,
    (row) => `${row.channelId}|${row.creativeId}|${row.adGroupId}`,
  ).values()]
    .map((rows) => {
      const totals = aggregate(rows);
      return { key: `${rows[0].channelId}|${rows[0].creativeId}|${rows[0].adGroupId}`, rows, totals };
    });
}

function renderTable() {
  const groups = materialGroups().sort((a, b) => {
    const difference = a.totals[state.sortKey] - b.totals[state.sortKey];
    return state.sortDirection === "asc" ? difference : -difference;
  });
  if (!groups.length) {
    tableBody.innerHTML = `<tr><td colspan="10"><div class="empty-state">当前筛选条件下没有素材数据</div></td></tr>`;
    pageStatus.textContent = "共 0 条";
    pageNumbers.innerHTML = "";
    prevPage.disabled = true;
    nextPage.disabled = true;
    return;
  }
  const pageCount = Math.max(1, Math.ceil(groups.length / state.pageSize));
  state.page = clamp(state.page, 1, pageCount);
  const startIndex = (state.page - 1) * state.pageSize;
  const pageItems = groups.slice(startIndex, startIndex + state.pageSize);
  tableBody.innerHTML = pageItems.map(({ key, rows, totals }) => {
    const row = rows[0];
    return `
      <tr data-material-key="${escapeHtml(key)}">
        <td>
          <div class="creative-cell">
            <img class="creative-thumb-sm" src="${escapeHtml(row.thumbnail)}" alt="">
            <div>
              <span class="creative-name">${escapeHtml(row.creativeName)}</span>
              <span class="creative-id">${escapeHtml(row.creativeId)}</span>
            </div>
          </div>
        </td>
        <td>${escapeHtml(row.channelName)}</td>
        <td>${escapeHtml(row.adGroupId)}</td>
        <td>${formatCurrency(totals.spend)}</td>
        <td>${formatInteger(totals.impressions)}</td>
        <td>${formatPercent(totals.ctr)}</td>
        <td>${formatPercent(totals.clickDownloadRate)}</td>
        <td>${formatPercent(totals.impressionDownloadRate)}</td>
        <td>${formatCurrency(totals.cpm)}</td>
        <td>${formatDecimal(totals.roi, 2)}x</td>
      </tr>`;
  }).join("");
  pageStatus.textContent = `第 ${startIndex + 1}-${Math.min(startIndex + state.pageSize, groups.length)} 条，共 ${groups.length} 条`;
  prevPage.disabled = state.page <= 1;
  nextPage.disabled = state.page >= pageCount;
  pageNumbers.innerHTML = Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => `
    <button type="button" data-page="${page}" class="${page === state.page ? "is-active" : ""}">${page}</button>
  `).join("");
  document.querySelectorAll(".creative-table [data-sort]").forEach((button) => {
    const indicator = button.querySelector("span");
    indicator.textContent = button.dataset.sort === state.sortKey
      ? (state.sortDirection === "asc" ? "↑" : "↓")
      : "";
  });
}

function metricValue(totals, metric) {
  return totals[metric] || 0;
}

function benchmarkValue(channel, metric) {
  if (metric === "cpc") return channel.benchmark.cpm / 1000 / channel.benchmark.ctr;
  if (metric === "costPerDownload") return (channel.benchmark.cpm / 1000) / channel.benchmark.impressionDownloadRate;
  return channel.benchmark[metric];
}

function comparisonRow(label, metric, selectedTotals, accountTotals, channel) {
  const selected = metricValue(selectedTotals, metric);
  const account = metricValue(accountTotals, metric);
  const benchmark = benchmarkValue(channel, metric);
  const delta = benchmark ? (selected - benchmark) / benchmark * 100 : 0;
  const lowerIsBetter = ["cpm", "cpc", "costPerDownload"].includes(metric);
  const better = lowerIsBetter ? delta <= 0 : delta >= 0;
  return `
    <tr>
      <td>${label}</td>
      <td>${formatMetric(metric, selected)}</td>
      <td>${formatMetric(metric, account)}</td>
      <td>${formatMetric(metric, benchmark)}</td>
      <td class="${better ? "delta-good" : "delta-bad"}">${delta >= 0 ? "+" : ""}${formatDecimal(delta, 1)}%</td>
    </tr>`;
}

function renderDetailChart(rows) {
  const element = document.getElementById("detailTrendChart");
  if (!element || !window.echarts) return;
  if (state.detailChart) state.detailChart.dispose();
  state.detailChart = window.echarts.init(element, null, { renderer: "canvas" });
  const daily = [...groupBy(rows, (row) => row.date).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, values]) => ({ date, totals: aggregate(values) }));

  state.detailChart.setOption({
    color: ["#246b9e", "#c45a24"],
    tooltip: { trigger: "axis" },
    legend: { top: 4, right: 12, data: ["下载量", "ROI"] },
    grid: { left: 50, right: 52, top: 48, bottom: 38 },
    xAxis: {
      type: "category",
      data: daily.map((item) => item.date.slice(5)),
      axisLabel: { color: "#58635f" },
      axisLine: { lineStyle: { color: "#d4dbd8" } },
    },
    yAxis: [
      { type: "value", name: "下载量", splitLine: { lineStyle: { color: "#e8ecea" } } },
      { type: "value", name: "ROI", axisLabel: { formatter: (value) => `${value.toFixed(1)}x` }, splitLine: { show: false } },
    ],
    series: [
      { name: "下载量", type: "bar", data: daily.map((item) => item.totals.downloads), barMaxWidth: 16 },
      { name: "ROI", type: "line", yAxisIndex: 1, smooth: true, data: daily.map((item) => Number(item.totals.roi.toFixed(3))) },
    ],
  });
}

function openDetail(key) {
  const group = materialGroups().find((item) => item.key === key);
  if (!group) return;
  const row = group.rows[0];
  const channel = CHANNELS.find((item) => item.id === row.channelId);
  const { start, end } = currentDateRange();
  const accountRows = rowsInDateRange(
    state.rows.filter((item) => item.channelId === row.channelId),
    start,
    end,
  );
  const accountTotals = aggregate(accountRows);
  const selectedTotals = group.totals;
  const delta = selectedTotals.roi - channel.benchmark.roi;
  const insight = delta >= 0
    ? `ROI 高于平台参考值 ${formatPercent(Math.abs(delta / channel.benchmark.roi))}，建议继续保持当前素材方向。`
    : `ROI 低于平台参考值 ${formatPercent(Math.abs(delta / channel.benchmark.roi))}，建议优先检查下载成本与素材衰减。`;

  detailKicker.textContent = `${row.channelName} · ${row.adGroupId}`;
  detailTitle.textContent = row.creativeName;
  detailBody.innerHTML = `
    <div class="detail-kpis">
      <div class="detail-kpi"><span>消耗</span><strong>${formatCurrency(selectedTotals.spend)}</strong></div>
      <div class="detail-kpi"><span>曝光量</span><strong>${formatInteger(selectedTotals.impressions)}</strong></div>
      <div class="detail-kpi"><span>下载量</span><strong>${formatInteger(selectedTotals.downloads)}</strong></div>
      <div class="detail-kpi"><span>ROI</span><strong>${formatDecimal(selectedTotals.roi, 2)}x</strong></div>
    </div>
    <h3 class="comparison-title">素材 / 账户整体 / 平台参考值</h3>
    <div class="comparison-table-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th>指标</th>
            <th>当前素材</th>
            <th>同渠道账户整体</th>
            <th>平台参考值</th>
            <th>素材相对参考值</th>
          </tr>
        </thead>
        <tbody>
          ${comparisonRow("曝光点击率", "ctr", selectedTotals, accountTotals, channel)}
          ${comparisonRow("点击下载率", "clickDownloadRate", selectedTotals, accountTotals, channel)}
          ${comparisonRow("曝光下载率", "impressionDownloadRate", selectedTotals, accountTotals, channel)}
          ${comparisonRow("CPM", "cpm", selectedTotals, accountTotals, channel)}
          ${comparisonRow("ROI", "roi", selectedTotals, accountTotals, channel)}
          ${comparisonRow("点击成本", "cpc", selectedTotals, accountTotals, channel)}
          ${comparisonRow("下载成本", "costPerDownload", selectedTotals, accountTotals, channel)}
        </tbody>
      </table>
    </div>
    <div class="insight-strip">${escapeHtml(insight)}</div>
    <h3 class="comparison-title">素材趋势</h3>
    <div class="detail-chart" id="detailTrendChart"></div>
  `;

  detailDrawer.classList.add("is-open");
  detailDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => renderDetailChart(group.rows));
}

function closeDetail() {
  detailDrawer.classList.remove("is-open");
  detailDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (state.detailChart) {
    state.detailChart.dispose();
    state.detailChart = null;
  }
}

function renderDashboard() {
  if (!window.echarts) return;
  renderMetrics();
  renderTrendChart();
  renderTopCreatives();
  renderTable();
  const { start, end } = currentDateRange();
  document.getElementById("dataScopeText").textContent = `${start} 至 ${end}`;
}

async function sha256(value) {
  if (!window.crypto || !window.crypto.subtle) return null;
  const data = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
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

function unlock() {
  sessionStorage.setItem(SESSION_KEY, "1");
  gate.classList.add("is-hidden");
  document.body.classList.remove("is-locked");
  analyticsShell.setAttribute("aria-hidden", "false");
  analyticsShell.inert = false;
  analyticsShell.classList.add("is-visible");
  requestAnimationFrame(() => renderDashboard());
}

function arrivedFromPortfolio() {
  if (!document.referrer) return false;
  const portfolioUrl = new URL("../index.html", window.location.href).href;
  const portfolioDirectoryUrl = new URL("../", window.location.href).href;
  return document.referrer === portfolioUrl || document.referrer === portfolioDirectoryUrl;
}

function initializeFilters() {
  startDateInput.value = SAMPLE_START;
  endDateInput.value = SAMPLE_END;
  renderChannelFilters();

  channelFilters.addEventListener("change", () => {
    state.channelIds = new Set(
      Array.from(channelFilters.querySelectorAll("input:checked")).map((input) => input.value),
    );
    applyFilters();
  });
  startDateInput.addEventListener("change", applyFilters);
  endDateInput.addEventListener("change", applyFilters);
  creativeSearch.addEventListener("input", applyFilters);
  resetFilters.addEventListener("click", () => {
    startDateInput.value = SAMPLE_START;
    endDateInput.value = SAMPLE_END;
    creativeSearch.value = "";
    state.channelIds = new Set(CHANNELS.map((channel) => channel.id));
    channelFilters.querySelectorAll("input").forEach((input) => {
      input.checked = true;
    });
    applyFilters();
  });
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
  passwordInput.value = "";
  unlock();
});

tableBody.addEventListener("click", (event) => {
  const row = event.target.closest("[data-material-key]");
  if (row) openDetail(row.dataset.materialKey);
});

document.querySelector(".creative-table thead").addEventListener("click", (event) => {
  const button = event.target.closest("[data-sort]");
  if (!button) return;
  const key = button.dataset.sort;
  if (state.sortKey === key) {
    state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
  } else {
    state.sortKey = key;
    state.sortDirection = "desc";
  }
  state.page = 1;
  renderTable();
});

pageNumbers.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (!button) return;
  state.page = Number(button.dataset.page);
  renderTable();
});

prevPage.addEventListener("click", () => {
  state.page = Math.max(1, state.page - 1);
  renderTable();
});

nextPage.addEventListener("click", () => {
  state.page += 1;
  renderTable();
});

topChannelTabs.addEventListener("click", (event) => {
  const button = event.target.closest("[data-top-channel]");
  if (!button) return;
  state.topChannelId = button.dataset.topChannel;
  renderTopCreatives();
});

topCreativesList.addEventListener("click", (event) => {
  const item = event.target.closest("[data-top-material]");
  if (item) openDetail(item.dataset.topMaterial);
});

detailDrawer.addEventListener("click", (event) => {
  if (event.target.closest("[data-close-detail]")) closeDetail();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetail();
});

let resizeTimer = null;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    state.chartInstances.forEach((chart) => chart.resize());
    state.detailChart?.resize();
  }, 120);
});

state.rows = generateSampleRows();
initializeFilters();
applyFilters();

if (sessionStorage.getItem(SESSION_KEY) === "1" || arrivedFromPortfolio()) {
  unlock();
} else {
  analyticsShell.inert = true;
  passwordInput.focus();
}
