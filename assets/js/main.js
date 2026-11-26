/**
 * WEDDING PLANNER MARRAKECH - CORE INTERACTION ENGINE
 * Luxury Front-End Architecture
 */

/* --------------------------------------------------------------------------
 * GOOGLE ANALYTICS 4 - the gtag.js tag (G-9S1R6ERCWM) is in every page <head>
 * with Consent Mode v2 (analytics_storage denied by default). The cookie
 * banner below switches consent on "Accepter" / off on "Refuser".
 * -------------------------------------------------------------------------- */
function setAnalyticsConsent(granted) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' });
  }
}

function trackEvent(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
}

// Lead tracking: WhatsApp, phone and email clicks anywhere on the site
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.includes('wa.me/')) trackEvent('generate_lead', { method: 'whatsapp_link' });
  else if (href.startsWith('tel:')) trackEvent('generate_lead', { method: 'phone' });
  else if (href.startsWith('mailto:')) trackEvent('generate_lead', { method: 'email_link' });
});

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initLanguageSwitcher();
  initScrollReveal();
  initCounters();
  initTestimonialCarousel();
  initQuoteModal();
  initCookieBanner();
  initFaqAccordion();
  initFilterTabs();
  initRentalCart();
  initGalleryLightbox();
});

/* --------------------------------------------------------------------------
 * 1. HEADER SCROLL & BLUR
 * -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
 * 2. FULLSCREEN MOBILE MENU
 * -------------------------------------------------------------------------- */
function initMobileMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-bottom a');

  if (!burgerBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burgerBtn.innerHTML = `
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      `;
    } else {
      drawer.classList.add('open');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      burgerBtn.innerHTML = `
        <span style="font-size:24px; color:#F7F1E8; line-height:1;">&times;</span>
      `;
    }
  };

  burgerBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });
}

/* --------------------------------------------------------------------------
 * 3. MULTILINGUAL DICTIONARY & DOM TRANSLATION ENGINE (FR / EN)
 * -------------------------------------------------------------------------- */
const translations = {
  fr: {
    topbar_location: "Marrakech & Destination Weddings",
    nav_home: "Accueil",
    nav_weddings: "Mariages",
    nav_events: "Évènements",
    nav_rental: "Location",
    nav_gallery: "Galerie",
    nav_team: "L'équipe",
    nav_contact: "Contact",
    cta_quote: "Demander un devis",
    hero_eyebrow: "Wedding Planner de Luxe & Scénographie",
    hero_title: "L'Art de Célébrer l'Éternel à Marrakech",
    hero_tagline: "Des mariages de prestige et des réceptions haute couture conçus sur-mesure au cœur des plus beaux palais, riads et déserts du Maroc.",
    hero_discover: "Découvrir nos univers",
    scroll_down: "Faire défiler",
    intro_eyebrow: "Wedding Planner Marrakech",
    intro_title: "Une signature d'exception pour le plus beau jour de votre vie",
    intro_lead: "Vivre son mariage à Marrakech est le prélude à une aventure féerique.",
    intro_p1: "De notre tout premier échange confidentiel jusqu’aux dernières lueurs du jour J, notre maison orchestre chaque instant avec une méticulosité absolue. Nous transformons vos aspirations les plus intimes en une partition fluide, sereine et envoûtante.",
    intro_p2: "Inspirés par la lumière dorée de la ville ocre et les tendances de la haute joaillerie et de la mode internationale, nos scénographes imaginent des décors immersifs où fleurs rares, soieries drapées et lumières tamisées composent une ode à la beauté.",
    intro_p3: "Parce que chaque couple porte une histoire unique, aucune de nos célébrations ne se ressemble. Nous veillons avec une discrétion exemplaire sur chaque convive venu des quatre coins du globe, pour une hospitalité marocaine sublimée.",
    themes_eyebrow: "Inspirations & Ambiances",
    themes_title: "Quatre Signatures Scénographiques",
    themes_subtitle: "Chaque thème raconte une histoire singulière, où l'élégance marocaine dialogue avec le raffinement contemporain.",
    themes_more: "Plus d'images & inspirations",
    exp_eyebrow: "Votre Mariage à Marrakech",
    exp_title: "Une Expertise Internationale Éprouvée",
    exp_subtitle: "Implantée au cœur de Marrakech, Wedding Planner Marrakech déploie les clés des adresses les plus secrètes et coordonne l'élite des artisans d'art pour des festivités inoubliables.",
    exp_btn: "Explorer nos formules de mariage",
    stat_years: "Années d'expertise",
    stat_weddings: "Mariages d'exception",
    stat_nations: "Nationalités d'invités",
    stat_partners: "Artisans & prestataires d'art",
    why_eyebrow: "La Magie de la Ville Ocre",
    why_title: "Pourquoi se marier à Marrakech ?",
    why_card1_title: "Lumière d'or & climat bienveillant",
    why_card1_text: "Bénéficiant de plus de 300 jours de soleil par an, Marrakech offre des crépuscules dorés spectaculaires avec les cimes enneigées de l'Atlas en toile de fond majestueuse.",
    why_card2_title: "Demeures & palais d'exception",
    why_card2_text: "Des riads secrets de la Médina aux tentes nomades de luxe dans le désert d'Agafay, jusqu'aux villas palatiales de la Palmeraie, la ville regorge de joyaux privatifs incomparables.",
    why_card3_title: "Accessibilité internationale fluide",
    why_card3_text: "À seulement 3 heures des grandes capitales européennes et reliée par des vols directs quotidiens depuis Paris, Londres, Genève, Dubaï et New York pour accueillir vos invités avec aisance.",
    testi_eyebrow: "Témoignages & Émotions",
    testi_title: "Ils nous ont confié leur grand jour",
    insta_eyebrow: "Galerie Vivante",
    insta_title: "Nos dernières créations",
    footer_desc: "Maison d'organisation de mariages d'exception et de location événementielle de prestige à Marrakech et à l'international.",
    footer_nav_title: "Navigation",
    footer_themes_title: "Thèmes de Mariage",
    footer_contact_title: "Conciergerie & Siège"
  },
  en: {
    topbar_location: "Marrakech & Destination Weddings",
    nav_home: "Home",
    nav_weddings: "Weddings",
    nav_events: "Events",
    nav_rental: "Rental",
    nav_gallery: "Gallery",
    nav_team: "The Team",
    nav_contact: "Contact",
    cta_quote: "Request a Quote",
    hero_eyebrow: "Luxury Wedding Planner & Scenography",
    hero_title: "The Art of Celebrating Eternity in Marrakech",
    hero_tagline: "Prestigious destination weddings and bespoke haute-couture celebrations crafted within Morocco's most breathtaking palaces, riads, and desert landscapes.",
    hero_discover: "Explore our Worlds",
    scroll_down: "Scroll Down",
    intro_eyebrow: "Marrakech Luxury Wedding Planner",
    intro_title: "An exceptional signature for the most precious day of your life",
    intro_lead: "Hosting your wedding in Marrakech is the beginning of an enchanting fairytale.",
    intro_p1: "From our very first confidential consultation to the final dawn of your wedding day, our house curates every detail with obsessive precision. We transform your intimate dreams into a seamless, serene, and breathtaking symphony.",
    intro_p2: "Inspired by the golden light of the ochre city and the elegance of fine jewelry and international haute couture, our scenographers design immersive settings where rare blooms, draped silks, and ambient candlelight compose an ode to beauty.",
    intro_p3: "Because every couple shares a unique love story, no two celebrations of ours are alike. We watch over every guest from across the globe with exemplary discretion, embodying the pinnacle of Moroccan hospitality.",
    themes_eyebrow: "Inspirations & Atmospheres",
    themes_title: "Four Signature Scenographies",
    themes_subtitle: "Each aesthetic unveils a unique narrative, where Moroccan timeless heritage harmonizes with contemporary refinement.",
    themes_more: "Explore gallery & inspirations",
    exp_eyebrow: "Your Wedding in Marrakech",
    exp_title: "Proven International Excellence",
    exp_subtitle: "Based in Marrakech, Wedding Planner Marrakech unlocks the most confidential palaces and coordinates elite master craftsmen for truly unforgettable memories.",
    exp_btn: "Explore wedding collections",
    stat_years: "Years of excellence",
    stat_weddings: "Exceptional weddings",
    stat_nations: "Guest nationalities",
    stat_partners: "Elite artisan partners",
    why_eyebrow: "The Magic of the Ochre City",
    why_title: "Why Celebrate Your Wedding in Marrakech?",
    why_card1_title: "Golden Light & Blessed Climate",
    why_card1_text: "Boasting over 300 days of sunshine per year, Marrakech delivers breathtaking golden sunsets with the snow-capped Atlas Mountains as a majestic backdrop.",
    why_card2_title: "Extraordinary Palaces & Riads",
    why_card2_text: "From intimate Medina riads to luxury nomadic camps in the Agafay Desert, and grand palatial villas in the Palmeraie, the city offers unparalleled private sanctuaries.",
    why_card3_title: "Effortless Global Accessibility",
    why_card3_text: "Just 3 hours from major European capitals, with direct daily flights from Paris, London, Geneva, Dubai, and New York, ensuring effortless travel for your international guests.",
    testi_eyebrow: "Testimonials & Memories",
    testi_title: "They entrusted their dream day to us",
    insta_eyebrow: "Living Gallery",
    insta_title: "Our latest creations",
    footer_desc: "Bespoke luxury wedding planning and high-end event rental house based in Marrakech, serving couples worldwide.",
    footer_nav_title: "Navigation",
    footer_themes_title: "Wedding Themes",
    footer_contact_title: "Concierge & Office"
  }
};

const dict_fr_to_en = {
  "Marrakech & Destination Weddings": "Marrakech & Destination Weddings",
  "Conciergerie Privée Marrakech": "Private Concierge Marrakech",
  "FR": "FR",
  "EN": "EN",
  "Accueil": "Home",
  "Mariages": "Weddings",
  "Évènements": "Events",
  "Location": "Rental",
  "Galerie": "Gallery",
  "L'équipe": "The Team",
  "Contact": "Contact",
  "Demander un devis": "Request a Quote",
  "← Retour à l'accueil": "← Back to Home",
  "← Retour": "← Back",
  "© 2026 Wedding Planner Marrakech. Tous droits réservés.": "© 2026 Wedding Planner Marrakech. All rights reserved.",
  "© 2026 Wedding Planner Marrakech. Tous droits réservés. Haute Couture Événementielle.": "© 2026 Wedding Planner Marrakech. All rights reserved. Haute Couture Event Planning.",
  "Navigation": "Navigation",
  "Thèmes": "Themes",
  "Thèmes Mariage": "Wedding Themes",
  "Thèmes de Mariage": "Wedding Themes",
  "Bohème Champêtre": "Rustic Bohemian",
  "Mariage bohème champêtre à Marrakech": "Rustic Bohemian Wedding in Marrakech",
  "Mariage jardin secret en riad à Marrakech": "Secret Garden Riad Wedding in Marrakech",
  "Mariage Mille et Une Nuits à Marrakech": "Arabian Nights Wedding in Marrakech",
  "Désert d'Agafay": "Agafay Desert",
  "Jardin Secret": "Secret Garden",
  "Mille et Une Nuits": "Arabian Nights",
  "Avenue Mohammed VI, Marrakech": "Mohammed VI Avenue, Marrakech",
  "WhatsApp : +212 (0) 6 61 00 00 00": "WhatsApp: +212 (0) 6 61 00 00 00",
  "Mentions Légales": "Legal Notice",
  "Confidentialité": "Privacy Policy",
  "Cookies": "Cookie Policy",
  "Faire défiler": "Scroll down",
  "Wedding Planner de prestige et scénographies exclusives à Marrakech.": "Prestigious wedding planning and bespoke scenography in Marrakech.",
  "Maison d'organisation de mariages d'exception et de location événementielle de prestige à Marrakech et à l'international.": "Bespoke luxury wedding planning and high-end event rental house in Marrakech and internationally.",
  "Maison d'organisation de mariages d'exception et de location événementielle de prestige à Marrakech.": "Prestigious wedding planning and luxury event rentals house in Marrakech.",
  "Mariages & Formules": "Weddings & Collections",
  "Événements Corporate": "Corporate Events",
  "Location Événementielle": "Event Rentals",
  "Galerie & Réalisations": "Gallery & Portfolio",
  "L'Équipe & Valeurs": "Team & Values",
  "Contact & Rendez-vous": "Contact & Appointments",
  "Jardin Secret & Riads": "Secret Garden & Riads",
  "Mobilier & Tentes": "Furniture & Tents",
  "Éclairage & Chandelier": "Lighting & Chandeliers",
  "Conciergerie & Siège": "Concierge & Headquarters",
  "Avenue Mohammed VI, Quartier Hivernage, Marrakech 40000, Maroc": "Mohammed VI Avenue, Hivernage, Marrakech 40000, Morocco",
  "+212 (0) 6 61 00 00 00 (WhatsApp)": "+212 (0) 6 61 00 00 00 (WhatsApp)",
  "+33 (0) 1 89 00 00 00 (Ligne France)": "+33 (0) 1 89 00 00 00 (France Line)",
  "+212 (0) 6 61 00 00 00 • Marrakech": "+212 (0) 6 61 00 00 00 • Marrakech",
  "Avenue Mohammed VI, Hivernage, Marrakech": "Mohammed VI Avenue, Hivernage, Marrakech",
  "Conciergerie Privée": "Private Concierge",
  "Demander un devis sur-mesure": "Request a Bespoke Quote",
  "Partagez avec nous votre vision pour une première esquisse confidentielle sous 24h.": "Share your vision with us for a confidential initial proposal within 24 hours.",
  "Votre Projet": "Your Project",
  "Coordonnées": "Contact Details",
  "Vos Coordonnées": "Your Details",
  "Type d'événement *": "Event Type *",
  "Mariage de destination": "Destination Wedding",
  "Mariage de destination de prestige": "Prestigious Destination Wedding",
  "Anniversaire / Soirée privée": "Birthday / Private Party",
  "Anniversaire / Soirée privée d'exception": "Exclusive Birthday / Private Celebration",
  "Gala & Événement corporate": "Gala & Corporate Event",
  "Gala & Événement corporate de luxe": "Luxury Gala & Corporate Event",
  "Location exclusive de matériel": "Exclusive Equipment Rental",
  "Location exclusive de mobilier & décoration": "Exclusive Furniture & Décor Rental",
  "Date souhaitée": "Preferred Date",
  "Date ou période envisagée": "Envisioned Date or Season",
  "Nombre d'invités estimé": "Estimated Number of Guests",
  "Moins de 50 invités": "Under 50 guests",
  "50 à 120 invités": "50 to 120 guests",
  "120 à 250 invités": "120 to 250 guests",
  "Plus de 250 invités": "Over 250 guests",
  "Intimiste (Moins de 50 invités)": "Intimate (Under 50 guests)",
  "Moyen (50 à 120 invités)": "Medium (50 to 120 guests)",
  "Grand (120 à 250 invités)": "Large (120 to 250 guests)",
  "Somptueux (Plus de 250 invités)": "Lavish (Over 250 guests)",
  "50 à 150 invités": "50 to 150 guests",
  "Plus de 150 invités": "Over 150 guests",
  "Lieu envisagé à Marrakech": "Envisioned Venue in Marrakech",
  "Lieu ou décor souhaité": "Preferred Venue or Setting",
  "Lieu souhaité": "Preferred Venue",
  "Bivouac dans le Désert d'Agafay": "Bivouac in the Agafay Desert",
  "Palais privé dans la Palmeraie": "Private Palace in the Palmeraie",
  "Riad historique dans la Médina": "Historic Riad in the Medina",
  "Villa avec vue sur l'Atlas": "Villa with Atlas Views",
  "Villa contemporaine avec vue sur l'Atlas": "Contemporary Villa with Atlas Views",
  "Je souhaite vos recommandations": "I would like your recommendations",
  "Étape suivante →": "Next Step →",
  "Continuer vers l'étape 2 →": "Proceed to Step 2 →",
  "← Retour à l'étape 1": "← Back to Step 1",
  "Fourchette de Budget Envisagée": "Envisioned Budget Range",
  "Budget global estimé (hors hébergement/vols)": "Estimated Total Budget (excl. flights/lodging)",
  "Budget global estimé": "Estimated Total Budget",
  "30 000 € - 60 000 €": "€30,000 - €60,000",
  "60 000 € - 100 000 €": "€60,000 - €100,000",
  "100 000 € - 200 000 €": "€100,000 - €200,000",
  "Plus de 200 000 €": "Over €200,000",
  "Plus de 200 000 € (Sur-mesure illimité)": "Over €200,000 (Limitless Bespoke)",
  "Nom & Prénom *": "Full Name *",
  "Votre nom & prénom *": "Your Full Name *",
  "Vos Noms & Prénoms": "Your Names & Surnames",
  "Téléphone / WhatsApp *": "Phone / WhatsApp *",
  "Téléphone / WhatsApp": "Phone / WhatsApp",
  "Adresse e-mail *": "Email Address *",
  "Message & Attentes": "Message & Expectations",
  "Vos envies particulières ou questions": "Your Special Requests or Inquiries",
  "Vos souhaits particuliers": "Your Special Requests",
  "Message / Détails": "Message / Details",
  "💬 WhatsApp": "💬 WhatsApp",
  "💬 Envoyer via WhatsApp": "💬 Send via WhatsApp",
  "💬 Envoyer sur WhatsApp": "💬 Send on WhatsApp",
  "Envoyer par E-mail": "Send via Email",
  "Envoyer la demande": "Submit Request",
  "Réponse confidentielle sous 24h par notre directrice de clientèle.": "Confidential reply within 24h by our client relations director.",
  "Respect de votre vie privée": "Respecting Your Privacy",
  "Ce site utilise des cookies essentiels et analytiques afin de vous offrir une expérience de navigation d'exception en toute discrétion.": "This site uses essential and analytical cookies to offer you an exceptional, discreet browsing experience.",
  "Ce site utilise des cookies pour assurer une expérience fluide et confidentielle.": "This site uses cookies to ensure a smooth, confidential experience.",
  "Accepter": "Accept",
  "Refuser": "Decline",
  "Wedding Planner Marrakech | Wedding Planner de Luxe & Location Événementielle": "Wedding Planner Marrakech | Luxury Wedding Planner & Event Rentals",
  "Wedding Planner de Luxe & Scénographie": "Luxury Wedding Planner & Scenography",
  "L'Art de Célébrer l'Éternel à Marrakech": "The Art of Celebrating Eternity in Marrakech",
  "Des mariages de prestige et des réceptions haute couture conçus sur-mesure au cœur des plus beaux palais, riads et déserts du Maroc.": "Prestigious destination weddings and bespoke haute-couture celebrations crafted within Morocco's most breathtaking palaces, riads, and deserts.",
  "Découvrir nos univers": "Explore our Worlds",
  "Wedding Planner Marrakech": "Marrakech Wedding Planner",
  "Une signature d'exception pour le plus beau jour de votre vie": "An exceptional signature for the most precious day of your life",
  "Vivre son mariage à Marrakech est le prélude à une aventure féerique, où la splendeur des traditions millénaires s’accorde avec la grâce d'une scénographie contemporaine.": "Celebrating your wedding in Marrakech is the prelude to an enchanting adventure, where the splendor of ancient traditions harmonizes with the grace of contemporary scenography.",
  "De notre tout premier échange confidentiel jusqu’aux dernières lueurs du jour J, notre maison orchestre chaque instant avec une méticulosité absolue. Nous transformons vos aspirations les plus intimes en une partition fluide, sereine et envoûtante, libérée de toute contrainte logistique.": "From our very first confidential consultation to the final dawn of your wedding day, our house curates every detail with obsessive precision. We transform your intimate aspirations into a seamless, serene, and breathtaking symphony, free from all logistical worries.",
  "Inspirés par la lumière dorée de la ville ocre et les tendances de la haute joaillerie et de la mode internationale, nos scénographes imaginent des décors immersifs où fleurs rares, soieries drapées et lumières tamisées composent une ode à la beauté.": "Inspired by the golden glow of the ochre city and the elegance of fine jewelry and international haute couture, our scenographers design immersive settings where rare blooms, draped silks, and ambient candlelight compose an ode to beauty.",
  "Parce que chaque couple porte une histoire unique, aucune de nos célébrations ne se ressemble. Nous veillons avec une discrétion exemplaire sur chaque convive venu des quatre coins du globe, pour une hospitalité marocaine sublimée.": "Because every couple shares a unique love story, no two celebrations of ours are alike. We watch over every guest from across the globe with exemplary discretion, embodying the pinnacle of Moroccan hospitality.",
  "Accompagnement Couture Dédié": "Dedicated Couture Guidance",
  "Interlocuteur unique bilingue disponible à chaque étape.": "Single bilingual advisor available at every stage.",
  "Coordination Jour J au Millimètre": "Flawless Wedding Day Coordination",
  "Régie générale discrète et gestion de l'ensemble des prestataires.": "Discreet on-site management and complete vendor coordination.",
  "Créations Sur-Mesure & Privatisations Confidentielles": "Bespoke Creations & Confidential Buyouts",
  "Inspirations & Ambiances": "Inspirations & Atmospheres",
  "Quatre Signatures Scénographiques": "Four Signature Scenographies",
  "Chaque thème raconte une histoire singulière, où l'élégance marocaine dialogue avec le raffinement contemporain.": "Each theme unveils a unique narrative, where Moroccan timeless heritage harmonizes with contemporary refinement.",
  "Thème 01 • Matières Naturelles": "Theme 01 • Natural Elements",
  "Allée d'honneur sous les oliviers centenaires, chaises Chiavari blanches, voilages de lin brut drapés et suspensions artisanales tressées.": "Aisle of honor beneath century-old olive trees, white Chiavari chairs, raw draped linen curtains, and woven artisan chandeliers.",
  "Explorer ce thème →": "Explore this theme →",
  "Thème 02 • Grandeur Nomade": "Theme 02 • Nomadic Grandeur",
  "Mariage dans le Désert d'Agafay": "Agafay Desert Wedding",
  "Bivouacs haute couture sous la voûte céleste, allées de bougies infinies et dîner étoilé face aux silhouettes minérales du désert.": "Haute-couture bivouacs beneath the starry dome, endless candlelit pathways, and dinner under the stars facing the desert's mineral silhouettes.",
  "Thème 03 • Poésie Végétale": "Theme 03 • Botanical Poetry",
  "Riads protégés des regards, murmures de fontaines en zellige, effluves de fleurs d'oranger et tonnelles de roses poudrées.": "Secluded private riads, murmuring zellige fountains, scents of orange blossom, and powdery rose arbors.",
  "Thème 04 • Féerie Royale": "Theme 04 • Royal Splendor",
  "Fastes des palais d'Orient, chandeliers en laiton ciselé, velours impériaux, musiciens andalous et enchantement pyrotechnique.": "Splendor of Oriental palaces, hand-carved brass chandeliers, imperial velvets, Andalusian musicians, and fireworks display.",
  "Plus d'images & inspirations": "More pictures & inspirations",
  "Votre Mariage à Marrakech": "Your Wedding in Marrakech",
  "Une Expertise Internationale Éprouvée": "Proven International Excellence",
  "Implantée au cœur de Marrakech, Wedding Planner Marrakech déploie les clés des adresses les plus secrètes et coordonne l'élite des artisans d'art pour des festivités inoubliables.": "Based in the heart of Marrakech, Wedding Planner Marrakech unlocks the most confidential venues and coordinates elite master craftsmen for unforgettable celebrations.",
  "Explorer nos formules de mariage": "Explore our wedding collections",
  "Années d'expertise": "Years of expertise",
  "Mariages d'exception": "Exceptional weddings",
  "Nationalités d'invités": "Guest nationalities",
  "Artisans & prestataires d'art": "Master artisan partners",
  "La Magie de la Ville Ocre": "The Magic of the Ochre City",
  "Pourquoi se marier à Marrakech ?": "Why Celebrate Your Wedding in Marrakech?",
  "Plébiscitée par les couples du monde entier, Marrakech conjugue dépaysement absolu, hospitalité raffinée et climat exceptionnel.": "Praised by couples worldwide, Marrakech blends total escapism, refined hospitality, and an exceptional climate.",
  "Lumière d'or & climat bienveillant": "Golden Light & Blessed Climate",
  "Bénéficiant de plus de 300 jours de soleil par an, Marrakech offre des crépuscules dorés spectaculaires avec les cimes enneigées de l'Atlas en toile de fond majestueuse. Célébrez en plein air sous un ciel d'azur quasi permanent, d'avril à novembre.": "Boasting over 300 days of sunshine per year, Marrakech delivers breathtaking golden sunsets with the snow-capped Atlas Mountains as a majestic backdrop. Celebrate outdoors under an azure sky from April to November.",
  "Douceur des soirées étoilées": "Gentle starlit evenings",
  "Demeures & palais d'exception": "Extraordinary Palaces & Sanctuaries",
  "Des riads secrets de la Médina aux tentes nomades de luxe dans le désert d'Agafay, jusqu'aux villas palatiales de la Palmeraie, la ville regorge de joyaux privatifs incomparables. Chaque lieu se prête à des mises en scène théâtrales et poétiques.": "From hidden Medina riads to luxury nomadic camps in the Agafay Desert and palatial villas in the Palmeraie, the city abounds in incomparable private sanctuaries, ready for poetic staging.",
  "Privatisation totale sans couvre-feu": "Full privatization without sound curfews",
  "Accessibilité internationale fluide": "Effortless Global Accessibility",
  "À seulement 3 heures des grandes capitales européennes et reliée par des vols directs quotidiens depuis Paris, Londres, Genève, Dubaï et New York, l'aéroport Menara accueille vos proches avec une aisance remarquable et un sens de l'accueil légendaire.": "Just 3 hours from major European capitals with daily direct flights from Paris, London, Geneva, Dubai, and New York, Menara Airport welcomes your loved ones with remarkable ease and legendary hospitality.",
  "Liaisons directes & accueil VIP": "Direct flights & VIP airport welcome",
  "• Note d'Excellence Recommandée": "• Recommended Excellence Rating",
  "Témoignages & Émotions": "Testimonials & Memories",
  "Ils nous ont confié leur grand jour": "They entrusted their grand day to us",
  "« Confier notre mariage à Wedding Planner Marrakech a été la plus belle décision de notre vie. Le bivouac royal dressé au milieu du désert d’Agafay dépassait tout ce que nous avions osé imaginer. Nos convives venus de Londres et New York en parlent encore avec des étoiles dans les yeux. »": "“Entrusting our wedding to Wedding Planner Marrakech was the best decision of our lives. The royal bivouac erected in the Agafay Desert exceeded everything we dared imagine. Our guests from London and New York still speak of it with stars in their eyes.”",
  "Camille & Arthur": "Camille & Arthur",
  "France & Royaume-Uni • Désert d'Agafay": "France & United Kingdom • Agafay Desert",
  "[Témoignage d'exemple à remplacer par vos avis réels]": "[Client testimonial]",
  "« Une scénographie d'une élégance rare dans un palais de la Palmeraie. Chaque détail, des chemins de roses poudrées aux lustres suspendus entre les palmiers, respirait le grand luxe sans jamais en faire trop. Un accompagnement discret et rassurant du début à la fin. »": "“Scenography of rare elegance in a Palmeraie palace. Every detail, from the powdery rose runners to chandeliers suspended between palm trees, radiated understated luxury. Discreet, reassuring guidance from start to finish.”",
  "Leila & Karim": "Leila & Karim",
  "Émirats Arabes Unis • Palais Palmeraie": "United Arab Emirates • Palmeraie Palace",
  "« Organiser un mariage à distance peut être source d’angoisse. Avec Wedding Planner Marrakech, nous n'avons ressenti que du pur bonheur. Disponibilité absolue sur WhatsApp, écoute attentive et des prestataires d'art culinaire et musical de premier ordre. »": "“Planning a destination wedding from afar can be daunting. With Wedding Planner Marrakech, we felt nothing but pure joy. 24/7 availability on WhatsApp, attentive listening, and top-tier culinary and musical artisans.”",
  "Elena & Matteo": "Elena & Matteo",
  "Suisse & Italie • Riad Historique Médina": "Switzerland & Italy • Historic Medina Riad",
  "Galerie Vivante": "Living Gallery",
  "Nos dernières créations": "Our latest creations",
  "Art de la table & argenterie • Voir sur Instagram": "Table styling & silverware • View on Instagram",
  "Coucher de soleil Agafay • Voir sur Instagram": "Agafay Sunset • View on Instagram",
  "Arche florale & zellige • Voir sur Instagram": "Floral arch & zellige • View on Instagram",
  "Lustres & féerie nocturne • Voir sur Instagram": "Chandeliers & nighttime magic • View on Instagram",
  "Dîner aux chandelles • Voir sur Instagram": "Candlelight dinner • View on Instagram",
  "Ouverture de bal • Voir sur Instagram": "First dance • View on Instagram",
  "Mariages de Prestige à Marrakech | Formules, Lieux & Accompagnement | Wedding Planner Marrakech": "Luxury Weddings in Marrakech | Collections, Venues & Planning | Wedding Planner Marrakech",
  "Haute Couture Événementielle": "Haute Couture Event Planning",
  "Mariages d'Exception à Marrakech": "Exceptional Weddings in Marrakech",
  "Un accompagnement d'orfèvre pour concevoir une célébration intemporelle, des préparatifs confidentiels jusqu'au dernier éclat d'étoile.": "Masterful craftsmanship to design a timeless celebration, from confidential preparations to the final starry twinkle.",
  "Méthodologie & Rigueur": "Methodology & Precision",
  "Les Cinq Étapes de Votre Célébration": "The Five Stages of Your Celebration",
  "Nous orchestrons chaque jalon avec un souci maniaque du détail, assurant votre totale sérénité à chaque instant.": "We orchestrate each milestone with meticulous attention to detail, ensuring complete peace of mind at every moment.",
  "Vision & Immersion": "Vision & Immersion",
  "Échange confidentiel, analyse de vos sensibilités esthétiques, définition du cahier des charges et budget prévisionnel détaillé.": "Confidential consultation, aesthetic analysis, scope definition, and comprehensive projected budget.",
  "Repérage des Lieux": "Venue Scouting",
  "Accès privilégié aux palais secrets, riads privés et campements désertiques avec visite guidée dédiée et privatisation totale.": "Privileged access to hidden palaces, private riads, and desert camps with private guided viewings and full buyout.",
  "Scénographie 3D": "3D Scenography & Design",
  "Planches d'ambiance, échantillonnages floraux, modélisation des flux de lumière, plans de tables et mobilier sur-mesure.": "Moodboards, floral mockups, lighting scheme modeling, seating plans, and custom furniture curation.",
  "Artisans & Dégustations": "Artisans & Tastings",
  "Sélection des chefs traiteurs, accords mets-vins, artistes internationaux, musiciens acoustiques et créateurs pyrotechniques.": "Curated selection of master caterers, wine pairings, international performers, acoustic musicians, and pyrotechnic artists.",
  "Régie du Jour J": "Wedding Day Direction",
  "Direction logistique millimétrée, coordination bilingue des prestataires, accueil VIP de vos invités et discrétion absolue.": "Flawless on-site logistics, bilingual vendor management, VIP guest hospitality, and absolute discretion.",
  "Collections de Mariage": "Wedding Collections",
  "Trois Formules Sur-Mesure": "Three Bespoke Collections",
  "Chaque formule est une base personnalisable selon l'ampleur de vos festivités et le niveau de conciergerie souhaité.": "Each collection is fully customizable according to the scale of your festivities and the desired concierge level.",
  "L'Écrin Secret": "The Secret Jewel",
  "Mariage Intimiste • Jusqu'à 50 Invités": "Intimate Wedding • Up to 50 Guests",
  "Idéal pour un mariage romantique et confidentiel dans un riad privatisé au cœur de la Médina ou une villa secrète de la Palmeraie.": "Ideal for a romantic, confidential wedding in a privatized Medina riad or a secluded Palmeraie villa.",
  "Recherche et privatisation du lieu intime": "Sourcing and private buyout of intimate venue",
  "Scénographie florale & art de la table raffiné": "Floral design & refined tableware styling",
  "Chef privé gastronomique ou traiteur de prestige": "Private gastronomic chef or prestigious catering",
  "Coordination complète le jour J": "Comprehensive wedding day coordination",
  "Sélectionner cette formule": "Select this collection",
  "L'Oasis Céleste": "The Celestial Oasis",
  "Mariage Signature • 50 à 150 Invités": "Signature Wedding • 50 to 150 Guests",
  "Notre accompagnement le plus plébiscité. Une célébration d'envergure dans le désert d'Agafay ou un palace arabo-andalou avec scénographie totale.": "Our most celebrated journey. A grand celebration in the Agafay Desert or an Arab-Andalusian palace with full-scale scenography.",
  "Organisation intégrale de A à Z": "Comprehensive end-to-end planning from A to Z",
  "Bivouacs de luxe ou structure éphémère cristalline": "Luxury nomadic bivouacs or crystalline glass marquee",
  "Éclairage architectural & lustres monumentaux": "Architectural uplighting & monumental brass chandeliers",
  "Artistes live, DJ international & animation son/lumière": "Live acoustic artists, international DJ & light production",
  "Conciergerie transports & hébergements des convives": "Guest transportation & accommodations concierge",
  "Demander un devis signature": "Request a signature proposal",
  "Le Palais Impérial": "The Imperial Palace",
  "Haute Couture • Multi-Jours & Sans Limite": "Haute Couture • Multi-Day & Boundless",
  "Pour les célébrations royales s'étendant sur 3 jours : Welcome Dinner d'Orient, Nuit de Noces féerique et Brunch piscine sous les palmiers.": "For royal celebrations spanning 3 days: Oriental Welcome Dinner, enchanting Wedding Night, and Palmeraie Poolside Brunch.",
  "3 événements scénographiés distincts (J-1, Jour J, J+1)": "3 distinct styled celebrations (Day-1, Wedding Day, Day+1)",
  "Privatisation exclusive de domaines palatiaux": "Exclusive buyout of grand palatial estates",
  "Production technique complète & spectacle pyrotechnique": "Full technical production & private fireworks display",
  "Équipe de régie dédiée 24h/24 & transferts privés VIP": "Dedicated 24/7 management team & VIP private chauffeured transfers",
  "Consulter notre conciergerie": "Consult our concierge",
  "Domaines & Sanctuaires": "Estates & Sanctuaries",
  "Les Plus Beaux Décors de Marrakech": "Marrakech's Most Breathtaking Venues",
  "Notre carnet d'adresses confidentiel réunit les trésors architecturaux les plus prestigieux du Maroc.": "Our confidential black book brings together Morocco's most prestigious architectural wonders.",
  "Palmeraie": "Palmeraie",
  "Palais & Domaines Royaux": "Palaces & Royal Estates",
  "Désert Minéral": "Mineral Desert",
  "Campements d'Agafay": "Agafay Nomadic Camps",
  "Médina": "Medina",
  "Riads Séculaires & Fontaines": "Centuries-Old Riads & Fountains",
  "Atlas & Vallée": "Atlas & Valley",
  "Kasbahs & Vue sur l'Atlas": "Kasbahs & Atlas Mountain Views",
  "Hospitalité & Conciergerie": "Hospitality & Concierge",
  "Prendre Soin de Chaque Invité Dès Leur Arrivée": "Caring for Every Guest from the Moment They Arrive",
  "La réussite d'un destination wedding à Marrakech réside dans le confort et l'émerveillement de vos convives dès leur atterrissage.": "The true success of a Marrakech destination wedding lies in guest comfort and wonder from touchdown.",
  "Notre service de conciergerie privée prend en charge la réservation des riads et suites hôtelières partenaires, l'organisation des transferts privés en berline et la mise en place d'attentions d'accueil délicates.": "Our private concierge handles boutique riad and luxury hotel suite bookings, chauffeured sedan transfers, and thoughtful in-room welcome amenities.",
  "À leur arrivée en chambre, vos invités découvrent leur welcome kit personnalisé : papeterie de mariage raffinée, rafraîchissements minéraux en conditionnement éco-conçu, friandises marocaines artisanales et carnet de bord pour un séjour sans la moindre contrainte.": "Upon checking into their suites, guests discover their personalized welcome kit: fine calligraphy wedding stationery, organic refreshments, artisanal Moroccan sweet delicacies, and a curated itinerary guide for an effortless stay.",
  "Accueil Personnalisé": "Personalized Welcome",
  "Welcome bags en suite & conciergerie WhatsApp 24/7 pour vos convives.": "In-suite welcome bags & 24/7 WhatsApp concierge for all your guests.",
  "Transferts VIP Dédiés": "Dedicated VIP Transfers",
  "Chauffeurs privés bilingues entre l'aéroport, les hôtels et les lieux de réception.": "Bilingual private chauffeurs between airport, hotels, and event venues.",
  "Questions Fréquentes": "Frequently Asked Questions",
  "Tout Ce Que Vous Devez Savoir": "Everything You Need to Know",
  "Les réponses de nos spécialistes pour préparer votre mariage à Marrakech en toute tranquillité.": "Expert answers from our specialists to prepare your Marrakech wedding in complete serenity.",
  "Quelle est la meilleure période pour se marier à Marrakech ?": "What is the best time of year to get married in Marrakech?",
  "Les mois d'avril à juin, ainsi que de septembre à novembre, offrent des températures douces et idéales (entre 24°C et 28°C) avec un ensoleillement radieux. Les soirées d'été sont parfaites pour des réceptions nocturnes sous les étoiles dans le désert d'Agafay.": "April through June and September through November offer ideal mild temperatures (24°C to 28°C / 75°F to 82°F) and radiant sunshine. Summer evenings are spectacular for starlit desert parties in Agafay.",
  "Combien de temps à l'avance faut-il commencer les préparatifs ?": "How far in advance should we start planning?",
  "Pour privatiser les palais les plus demandés de la Palmeraie ou les campements exclusifs d'Agafay, nous préconisons un délai de 8 à 12 mois. Toutefois, grâce à notre réseau permanent à Marrakech, nous pouvons également concevoir des mariages sur-mesure d'exception en 3 à 4 mois.": "To secure the most coveted Palmeraie palaces or private Agafay camps, we recommend 8 to 12 months. However, through our permanent Marrakech team, we frequently craft bespoke luxury weddings in 3 to 4 months.",
  "Comment gérez-vous les démarches légales et religieuses ?": "How do you handle civil, religious, or symbolic ceremonies?",
  "La grande majorité des couples célèbrent leur union civile dans leur pays de résidence, puis organisent une magnifique cérémonie laïque, symbolique ou religieuse à Marrakech. Notre conciergerie vous accompagne pour toutes les démarches notariales ou protocolaires nécessaires.": "Most international couples complete their civil paperwork in their home country, followed by a romantic symbolic, secular, or religious ceremony in Marrakech. Our concierge assists with all protocol and arrangements.",
  "Prenez-vous en charge l'hébergement et les transports des invités ?": "Do you arrange guest accommodations and logistics?",
  "Absolument. Notre service de conciergerie VIP négocie des tarifs préférentiels dans les plus beaux hôtels et riads partenaires, et organise les transferts privés avec chauffeurs (Mercedes Classe V, limousines et minibus luxe) depuis l'aéroport Menara.": "Absolutely. Our VIP concierge secures preferred group rates across top partner hotels and riads, managing private chauffeured transfers (Mercedes V-Class, luxury sprinters, sedans) from Menara Airport.",
  "Peut-on organiser une fête sans restriction sonore la nuit ?": "Can we party late into the night without noise curfews?",
  "Oui ! Contrairement à l'Europe, les domaines privatisés dans la Palmeraie et le désert d'Agafay ne souffrent d'aucun couvre-feu sonore. Vous pouvez danser jusqu'à l'aube en toute liberté.": "Yes! Unlike most European venues, private estates in the Palmeraie and camps in the Agafay Desert have no sound restrictions. You can dance until dawn in complete freedom.",
  "Votre Rêve Commence Ici": "Your Dream Starts Here",
  "Donnez Vie à Votre Célébration": "Bring Your Celebration to Life",
  "Rencontrons-nous à Marrakech ou lors d'un entretien visio confidentiel pour esquisser ensemble les premiers contours de votre grand jour.": "Let us meet in Marrakech or arrange a confidential video consultation to sketch the first contours of your grand day.",
  "Demander une consultation privée": "Request a Private Consultation",
  "Location de Mobilier & Matériel Événementiel de Prestige à Marrakech | Wedding Planner Marrakech": "Luxury Event Furniture & Decor Rental in Marrakech | Wedding Planner Marrakech",
  "Parc Logistique & Showroom Marrakech": "Logistics Hub & Showroom Marrakech",
  "ocrewedding.marrakech@gmail.com": "ocrewedding.marrakech@gmail.com",
  "Catalogue Exclusif Marrakech": "Exclusive Marrakech Catalogue",
  "Location Événementielle de Prestige": "Luxury Event Rentals",
  "Mobilier haute couture, tentes caïdales et nomades, lustres monumentaux et art de la table raffiné pour sublimer vos réceptions privées et mariages.": "Haute-couture furniture, caidal and stretch nomadic tents, monumental chandeliers, and fine tableware to elevate your private celebrations and weddings.",
  "Tous les articles": "All items",
  "Mobilier & Assises": "Furniture & Seating",
  "Tentes & Bivouacs": "Tents & Bivouacs",
  "Éclairage & Lustres": "Lighting & Chandeliers",
  "Art de la Table": "Table Styling & Tableware",
  "Décoration & Tapis": "Décor & Moroccan Rugs",
  "Son & Lumière": "Sound & Lighting",
  "Mobilier": "Furniture",
  "Salon Majlis Lounge Terracotta": "Terracotta Velvet Majlis Lounge",
  "Banquettes modulables en velours de coton terracotta, piètement en laiton brossé et tables basses en marbre d'Agadir. Ensemble 12 personnes.": "Modular terracotta cotton-velvet banquettes with brushed brass legs and Agadir marble coffee tables. Seating for 12 guests.",
  "Sur Devis • Réf. MOB-01": "Price on Request • Ref. MOB-01",
  "+ Ajouter au devis": "+ Add to quote",
  "✓ Sélectionné": "✓ Selected",
  "Tentes & Bivouac": "Tents & Bivouacs",
  "Tente Nomade Stretch Écru": "Ecru Stretch Nomadic Tent",
  "Toile stretch organique imperméable couleur sable clair, mâts en eucalyptus traité et haubanage invisible. Modules de 150 m² à 600 m².": "Organic light-sand waterproof stretch canopy, treated eucalyptus timber poles, and concealed rigging. Units from 150 m² to 600 m².",
  "Sur Devis • Réf. TNT-04": "Price on Request • Ref. TNT-04",
  "Éclairage": "Lighting",
  "Lustre Calife Géant Laiton & Cristal": "Giant Caliph Brass & Crystal Chandelier",
  "Pièce maîtresse de 2,20 m de hauteur, ciselée artisanalement par les maîtres dinandiers de Marrakech. Éclairage LED blanc chaud dimmable.": "Monumental 2.20 m statement centerpiece, hand-chiseled by master copper smiths in Marrakech. Dimmable warm-white LED lighting.",
  "Sur Devis • Réf. ECL-02": "Price on Request • Ref. ECL-02",
  "Service Porcelaine & Liseré Or Royal": "Royal Gold-Rimmed Porcelain Dinnerware",
  "Assiettes de présentation, verres à pied en cristal taillé biseauté et ménagère complète de couverts dorés mats 24 carats. Jusqu'à 400 couverts.": "Fine charger plates, cut-crystal stemware, and complete 24k matte-gold cutlery collection. Up to 400 place settings.",
  "Sur Devis • Réf. VAI-07": "Price on Request • Ref. VAI-07",
  "Décoration": "Décor",
  "Collection Tapis Berbères Beni Ouarain": "Beni Ouarain Berber Rug Collection",
  "Pièces authentiques en pure laine naturelle vierge tissées dans le Moyen-Atlas. Idéal pour chemins de cérémonie ou salons lounge.": "Authentic virgin natural wool heirlooms handwoven in the Middle Atlas. Ideal for ceremony aisles and chill-out lounges.",
  "Sur Devis • Réf. DEC-11": "Price on Request • Ref. DEC-11",
  "Pack Son & Lumière Architectural": "Architectural Sound & Lighting Package",
  "Système de diffusion acoustique haute fidélité L-Acoustics ultra-discret, micros sans fil Shure et 24 projecteurs autonomes sur batterie pour mise en valeur des palmiers.": "Discreet ultra-fidelity L-Acoustics audio system, Shure wireless microphones, and 24 battery-powered architectural spotlights for palm trees.",
  "Sur Devis • Réf. TEC-01": "Price on Request • Ref. TEC-01",
  "Articles sélectionnés": "Selected items",
  "Finaliser mon devis →": "Finalize my quote →",
  "Parc logistique et location de matériel de prestige pour événements et mariages à Marrakech.": "Logistics hub and luxury event rental equipment for weddings and events in Marrakech.",
  "Catégories Location": "Rental Categories",
  "Lustres & Guirlandes": "Chandeliers & String Lights",
  "Sonorisation & Régie": "Sound Engineering & Stage",
  "Showroom & Entrepôt": "Showroom & Warehouse",
  "Zone Industrielle Sidi Ghanem & Palmeraie": "Sidi Ghanem Design District & Palmeraie",
  "Tél Showroom : +212 (0) 6 61 00 00 00": "Showroom Tel: +212 (0) 6 61 00 00 00",
  "Devis Location de Matériel": "Equipment Rental Quote",
  "Recevez la disponibilité et les tarifs sous 24h.": "Receive availability and rates within 24 hours.",
  "Date de l'événement": "Event Date",
  "Lieu de livraison à Marrakech": "Delivery Location in Marrakech",
  "Articles & Besoins Particuliers": "Selected Items & Special Requests",
  "Galerie & Réalisations de Mariages de Luxe à Marrakech | Wedding Planner Marrakech": "Luxury Wedding Gallery & Portfolio in Marrakech | Wedding Planner Marrakech",
  "Galerie Photographique & Réalisations": "Photo Gallery & Realized Celebrations",
  "Portfolio d'Inspirations": "Inspiration Portfolio",
  "Instants Éternels": "Timeless Moments",
  "Chaque photographie reflète l'émotion brute, la précision scénographique et la poésie lumineuse de nos célébrations à Marrakech.": "Each photograph reflects raw emotion, scenic precision, and luminous poetry from our Marrakech celebrations.",
  "Tous les univers": "All worlds",
  "Palais & Riads": "Palaces & Riads",
  "Féerie Nocturne": "Nighttime Magic",
  "Canopée Céleste": "Celestial Canopy",
  "Cérémonie & Bohème": "Ceremony & Bohemian",
  "Allée d'Honneur & Voilages": "Aisle of Honor & Drapes",
  "Cérémonie Nomade & Pampas": "Nomadic Ceremony & Pampas",
  "Le Jardin Secret & Zelliges": "The Secret Garden & Zelliges",
  "Splendeur Impériale": "Imperial Splendor",
  "Palais & Palmeraie": "Palace & Palm Grove",
  "Banquet Sous Les Palmiers": "Banquet Under the Palms",
  "Nuit Magique": "Magical Night",
  "Accueil VIP en Suite": "VIP Suite Welcome",
  "Lustres & Cristaux": "Chandeliers & Crystals",
  "Dîner aux Chandelles": "Candlelit Banquet",
  "Campement Berbère & Tapis Royaux": "Berber Camp & Royal Carpets",
  "Horizon Minéral": "Mineral Horizon",
  "Portfolio de mariages et créations exclusives à Marrakech.": "Portfolio of destination weddings and exclusive celebrations in Marrakech.",
  "L'Équipe, Valeurs & Partenaires | Wedding Planner Marrakech": "The Team, Values & Partners | Wedding Planner Marrakech",
  "Maison Fondée à Marrakech": "House Founded in Marrakech",
  "Passion & Dévouement": "Passion & Dedication",
  "Les Artisans de Vos Émotions": "The Artisans of Your Emotions",
  "Une équipe multiculturelle et bilingue animée par une quête inconditionnelle du beau et le sens sacré de l'hospitalité marocaine.": "A multicultural, bilingual team driven by an uncompromising quest for beauty and the sacred art of Moroccan hospitality.",
  "« Un mariage à Marrakech n'est pas une simple succession de moments logistiques ; c'est un voyage initiatique où chaque détail, de la fraîcheur d'un pétale de rose au timbre d'un luth sous les étoiles, doit résonner avec l'âme des mariés. »": "“A wedding in Marrakech is not merely a sequence of logistics; it is an initiatory voyage where every detail, from the fresh dewy rose petal to the tone of an oud beneath the stars, resonates with the couple's soul.”",
  "Kenza B.": "Kenza B.",
  "Fondatrice & Directrice Artistique": "Founder & Artistic Director",
  "Les Piliers de la Maison": "Pillars of the House",
  "Une Équipe Complémentaire": "A Complementary Team",
  "Formée à l'école du design parisien et native de Marrakech, elle insuffle à chaque projet une vision architecturale et émotionnelle unique.": "Trained in Parisian design and born in Marrakech, she infuses every celebration with an architectural and emotional vision.",
  "Sofia L.": "Sofia L.",
  "Lead Wedding Designer": "Lead Wedding Designer",
  "Spécialiste en scénographie florale et art de la table, Sofia compose des décors immersifs avec les essences les plus précieuses du Maroc.": "Specialist in botanical scenography and tablescapes, Sofia curates immersive atmospheres using Morocco's most exquisite floral essences.",
  "Mehdi T.": "Mehdi T.",
  "Directeur Régie & Technique": "Technical & Stage Director",
  "Ingénieur son et lumière de formation, Mehdi pilote la logistique lourde, les structures éphémères et la sécurité des sites avec rigueur.": "Sound and lighting engineer by trade, Mehdi leads heavy logistics, temporary structures, and site security with rigor.",
  "Amélie D.": "Amélie D.",
  "Concierge Privée & Relations VIP": "Private Concierge & VIP Relations",
  "Trilingue français-anglais-arabe, Amélie veille avec délicatesse sur les mariés et orchestre l'accueil sur-mesure des invités internationaux.": "Trilingual in French, English, and Arabic, Amélie tends to the couple with delicate care and orchestrates bespoke guest hospitality.",
  "Philosophie": "Philosophy",
  "Nos Valeurs Immuables": "Our Unwavering Values",
  "Perfectionnisme Silencieux": "Silent Perfectionism",
  "L'organisation parfaite est celle que l'on ne remarque pas. Nous anticipons chaque seconde pour que vous n'ayez qu'à vivre l'instant.": "Flawless planning is invisible. We anticipate every micro-second so that you simply live the magic.",
  "Discrétion & Secret": "Discretion & Secrecy",
  "Nous protégeons avec la plus grande fermeté la vie privée de nos mariés et de leurs proches, sans exposition médiatique non consentie.": "We rigorously guard the privacy of our couples and guests, with strict non-disclosure and no unauthorized media exposure.",
  "Artisanat Vivant": "Living Craftsmanship",
  "Chaque événement valorise le savoir-faire des maîtres dinandiers, potiers, menuisiers et brodeuses marocaines d'exception.": "Each celebration honors the living heritage of Moroccan brass smiths, master potters, woodcarvers, and royal embroiderers.",
  "Événements Corporate, Galas & Soirées Privées à Marrakech | Wedding Planner Marrakech": "Corporate Events, Galas & Private Celebrations in Marrakech | Wedding Planner Marrakech",
  "Marrakech Corporate & Private Receptions": "Marrakech Corporate & Private Receptions",
  "ocrewedding.marrakech@gmail.com": "ocrewedding.marrakech@gmail.com",
  "Corporate & Célébrations Privées": "Corporate & Private Celebrations",
  "L'Événementiel de Haute Volée": "High-End Event Production",
  "De l'inauguration exclusive au gala de bienfaisance, nous créons des expériences institutionnelles et festives incomparables sous le ciel de Marrakech.": "From exclusive brand launches to philanthropic charity galas, we curate incomparable corporate and private experiences under the Marrakech sky.",
  "Nos Formats Événementiels": "Our Event Formats",
  "Une Maîtrise Logistique Sans Faille": "Flawless Logistical Mastery",
  "Discrétion diplomatique, protocoles stricts, mise en scène de marque et hospitalité de prestige.": "Diplomatic discretion, strict protocols, luxury brand staging, and prestigious hospitality.",
  "Galas & Soirées de Prestige": "Galas & Prestigious Evenings",
  "Banquets assis jusqu'à 500 invités dans des palais privatisés, scénographie lumineuse immersive, service au guéridon et programmation artistique internationale.": "Seated banquets for up to 500 guests in privatized palaces, immersive architectural lighting, French gueridon silver service, and international performances.",
  "Lancements de Produits & Marques": "Product & Brand Launches",
  "Mises en scène théâtrales pour maisons de haute joaillerie, mode, cosmétique et automobile d'exception. Scénographies éphémères dans le désert d'Agafay ou riads.": "Theatrical reveals for fine jewelry, haute couture, luxury cosmetics, and automotive houses. Temporary desert scenographies or riad buyouts.",
  "Séminaires & Retraites Exécutives": "Seminars & Executive Retreats",
  "Assemblées de comités de direction et sommets stratégiques confidentiels alliant sessions de travail connectées et moments de déconnexion totale face à l'Atlas.": "Board retreats and confidential leadership summits combining seamless high-tech working environments with mindful disconnection facing the Atlas.",
  "Anniversaires & Soirées Privées": "Birthdays & Private Celebrations",
  "Célébrations d'anniversaires mémorables (30, 40, 50 ans...) et garden parties exclusives avec privatisation de domaines, DJ internationaux et régie discrète.": "Landmark birthday milestones (30th, 40th, 50th...) and exclusive garden galas with private estate buyouts, world-class DJs, and discreet stage direction.",
  "Retour d'Expérience": "Case Studies & Track Record",
  "Études de Cas Récents": "Recent Case Studies",
  "Haute Horlogerie Suisse • 160 Dirigeants": "Swiss Haute Horlogerie • 160 Executives",
  "Dîner Gala dans les Dunes d'Agafay": "Gala Dinner in the Agafay Dunes",
  "Création d'un dôme géodésique transparent éphémère de 450 m² climatisé au milieu du désert pour la présentation mondiale d'une nouvelle collection de montres.": "Creation of an ephemeral 450 m² air-conditioned transparent geodesic dome in the desert for the global unveiling of a timepiece collection.",
  "Régie technique autonome (générateurs insonorisés, connexion satellite haut débit), menu 5 services signé par un chef doublement étoilé et transfert VIP en 4x4 grand confort depuis Marrakech.": "Autonomous technical hub (soundproof generators, high-speed satellite broadband), 5-course menu by a two-Michelin-starred chef, and luxury chauffeured 4x4 fleet.",
  "Résultat : Taux de satisfaction client de 100% et retombées presse internationales majeures.": "Outcome: 100% client satisfaction score and widespread international editorial press coverage.",
  "Groupe Tech International • 240 Invités": "Global Tech Enterprise • 240 Guests",
  "Soirée de Clôture dans un Palace de la Palmeraie": "Closing Gala in a Palmeraie Palace",
  "Scénarisation d'une soirée \"Oasis du Futur\" combinant projections architecturales 3D sur les façades hispano-mauresques d'un palais et spectacle de drones lumineux dans le ciel étoilé.": "Creation of an \"Oasis of the Future\" gala blending 3D video mapping across Hispano-Moorish palace facades with a synchronized aerial drone show.",
  "Buffets dînatoires thématiques, 4 bars à cocktails moléculaires et concert privé d'un artiste internationalement reconnu.": "Thematic cocktail banquets, 4 molecular mixology bars, and a private headline concert by an acclaimed international artist.",
  "Organiser notre événement": "Plan our event",
  "Discrétion & Rigueur": "Discretion & Rigor",
  "Engagement de Confidentialité Absolue": "Strict Confidentiality Guarantee",
  "Toutes nos équipes et nos prestataires partenaires opèrent sous accord de confidentialité strict (NDA). Nous garantissons la protection de l'image de vos invités, la sécurité des personnalités publiques et un accès entièrement restreint aux espaces privatisés.": "All our staff and partner artisans operate under rigorous Non-Disclosure Agreements (NDAs). We guarantee total image protection, executive security, and strictly gated venue access.",
  "Prendre contact avec notre pôle Corporate": "Contact our Corporate Division",
  "Événements corporate et galas de prestige à Marrakech.": "Corporate events and prestigious galas in Marrakech.",
  "Conciergerie Corporate": "Corporate Concierge",
  "Ligne Corporate : +212 (0) 6 61 00 00 00": "Corporate Line: +212 (0) 6 61 00 00 00",
  "Devis Événementiel": "Event Planning Quote",
  "Précisez vos besoins corporate ou privés.": "Detail your corporate or private requirements.",
  "Société ou Organisation": "Company or Organization",
  "Format de l'événement": "Event Format",
  "Gala de prestige": "Prestigious Gala",
  "Lancement de marque / produit": "Brand / Product Launch",
  "Séminaire exécutif": "Executive Seminar",
  "Soirée privée / Anniversaire": "Private Party / Birthday",
  "Date envisagée": "Envisioned Date",
  "Participants estimés": "Estimated Participants",
  "Téléphone / WhatsApp professionnel": "Corporate Phone / WhatsApp",
  "Transmettre au pôle Corporate": "Submit to Corporate Division",
  "Contact & Devis Personnalisé | Wedding Planner Marrakech": "Contact & Bespoke Proposal | Wedding Planner Marrakech",
  "Conciergerie Dédiée": "Dedicated Concierge",
  "Initions Votre Projet": "Let Us Begin Your Project",
  "Chaque grand événement naît d'un premier regard. Échangeons ensemble en toute confidentialité.": "Every grand celebration begins with a spark. Let us converse in complete confidentiality.",
  "Nos Bureaux à Marrakech": "Our Offices in Marrakech",
  "À Votre Écoute 7j/7": "At Your Service 7 Days a Week",
  "Que vous soyez sur place à Marrakech ou à l'étranger, nous organisons un premier entretien sans engagement.": "Whether you are in Marrakech or overseas, we arrange an exploratory consultation without obligation.",
  "WhatsApp Direct 24/7": "Direct WhatsApp 24/7",
  "Réponse immédiate de notre directrice de clientèle.": "Immediate response from our client director.",
  "Ligne Téléphonique France & Europe": "France & Europe Telephone Line",
  "Du lundi au samedi de 9h à 19h (heure de Paris).": "Monday to Saturday from 9am to 7pm (Paris time).",
  "Siège & Salon de Réception": "Headquarters & Private Salon",
  "Avenue Mohammed VI, Quartier Hivernage": "Mohammed VI Avenue, Hivernage District",
  "40000 Marrakech, Royaume du Maroc": "40000 Marrakech, Kingdom of Morocco",
  "Uniquement sur rendez-vous privé.": "Exclusively by private appointment.",
  "Couples Internationaux": "International Couples",
  "Plus de 85% de nos mariés vivent à l'étranger (Paris, Londres, Dubaï, New York, Genève). Nous planifions des visioconférences sur votre créneau horaire avec présentation 3D et sélection des lieux à distance.": "Over 85% of our couples reside abroad (Paris, London, Dubai, New York, Geneva). We schedule video meetings across your time zone with 3D renderings and remote venue scouting.",
  "Votre Vision": "Your Vision",
  "Demande d'Étude Personnalisée": "Bespoke Feasibility Request",
  "Mariage Bohème Champêtre à Marrakech | Scénographie & Inspiration | Wedding Planner Marrakech": "Rustic Bohemian Wedding in Marrakech | Scenography & Inspiration | Wedding Planner Marrakech",
  "Thème Scénographique 01": "Signature Scenography 01",
  "L'alliance poétique des matières brutes et de la nature sauvage marocaine, sous les ombrages centenaires d'une oliveraie de la Palmeraie.": "The poetic union of raw natural elements and wild Moroccan flora, beneath the century-old canopies of an olive grove in the Palmeraie.",
  "L'Histoire du Thème": "The Theme's Narrative",
  "La Douceur des Éléments & du Terroir": "The Warmth of Earth & Elements",
  "Le thème Bohème Champêtre réinterprète le chic rustique européen avec la sensualité des matières berbères artisanales.": "The Rustic Bohemian theme reinterprets European country chic with the tactile sensuality of handcrafted Berber textures.",
  "Imaginez des tables de banquet en chêne brut posées à fleur d'herbe, des chemins de table en gaze de coton écrue et des feuillages d'oliviers tressés à la main. Les herbes de la pampa vaporeuses dansent sous la brise du soir, tandis que des dizaines de lanternes en rotin diffusent une lueur mordorée.": "Picture raw oak banquet tables set directly upon the lawn, runners of natural ecru cotton gauze, and hand-woven olive garlands. Wispy pampas grass sways in the evening breeze, while dozens of rattan lanterns cast an amber glow.",
  "C'est une célébration organique, chaleureuse et résolument anti-conformiste, idéale pour les couples en quête d'une élégance décontractée et d'un retour aux racines.": "An organic, heartfelt, and delightfully unconventional celebration, perfect for couples seeking relaxed sophistication and a return to authenticity.",
  "Palette & Textures Clés": "Palette & Key Textures",
  "Écru Lin": "Ecru Linen",
  "Terracotta": "Terracotta",
  "Vert Olive": "Olive Green",
  "Or Sablé": "Sand Gold",
  "Expérience Immersive": "Immersive Experience",
  "L'Atmosphère Sensorielle": "Sensory Atmosphere",
  "Compositions Florales": "Botanical Artistry",
  "Fleurs séchées, herbes de pampa, branches d'oliviers argentés, eucalyptus frais et protéas d'Afrique australe composant des arches asymétriques sauvages.": "Dried florals, fluffy pampas, silvery olive branches, fresh eucalyptus, and African proteas forming wild asymmetric ceremonial arches.",
  "Matières & Objets d'Art": "Tactile Art & Heirlooms",
  "Vaisselle en céramique façonnée à la main par des potiers de Safi, verres soufflés beldi teintés ambre, couverts en laiton brossé et bougies torsadées miel.": "Hand-thrown ceramics from master Safi potters, amber-tinted beldi handblown glassware, brushed brass cutlery, and twisted honey beeswax candles.",
  "Univers Musical": "Musical Landscape",
  "Duo de guitare acoustique et violoncelle lors de la cérémonie au crépuscule, suivi d'un set live guinguette folk puis d'un DJ set deep house sous les étoiles.": "Acoustic guitar and cello duo during twilight ceremony, followed by an indie folk live band, finishing with a deep house DJ set under the stars.",
  "Étude de Cas Réelle": "Real Wedding Case Study",
  "Le Mariage de Chloé & Thomas": "Chloé & Thomas's Wedding",
  "80 invités • Domaine d'oliviers dans la Palmeraie de Marrakech • Célébration sur 3 jours": "80 guests • Private olive estate in Palmeraie, Marrakech • 3-day celebration",
  "« Un rêve éveillé sous la lumière d'or »": "“A waking dream bathed in golden light”",
  "Originaires de Bordeaux et passionnés de design éco-responsable, Chloé et Thomas souhaitaient une réception intime sans artifices superflus. Nous avons transformé le verger privé d'un mas marocain en salle de banquet à ciel ouvert.": "Hailing from Bordeaux with a passion for sustainable design, Chloé and Thomas desired an intimate gathering free of excess. We converted the private orchard of a Moroccan country house into an open-air banquet hall.",
  "Des guirlandes suspendues aux branches basses des oliviers, un bar à cocktails signature infusés au romarin et à l'eau de fleur d'oranger, et une piste de danse circulaire en bois massif ont fait de cette nuit un moment de pure grâce.": "Fairy lights draped along low olive branches, a signature cocktail bar infused with rosemary and orange blossom water, and a round solid-wood dance floor made this night pure grace.",
  "Concevoir un mariage similaire": "Design a similar celebration",
  "Devis Thème Bohème": "Bohemian Theme Quote",
  "Partagez votre projet avec notre directrice artistique.": "Share your vision with our artistic director.",
  "Mariage dans le Désert d'Agafay | Bivouacs Haute Couture | Wedding Planner Marrakech": "Agafay Desert Wedding | Haute Couture Bivouacs | Wedding Planner Marrakech",
  "Thème Scénographique 02": "Signature Scenography 02",
  "Une célébration hors du temps au milieu des collines minérales, où le silence du désert sublime l'émotion de vos vœux.": "A timeless celebration amidst mineral hills, where the serene silence of the desert deepens the emotion of your vows.",
  "Grandeur Minérale & Ciel Étoilé": "Mineral Grandeur & Starlit Skies",
  "À seulement 40 minutes du tumulte de Marrakech, le désert de pierre d'Agafay offre un contraste saisissant : un paysage lunaire teinté d'or face aux crêtes enneigées du Haut-Atlas.": "Just 40 minutes from the bustle of Marrakech, the Agafay stone desert provides a striking contrast: a moonscape dipped in gold against the snowy High Atlas peaks.",
  "Nous y dressons des campements éphémères haute couture inspirés des caravanes princières d'antan : tentes caïdales blanches, tapis de laine tissés à la main, allées de 1 200 lanternes en métal ciselé et feu de camp majestueux crépitant sous la voie lactée.": "Here we erect ephemeral haute-couture camps inspired by royal caravans of old: white caidal pavilions, handwoven wool carpets, pathways lined with 1,200 pierced lanterns, and a grand bonfire under the Milky Way.",
  "Lorsque le soleil disparaît derrière les dunes dans une explosion d'ocres et de pourpres, l'espace se métamorphose en une salle de bal céleste sans limites.": "As the sun slips behind the dunes in an explosion of ochre and purple, the vast expanse transforms into a boundless celestial ballroom.",
  "Palette & Nuances d'Agafay": "Palette & Agafay Hues",
  "Sable Doré": "Golden Sand",
  "Cuivre Brûlé": "Burnt Copper",
  "Nuit Profonde": "Midnight Blue",
  "Blanc Nomade": "Nomad White",
  "Les Sens en Éveil": "Awakening the Senses",
  "L'Expérience Agafay": "The Agafay Experience",
  "Mise en Lumière Féerique": "Enchanting Illumination",
  "Guirlandes ciel étoilé suspendues au-dessus du banquet, braseros chaleureux en fonte et traînées de bougies soulignant le relief des collines désertiques.": "Fairy-light celestial skies draped over the banquet, warm cast-iron firepits, and candle ribbons tracing the rolling desert ridges.",
  "Sonorités Berbères & Modernes": "Berber & Contemporary Sounds",
  "Accueil au son des tambours et trompettes de la Dakka Marrakchia, récital d'oud acoustique pendant le dîner, puis DJ set électro-oriental jusqu'au lever du jour.": "Welcome by the rhythmic drums of Dakka Marrakchia, acoustic oud recital through dinner, followed by an organic electro-oriental DJ set until dawn.",
  "Gastronomie du Désert": "Desert Gastronomy",
  "Tajines nobles d'agneau confit aux figues de barbarie, méchoui rôti à la braise devant les convives et cascade de pâtisseries au miel et fleur d'oranger.": "Slow-braised lamb tajine with prickly pear, whole lamb roasted over open coals before guests, and cascading honey-almond pastries.",
  "Le Mariage de Victoria & Alexandre": "Victoria & Alexandre's Wedding",
  "140 invités venus de 12 pays • Désert d'Agafay privatisé • Dîner sous dôme de lumière": "140 guests from 12 countries • Private Agafay Desert valley • Dinner under a dome of light",
  "« Une odyssée sous les étoiles gravée à jamais »": "“An odyssey under the stars etched forever”",
  "Victoria, directrice artistique à Londres, et Alexandre, banquier à Paris, rêvaient d'offrir à leurs proches une parenthèse déconnectée du monde. Nous avons entièrement privatisé une vallée d'Agafay pour créer un village éphémère de tentes de luxe.": "Victoria, a London creative director, and Alexandre, a Paris banker, dreamed of gifting loved ones an unplugged escape. We bought out an entire Agafay valley to design an ephemeral luxury tented village.",
  "La cérémonie laïque a été prononcée face au coucher de soleil à 360 degrés, suivie d'un dîner illuminé par plus de 800 bougies et d'un spectacle de cracheurs de feu au moment de la découpe de la pièce montée.": "The ceremony took place before a 360-degree sunset, followed by dinner lit by 800+ candles and fire performers as the wedding cake was cut.",
  "Imaginer mon mariage à Agafay": "Imagine my Agafay wedding",
  "Devis Mariage Agafay": "Agafay Wedding Quote",
  "Votre mariage dans le désert pensé dans les moindres détails.": "Your desert wedding curated to perfection.",
  "Mariage Jardin Secret & Riads à Marrakech | Scénographie Végétale | Wedding Planner Marrakech": "Secret Garden & Riad Wedding in Marrakech | Botanical Design | Wedding Planner Marrakech",
  "Thème Scénographique 03": "Signature Scenography 03",
  "Une parenthèse enchantée au creux d'un riad historique, entre murmures de fontaines d'eau vive et parfums d'agrumes en fleurs.": "An enchanted interlude in a historic riad, between murmuring spring fountains and blossoming citrus aromas.",
  "Poésie Végétale & Refuge Intemporel": "Botanical Poetry & Timeless Sanctuary",
  "Derrière les lourdes portes en cèdre sculpté des ruelles de la Médina se dissimulent des havres de paix insoupçonnés, où la nature et l'architecture hispano-mauresque fusionnent.": "Behind the carved cedar doors of the Medina alleys lie hidden sanctuaries of peace, where nature and Hispano-Moorish architecture merge.",
  "Le thème Jardin Secret s'adresse aux âmes romantiques qui chérissent l'intimité et la finesse des détails. Nous habillons le patio central de milliers de pétales de roses fraîches flottant sur le bassin, de tonnelles d'eucalyptus suspendues et de bougies à profusion déposées sur les balcons en dentelle de bois.": "The Secret Garden theme speaks to romantic souls who treasure intimacy and exquisite details. We adorn the central courtyard with thousands of fresh rose petals floating on the pool, suspended eucalyptus canopies, and candles along the intricate wooden balconies.",
  "Les tables rondes drapées d'étoffes légères accueillent une vaisselle précieuse aux bordures dorées, éclairée par la lumière vacillante des lanternes orientales.": "Round tables draped in delicate fabrics host fine gold-trimmed china, softly illuminated by the flickering light of Moroccan brass lanterns.",
  "Palette Florale & Minérale": "Botanical & Mineral Palette",
  "Cyprès": "Cypress",
  "Rose Poudré": "Blush Rose",
  "Jasmin Blanc": "White Jasmine",
  "Or Mat": "Matte Gold",
  "L'Écrin Végétal": "The Botanical Setting",
  "Parfums Subtils": "Subtle Fragrances",
  "Senteurs naturelles de fleur d'oranger du jardin, bouquets de roses de la Vallée du Dadès et touches d'ambre blanc pour une mémoire olfactive indélébile.": "Natural citrus blossoms from the courtyard, rose bouquets from the Dades Valley, and notes of white amber creating an indelible scent memory.",
  "Artisanat Andalou": "Andalusian Heritage",
  "Arcades en stuc ciselé au couteau, carreaux de zellige géométriques turquoise et terre cuite, banquettes de velours capitonné sur-mesure.": "Knife-carved stucco arches, geometric turquoise and terracotta zellige tiles, and bespoke tufted velvet seating.",
  "Musique Intimiste": "Intimate Melodies",
  "Quatuor à cordes réinterprétant des classiques modernes, suivi d'un duo harpe et voix au moment de l'échange des anneaux sur le patio fleuri.": "A classical string quartet reinterpreting modern favorites, followed by a harp and vocal duo during the ring exchange on the floral courtyard.",
  "Le Mariage d'Elena & Matteo": "Elena & Matteo's Wedding",
  "45 convives intimes • Riad historique privatisé Médina • Soirée romantique aux chandelles": "45 cherished guests • Historic Medina riad buyout • Romantic candlelit evening",
  "« Une fête de famille dans un conte méditerranéen »": "“A family celebration in a Mediterranean fairytale”",
  "Elena (Zurich) et Matteo (Milan) souhaitaient réunir uniquement leur cercle le plus cher pour un week-end d'amour et de complicité. Nous avons privatisé l'un des riads les plus exclusifs de la Médina, avec hébergement sur place pour les invités.": "Elena (Zurich) and Matteo (Milan) wanted to gather only their innermost circle for a weekend of love. We arranged an exclusive buyout of one of the Medina's finest private riads with on-site guest accommodations.",
  "Le dîner a été dressé autour du bassin illuminé par des centaines de bougies flottantes, avec un menu gastronomique maroco-italien créé spécialement par un chef étoilé.": "Dinner was arranged around the courtyard pool lit by hundreds of floating candles, featuring an exquisite Moroccan-Italian fusion menu curated by a Michelin-starred chef.",
  "Imaginer mon mariage dans un riad": "Envision my wedding in a riad",
  "Mariage Mille et Une Nuits à Marrakech | Fastes & Palais Royaux | Wedding Planner Marrakech": "Arabian Nights Wedding in Marrakech | Royal Palaces & Splendor | Wedding Planner Marrakech",
  "Thème Scénographique 04": "Signature Scenography 04",
  "Le faste des palais d'Orient et l'enchantement des légendes califales réinventés avec la sophistication du luxe contemporain.": "The opulence of Oriental palaces and the magic of caliphate legends reinvented with contemporary luxury sophistication.",
  "Opulence Royale & Splendeur Orientale": "Royal Opulence & Oriental Splendor",
  "Conçu pour les couples désireux d'offrir à leurs convives une immersion théâtrale grandiose, ce thème rend hommage à la splendeur des grandes dynasties marocaines.": "Conceived for couples who desire a majestic, theatrical experience for their guests, this theme pays tribute to the grandeur of Morocco's historic dynasties.",
  "Dans les salons monumentaux ou les jardins palatiaux de la Palmeraie, nous orchestrons une véritable féerie : lustres géants en laiton ciselé à la main, voûtes habillées de tentures de velours et de soie mordorée, chemins de table scintillants d'argenterie et cascades florales de roses rouges et d'orchidées rares.": "Within grand royal salons or palace gardens of the Palmeraie, we curate an enchanting fantasy: monumental brass chandeliers, arches draped in gold-embroidered velvet and silk, shimmering silverware, and cascades of red roses and rare orchids.",
  "L'entrée des mariés portée dans l'amariya traditionnelle sculptée en argent, sous les chants polyphoniques des confréries soufies et les applaudissements des invités, marque l'apogée d'une soirée inoubliable.": "The entrance of the newlyweds carried in an ornate carved silver amariya, heralded by Sufi polyphonic chants and enthusiastic applause, crowns an unforgettable night.",
  "Palette Impériale": "Imperial Palette",
  "Or Royal": "Royal Gold",
  "Pourpre Rubis": "Ruby Purple",
  "Bleu Nuit": "Midnight Blue",
  "Soie Ivoire": "Ivory Silk",
  "La Féerie des Sens": "Enchantment of the Senses",
  "Coutume & Protocole Royal": "Royal Heritage & Ceremony",
  "Amariya ciselée pour la mariée, porteurs vêtus de jabadors en soie brodée d'or et cortège aux flambeaux traversant les allées de palmiers.": "Hand-chiseled silver amariya, royal carriers in gold-embroidered silk jabadors, and a torchlit procession through the palm avenues.",
  "Miroirs & Chandeliers Géants": "Mirrors & Giant Chandeliers",
  "Murs de miroirs aux reflets infinis, chandeliers de cristal à pampilles et lanternes royales monumentales de plus de 2 mètres de hauteur.": "Infinite mirror halls, crystal pendant chandeliers, and monumental royal lanterns standing over 2 meters tall.",
  "Feu d'Artifice Synchronisé": "Synchronized Fireworks",
  "Spectacle pyrotechnique privé tiré au-dessus du bassin du palais, illuminant le ciel de Marrakech lors de la découpe du gâteau monumental.": "Private fireworks display over the palace reflecting pool, illuminating the Marrakech night sky during the cutting of the monumental cake.",
  "Le Mariage de Leila & Karim": "Leila & Karim's Wedding",
  "220 invités internationaux • Palais historique Palmeraie • Grand Gala princier": "220 international guests • Historic Palmeraie Palace • Princely Grand Gala",
  "« La quintessence de l'hospitalité princière »": "“The quintessence of princely hospitality”",
  "Leila et Karim, basés entre Dubaï et Genève, voulaient éblouir leurs convives venus des cinq continents avec une célébration digne des contes orientaux les plus fastueux.": "Leila and Karim, based between Dubai and Geneva, wanted to dazzle guests from five continents with a celebration worthy of the most sumptuous Oriental tales.",
  "Nous avons créé un décor d'or et de velours pour 220 personnes, avec un orchestre philharmonique andalou de 25 musiciens, une brigade de maîtres d'hôtel en livrée et un final pyrotechnique de 10 minutes qui a coupé le souffle à l'assemblée.": "We curated a lavish gold-and-velvet reception for 220 guests, featuring a 25-piece Andalusian philharmonic orchestra, liveried silver service, and a breathtaking 10-minute firework finale.",
  "Concevoir une réception royale": "Design a royal celebration",
  "Mentions Légales | Wedding Planner Marrakech": "Legal Notice | Wedding Planner Marrakech",
  "1. Éditeur du Site": "1. Site Publisher",
  "Le site weddingplanner-marrakech.com est édité par la société Wedding Planner Marrakech SARL, société d'organisation d'événements et de location immatriculée au Registre du Commerce de Marrakech (Maroc).": "The weddingplanner-marrakech.com website is published by Wedding Planner Marrakech SARL, an event management and rental company registered in Marrakech, Morocco.",
  "Siège social : Avenue Mohammed VI, Quartier Hivernage, Marrakech, Maroc.": "Headquarters: Mohammed VI Avenue, Hivernage District, Marrakech, Morocco.",
  "Téléphone : +212 (0) 6 61 00 00 00": "Phone: +212 (0) 6 61 00 00 00",
  "E-mail : ocrewedding.marrakech@gmail.com": "Email: ocrewedding.marrakech@gmail.com",
  "Directrice de la publication : Kenza B.": "Publication Director: Kenza B.",
  "2. Hébergement": "2. Web Hosting",
  "Le site est hébergé par des infrastructures sécurisées haute disponibilité conformes aux standards internationaux de protection des données.": "The website is hosted on high-availability secure infrastructure adhering to international data protection standards.",
  "3. Propriété Intellectuelle": "3. Intellectual Property",
  "L'ensemble des contenus (textes originaux, photographies, charte graphique, logos, vidéos) présents sur ce site relève de la législation internationale sur le droit d'auteur et la propriété intellectuelle. Toute reproduction totale ou partielle sans accord écrit préalable de Wedding Planner Marrakech SARL est strictement interdite.": "All content (original texts, photography, visual identity, logos, videos) featured on this site is protected under international copyright and intellectual property laws. Any reproduction without prior written consent from Wedding Planner Marrakech SARL is strictly prohibited.",
  "Politique de Confidentialité | Wedding Planner Marrakech": "Privacy Policy | Wedding Planner Marrakech",
  "Politique de Confidentialité": "Privacy Policy",
  "1. Engagement de Discrétion": "1. Commitment to Discretion",
  "Chez Wedding Planner Marrakech, la discrétion et la protection de la vie privée de nos mariés et de leurs convives constituent une priorité absolue. Nous appliquons des protocoles rigoureux conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.": "At Wedding Planner Marrakech, confidentiality and guest privacy are paramount. We observe rigorous protocols aligned with the General Data Protection Regulation (GDPR) and Moroccan Law No. 09-08 governing personal data protection.",
  "2. Collecte & Utilisation des Données": "2. Data Collection & Processing",
  "Les données recueillies via nos formulaires de contact ou de devis (noms, e-mails, numéros de téléphone, détails de l'événement, budget prévisionnel) sont exclusivement réservées à l'usage de notre conciergerie privée pour l'élaboration de vos propositions sur-mesure. Elles ne sont en aucun cas cédées, louées ou divulguées à des tiers commerciaux.": "Data collected via our inquiry forms (names, emails, phone numbers, event details, estimated budget) is strictly reserved for our private concierge team to craft your bespoke proposals. It is never sold, leased, or disclosed to commercial third parties.",
  "3. Droit d'Accès & Suppression": "3. Right of Access & Deletion",
  "Vous disposez d'un droit permanent d'accès, de rectification et d'effacement de l'ensemble de vos données personnelles. Pour exercer ce droit, il vous suffit de nous adresser une demande par e-mail à :": "You retain permanent rights of access, correction, and deletion of your personal data. To exercise these rights, please contact our team via email at:",
  "Gestion des Cookies | Wedding Planner Marrakech": "Cookie Management | Wedding Planner Marrakech",
  "Gestion des Cookies": "Cookie Management",
  "1. Qu'est-ce qu'un Cookie ?": "1. What is a Cookie?",
  "Un cookie est un fichier texte temporaire déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site internet afin de mémoriser vos préférences de navigation (telles que le choix de la langue).": "A cookie is a temporary text file placed on your device (computer, tablet, smartphone) when visiting a website to remember your browsing preferences (such as language selection).",
  "2. Cookies Utilisés sur ce Site": "2. Cookies Used on this Site",
  "Notre site utilise exclusivement des cookies techniques essentiels assurant le fonctionnement de la sélection multilingue (FR / EN) et la mémorisation de vos préférences de consentement, ainsi que des mesures d'audience anonymisées.": "Our website strictly utilizes essential technical cookies for multilingual selection (FR / EN), consent preferences, and anonymized analytics.",
  "3. Réinitialiser Vos Préférences": "3. Reset Your Preferences",
  "Vous pouvez à tout moment réinitialiser votre consentement en cliquant sur le bouton ci-dessous :": "You may reset your cookie consent at any time by clicking the button below:",
  "Réinitialiser mes préférences de cookies": "Reset my cookie preferences",
  "Chez": "At",
  ", la discrétion et la protection de la vie privée de nos mariés et de leurs convives constituent une priorité absolue. Nous appliquons des protocoles rigoureux conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel.": ", discretion and privacy protection for our couples and their guests are absolute priorities. We apply rigorous protocols in accordance with the General Data Protection Regulation (GDPR) and Moroccan Law No. 09-08 on personal data protection.",
  "Le site": "The website",
  "est édité par la société": "is published by",
  ", société d'organisation d'événements et de location immatriculée au Registre du Commerce de Marrakech (Maroc).": ", an event planning and rental company registered with the Marrakech Commercial Registry (Morocco).",
  "Siège social :": "Registered office:",
  "Avenue Mohammed VI, Quartier Hivernage, Marrakech, Maroc.": "Mohammed VI Avenue, Hivernage District, Marrakech, Morocco.",
  "Téléphone :": "Phone:",
  "E-mail :": "Email:",
  "Directrice de la publication :": "Publication Director:",
  "Ambiance souhaitée, particularités...": "Desired atmosphere, special notes...",
  "ex : 150": "e.g. 150",
  "ex : Chloé & Thomas": "e.g. Chloe & Thomas",
  "ex : Palmeraie, Agafay, Médina...": "e.g. Palmeraie, Agafay, Medina...",
  "ex : Victoria & Alexandre": "e.g. Victoria & Alexandre",
  "La liste de vos articles sélectionnés apparaîtra ici...": "Your list of selected rental items will appear here...",
  "Nom de l'entreprise ou particulier": "Company name or individual",
  "Parlez-nous de l'ambiance recherchée, des musiques, des traditions ou de la scénographie rêvée...": "Tell us about your envisioned atmosphere, music, traditions, or dream scenography...",
  "Parlez-nous de vos envies pour ce thème...": "Tell us about your desires for this theme...",
  "Partagez avec nous votre vision, vos sensibilités...": "Share your vision and aesthetic sensibilities with us...",
  "Vos noms": "Your names",
  "Votre nom": "Your name",
  "votre-email@domaine.com": "your-email@domain.com"
};

function translateDOMText(lang) {
  if (!document.body) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.parentElement) return NodeFilter.FILTER_REJECT;
        const tag = node.parentElement.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.parentElement.classList && node.parentElement.classList.contains('lang-btn')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (node.parentElement.closest('[data-i18n]')) {
          const i18nParent = node.parentElement.closest('[data-i18n]');
          const key = i18nParent.dataset.i18n;
          if (translations[lang] && translations[lang][key]) {
            return NodeFilter.FILTER_REJECT;
          }
        }
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    }
  );

  let node;
  while ((node = walker.nextNode())) {
    if (node._mkOrig === undefined) {
      node._mkOrig = node.nodeValue;
    }
    const orig = node._mkOrig;
    const normalized = orig.trim().replace(/\s+/g, ' ');

    if (lang === 'en') {
      if (dict_fr_to_en[normalized]) {
        node.nodeValue = dict_fr_to_en[normalized];
      }
    } else {
      node.nodeValue = orig;
    }
  }
}

function initLanguageSwitcher() {
  const isEnPage = (document.documentElement.lang === 'en') || window.location.pathname.includes('/en/');
  const currentLang = isEnPage ? 'en' : 'fr';

  try {
    localStorage.setItem('mk_lang_v2', currentLang);
    localStorage.setItem('mk_lang', currentLang);
  } catch (e) {}

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = (btn.dataset.lang || btn.getAttribute('data-lang') || btn.textContent.trim()).toLowerCase();
    if (btnLang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', (e) => {
      try {
        localStorage.setItem('mk_lang_v2', btnLang);
        localStorage.setItem('mk_lang', btnLang);
      } catch (err) {}

      // If it's an anchor with href to another language page, let the browser navigate!
      if (btn.tagName === 'A' && btn.getAttribute('href') && !btn.getAttribute('href').startsWith('#')) {
        return;
      }
      e.preventDefault();
    });
  });
}

/* --------------------------------------------------------------------------
 * 4. SCROLL REVEAL (INTERSECTION OBSERVER)
 * -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
 * 5. ANIMATED NUMBERS
 * -------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-count');
  if (!statNumbers.length) return;

  let animated = false;

  const runAnimation = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        counter.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runAnimation();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
 * 6. TESTIMONIALS CAROUSEL
 * -------------------------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const dots = document.querySelectorAll('.carousel-dot');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoplayTimer = null;

  const goToSlide = (index) => {
    currentIndex = (index + total) % total;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = +dot.getAttribute('data-slide');
      goToSlide(idx);
      resetAutoplay();
    });
  });

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  // Touch Swipe
  let startX = 0;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    if (Math.abs(diffX) > 50) {
      if (diffX < 0) goToSlide(currentIndex + 1);
      else goToSlide(currentIndex - 1);
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

/* --------------------------------------------------------------------------
 * 7. TWO-STEP QUOTE REQUEST MODAL
 * -------------------------------------------------------------------------- */
function initQuoteModal() {
  const modal = document.querySelector('#quoteModal');
  const openButtons = document.querySelectorAll('.trigger-quote-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const nextStepBtn = document.querySelector('#quoteNextStep');
  const prevStepBtn = document.querySelector('#quotePrevStep');
  const step1 = document.querySelector('#quoteStep1');
  const step2 = document.querySelector('#quoteStep2');
  const stepIndicator1 = document.querySelector('#indicatorStep1');
  const stepIndicator2 = document.querySelector('#indicatorStep2');
  const sendWhatsAppBtn = document.querySelector('#quoteSendWhatsApp');
  const quoteForm = document.querySelector('#quoteForm');

  // Pages without the modal (e.g. contact) still have the inline quote form,
  // so only the modal-specific behaviour is skipped when #quoteModal is absent.
  const openModal = (e) => {
    if (e) e.preventDefault();
    if (!modal) {
      if (quoteForm) quoteForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', openModal));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Step 1 to Step 2
  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      const eventType = document.querySelector('#quoteEventType').value;
      if (!eventType) {
        alert('Veuillez sélectionner le type de votre événement.');
        return;
      }
      step1.classList.remove('active');
      step2.classList.add('active');
      stepIndicator1.classList.remove('active');
      stepIndicator2.classList.add('active');
    });
  }

  // Back to Step 1
  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      step2.classList.remove('active');
      step1.classList.add('active');
      stepIndicator2.classList.remove('active');
      stepIndicator1.classList.add('active');
    });
  }

  // Format and send via WhatsApp
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const type = document.querySelector('#quoteEventType').value || 'Mariage';
      const date = document.querySelector('#quoteDate').value || 'À définir';
      const guests = document.querySelector('#quoteGuests').value || 'Non précisé';
      const location = document.querySelector('#quoteLocation').value || 'Marrakech';
      const budget = document.querySelector('#quoteBudget').value || 'À convenir';
      const name = document.querySelector('#quoteName').value || 'Futurs mariés';
      const phone = document.querySelector('#quotePhone').value || '';
      const notes = document.querySelector('#quoteNotes').value || 'Souhait de devis personnalisé';

      const isEn = (document.documentElement.lang === 'en') || window.location.pathname.includes('/en/');
      const message = isEn
        ? `✨ *BESPOKE INQUIRY - WEDDING PLANNER MARRAKECH* ✨%0A%0A` +
          `👤 *Name:* ${encodeURIComponent(name)}%0A` +
          `📱 *Phone / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
          `💍 *Event Type:* ${encodeURIComponent(type)}%0A` +
          `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A` +
          `👥 *Guest Count:* ${encodeURIComponent(guests)}%0A` +
          `📍 *Envisioned Venue:* ${encodeURIComponent(location)}%0A` +
          `💎 *Estimated Budget:* ${encodeURIComponent(budget)}%0A` +
          `📝 *Vision & Details:* ${encodeURIComponent(notes)}%0A%0A` +
          `_Sent from official website weddingplanner-marrakech.com_`
        : `✨ *DEMANDE DE DEVIS - WEDDING PLANNER MARRAKECH* ✨%0A%0A` +
          `👤 *Nom :* ${encodeURIComponent(name)}%0A` +
          `📱 *Contact :* ${encodeURIComponent(phone)}%0A` +
          `💍 *Type d'événement :* ${encodeURIComponent(type)}%0A` +
          `📅 *Date souhaitée :* ${encodeURIComponent(date)}%0A` +
          `👥 *Nombre d'invités :* ${encodeURIComponent(guests)}%0A` +
          `📍 *Lieu envisagé :* ${encodeURIComponent(location)}%0A` +
          `💎 *Budget estimé :* ${encodeURIComponent(budget)}%0A` +
          `📝 *Détails :* ${encodeURIComponent(notes)}%0A%0A` +
          `_Message envoyé depuis le site officiel weddingplanner-marrakech.com_`;

      // Official WhatsApp Concierge Phone (+212)
      const whatsappNumber = "212656394642";
      trackEvent('generate_lead', { method: 'quote_form_whatsapp' });
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      closeModal();
    });
  }

  // Email form submission: sends the enquiry through /envoi-devis.php (OVH mail).
  // If the server script is unreachable, falls back to the visitor's mail app (previous behaviour).
  if (quoteForm) {
    if (!quoteForm.querySelector('[name="site_web"]')) {
      const trap = document.createElement('input');
      trap.type = 'text'; trap.name = 'site_web'; trap.tabIndex = -1; trap.autocomplete = 'off';
      trap.setAttribute('aria-hidden', 'true');
      trap.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;';
      quoteForm.appendChild(trap);
    }
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isEn = (document.documentElement.lang === 'en') || window.location.pathname.includes('/en/');
      // Read every filled field of THIS form (the modal and page forms differ from page to page).
      const pick = (sel) => { const el = quoteForm.querySelector(sel); return (el && el.value) ? el.value.trim() : ''; };
      const labelOf = (el) => {
        const g = el.closest('.form-group');
        const l = g && g.querySelector('.form-label, label');
        return (l ? l.textContent : (el.getAttribute('placeholder') || el.name || el.id || 'Champ')).replace(/\s+/g, ' ').trim();
      };
      const lines = [];
      quoteForm.querySelectorAll('input, select, textarea').forEach(el => {
        if (el.name === 'site_web' || el.type === 'hidden' || el.type === 'submit' || el.type === 'button') return;
        const v = (el.value || '').trim();
        if (v) lines.push(labelOf(el) + ' : ' + v);
      });
      const nom = pick('#quoteName') || pick('input[type="text"]');
      const telephone = pick('#quotePhone') || pick('input[type="tel"]');
      const email = pick('#quoteEmail') || pick('input[type="email"]');
      const subject = isEn ? 'Quote request – Wedding Planner Marrakech' : 'Demande de devis – Wedding Planner Marrakech';
      const openMailApp = () => {
        trackEvent('generate_lead', { method: 'quote_form_email' });
        const body = lines.concat(['', (isEn ? 'Page: ' : 'Page : ') + window.location.href]).join('\n');
        window.location.href = 'mailto:ocrewedding.marrakech@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        if (typeof closeModal === 'function') closeModal();
      };

      const data = new FormData();
      data.append('nom', nom);
      data.append('telephone', telephone);
      data.append('email', email);
      data.append('details', lines.join('\n'));
      data.append('page', window.location.href);
      data.append('langue', isEn ? 'en' : 'fr');
      const trapEl = quoteForm.querySelector('[name="site_web"]');
      data.append('site_web', trapEl ? trapEl.value : '');

      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const btnLabel = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = isEn ? 'Sending…' : 'Envoi en cours…'; }

      fetch('/envoi-devis.php', { method: 'POST', body: data })
        .then(r => r.json().then(j => ({ ok: r.ok && j && j.ok })))
        .catch(() => ({ ok: false }))
        .then(res => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = btnLabel; }
          if (!res.ok) { openMailApp(); return; }
          trackEvent('generate_lead', { method: 'quote_form_server' });
          const msg = document.createElement('div');
          msg.className = 'form-success';
          msg.setAttribute('role', 'status');
          msg.style.cssText = 'padding:24px 8px;text-align:center;line-height:1.6;';
          msg.innerHTML = isEn
            ? '<strong>Thank you, your request has been sent.</strong><br>We will get back to you very soon. For a faster answer, message us on WhatsApp: +212 656 394 642.'
            : '<strong>Merci, votre demande a bien été envoyée.</strong><br>Nous revenons vers vous très vite. Pour une réponse plus rapide, écrivez-nous sur WhatsApp : +212 656 394 642.';
          quoteForm.replaceChildren(msg);
        });
    });
  }
}

/* --------------------------------------------------------------------------
 * 8. RGPD COOKIE CONSENT BANNER
 * -------------------------------------------------------------------------- */
function initCookieBanner() {
  const banner = document.querySelector('#cookieBanner');
  const acceptBtn = document.querySelector('#cookieAccept');
  const declineBtn = document.querySelector('#cookieDecline');

  if (!banner) return;

  let hasConsent = null;
  try { hasConsent = localStorage.getItem('mk_cookie_consent'); } catch (e) {}
  if (!hasConsent) {
    setTimeout(() => {
      banner.classList.add('show');
    }, 1200);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      try { localStorage.setItem('mk_cookie_consent', 'accepted'); } catch (e) {}
      banner.classList.remove('show');
      setAnalyticsConsent(true);
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      try { localStorage.setItem('mk_cookie_consent', 'declined'); } catch (e) {}
      setAnalyticsConsent(false);
      banner.classList.remove('show');
    });
  }
}

/* --------------------------------------------------------------------------
 * 9. FAQ ACCORDION
 * -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      }
    });
  });
}

/* --------------------------------------------------------------------------
 * 10. FILTER TABS (GALERIE & LOCATION)
 * -------------------------------------------------------------------------- */
function initFilterTabs() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  if (!filterButtons.length || !filterItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = '';
          setTimeout(() => item.classList.add('visible'), 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 11. RENTAL CART INTERACTIVE SELECTION
 * -------------------------------------------------------------------------- */
function initRentalCart() {
  const addButtons = document.querySelectorAll('.btn-add-rental');
  const floatingBar = document.querySelector('.floating-quote-cart');
  const countDisplay = document.querySelector('.floating-cart-count');
  const finalizeBtn = document.querySelector('#finalizeRentalQuote');
  const quoteNotes = document.querySelector('#quoteNotes');
  const quoteModal = document.querySelector('#quoteModal');

  if (!addButtons.length) return;

  let selectedProducts = [];

  const updateCartUI = () => {
    if (floatingBar && countDisplay) {
      countDisplay.textContent = selectedProducts.length;
      if (selectedProducts.length > 0) {
        floatingBar.classList.add('visible');
      } else {
        floatingBar.classList.remove('visible');
      }
    }
  };

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productTitle = btn.getAttribute('data-title') || 'Article';
      const isAdded = btn.classList.contains('added');

      if (!isAdded) {
        btn.classList.add('added');
        btn.textContent = '✓ Sélectionné';
        selectedProducts.push(productTitle);
      } else {
        btn.classList.remove('added');
        btn.textContent = '+ Ajouter au devis';
        selectedProducts = selectedProducts.filter(p => p !== productTitle);
      }

      updateCartUI();
    });
  });

  if (finalizeBtn) {
    finalizeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (quoteNotes && selectedProducts.length) {
        quoteNotes.value = `[Articles de location sélectionnés] :\n- ` + selectedProducts.join('\n- ') + `\n\n`;
      }
      if (quoteModal) {
        quoteModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

/* --------------------------------------------------------------------------
 * 12. GALLERY LIGHTBOX
 * -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (!galleryCards.length) return;

  // Create lightbox markup dynamically if not exists
  let lightbox = document.querySelector('#galleryLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.style.cssText = `
      position: fixed; inset: 0; background: rgba(14,24,19,0.95);
      z-index: 300; display: none; align-items: center; justify-content: center;
      padding: 2rem; backdrop-filter: blur(10px);
    `;
    lightbox.innerHTML = `
      <button style="position:absolute; top:2rem; right:2rem; background:none; border:none; color:#fff; font-size:2.5rem; cursor:pointer;" id="closeLightbox">&times;</button>
      <div style="max-width:900px; max-height:85vh; text-align:center;">
        <img id="lightboxImage" src="" alt="" style="max-width:100%; max-height:75vh; object-fit:contain; border-radius:4px; box-shadow:0 15px 40px rgba(0,0,0,0.5);">
        <p id="lightboxCaption" style="color:#CDB073; font-family:var(--font-serif); font-size:1.4rem; margin-top:1rem;"></p>
      </div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxImg = lightbox.querySelector('#lightboxImage');
  const lightboxCaption = lightbox.querySelector('#lightboxCaption');
  const closeBtn = lightbox.querySelector('#closeLightbox');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-title');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title ? title.textContent : img.alt;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeBox = () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeBox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') closeBox();
  });
}

