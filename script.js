async function carregarFrase() {
  try {
    const res = await fetch("https://frases.docapi.dev/frase/obter", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const json = await res.json();

    if (!res.ok || !json.resposta) {
      throw new Error("Erro na resposta da API");
    }

    const frases = json.resposta;
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];

    document.getElementById("frase-texto").textContent = `"${aleatoria.frase}"`;
    document.getElementById("frase-autor").textContent = `— ${aleatoria.nomeAutor || "Autor desconhecido"}`;
  } catch (erro) {
    console.error("Erro ao carregar frase:", erro);
    document.getElementById("frase-texto").textContent = "Não foi possível carregar a frase.";
    document.getElementById("frase-autor").textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarFrase(); // Frase inicial

  const botao = document.getElementById("nova-frase");
  if (botao) {
    botao.addEventListener("click", () => {
      carregarFrase(); // Nova frase ao clicar
    });
  }
});
