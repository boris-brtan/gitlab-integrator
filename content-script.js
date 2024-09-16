(async function enhance() {
    const { items } = await chrome.storage.sync.get(['items']);
    const replacements = [
        // merge request title
        document.querySelector('h1'),
        // merge request description
        document.querySelector('.description')
    ].filter(Boolean);

    for (const { name, prefix, url } of items) {
        replacements.forEach(pReplacement => {
            // setup a regex for the name field
            const nameReg = new RegExp(name, 'gi');

            // match the current url with the name regex
            if (nameReg.test(location.href)) {
                // make it possible to use the replacement on different locations than at the end of the url
                const replaceUrl = url.includes('$1') ? url : `${url}$1`;

                pReplacement.innerHTML = pReplacement.innerHTML.replace(
                    RegExp(`(${prefix})`, 'gi'),
                    `<a href="${replaceUrl}" title="${replaceUrl}">$1</a>`,
                );
            }
        });
    }
})();
