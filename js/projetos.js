/**
 * Carrossel com Expansão em Tela Cheia
 * Versão 3.0
 */
document.addEventListener('DOMContentLoaded', function() {
  // Selecionar todos os carrosséis
  const carrosseis = document.querySelectorAll('.novo-carrossel');
  
  carrosseis.forEach(function(carrossel) {
    // Elementos do carrossel
    const previewContainer = carrossel.querySelector('.preview-container');
    const viewBtn = carrossel.querySelector('.view-btn');
    const modal = carrossel.querySelector('.modal');
    const closeBtn = carrossel.querySelector('.close-btn');
    const slides = carrossel.querySelectorAll('.slide');
    const prevBtn = carrossel.querySelector('.prev-btn');
    const nextBtn = carrossel.querySelector('.next-btn');
    const indicators = carrossel.querySelector('.indicators');
    const counter = carrossel.querySelector('.counter');
    
    let currentSlide = 0;
    
    // Limpar indicadores existentes para evitar duplicação
    if (indicators) {
      indicators.innerHTML = '';
      
      // Criar indicadores
      slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
          goToSlide(index);
        });
        indicators.appendChild(dot);
      });
    }
    
    // Atualizar contador
    function updateCounter() {
      if (counter) {
        counter.textContent = `${currentSlide + 1}/${slides.length}`;
      }
    }
    
    // Mostrar slide
    function showSlide(n) {
      // Ajustar índice se estiver fora dos limites
      if (n >= slides.length) n = 0;
      if (n < 0) n = slides.length - 1;
      
      // Ocultar todos os slides
      slides.forEach(function(slide) {
        slide.style.display = 'none';
      });
      
      // Mostrar slide atual
      slides[n].style.display = 'flex';
      
      // Atualizar indicadores
      if (indicators) {
        const dots = indicators.querySelectorAll('.dot');
        dots.forEach(function(dot, index) {
          if (index === n) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      
      // Atualizar contador
      currentSlide = n;
      updateCounter();
    }
    
    // Ir para slide específico
    function goToSlide(n) {
      showSlide(n);
    }
    
    // Próximo slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
    
    // Slide anterior
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
    
    // Abrir modal em tela cheia
    function openModal(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      if (modal) {
        // Mover o modal para o body para evitar conflitos de posicionamento
        document.body.appendChild(modal);
        
        // Exibir o modal
        modal.style.display = 'flex';
        
        // Impedir rolagem do body
        document.body.style.overflow = 'hidden';
        
        // Mostrar o slide atual
        showSlide(currentSlide);
        
        // Adicionar classe ao body para indicar modal aberto
        document.body.classList.add('modal-open');
        
        // Forçar reflow para garantir que o modal seja exibido corretamente
        void modal.offsetWidth;
      }
    }
    
    // Fechar modal
    function closeModal() {
      if (modal) {
        // Ocultar o modal
        modal.style.display = 'none';
        
        // Restaurar rolagem do body
        document.body.style.overflow = '';
        
        // Remover classe do body
        document.body.classList.remove('modal-open');
        
        // Devolver o modal para o carrossel
        carrossel.appendChild(modal);
      }
    }
    
    // Adicionar eventos de clique
    if (previewContainer) {
      previewContainer.addEventListener('click', openModal);
    }
    
    if (viewBtn) {
      viewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        prevSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        nextSlide();
      });
    }
    
    // Fechar ao clicar fora
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });
    }
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
      if (modal && modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      }
    });
    
    // Inicializar primeiro slide
    slides.forEach(function(slide, index) {
      if (index === 0) {
        slide.style.display = 'flex';
      } else {
        slide.style.display = 'none';
      }
    });
    
    updateCounter();
  });
  
  // Adicionar estilos globais para garantir que o modal funcione corretamente
  const style = document.createElement('style');
  style.textContent = `
    body.modal-open {
      overflow: hidden !important;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    
    .modal {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 99999 !important;
    }
  `;
  document.head.appendChild(style);
});

// Solução alternativa para garantir que os botões funcionem
window.addEventListener('load', function() {
  // Para cada botão "Ver imagens"
  document.querySelectorAll('.view-btn').forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const carrossel = this.closest('.novo-carrossel');
      const modal = carrossel.querySelector('.modal');
      
      if (modal) {
        // Mover o modal para o body
        document.body.appendChild(modal);
        
        // Exibir o modal
        modal.style.display = 'flex';
        
        // Impedir rolagem
        document.body.style.overflow = 'hidden';
        
        // Adicionar classe ao body
        document.body.classList.add('modal-open');
      }
      
      return false;
    };
  });
  
  // Para cada botão de fechar
  document.querySelectorAll('.close-btn').forEach(function(btn) {
    btn.onclick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const modal = this.closest('.modal');
      const carrossel = document.querySelector('.novo-carrossel');
      
      if (modal) {
        // Ocultar o modal
        modal.style.display = 'none';
        
        // Restaurar rolagem
        document.body.style.overflow = '';
        
        // Remover classe do body
        document.body.classList.remove('modal-open');
        
        // Devolver o modal para o carrossel
        if (carrossel) {
          carrossel.appendChild(modal);
        }
      }
      
      return false;
    };
  });
});