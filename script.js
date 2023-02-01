const url = "195.2.79.27"
const baseUrl = `https://${url}/api/v1/extension/html`
function showLoginScreen() {
    fetch(`${baseUrl}/public/get-login`)
        .then(response => response.text())
        .then(result => {
            document.getElementById('content').innerHTML = result;
            document.getElementById('error-msg').style.display = 'none';
            document.getElementById('login-btn').addEventListener('click', () => {
                let key = document.getElementById('key-input').value;
                login(key);
            });
        });
}
async function login(key) {
    const response = await fetch(`${baseUrl}/get-home`, {
        headers: {
            "x-api-key": key
        }
    });
    if (response.status === 200) {
        response.text().then(result => {
            document.getElementById('content').innerHTML = result;
            document.getElementById('logout-btn').addEventListener('click', () => {
                logout();
            });
            chrome.storage.local.set({ key: key });
        });
    } else {
        document.getElementById('error-msg').style.display = 'block';
        setTimeout(() => {
            document.getElementById('error-msg').style.display = 'none';
        }, 3000);
    }
}

function logout() {
    chrome.storage.local.set({ key: null });
    showLoginScreen();
}

chrome.storage.local.get(['key'], function (result) {
    if (result.key) {
        login(result.key);
    } else {
        logout();
    }
});
