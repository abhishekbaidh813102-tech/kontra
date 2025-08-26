async function loadConfig() {
  const res = await fetch('/assets/site-config.json').catch(() => null);
  return res && res.ok ? res.json() : {};
}

function toggleMenu() {
  const el = document.getElementById('navlinks');
  if (el) el.classList.toggle('open');
}

async function mountCommon() {
  const cfg = await loadConfig();
  // Brand / footer fill
  document.querySelectorAll('[data-site-name]').forEach(el => el.textContent = cfg.siteName || 'Healthcare Tips');
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = cfg.tagline || '');
  document.querySelectorAll('[data-owner]').forEach(el => el.textContent = cfg.ownerName || 'Owner Name');
  document.querySelectorAll('[data-maker]').forEach(el => el.textContent = cfg.makerName || 'Maker Name');
  document.querySelectorAll('[data-email]').forEach(el => el.textContent = cfg.email || '');
  document.querySelectorAll('[data-phone]').forEach(el => el.textContent = cfg.phone || '');
  document.querySelectorAll('[data-address]').forEach(el => el.textContent = cfg.address || '');
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = cfg.copyrightYear || new Date().getFullYear());

  // Socials
  const social = document.getElementById('social-links');
  if (social) {
    const links = [
      ['Twitter', cfg.twitter, 'https://twitter.com/'],
      ['LinkedIn', cfg.linkedin, 'https://linkedin.com/in/'],
      ['Instagram', cfg.instagram, 'https://instagram.com/']
    ].filter(x => x[1]);
    if (links.length) {
      social.innerHTML = links.map(([name, user, base]) => `<a href="${base}${user}" target="_blank" rel="noopener">${name}</a>`).join(' · ');
    }
  }
}

// =========================
// Posts Loader
// =========================
async function loadPosts(limit, type = "blog") {
  try {
    let path = "/posts/posts.json"; // default blog
    if (type === "indian") path = "/posts/indian-posts.json";
    if (type === "shop") path = "/posts/shop-posts.json";

    const res = await fetch(path);
    if (!res.ok) throw new Error('No posts file for ' + type);

    const list = await res.json();
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? list.slice(0, limit) : list;
  } catch (e) {
    console.warn('Posts not loaded:', e);
    return [];
  }
}

function renderPosts(list, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="small">No posts yet. Please add JSON posts in <code>posts/</code> folder.</p>';
    return;
  }
  el.innerHTML = list.map(p => `
    <article class="card">
      <h3><a href="${p.url}">${p.title}</a></h3>
      <div class="small">${new Date(p.date).toLocaleDateString()}</div>
      ${p.tags && p.tags.length ? `<div>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
      ${p.excerpt ? `<p>${p.excerpt}</p>` : ''}
      <a class="btn" href="${p.url}">Read more</a>
    </article>
  `).join('');
}

document.addEventListener('DOMContentLoaded', mountCommon);
