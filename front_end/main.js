const API_URL = 'http://localhost:3000';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const alertBox = document.getElementById('alertBox');
const btnEntrar = form.querySelector('button[type="submit"]');

function mostrarErro(msg) {
  alertBox.textContent = msg;
  alertBox.classList.remove('d-none');
}

function esconderErro() {
  alertBox.classList.add('d-none');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  esconderErro();

  const email = emailInput.value.trim();
  const senha = senhaInput.value;

  if (!email || !senha) {
    mostrarErro('Por favor, preencha todos os campos.');
    return;
  }

  btnEntrar.disabled = true;
  btnEntrar.textContent = 'Entrando...';

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
      window.location.href = 'dashboard.html';
    } else {
      mostrarErro(data.message || 'E-mail ou senha inválidos.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    mostrarErro('Não foi possível conectar ao servidor.');
  } finally {
    btnEntrar.disabled = false;
    btnEntrar.textContent = 'Entrar';
  }
});