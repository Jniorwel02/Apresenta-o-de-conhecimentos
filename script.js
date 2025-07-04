function carregarFrase() {
  fetch("https://frases.docapi.dev/frase/obter", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro na resposta da API");
      return res.json();
    })
    .then((json) => {
      const frases = json.resposta;
      const aleatoria = frases[Math.floor(Math.random() * frases.length)];

      document.getElementById("frase-texto").textContent = `"${aleatoria.frase}"`;
      document.getElementById("frase-autor").textContent = `— ${aleatoria.nomeAutor || "Autor desconhecido"}`;
    })
    .catch((erro) => {
      console.error("Erro ao carregar frase:", erro);
      document.getElementById("frase-texto").textContent = "Não foi possível carregar a frase.";
      document.getElementById("frase-autor").textContent = "";
    });
}


function carregarClima() {
  if (!navigator.geolocation) {
    document.getElementById("local").textContent = 'Geolocalização não suportada.';
    return;
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const chave = 'df89a895e0e7330d784a299a766688eb';

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${chave}&units=metric&lang=pt_br`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro na resposta da API');
        }
        return res.json();
      })
      .then((dados) => {
        document.getElementById("local").textContent = `📍 ${dados.name}, ${dados.sys.country}`;
        document.getElementById("temperatura").textContent = `🌡️ ${Math.round(dados.main.temp)}°C`;
        document.getElementById("descricao").textContent = `🌥️ ${dados.weather[0].description}`;
      })
      .catch((erro) => {
        console.error("Erro ao buscar clima:", erro);
        document.getElementById("local").textContent = "Erro ao buscar o clima.";
      });

  }, (erro) => {
    console.error("Erro ao obter localização:", erro);
    document.getElementById("local").textContent = "Permissão de localização negada.";
  });
}


document.addEventListener("DOMContentLoaded", () => {
  carregarFrase();
  carregarClima();

  const botao = document.getElementById("nova-frase");
  if (botao) {
    botao.addEventListener("click", carregarFrase);
  }
});
