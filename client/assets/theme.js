if (localStorage.getItem('darkmode') == null) {
    localStorage.setItem('darkmode', 'dark');
}

if (localStorage.getItem('darkmode') == 'light') {
    document.documentElement.style.setProperty('--main-bg-color', '#fff');
    document.documentElement.style.setProperty('--secondary-bg-color', '#dbdad9');
    document.documentElement.style.setProperty('--bg-hover-color', '#c5c4c3');
    document.documentElement.style.setProperty('--text-primary', '#1b1914');
    document.documentElement.style.setProperty('--text-secondary', '#675357');
}