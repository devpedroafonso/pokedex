// Variáveis globais
const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const imagemPokemon = document.querySelector('.imagemPokemon');
const form = document.querySelector('form');
const input = document.querySelector('.inputSearch');
const bntAnt = document.querySelector('.bntAnt');
const bntProx = document.querySelector('.bntProx');

let searchPokemon = 35; // Começa no Pokémon 35 (Clefairy)

// Função para buscar os dados na API
const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (!APIResponse.ok) {
            throw new Error('Pokémon não encontrado');
        }

        return await APIResponse.json();
    } catch (error) {
        return null; // Retorna null em caso de erro
    }
};

// Função para modificar as informações no HTML
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name.toUpperCase();
        pokemonNumber.innerHTML = `#${data.id}`;

        // Exibe a animação se disponível, senão usa a imagem estática
        imagemPokemon.src =
            data.sprites.versions['generation-v']['black-white'].animated.front_default ||
            data.sprites.front_default;

        imagemPokemon.style.display = 'block';
        searchPokemon = data.id; // Atualiza o ID atual
        input.value = '';
    } else {
        pokemonName.innerHTML = 'Não Encontrado';
        pokemonNumber.innerHTML = '';
        imagemPokemon.style.display = 'none'; // Esconde a imagem se não encontrar
    }
};

// Evento de pesquisa no formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Botão para o Pokémon anterior
bntAnt.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--; // Diminui o ID
        renderPokemon(searchPokemon); // Atualiza o Pokémon exibido
    }
});

// Botão para o próximo Pokémon
bntProx.addEventListener('click', () => {
    searchPokemon++; // Aumenta o ID
    renderPokemon(searchPokemon); // Atualiza o Pokémon exibido
});

// Espera o DOM carregar e então renderiza o Pokémon inicial
document.addEventListener("DOMContentLoaded", () => {
    renderPokemon(searchPokemon);
});