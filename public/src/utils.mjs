import 'wc-spinners';

export function testRequirements() {
    if (process.env.domain == null)
        alert("environment domain of auth0 not set")
    if (process.env.client_id == null)
        alert("environment client_id of auth0 not set")
}

export function createSpinner() {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-start");
    const text = spinner.appendChild(document.createElement("h1"))
    text.innerText = "loading video's ..."
    spinner.appendChild(document.createElement("atom-spinner"));
    return spinner;
}

export function camelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  
