// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener("DOMContentLoaded", () => {
  initializePortfolio()
})

// ===== FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO =====
function initializePortfolio() {
  setupSmoothScrolling()
  setupNavbarEffects()
  setupScrollToTop()
  setupAnimations()
  setupProjectCards()
  setupWhatsAppTracking()
}

// ===== ROLAGEM SUAVE PARA SEÇÕES =====
function setupSmoothScrolling() {
  // Rolagem suave para links do menu
  const smoothScrollLinks = document.querySelectorAll(".smooth-scroll")

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Pega o target do link ou do atributo data-target
      const targetId = this.getAttribute("href") || this.getAttribute("data-target")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Calcula a posição considerando a altura da navbar
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetSection.offsetTop - navbarHeight

        // Rola suavemente até a seção
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Fecha o menu mobile se estiver aberto
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
          bsCollapse.hide()
        }
      }
    })
  })
}

// ===== EFEITOS DA NAVBAR =====
function setupNavbarEffects() {
  const navbar = document.querySelector(".custom-navbar")
  const navLinks = document.querySelectorAll(".nav-link")

  // Efeito de transparência da navbar no scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 25px rgba(0, 0, 0, 0.15)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    }

    // Atualiza o link ativo baseado na seção visível
    updateActiveNavLink()
  })

  // Destaque do link ativo
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = "info") {
  // Remove notificação existente se houver
  const existingNotification = document.querySelector(".custom-notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Cria a notificação
  const notification = document.createElement("div")
  notification.className = `custom-notification alert alert-${type === "error" ? "danger" : "success"} position-fixed`
  notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        animation: slideInRight 0.3s ease;
    `

  notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === "error" ? "exclamation-circle" : "check-circle"} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `

  document.body.appendChild(notification)

  // Remove automaticamente após 5 segundos
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// ===== BOTÃO SCROLL TO TOP =====
function setupScrollToTop() {
  // Cria o botão
  const scrollButton = document.createElement("button")
  scrollButton.className = "scroll-to-top"
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollButton.setAttribute("aria-label", "Voltar ao topo")
  document.body.appendChild(scrollButton)

  // Mostra/esconde o botão baseado no scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollButton.classList.add("show")
    } else {
      scrollButton.classList.remove("show")
    }
  })

  // Funcionalidade do clique
  scrollButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ===== ANIMAÇÕES DE ENTRADA =====
function setupAnimations() {
  // Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observa elementos para animação
  const animatedElements = document.querySelectorAll(".tech-item, .project-card, .card")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })
}

// ===== EFEITOS DOS CARDS DE PROJETO =====
function setupProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    // Efeito de hover mais suave
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Efeito de clique
    card.addEventListener("click", function (e) {
      if (!e.target.closest("a")) {
        const projectLink = this.querySelector("a[href]")
        if (projectLink) {
          projectLink.click()
        }
      }
    })
  })
}

// ===== ANIMAÇÕES CSS ADICIONAIS =====
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: #007bff !important;
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`

// Adiciona os estilos adicionais
const styleSheet = document.createElement("style")
styleSheet.textContent = additionalStyles
document.head.appendChild(styleSheet)

// ===== PERFORMANCE E OTIMIZAÇÕES =====
// Debounce para eventos de scroll
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Aplica debounce no scroll
const debouncedScroll = debounce(() => {
  // Funções de scroll já estão otimizadas acima
}, 10)

window.addEventListener("scroll", debouncedScroll)

// ===== TRACKING DO WHATSAPP =====
function setupWhatsAppTracking() {
  const whatsappBtn = document.querySelector(".whatsapp-btn")

  if (whatsappBtn) {
    whatsappBtn.addEventListener("click", () => {
      // Analytics ou tracking podem ser adicionados aqui
      console.log("WhatsApp clicado - Lead gerado!")

      // Mostra notificação de redirecionamento
      showNotification("Redirecionando para o WhatsApp...", "success")
    })
  }
}

// ===== LOG DE INICIALIZAÇÃO =====
console.log("🚀 VR DEV Portfolio inicializado com sucesso!")
console.log("📧 Desenvolvido por Vinicius Rodrigues")
console.log("🔧 Tecnologias: HTML5, CSS3, JavaScript, Bootstrap 5, Tailwind CSS")
console.log("📬 EmailJS configurado para: contatovrdev@gmail.com")
