/**
 * Correção de Emergência para o Carrossel
 */
window.addEventListener("load", function () {
  // Função para abrir o modal em tela cheia
  function abrirModalEmTelaCheia(modal) {
    // Remover o modal do seu container atual
    const modalParent = modal.parentNode;

    // Mover para o body
    document.body.appendChild(modal);

    // Configurar para tela cheia
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100vw";
    modal.style.height = "100vh";
    modal.style.zIndex = "999999";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";

    // Impedir rolagem
    document.body.style.overflow = "hidden";

    // Armazenar referência ao pai original
    modal.setAttribute("data-parent", modalParent.className);

    return modalParent;
  }

  // Função para fechar o modal
  function fecharModal(modal) {
    // Ocultar o modal
    modal.style.display = "none";

    // Restaurar rolagem
    document.body.style.overflow = "";

    // Tentar devolver o modal ao seu container original
    const parentClass = modal.getAttribute("data-parent");
    if (parentClass) {
      const possibleParents = document.querySelectorAll(
        "." + parentClass.split(" ")[0]
      );
      if (possibleParents.length > 0) {
        possibleParents[0].appendChild(modal);
      }
    }
  }

  // Para cada botão "Ver imagens"
  document.querySelectorAll(".view-btn").forEach(function (btn) {
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const carrossel = this.closest(".novo-carrossel");
      const modal = carrossel.querySelector(".modal");

      if (modal) {
        abrirModalEmTelaCheia(modal);
      }

      return false;
    };
  });

  // Para cada container de preview
  document.querySelectorAll(".preview-container").forEach(function (container) {
    container.onclick = function (e) {
      const carrossel = this.closest(".novo-carrossel");
      const modal = carrossel.querySelector(".modal");

      if (modal) {
        abrirModalEmTelaCheia(modal);
      }
    };
  });

  // Para cada botão de fechar
  document.querySelectorAll(".close-btn").forEach(function (btn) {
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const modal = this.closest(".modal");

      if (modal) {
        fecharModal(modal);
      }

      return false;
    };
  });

  // Para cada botão de navegação
  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();

      const modal = this.closest(".modal");
      const slides = modal.querySelectorAll(".slide");
      const isNext = this.classList.contains("next-btn");

      // Encontrar o slide atual
      let currentIndex = -1;
      slides.forEach(function (slide, index) {
        if (slide.style.display === "flex") {
          currentIndex = index;
        }
      });

      if (currentIndex !== -1) {
        // Ocultar o slide atual
        slides[currentIndex].style.display = "none";

        // Calcular o próximo índice
        let nextIndex;
        if (isNext) {
          nextIndex = (currentIndex + 1) % slides.length;
        } else {
          nextIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        // Mostrar o próximo slide
        slides[nextIndex].style.display = "flex";

        // Atualizar indicadores
        const dots = modal.querySelectorAll(".dot");
        if (dots.length > 0) {
          dots.forEach(function (dot, index) {
            if (index === nextIndex) {
              dot.classList.add("active");
            } else {
              dot.classList.remove("active");
            }
          });
        }

        // Atualizar contador
        const counter = modal.querySelector(".counter");
        if (counter) {
          counter.textContent = `${nextIndex + 1}/${slides.length}`;
        }
      }

      return false;
    };
  });

  console.log("Correção de emergência para o carrossel aplicada");
});
