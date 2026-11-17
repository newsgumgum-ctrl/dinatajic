Dina Tajić, portfolio sajt

Struktura
  index.html        stranica
  css/style.css     izgled
  js/main.js        animacije, projekti, WhatsApp dugmad
  js/vendor/        biblioteke (three.js, GSAP, Lenis), sve lokalno
  img/              slike radova (velike)
  img/sm/           iste slike u manjoj veličini, za telefone i liste

Hosting
  Ceo folder dina-tajic-sajt otpremi na hosting (Netlify, Vercel, cPanel, GitHub Pages...).
  Sadržaj foldera ide u koren sajta, tako da index.html bude na glavnoj adresi.

Lokalno testiranje
  Ne otvaraj index.html duplim klikom, browser tada blokira JS module.
  U ovom folderu pokreni:  python -m http.server 8000
  pa otvori http://localhost:8000

Izmene
  Tekstovi i spisak projekata su u js/main.js (traži PROJECTS, REAL i WORKS).
  WhatsApp broj: WA_NUMBER u js/main.js (381603588080).
  Nova slika: ubaci je u img/ i img/sm/ pod istim imenom i dodaj ime u WORKS za taj projekat.
