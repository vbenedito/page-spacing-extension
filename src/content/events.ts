// import { isKeyPressed } from "./state";

// const allowedKeys = ["Tab", "Meta", "Alt"];

// export const setupKeyPressListeners = () => {
//   document.addEventListener("keydown", (e) => {
//     if (allowedKeys.includes(e.key)) {
//       isKeyPressed.value = true;
//       console.log(`Key "${e.key}" pressed.`);
//     }

//     // codigo para fazer a acao de mostrar informacoes
//     // do elemento clicado
//     if (e.key === "Meta" && e.shiftKey) {
//       console.log("Meta and Shift keys pressed together.");

//       setTimeout(() => {
//         document.addEventListener("mouseover", (event: MouseEvent) => {
//           const element = event.target as HTMLElement; // Garantimos que o alvo é um elemento HTML
//           const elementGetBoundingClientRect = element.getBoundingClientRect(); // Obtém as dimensões do elemento
//           if (!element) return;

//           const styles = window.getComputedStyle(element); // Obtém os estilos computados

//           // Cria um objeto tipado para as informações do elemento
//           const info = {
//             tagName: element.tagName, // Nome da tag
//             height: styles.height, // Altura
//             width: styles.width, // Largura
//             backgroundColor: styles.backgroundColor, // Cor de fundo
//             color: styles.color, // Cor do texto
//             fontSize: styles.fontSize, // Tamanho da fonte
//           };

//           createTooltip(
//             JSON.stringify(info),
//             elementGetBoundingClientRect.x,
//             elementGetBoundingClientRect.y
//           ); // Cria a tooltip

//           console.log(info, elementGetBoundingClientRect); // Exibe as informações no console
//         });
//       }, 5000);
//     }
//   });

//   document.addEventListener("keyup", (e) => {
//     if (allowedKeys.includes(e.key)) {
//       isKeyPressed.value = false;
//       state.resetSelections();
//       console.log(`Key "${e.key}" released. Selections cleared.`);
//     }

//     if (e.key === "Meta" && e.shiftKey) {
//       console.log("Meta and Shift keys pressed together.");

//       document.removeEventListener("mouseover", () => {});
//     }
//   });
// };
