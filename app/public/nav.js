// Shared app shell: auth guard + nav bar, included by every tab page.
// Phase 0.3 of project-plan.md.

const TABS = [
  { id: 'accounts', label: 'Accounts', href: '/accounts.html' },
  { id: 'inbox', label: 'Inbox', href: '/inbox.html' },
  { id: 'summaries', label: 'Summaries', href: '/summaries.html' },
  { id: 'chatbot', label: 'Chatbot', href: '/chatbot.html' }
];

// Shared by inbox.html and summaries.html so every dated checkin
// renders the same way in both places. SQLite's datetime('now') format
// ("YYYY-MM-DD HH:MM:SS", no 'T'/'Z') needs normalizing before Date()
// will parse it consistently.
function formatCheckinDate(sqliteDatetime) {
  const d = new Date(sqliteDatetime.replace(' ', 'T') + 'Z');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

async function initShell(activeTab) {
  const meRes = await fetch('/api/me');
  if (!meRes.ok) {
    window.location.href = '/login.html';
    return;
  }
  const me = await meRes.json();

  const nav = document.createElement('nav');
  nav.className = 'app-nav';
  nav.innerHTML = `
    <div class="app-nav-tabs">
      ${TABS.map(t => `<a href="${t.href}" class="${t.id === activeTab ? 'active' : ''}">${t.label}</a>`).join('')}
    </div>
    <div class="app-nav-brand">
      <img src="/logo.png" alt="Money in Plain English">
      <span>Money in Plain English</span>
    </div>
    <div class="app-nav-user">
      <span>${me.email}</span>
      <button id="logout-btn">Log out</button>
    </div>
  `;
  document.body.prepend(nav);

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login.html';
  });
}
