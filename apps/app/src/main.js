const TARGET_URL = 'https://connect.comma.ai';
const LOAD_TIMEOUT_MS = 15000;

const loadingScreen = document.getElementById('loading-screen');
const errorScreen = document.getElementById('error-screen');
const webview = document.getElementById('webview');
const refreshBtn = document.getElementById('refresh-btn');

let loadTimer = null;

function showLoading() {
  loadingScreen.classList.remove('hidden');
  errorScreen.classList.add('hidden');
  webview.classList.add('hidden');
}

function showError() {
  loadingScreen.classList.add('hidden');
  errorScreen.classList.remove('hidden');
  webview.classList.add('hidden');
  clearTimeout(loadTimer);
}

function showWebview() {
  loadingScreen.classList.add('hidden');
  errorScreen.classList.add('hidden');
  webview.classList.remove('hidden');
  clearTimeout(loadTimer);
}

function loadPage() {
  showLoading();

  if (!navigator.onLine) {
    showError();
    return;
  }

  webview.src = TARGET_URL;

  loadTimer = setTimeout(() => {
    if (webview.classList.contains('hidden')) {
      showError();
    }
  }, LOAD_TIMEOUT_MS);
}

webview.addEventListener('load', () => {
  try {
    const iframeSrc = webview.contentWindow.location.href;
    if (iframeSrc === 'about:blank') return;
    showWebview();
  } catch (e) {
    // Cross-origin — iframe loaded successfully (we can't access location)
    showWebview();
  }
});

webview.addEventListener('error', () => {
  showError();
});

window.addEventListener('offline', () => {
  showError();
});

window.addEventListener('online', () => {
  loadPage();
});

refreshBtn.addEventListener('click', () => {
  loadPage();
});

window.addEventListener('sideClick', () => {
  if (!errorScreen.classList.contains('hidden')) {
    loadPage();
  }
});

loadPage();
