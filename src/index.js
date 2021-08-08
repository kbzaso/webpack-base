import Template from '@templates/template.js';
import '@styles/main.css';
import '@styles/main.scss';

(async function App() {
    const main = null || document.getElementById('main');
    main.innerHTML = await Template();
})();