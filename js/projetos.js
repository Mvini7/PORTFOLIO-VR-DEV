document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const mainImage = document.getElementById("mainImage");
  const carouselOverlay = document.getElementById("carouselOverlay");
  const closeButton = document.getElementById("closeButton");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const carouselImages = document.querySelectorAll(".carousel-image");
  const indicators = document.getElementById("indicators");

  let currentIndex = 0;

  // Criar indicadores
  carouselImages.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.addEventListener("click", () => {
      goToSlide(index);
    });
    indicators.appendChild(indicator);
  });

  // Abrir carrossel ao clicar na imagem principal
  mainImage.addEventListener("click", () => {
    carouselOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Impedir rolagem da página
  });

  // Fechar carrossel
  closeButton.addEventListener("click", () => {
    closeCarousel();
  });

  // Fechar carrossel ao clicar fora da imagem
  carouselOverlay.addEventListener("click", (e) => {
    if (e.target === carouselOverlay) {
      closeCarousel();
    }
  });

  // Navegar para a imagem anterior
  prevButton.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  // Navegar para a próxima imagem
  nextButton.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // Navegar com as teclas do teclado
  document.addEventListener("keydown", (e) => {
    if (carouselOverlay.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1);
      } else if (e.key === "Escape") {
        closeCarousel();
      }
    }
  });

  // Adicionar suporte a gestos de deslize para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (carouselOverlay.style.display !== "flex") return;

      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Deslize para a esquerda (próxima imagem)
      goToSlide(currentIndex + 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Deslize para a direita (imagem anterior)
      goToSlide(currentIndex - 1);
    }
  }

  // Função para ir para um slide específico
  function goToSlide(index) {
    // Lidar com índices fora dos limites
    if (index < 0) {
      index = carouselImages.length - 1;
    } else if (index >= carouselImages.length) {
      index = 0;
    }

    // Remover classe active do slide atual
    carouselImages[currentIndex].classList.remove("active");
    document
      .querySelectorAll(".indicator")
      [currentIndex].classList.remove("active");

    // Atualizar índice atual
    currentIndex = index;

    // Adicionar classe active ao novo slide
    carouselImages[currentIndex].classList.add("active");
    document
      .querySelectorAll(".indicator")
      [currentIndex].classList.add("active");
  }

  // Função para fechar o carrossel
  function closeCarousel() {
    carouselOverlay.style.display = "none";
    document.body.style.overflow = "auto"; // Restaurar rolagem da página
  }

  // Ajustar tamanho do carrossel em dispositivos móveis quando a orientação muda
  window.addEventListener("resize", () => {
    if (carouselOverlay.style.display === "flex") {
      // Reajustar o carrossel se necessário
      const carousel = document.querySelector(".carousel");
      if (window.innerWidth < 480) {
        carousel.style.height = "60vh";
      } else if (window.innerWidth < 768) {
        carousel.style.height = "70vh";
      } else {
        carousel.style.height = "80vh";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM com nomes secundários
  const principalImagem = document.getElementById("primaryPicture")
  const sliderContainer = document.getElementById("sliderWrapper")
  const botaoSair = document.getElementById("exitBtn")
  const botaoAnterior = document.getElementById("prevBtn")
  const botaoProximo = document.getElementById("nextBtn")
  const itensSlider = document.querySelectorAll(".slider-item")
  const indicadoresPontos = document.getElementById("sliderDots")

  let indiceAtual = 0

  // Criar indicadores de pontos
  itensSlider.forEach((_, indice) => {
    const pontoIndicador = document.createElement("div")
    pontoIndicador.classList.add("dot-indicator")
    if (indice === 0) {
      pontoIndicador.classList.add("current")
    }
    pontoIndicador.addEventListener("click", () => {
      irParaSlide(indice)
    })
    indicadoresPontos.appendChild(pontoIndicador)
  })

  // Abrir slider ao clicar na imagem principal
  principalImagem.addEventListener("click", () => {
    sliderContainer.style.display = "flex"
    document.body.style.overflow = "hidden" // Impedir rolagem da página
  })

  // Fechar slider
  botaoSair.addEventListener("click", () => {
    fecharSlider()
  })

  // Fechar slider ao clicar fora da imagem
  sliderContainer.addEventListener("click", (e) => {
    if (e.target === sliderContainer) {
      fecharSlider()
    }
  })

  // Navegar para a imagem anterior
  botaoAnterior.addEventListener("click", () => {
    irParaSlide(indiceAtual - 1)
  })

  // Navegar para a próxima imagem
  botaoProximo.addEventListener("click", () => {
    irParaSlide(indiceAtual + 1)
  })

  // Navegar com as teclas do teclado
  document.addEventListener("keydown", (e) => {
    if (sliderContainer.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        irParaSlide(indiceAtual - 1)
      } else if (e.key === "ArrowRight") {
        irParaSlide(indiceAtual + 1)
      } else if (e.key === "Escape") {
        fecharSlider()
      }
    }
  })

  // Adicionar suporte a gestos de deslize para dispositivos móveis
  let inicioToque = 0
  let fimToque = 0

  document.addEventListener(
    "touchstart",
    (e) => {
      inicioToque = e.changedTouches[0].screenX
    },
    false,
  )

  document.addEventListener(
    "touchend",
    (e) => {
      if (sliderContainer.style.display !== "flex") return

      fimToque = e.changedTouches[0].screenX
      processarDeslize()
    },
    false,
  )

  function processarDeslize() {
    const limiarDeslize = 50
    if (fimToque < inicioToque - limiarDeslize) {
      // Deslize para a esquerda (próxima imagem)
      irParaSlide(indiceAtual + 1)
    }
    if (fimToque > inicioToque + limiarDeslize) {
      // Deslize para a direita (imagem anterior)
      irParaSlide(indiceAtual - 1)
    }
  }

  // Função para ir para um slide específico
  function irParaSlide(indice) {
    // Lidar com índices fora dos limites
    if (indice < 0) {
      indice = itensSlider.length - 1
    } else if (indice >= itensSlider.length) {
      indice = 0
    }

    // Remover classe visible do slide atual
    itensSlider[indiceAtual].classList.remove("visible")
    document.querySelectorAll(".dot-indicator")[indiceAtual].classList.remove("current")

    // Atualizar índice atual
    indiceAtual = indice

    // Adicionar classe visible ao novo slide
    itensSlider[indiceAtual].classList.add("visible")
    document.querySelectorAll(".dot-indicator")[indiceAtual].classList.add("current")
  }

  // Função para fechar o slider
  function fecharSlider() {
    sliderContainer.style.display = "none"
    document.body.style.overflow = "auto" // Restaurar rolagem da página
  }

  // Ajustar tamanho do slider em dispositivos móveis quando a orientação muda
  window.addEventListener("resize", () => {
    if (sliderContainer.style.display === "flex") {
      // Reajustar o slider se necessário
      const elementoSlider = document.querySelector(".slider")
      if (window.innerWidth < 480) {
        elementoSlider.style.height = "60vh"
      } else if (window.innerWidth < 768) {
        elementoSlider.style.height = "70vh"
      } else {
        elementoSlider.style.height = "80vh"
      }
    }
  })
})
