(async function enhance() {
    const { items } = await chrome.storage.sync.get(['items'])
    for (const { name, prefix, url } of items) {
        if (location.pathname.includes(name)) {
            const title = document.querySelector('h1')
            title.innerHTML = title.innerHTML.replace(
                /<a.*?>|<\/a>/g,
                '',
            ).replace(
                RegExp(`(${prefix}-\\d+)`, 'g'),
                `<a href="${url}$1" title="${url}$1">$1</a>`,
            )
            break;
        }
    }
})()
