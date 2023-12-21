const main$$ = document.querySelector("main");
const ol$$ = document.querySelector("ol");

const pokemones = [];

const getcharacters = async () => {
  document.addEventListener("DOMContentLoaded", function () {});
  document.getElementById("loader-wrapper").style.display = "none";

  for (let index = 1; index <= 151; index++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
    const result = await response.json();
    pokemones.push(result);
    console.log(result);
  }
  return pokemones;
};

const mapearcharacters = (characteresSinMapear) => {
  const charactersMapeados = characteresSinMapear.map((characters) => ({
    name: characters.name,
    id: characters.id,
    imagen: characters.sprites.front_default,
    type: characters.types.map((type) => type.type.name).join(", "),
    encounters: characters.location_area_encounters,
    weight: characters.weight,
    height: characters.height,
  }));
  return charactersMapeados;
};

const pintarCharacters = (characters) => {
  ol$$.innerHTML = "";

  for (const character of characters) {
    const li$$ = document.createElement("li");
    li$$.classList.add("card");
    ol$$.appendChild(li$$);
    //PARA LA PARTE FRONTAL DE LA CARTA
    const characterFrontdiv$$ = document.createElement("div");
    characterFrontdiv$$.classList.add("facefront");
    const nameh2$$ = document.createElement("h2");
    nameh2$$.classList.add("card-title");
    const img$$ = document.createElement("img");
    img$$.classList.add("card-image");
    const typeh2$$ = document.createElement("h2");
    typeh2$$.classList.add("card-subtitle");

    nameh2$$.textContent = character.name;
    img$$.setAttribute("src", character.imagen);
    img$$.setAttribute("alt", character.name);
    typeh2$$.textContent = character.type;

    li$$.appendChild(characterFrontdiv$$);
    characterFrontdiv$$.appendChild(nameh2$$);
    characterFrontdiv$$.appendChild(img$$);
    characterFrontdiv$$.appendChild(typeh2$$);
  }
};

const cogerInput = (characters) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", () =>
    filtrarCharacters(characters, input$$.value)
  );
};
const filtrarCharacters = (arrayFiltrar, filtro) => {
  let charactersFiltrados = arrayFiltrar.filter((characters) =>
    characters.name.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarCharacters(charactersFiltrados);
};
const init = async () => {
  const characters = await getcharacters();

  const charactersMapeados = mapearcharacters(characters);

  pintarCharacters(charactersMapeados);
  cogerInput(charactersMapeados);
};
init();
