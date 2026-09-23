const API_URL = 'http://localhost:3000';

// No cadastro.html, o formulário deve ter id="cadastroAnimalForm"
const form = document.getElementById('cadastroAnimalForm');
const racaInput = document.getElementById('raca');
const idadeInput = document.getElementById('idade');
const porteInput = document.getElementById('porte');
const generoInput = document.getElementById('genero');

// Cria ou busca o elemento de erro na tela
let alertBox = document.getElementById('alertBox');
if (!alertBox && form) {
  alertBox = document.createElement('div');
  alertBox.id = 'alertBox';
  alertBox.className = 'alert alert-danger d-none mt-3';
  form.prepend(alertBox);
}

function mostrarErro(msg) {
  if (alertBox) {
    alertBox.textContent = msg;
    alertBox.classList.remove('d-none');
  }
}

function esconderErro() {
  if (alertBox) alertBox.classList.add('d-none');
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    esconderErro();

    const raca = racaInput.value.trim();
    const idade = idadeInput.value;
    const porte = porteInput.value;
    const genero = generoInput.value;

    if (!raca || !idade || !porte || !genero) {
      mostrarErro('Por favor, preencha todos os campos.');
      return;
    }

    const btnCadastrar = form.querySelector('button[type="submit"]');
    if (btnCadastrar) {
      btnCadastrar.disabled = true;
      btnCadastrar.textContent = 'Cadastrando...';
    }

    try {
      const response = await fetch(`${API_URL}/api/animais`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ raca, idade, porte, genero }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Animal cadastrado com sucesso!');
        form.reset();
      } else {
        mostrarErro(data.message || 'Erro ao cadastrar o animal.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      mostrarErro('Não foi possível conectar ao servidor.');
    } finally {
      if (btnCadastrar) {
        btnCadastrar.disabled = false;
        btnCadastrar.textContent = 'Cadastrar';
      }
    }
  });
}
