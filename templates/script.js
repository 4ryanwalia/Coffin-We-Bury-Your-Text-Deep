/**
 * Cryptoji Frontend - Luxury Emoji Encryption Interface
 * 
 * Features:
 * - API integration with Django backend
 * - Theme switching (light/dark)
 * - Interactive emoji constellation background
 * - Smooth animations and micro-interactions
 * - Toast notifications
 * - Copy to clipboard functionality
 * - Responsive design
 */

// ===== CONFIGURATION =====
const CONFIG = {
  API_BASE_URL: '', // Empty for same-origin requests
  ENDPOINTS: {
    ENCRYPT: '/api/encrypt/',
    DECRYPT: '/api/decrypt/'
  },
  SAMPLE_TEXTS: [
    'Hello, World!',
    'This is a secret message.',
    'Cryptoji makes encryption beautiful!',
    '🔐 Secure communication with style 🎨'
  ],
  SAMPLE_EMOJIS: [
    '😄🎉🌟💫🚀🎈🌈✨🎊🔥🌺🦋🎭🎪🎨',
    '🔒🛡️⚡🎯🚀💎🌟✨🎪🎨🎭🎪🎨🎊',
    '🎉🚀💫🌟✨🎈🌈🔥🌺🦋🎭🎪🎨🎊💎'
  ],
  EMOJI_POOL: [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰','😗',
    '😙','😚','🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐',
    '😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲',
    '☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱',
    '🥵','🥶','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🥳',
    '🥴','🥺','🤠','😈','👿','👹','👺','💀','☠️','👻','👽','👾','🤖','💩','😺','😸',
    '😹','😻','😼','😽','🙀','😿','😾','👶','🧒','👦','👧','🧑','👱','👨','🧔','👩',
    '🧓','👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🙇','🤦','🤷','👨‍⚕️','👩‍⚕️','👨‍🎓','👩‍🎓',
    '👨‍🏫','👩‍🏫','👨‍⚖️','👩‍⚖️','👨‍🌾','👩‍🌾','👨‍🍳','👩‍🍳','👨‍🔧','👩‍🔧','👨‍🏭','👩‍🏭','👨‍💼','👩‍💼','👨‍🔬','👩‍🔬',
    '👨‍💻','👩‍💻','👨‍🎤','👩‍🎤','👨‍🎨','👩‍🎨','👨‍✈️','👩‍✈️','👨‍🚀','👩‍🚀','👨‍🚒','👩‍🚒','👮','🕵️','💂','👷',
    '🤴','👸','👳','👲','🧕','🤵','👰','🤰','🤱','👼','🎅','🤶','🦸','🦹','🧙','🧚',
    '🧛','🧜','🧝','🧞','🧟','💆','💇','🚶','🏃','💃','🕺','👯','🧖','🧘','🛀','🛌',
    '🤺','🏇','⛷️','🏂','🏌️','🏄','🚣','🏊','⛹️','🏋️','🚴','🚵','🤸','🤼','🤽','🤾',
    '🤹','🧗','🧘‍♂️','🧘‍♀️','👭','👫','👬','💏','💑','👪','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦','👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👩‍👩‍👦','👩‍👩‍👧',
    '👩‍👩‍👧‍👦','👩‍👩‍👦‍👦','👩‍👩‍👧‍👧','👨‍👨‍👦','👨‍👨‍👧','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍👨‍👧‍👧','👩‍❤️‍👨','👩‍❤️‍👩','👨‍❤️‍👨','👩‍❤️‍💋‍👨','👩‍❤️‍💋‍👩','👨‍❤️‍💋‍👨','👤','👥',
    '🧍','🧎','👣','🐵','🐒','🦍','🐶','🐕','🐩','🐺','🦊','🦝','🐱','🐈','🦁','🐯',
    '🐅','🐆','🐴','🐎','🦄','🦓','🦌','🐮','🐂','🐃','🐄','🐷','🐖','🐗','🐽','🐏',
    '🐑','🐐','🐪','🐫','🦙','🦒','🐘','🦏','🦛','🐭','🐁','🐀','🐹','🐰','🐇','🐿️',
    '🦔','🦇','🐻','🐨','🐼','🦥','🦦','🦨','🦘','🦡','🐾','🦃','🐔','🐓','🐣','🐤',
    '🐥','🐦','🦅','🦆','🦢','🦉','🦩','🦚','🦜','🐸','🐊','🐢','🦎','🐍','🐲','🐉',
    '🦕','🦖','🐳','🐋','🐬','🦭','🐟','🐠','🐡','🦈','🐙','🐚','🐌','🦋','🐛','🐜',
    '🐝','🐞','🦗','🕷️','🕸️','🦂','🦟','🦠','💐','🌸','💮','🏵️','🌹','🥀','🌺','🌻',
    '🌼','🌷','🌱','🌲','🌳','🌴','🌵','🌶️','🌷','🌸','🌹','🌺','🌻','🌼','🌽','🌾',
    '🌿','🍀','🍁','🍂','🍃','🍄','🍅','🍆','🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭',
    '🍎','🍏','🍐','🍑','🍒','🍓','🥝','🍅','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🥒',
    '🥬','🥦','🧄','🧅','🍄','🥜','🌰','🍞','🥐','🥖','🧀','🥚','🍳','🧈','🥞','🧇',
    '🥓','🥩','🍗','🍖','🦴','🌭','🍔','🍟','🍕','🌮','🌯','🥙','🧆','🥚','🍳','🥘',
    '🍲','🥗','🍿','🧈','🧂','🥫','🍱','🍘','🍙','🍚','🍛','🍜','🍝','🍠','🍢','🍣',
    '🍤','🍥','🥮','🍡','🥟','🥠','🥡','🦀','🦞','🦐','🦑','🦪','🍦','🍧','🍨','🍩',
    '🍪','🎂','🍰','🧁','🥧','🍫','🍬','🍭','🍮','🍯','🍼','🥛','☕','🫖','🍵','🍶',
    '🍾','🍷','🍸','🍹','🍺','🍻','🥂','🥃','🥤','🧋','🧃','🧉','🧊','🥢','🍽️','🍴',
    '🥄','🔪','🏺','🌍','🌎','🌏','🌐','🗺️','🗾','🧭','🏔️','⛰️','🌋','🗻','🏕️','🏖️',
    '🏜️','🏝️','🏞️','🏟️','🏛️','🏗️','🧱','🏘️','🏚️','🏠','🏡','🏢','🏣','🏤','🏥','🏦',
    '🏧','🏨','🏩','🏪','🏫','🏬','🏭','🏮','🏯','🏰','💒','🗼','🗽','⛪','🕌','🛕',
    '🕍','⛩️','🕋','⛲','⛺','🌉','🌁','🚁','🚂','🚃','🚄','🚅','🚆','🚇','🚈','🚉',
    '🚊','🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒','🚓','🚔','🚕','🚖','🚗','🚘',
    '🚙','🚚','🚛','🚜','🏎️','🏍️','🛵','🛺','🚲','🛴','🛹','🛼','🚁','✈️','🛩️','🛫',
    '🛬','🪂','💺','🚀','🛸','🚉','🚊','🚝','🚞','🚋','🚌','🚍','🚎','🚐','🚑','🚒',
    '🚓','🚔','🚕','🚖','🚗','🚘','🚙','🚚','🚛','🚜','🏎️','🏍️','🛵','🛺','🚲','🛴',
    '🛹','🛼','🚁','✈️','🛩️','🛫','🛬','🪂','💺','🚀','🛸','🛰️','🛸','🛸','🛸','🛸'
  ]
};

// ===== STATE MANAGEMENT =====
const AppState = {
  currentTheme: localStorage.getItem('theme') || 'light',
  isEncrypting: false,
  isDecrypting: false,
  currentTab: 'encrypt'
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
  /**
   * Create a ripple effect on button click
   */
  createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.className = 'btn-ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  },

  /**
   * Show toast notification
   */
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  },

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Generate random emoji
   */
  getRandomEmoji() {
    return CONFIG.EMOJI_POOL[Math.floor(Math.random() * CONFIG.EMOJI_POOL.length)];
  },

  /**
   * Animate text typing effect
   */
  typeText(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
};

// ===== THEME MANAGEMENT =====
const ThemeManager = {
  init() {
    this.applyTheme(AppState.currentTheme);
    this.bindEvents();
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  },

  toggleTheme() {
    const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme);
  },

  bindEvents() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
};

// ===== EMOJI CONSTELLATION BACKGROUND =====
const EmojiConstellation = {
  init() {
    this.createParticles();
    this.startAnimation();
  },

  createParticles() {
    const container = document.getElementById('emoji-constellation');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';

    // Create particles based on screen size
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'emoji-particle';
      particle.textContent = Utils.getRandomEmoji();
      
      // Random positioning and animation delay
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      
      // Random size
      const size = 1 + Math.random() * 1.5;
      particle.style.fontSize = size + 'rem';
      
      // Add hover effect
      particle.addEventListener('mouseenter', () => {
        particle.style.transform = 'scale(1.5) rotate(360deg)';
        particle.style.transition = 'transform 0.3s ease';
      });
      
      particle.addEventListener('mouseleave', () => {
        particle.style.transform = 'scale(1) rotate(0deg)';
      });
      
      container.appendChild(particle);
    }
  },

  startAnimation() {
    // Regenerate particles every 30 seconds for variety
    setInterval(() => {
      this.createParticles();
    }, 30000);
  }
};

// ===== API INTEGRATION =====
const API = {
  /**
   * Make API request
   */
  async request(endpoint, data) {
    try {
      const response = await fetch(CONFIG.API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  /**
   * Encrypt message
   */
  async encrypt(message) {
    return await this.request(CONFIG.ENDPOINTS.ENCRYPT, { message });
  },

  /**
   * Decrypt emoji sequence
   */
  async decrypt(emojiText) {
    return await this.request(CONFIG.ENDPOINTS.DECRYPT, { emoji_text: emojiText });
  }
};

// ===== DEMO PANEL MANAGEMENT =====
const DemoPanel = {
  init() {
    this.bindEvents();
    this.setupTabs();
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
    });

    // Encrypt functionality
    const encryptBtn = document.getElementById('encrypt-btn');
    const encryptInput = document.getElementById('encrypt-input');
    const sampleTextBtn = document.getElementById('sample-text-encrypt');
    const clearEncryptBtn = document.getElementById('clear-encrypt');
    const copyEncryptBtn = document.getElementById('copy-encrypt');

    if (encryptBtn) {
      encryptBtn.addEventListener('click', (e) => {
        Utils.createRipple(e);
        this.handleEncrypt();
      });
    }

    if (sampleTextBtn) {
      sampleTextBtn.addEventListener('click', () => {
        const randomText = CONFIG.SAMPLE_TEXTS[Math.floor(Math.random() * CONFIG.SAMPLE_TEXTS.length)];
        encryptInput.value = randomText;
        this.animateInput(encryptInput);
      });
    }

    if (clearEncryptBtn) {
      clearEncryptBtn.addEventListener('click', () => {
        encryptInput.value = '';
        this.hideOutput('encrypt-output');
      });
    }

    if (copyEncryptBtn) {
      copyEncryptBtn.addEventListener('click', () => this.copyResult('encrypt-result', copyEncryptBtn));
    }

    // Decrypt functionality
    const decryptBtn = document.getElementById('decrypt-btn');
    const decryptInput = document.getElementById('decrypt-input');
    const sampleEmojiBtn = document.getElementById('sample-emoji-decrypt');
    const clearDecryptBtn = document.getElementById('clear-decrypt');
    const copyDecryptBtn = document.getElementById('copy-decrypt');

    if (decryptBtn) {
      decryptBtn.addEventListener('click', (e) => {
        Utils.createRipple(e);
        this.handleDecrypt();
      });
    }

    if (sampleEmojiBtn) {
      sampleEmojiBtn.addEventListener('click', () => {
        const randomEmojis = CONFIG.SAMPLE_EMOJIS[Math.floor(Math.random() * CONFIG.SAMPLE_EMOJIS.length)];
        decryptInput.value = randomEmojis;
        this.animateInput(decryptInput);
      });
    }

    if (clearDecryptBtn) {
      clearDecryptBtn.addEventListener('click', () => {
        decryptInput.value = '';
        this.hideOutput('decrypt-output');
      });
    }

    if (copyDecryptBtn) {
      copyDecryptBtn.addEventListener('click', () => this.copyResult('decrypt-result', copyDecryptBtn));
    }

    // Auto-resize textareas
    document.querySelectorAll('.input-field').forEach(textarea => {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
  },

  setupTabs() {
    this.switchTab(AppState.currentTab);
  },

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabName}-tab`);
    });

    AppState.currentTab = tabName;
  },

  async handleEncrypt() {
    const input = document.getElementById('encrypt-input');
    const output = document.getElementById('encrypt-output');
    const result = document.getElementById('encrypt-result');
    const btn = document.getElementById('encrypt-btn');
    const loading = document.getElementById('encrypt-loading');

    if (!input.value.trim()) {
      Utils.showToast('Please enter a message to encrypt', 'error');
      return;
    }

    this.setLoading(btn, loading, true);
    this.hideOutput('encrypt-output');

    try {
      const response = await API.encrypt(input.value.trim());
      result.textContent = response.encrypted;
      this.showOutput('encrypt-output');
      this.animateResult(result);
      Utils.showToast('Message encrypted successfully!');
    } catch (error) {
      Utils.showToast('Encryption failed. Please try again.', 'error');
      console.error('Encryption error:', error);
    } finally {
      this.setLoading(btn, loading, false);
    }
  },

  async handleDecrypt() {
    const input = document.getElementById('decrypt-input');
    const output = document.getElementById('decrypt-output');
    const result = document.getElementById('decrypt-result');
    const btn = document.getElementById('decrypt-btn');
    const loading = document.getElementById('decrypt-loading');

    if (!input.value.trim()) {
      Utils.showToast('Please enter an emoji sequence to decrypt', 'error');
      return;
    }

    this.setLoading(btn, loading, true);
    this.hideOutput('decrypt-output');

    try {
      const response = await API.decrypt(input.value.trim());
      result.textContent = response.message;
      this.showOutput('decrypt-output');
      this.animateResult(result);
      Utils.showToast('Message decrypted successfully!');
    } catch (error) {
      Utils.showToast('Decryption failed. Please check your emoji sequence.', 'error');
      console.error('Decryption error:', error);
    } finally {
      this.setLoading(btn, loading, false);
    }
  },

  setLoading(btn, loading, isLoading) {
    if (isLoading) {
      btn.classList.add('loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  },

  showOutput(outputId) {
    const output = document.getElementById(outputId);
    if (output) {
      output.classList.add('show');
    }
  },

  hideOutput(outputId) {
    const output = document.getElementById(outputId);
    if (output) {
      output.classList.remove('show');
    }
  },

  animateResult(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      element.style.transition = 'all 0.3s ease-out';
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, 100);
  },

  animateInput(input) {
    input.style.transform = 'scale(1.02)';
    input.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
      input.style.transform = 'scale(1)';
    }, 200);
  },

  async copyResult(resultId, copyBtn) {
    const result = document.getElementById(resultId);
    if (!result || !result.textContent) return;

    try {
      await Utils.copyToClipboard(result.textContent);
      copyBtn.classList.add('copied');
      Utils.showToast('Copied to clipboard!');
      
      setTimeout(() => {
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (error) {
      Utils.showToast('Failed to copy to clipboard', 'error');
    }
  }
};

// ===== NAVIGATION MANAGEMENT =====
const Navigation = {
  init() {
    this.bindEvents();
    this.setupScrollEffects();
  },

  bindEvents() {
    // Smooth scroll to demo
    const scrollToDemoBtn = document.getElementById('scroll-to-demo');
    if (scrollToDemoBtn) {
      scrollToDemoBtn.addEventListener('click', (e) => {
        Utils.createRipple(e);
        this.scrollToSection('demo');
      });
    }

    // Learn more button
    const learnMoreBtn = document.getElementById('learn-more');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('click', (e) => {
        Utils.createRipple(e);
        this.scrollToSection('features');
      });
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('nav-menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }
  },

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  },

  setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', Utils.debounce(() => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector('.navbar');
      
      if (navbar) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down
          navbar.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          navbar.style.transform = 'translateY(0)';
        }
      }
      
      lastScrollY = currentScrollY;
    }, 10));
  },

  toggleMobileMenu() {
    // Mobile menu functionality can be added here
    console.log('Mobile menu toggle');
  }
};

// ===== ANIMATION UTILITIES =====
const Animations = {
  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
  },

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease-out';
      observer.observe(card);
    });
  },

  setupParallaxEffects() {
    window.addEventListener('scroll', Utils.debounce(() => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.emoji-particle');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index % 3) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }, 10));
  }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  ThemeManager.init();
  EmojiConstellation.init();
  DemoPanel.init();
  Navigation.init();
  Animations.init();

  // Add loading animation to hero elements
  setTimeout(() => {
    document.querySelectorAll('.hero-title .title-line').forEach((line, index) => {
      line.style.animationDelay = `${index * 0.2}s`;
    });
  }, 100);

  // Add CSS for slideOutRight animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
  `;
  document.head.appendChild(style);

  console.log('🚀 Cryptoji Frontend Initialized Successfully!');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  Utils.showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  Utils.showToast('An unexpected error occurred', 'error');
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Utils,
    API,
    ThemeManager,
    EmojiConstellation,
    DemoPanel,
    Navigation,
    Animations
  };
}
