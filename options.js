function createConfig(main, name = '', prefix = '', url = '') {
    const section = document.createElement('section')
    main.append(section)
    ;[[name, 'Project name'], [prefix, 'Prefix'], [url, 'SaaS url']].forEach(([value, placeholder]) => {
        const field = document.createElement('input')
        field.placeholder = placeholder
        field.value = value
        section.append(field)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(
        { items: [] },
        ({ items }) => {
            const main = document.querySelector('main')
            items.forEach(({name, prefix, url}) => createConfig(main, name, prefix, url))
        }
    );
});

document.getElementById('add').addEventListener('click', () => {
    const main = document.querySelector('main')
    if (main.querySelector('section:last-of-type')?.childNodes.values().some(({ value }) => value === '')) {
        return;
    }
    createConfig(main)
})

document.getElementById('save').addEventListener('click', () => {
    const items = document.querySelectorAll('main > section').values()
        .filter((section) => section.childNodes.values().every(({ value }) => value !== ''))
        .map((section) => {
            const [name, prefix, url] = section.childNodes.values().map(({ value }) => value)
            return { name, prefix, url }
        }).toArray()
    chrome.storage.sync.set(
        { items },
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
});
