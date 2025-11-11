function dark() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("modo",
      document.body.classList.contains("dark-mode") ? "escuro" : "claro");
  }
  
  window.addEventListener("load", () => {
    if (localStorage.getItem("modo") === "escuro")
      document.body.classList.add("dark-mode");
  
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  
    typingEffect();
    modalInit();
    formInit();
  });
  
  
  function typingEffect() {
    const el = document.getElementById("typing");
    if (!el) return;
  
    const frases = [
      "Front-end developer em formação.",
      "Gosto de criar interfaces e resolver problemas.",
      "HTML • CSS • JavaScript"
    ];
  
    let frase = 0, i = 0, forward = true;
  
    function digitar() {
      const texto = frases[frase];
      el.textContent = texto.slice(0, i);
      i += forward ? 1 : -1;
  
      if (i === texto.length + 1) { forward = false; setTimeout(digitar, 1200); return; }
      if (i === 0) { forward = true; frase = (frase + 1) % frases.length; }
  
      setTimeout(digitar, forward ? 80 : 30);
    }
    digitar();
  }
  
  
  function modalInit() {
    const modal = document.getElementById("project-modal");
    if (!modal) return;
  
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-desc");
    const link = document.getElementById("modal-link");
  
    document.querySelectorAll(".open-modal").forEach(btn => {
      btn.onclick = () => {
        title.textContent = btn.dataset.title;
        desc.textContent = btn.dataset.desc;
        link.href = btn.dataset.link;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      };
    });
  
    document.getElementById("modal-close").onclick = close;
    modal.onclick = e => { if (e.target === modal) close(); };
    document.onkeydown = e => { if (e.key === "Escape") close(); };
  
    function close() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }
  
  
  function formInit() {
    const form = document.getElementById("contact-form");
    if (!form) return;
  
    const feedback = document.getElementById("form-feedback");
  
    form.phone?.addEventListener("input", e => {
      e.target.value = e.target.value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4,5})(\d{4})$/, "$1-$2")
        .slice(0, 15);
    });
  
    form.onsubmit = e => {
      e.preventDefault();
      const { name, phone, email, message } = form;
  
      if (!name.value || !phone.value || !email.value || !message.value)
        return (feedback.textContent = "Preencha todos os campos.");
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
        return (feedback.textContent = "E-mail inválido.");
  
      feedback.textContent = "Enviando...";
      setTimeout(() => {
        feedback.textContent = "Mensagem enviada com sucesso! Obrigado.";
        form.reset();
      }, 800);
    };
  }