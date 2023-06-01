function overrideConsoleMethods() {
  let output = "";

  const consoleMethods = ["log", "warn", "error"];

  const updateOutput = function (message, type) {
    output += `<span class="${type}">${message}</span><br>`;

    const consoleOutputElement = document.getElementById("Consoleoutput");
    consoleOutputElement.innerHTML = output;
    consoleOutputElement.scrollTop = consoleOutputElement.scrollHeight;
  };

  consoleMethods.forEach((method) => {
    const oldMethod = console[method];
    console[method] = function (...messages) {
      updateOutput(messages.join(" "), method);
      oldMethod.apply(console, messages);
    };
  });
}

window.onload = overrideConsoleMethods;
