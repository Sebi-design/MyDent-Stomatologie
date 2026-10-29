# MyDent Stomatologie Oradea — Website Oficial

Website modern de calitate înaltă realizat pentru **MyDent Stomatologie**, clinică stomatologică din Oradea, România (Calea Armatei Române 22).

Acest site este construit în **HTML5, CSS3 și JavaScript pur (Vanilla)**, fiind optimizat 100% pentru:
1. **GitHub Pages** — găzduire gratuită instantanee fără proces de build, fără Node.js sau configurări complicate de server.
2. **Rulare locală imediată** — deschidere directă prin dublu-click pe `index.html` sau `Deschide_Site_MyDent.bat` în orice browser.
3. **Efecte & Animații Smart cu Viteză Maximă (60–120 FPS)**:
   - **Smart Live Status**: Indicator inteligent cu puls în timp real calculat după fusul orar al României (*Europe/Bucharest*), care arată dacă clinica este deschisă sau când se deschide.
   - **Bara de Progres Scroll**: Indicator dinamic de parcurgere a paginii integrat pe header-ul sticky (`requestAnimationFrame`).
   - **Contor numeric animat**: Cifrele cheie (4.9 ★, 100%, 12+ ani, 3500+ pacienți) cresc animat fluid când intră în vizor.
   - **Animații GPU Stagger**: Cardurile de servicii, galerie și recenzii apar prin translații 3D fluide, fără reflow și fără consum mare de memorie/baterie.
   - **Micro-interacțiuni tactile**: Shimmer subtil pe butoane, zoom lin în galerie, accent magnetic pe rândurile de servicii.
   - **Validare inteligentă în timp real**: Feedback vizual imediat (bifă verde) la completarea câmpurilor de programare și selectare automată a serviciului din orice buton.
   - **Buton plutitor «Sus»**: Apare discret după derulare pentru întoarcere rapidă la începutul paginii.

---

## 🚀 Cum încarci site-ul pe GitHub și îl faci funcțional prin link (GitHub Pages)

### Pasul 1: Crearea repository-ului pe GitHub
1. Intră pe [github.com](https://github.com/) și autentifică-te în contul tău.
2. Creează un nou repository (de exemplu: `mydent-oradea`), setat pe **Public**.

### Pasul 2: Încărcarea fișierelor
Poți folosi oricare dintre variante:

#### Varianta A — Direct din browser (Drag & Drop):
1. Pe pagina noului repository de pe GitHub, apasă pe **Add file** -> **Upload files**.
2. Trage și plasează fișierele și folderele proiectului:
   - `index.html`
   - `servicii.html`
   - `despre-noi.html`
   - `contact.html`
   - `politica-confidentialitate.html`
   - `politica-cookies.html`
   - folderul `css/`
   - folderul `js/`
   - folderul `images/`
3. Apasă pe **Commit changes**.

#### Varianta B — Prin terminal (Git):
```bash
git init
git add .
git commit -m "Publicare site MyDent Stomatologie"
git branch -M main
git remote add origin https://github.com/UTILIZATORUL-TAU/NUME-REPO.git
git push -u origin main
```

---

### Pasul 3: Activarea link-ului live pe GitHub Pages (Durează 30 de secunde)
1. În repository-ul tău de pe GitHub, dă click pe tab-ul **Settings** (sus în dreapta).
2. În meniul din stânga, dă click pe **Pages**.
3. La secțiunea **Build and deployment**:
   - **Source:** alege `Deploy from a branch`
   - **Branch:** selectează `main` și folderul `/ (root)`
   - Apasă pe butonul **Save**.
4. În aproximativ 1 minut, GitHub îți va genera link-ul oficial (ex: `https://utilizatorul-tau.github.io/nume-repo/`), iar site-ul va fi complet online și funcțional!

---

## 💻 Cum deschizi site-ul pe calculatorul tău (Local)

Nu este nevoie de terminal, comenzi sau server!
- Fă dublu-click pe `index.html` sau pe fișierul `Deschide_Site_MyDent.bat`.
- Site-ul se va deschide instant în browserul tău favorit (Chrome, Edge, Firefox, Safari).

---

## 📁 Structura Fișierelor

```
My dent/
├── index.html                       # Pagina principală (Acasă)
├── servicii.html                    # Nomenclator & Protocoale clinice
├── despre-noi.html                  # Spațiu, Filosofie & Piloni clinici
├── contact.html                     # Contact, Orar, Hartă Google & Formular
├── politica-confidentialitate.html  # Politică de confidențialitate (GDPR)
├── politica-cookies.html            # Politică de cookies & gestionare acord
├── Deschide_Site_MyDent.bat         # Lansator rapid pentru Windows
├── css/
│   └── style.css                    # Design System complet Sage & Porcelain
├── js/
│   └── main.js                      # Meniu mobil, Lightbox foto, FAQ, Formular, Cookies
└── images/
    ├── clinic/                      # Fotografii reale din clinica MyDent
    │   ├── reception.jpg
    │   ├── treatment_pendant.jpg
    │   ├── treatment_art.jpg
    │   ├── reception_desk.jpg
    │   ├── treatment_unit.jpg
    │   ├── entrance_door.jpg
    │   └── ...
    └── mydent-logo.png              # Logo oficial MyDent
```

---

## 🏥 Date Oficiale Clinică (Oradea)

- **Clinică:** MyDent Stomatologie
- **Adresă:** Calea Armatei Române 22, 410087 Oradea, România
- **Telefon recepție:** 0759 064 150
- **Program:** Luni – Vineri: 10:00 – 20:00 (Sâmbătă & Duminică: Închis)
- **Localizare GPS:** 47.0515° N, 21.9288° E
