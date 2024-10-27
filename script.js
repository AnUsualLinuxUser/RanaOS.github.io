document.addEventListener("DOMContentLoaded", function() {
    const userLang = navigator.language || navigator.userLanguage;
    const content = {
        it: {
            title: "RanaOS",
            features: "Caratteristiche",
            download: "Download",
            support: "Supporto",
            downloadButton: "Scarica Ora",
            footer: "© 2024 RanaOS. Tutti i diritti riservati."
        },
        en: {
            title: "RanaOS",
            features: "Features",
            download: "Download",
            support: "Support",
            downloadButton: "Download Now",
            footer: "© 2024 RanaOS. All rights reserved."
        }
    };

    let lang = userLang.startsWith("en") ? "en" : "it";

    document.title = content[lang].title;
    document.querySelector("header h1").innerText = content[lang].title;
    document.querySelector("#features-title").innerText = content[lang].features;
    document.querySelector("#download-title").innerText = content[lang].download;
    document.querySelector("#support-title").innerText = content[lang].support;
    document.querySelector(".download-button").innerText = content[lang].downloadButton;
    document.querySelector("footer p").innerText = content[lang].footer;

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        if (name && email && message) {
            alert("Messaggio inviato! Grazie per il tuo feedback.");
            this.reset(); 
        } else {
            alert("Per favore, compila tutti i campi.");
        }
    });

    let page = 1;
    const loadNews = () => {
        fetch(`https://api.example.com/latest-news?page=${page}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Errore nel caricamento delle notizie");
                }
                return response.json();
            })
            .then(data => {
                const newsContainer = document.getElementById('news-container');

                data.articles.forEach(article => {
                    const newsItem = document.createElement('div');
                    newsItem.innerHTML = `<h4>${article.title}</h4><p>${article.description}</p>`;
                    newsContainer.appendChild(newsItem);
                });
                page++;
            })
            .catch(error => {
                console.error('Errore:', error);
            });
    };

    document.getElementById('load-more').addEventListener('click', loadNews);

    loadNews(); // Carica le notizie all'avvio
});
