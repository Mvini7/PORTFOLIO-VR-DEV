document.querySelectorAll('header li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão do link
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Rolagem suave
        });
    });
});

document.querySelectorAll('button[data-target]').forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('data-target'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});