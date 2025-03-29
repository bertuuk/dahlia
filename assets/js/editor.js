import './lazyLoad';

wp.domReady(function () {
    // Seleccionem el contenidor dels blocs de l'editor
    const container = document.querySelector('.block-editor__container, .editor-styles-wrapper');

    if (!container) {
        return;
    }

    // Funció per processar els elements amb lazyload
    function processLazyElements() {
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentDocument) {
            const lazyElements = iframe.contentDocument.querySelectorAll('.lazyload');
            console.log(lazyElements);
            lazyElements.forEach(function (el) {
                var bg = el.getAttribute('data-bgset');
                if (bg) {
                    el.style.backgroundImage = 'url("' + bg + '")';
                }
                el.classList.remove('lazyload');
                el.classList.add('lazyloaded');
            });
        }
        
    }

    // Executa-ho una vegada inicialment, en cas que hi hagi elements
    processLazyElements();

    // Crea un observer que vigili el contenidor per canvis
    const observer = new MutationObserver(function (mutationsList) {
        mutationsList.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0) {
                // Quan es detecta que s'ha afegit algun node, processa els elements
                processLazyElements();
            }
        });
    });

    // Observem canvis en els nodes descendents del contenidor
    observer.observe(container, {
        childList: true,
        subtree: true
    });
});
