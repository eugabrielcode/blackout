document.addEventListener("DOMContentLoaded", () => {
  // Animação de estrelas
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.3 + 0.1
    });
  }

  function animate() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function atualizarStatusBot(status) {
    const statusEl = document.getElementById('botStatus');
    if (status === 'online') {
      statusEl.textContent = '🟢 Online';
      statusEl.style.color = '#00ff90';
      statusEl.style.background = 'rgba(255, 255, 255, 0.1)';
      statusEl.style.boxShadow = '0 0 6px rgba(0, 255, 144, 0.4)';
    } else if (status === 'offline') {
      statusEl.textContent = '🔴 Offline';
      statusEl.style.color = '#ff4e4e';
      statusEl.style.background = 'rgba(255, 0, 0, 0.1)';
      statusEl.style.boxShadow = '0 0 6px rgba(255, 0, 0, 0.4)';
    }
  }

  const linksInternos = document.querySelectorAll('a[href$=".html"]');
  linksInternos.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const destino = this.href;
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = destino;
      }, 400);
    });
  });

  // Exemplo: URL de status - substitua 'URL_DO_STATUS' pela URL real do endpoint se houver
  fetch('URL_DO_STATUS')
    .then(res => {
      if (!res.ok) {
        throw new Error('Erro ao buscar status: ' + res.statusText);
      }
      return res.json();
    })
    .then(data => {
      const statusEl = document.getElementById('botStatus');
      atualizarStatusBot(data.status);
      if (data.status === 'online') {
        statusEl.textContent = `🟢 Online - ${data.servers} servidores | ${data.users} usuários`;
      }
    })
    .catch(err => {
      console.error('Erro ao buscar status:', err);
      atualizarStatusBot('offline');
    });

  // Controle do menu hambúrguer para mobile
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const menu = document.getElementById('menu');
  if (hamburgerMenu && menu) {
    hamburgerMenu.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});