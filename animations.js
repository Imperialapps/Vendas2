// Performance optimized particle system
class ParticleSystem {
  constructor() {
    this.particlePool = [];
    this.activeParticles = [];
    this.maxParticles = 50; // Limit concurrent particles
    this.throttleDelay = 16; // ~60fps
    this.lastTime = 0;
    
    this.initializePool();
    this.bindEvents();
  }
  
  initializePool() {
    for (let i = 0; i < this.maxParticles; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      this.particlePool.push(particle);
    }
  }
  
  createParticle(x, y, isClick = false) {
    if (this.particlePool.length === 0) return;
    
    const particle = this.particlePool.pop();
    if (isClick) particle.classList.add("click");
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    
    this.activeParticles.push(particle);
    
    setTimeout(() => this.removeParticle(particle), isClick ? 600 : 500);
  }
  
  removeParticle(particle) {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
    particle.classList.remove("click");
    
    const index = this.activeParticles.indexOf(particle);
    if (index > -1) {
      this.activeParticles.splice(index, 1);
    }
    
    this.particlePool.push(particle);
  }
  
  throttledMouseMove = (e) => {
    const now = performance.now();
    if (now - this.lastTime >= this.throttleDelay) {
      this.createParticle(e.clientX, e.clientY);
      this.lastTime = now;
    }
  }
  
  handleClick = (e) => {
    for (let i = 0; i < 6; i++) {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      this.createParticle(e.clientX + offsetX, e.clientY + offsetY, true);
    }
  }
  
  bindEvents() {
    document.addEventListener("mousemove", this.throttledMouseMove, { passive: true });
    document.addEventListener("click", this.handleClick, { passive: true });
  }
}

// Optimized notification system
class NotificationSystem {
  constructor() {
    this.nomes = [
      "Renan", "Lucas", "Ana", "Carlos", "Marina", "João", "Paula", "Mateus", "Beatriz", "Gabriel",
      "black", "Pedro Malbec", "Full hs", "heitor_sussai", "PRIME", "Noauge", "She.", "Meno Eros7",
      "niseabra123", "TremCabeleira.exe", "Ferreira7!💔", "Adriano Paraná", "paz terrivel2k harity",
      "BRITONEX", "Seven", "maçazinha", "Bob-Bpl", "fanexty", "Sodre88", "Mim Ser Capudo", "Snap ϟ",
      "ismelancolico", "Off", "Silva", "𝕵𝖔𝖌𝖆𝖉𝖔𝖗 𝕿𝖆𝖈𝖆𝕭𝖆𝖑𝖆", "𝓝𝓪𝓳𝓾", "𝔇𝔬𝔦𝔰𝔡💯🇯", "revirando games", "𝐿𝑔𝓏𝒾𝓃",
      "• Silvin Almeida ✔", "Shelby"
    ];
    
    this.planos = ["14X IMPULSOS", "HBO MAX", "NETFLIX", "SPOTIFY", "AMAZON PRIME", "NITRADA 1 MES", "NITRADA 3 MESES", "LINK NITRO 1 MES", "LINK NITRO TRIMENSAL"];
    
    this.tempos = ["há 2h", "há 15min", "há 30min", "há 1h", "agora mesmo", "há 5min"];
    
    this.audio = this.createAudio();
    this.startNotifications();
  }
  
  createAudio() {
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.src = 'https://www.myinstants.com/media/sounds/pop-up-off.mp3';
    return audio;
  }
  
  createNotification() {
    const nome = this.nomes[Math.floor(Math.random() * this.nomes.length)];
    const plano = this.planos[Math.floor(Math.random() * this.planos.length)];
    const tempo = this.tempos[Math.floor(Math.random() * this.tempos.length)];
    
    const div = document.createElement("div");
    div.className = "notification";
    div.innerHTML = `<b>${nome}</b> (${tempo})<br>assinou <b>${plano}</b>`;
    
    document.body.appendChild(div);
    
    // Play sound with error handling
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {
      // Ignore audio play errors (user interaction required)
    });
    
    setTimeout(() => {
      div.classList.add("hide");
      setTimeout(() => {
        if (div.parentNode) {
          document.body.removeChild(div);
        }
      }, 500);
    }, 5000);
  }
  
  startNotifications() {
    this.createNotification();
    const intervalo = Math.random() * (15000 - 6000) + 6000;
    setTimeout(() => this.startNotifications(), intervalo);
  }
}

// Optimized snowflake system
class SnowflakeSystem {
  constructor() {
    this.quantidade = 30;
    this.snowflakes = [];
    this.createSnowflakes();
  }
  
  createSnowflakes() {
    for (let i = 0; i < this.quantidade; i++) {
      const floco = document.createElement('div');
      floco.className = 'snowflake';
      floco.textContent = '❄';
      
      // Random positioning and animation
      floco.style.left = Math.random() * 100 + 'vw';
      floco.style.fontSize = (Math.random() * 10 + 10) + 'px';
      floco.style.animationDuration = (Math.random() * 5 + 5) + 's';
      floco.style.opacity = Math.random();
      floco.style.animationDelay = Math.random() * 5 + 's';
      
      document.body.appendChild(floco);
      this.snowflakes.push(floco);
    }
  }
}

// Review carousel with optimized performance
class ReviewCarousel {
  constructor() {
    this.avaliacoes = [
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/women/11.jpg",
      "https://randomuser.me/api/portraits/men/12.jpg",
      "https://randomuser.me/api/portraits/women/13.jpg",
      "https://randomuser.me/api/portraits/men/14.jpg",
      "https://randomuser.me/api/portraits/women/15.jpg",
      "https://randomuser.me/api/portraits/men/16.jpg",
      "https://randomuser.me/api/portraits/women/17.jpg",
      "https://randomuser.me/api/portraits/men/18.jpg",
      "https://randomuser.me/api/portraits/women/19.jpg"
    ];
    
    this.feedbacks = [
      { nome: "Lucas Almeida", texto: "Entrega super rápida e atendimento excelente. Recomendo demais!" },
      { nome: "Fernanda Souza", texto: "Loja muito confiável. Já comprei mais de uma vez e sempre deu tudo certo." },
      { nome: "Carlos Mendes", texto: "Atendimento impecável e suporte rápido. Voltarei a comprar!" },
      { nome: "Juliana Freitas", texto: "Produto chegou funcionando perfeitamente. Muito bom!" },
      { nome: "Pedro Lima", texto: "Ótima experiência de compra, recomendo a todos." },
      { nome: "Amanda Rocha", texto: "Tive um problema e resolveram em minutos. Suporte incrível!" },
      { nome: "João Martins", texto: "Melhor custo-benefício do mercado. Nota 10!" },
      { nome: "Sabrina Costa", texto: "Super rápido! Produto chegou em poucos minutos." },
      { nome: "Felipe Andrade", texto: "Fácil de comprar e excelente atendimento. Parabéns à equipe!" },
      { nome: "Nathalia Ramos", texto: "Gostei muito! Produto entregue na hora e funcionando 100%." }
    ];
    
    this.carousel = document.getElementById("carousel");
    this.index = 0;
    this.autoSlideInterval = null;
    
    if (this.carousel) {
      this.init();
    }
  }
  
  init() {
    this.renderSlides();
    this.startAutoSlide();
    this.bindEvents();
  }
  
  renderSlides() {
    this.carousel.innerHTML = this.feedbacks.map((av, i) => `
      <div class="card">
        <img src="${this.avaliacoes[i % this.avaliacoes.length]}" alt="Cliente ${av.nome}" loading="lazy">
        <p class="stars">★★★★★</p>
        <p>"${av.texto}"</p>
        <p class="nome">${av.nome}</p>
        <p class="verificado">Cliente verificado</p>
      </div>
    `).join("");
  }
  
  getCardsToShow() {
    return window.innerWidth >= 768 ? 3 : 1;
  }
  
  nextSlide() {
    const cardsToShow = this.getCardsToShow();
    this.index = (this.index + 1) % (this.feedbacks.length - cardsToShow + 1);
    this.updateCarousel();
  }
  
  prevSlide() {
    const cardsToShow = this.getCardsToShow();
    this.index = (this.index - 1 + this.feedbacks.length - cardsToShow + 1) % (this.feedbacks.length - cardsToShow + 1);
    this.updateCarousel();
  }
  
  updateCarousel() {
    const cardsToShow = this.getCardsToShow();
    this.carousel.style.transform = `translateX(-${this.index * (100 / cardsToShow)}%)`;
  }
  
  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
  }
  
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }
  
  bindEvents() {
    // Add global functions for button controls
    window.nextSlide = () => {
      this.stopAutoSlide();
      this.nextSlide();
      this.startAutoSlide();
    };
    
    window.prevSlide = () => {
      this.stopAutoSlide();
      this.prevSlide();
      this.startAutoSlide();
    };
    
    // Pause auto-slide on hover
    this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
    this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
    
    // Handle resize
    window.addEventListener('resize', () => {
      this.updateCarousel();
    }, { passive: true });
  }
}

// Initialize all systems when DOM is ready
function initializeAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new ParticleSystem();
    new SnowflakeSystem();
  }
  
  new NotificationSystem();
  new ReviewCarousel();
}

// Use more efficient DOM ready detection
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
  initializeAnimations();
}