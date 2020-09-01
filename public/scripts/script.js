const atendimento = document.querySelector("#atendimento");
const btn = document.querySelector(".btn");
const results = document.querySelector(".results");

const dados = {};

const infoTriagem = document.querySelector(".infoTriagem");

const sectionContato = document.createElement("section");
const sectionOnu = document.createElement("section");
const sectionRouter = document.createElement("section");
const sectionAtendimento = document.createElement("section");

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  dados[name] = value;

  infoContact(dados);
  infoOnu(dados);
  infoRouter(dados);
  infoAtendimento(dados);
}

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const maskTel = (tel) => {
  if (!!tel) {
    if (tel.charAt(0) === "0") {
      tel = tel.substr(1);
    }

    if (tel.length === 11) {
      const dddTel = tel.slice(0, 2);
      const telPartOne = tel.slice(2, 7);
      const telPartTwo = tel.slice(7, 11);
      tel = `(${dddTel})${telPartOne}-${telPartTwo}`;
    } else if (tel.length === 10) {
      const dddTel = tel.slice(0, 2);
      const telPartOne = tel.slice(2, 6);
      const telPartTwo = tel.slice(6, 10);
      tel = `(${dddTel})${telPartOne}-${telPartTwo}`;
    }
  } else {
    tel = " ";
  }

  return tel;
};

function infoContact(contact) {
  sectionContato.innerHTML = `
  <p>
  <strong>Técnico:</strong>
    ${capitalize(contact.nomeTec)}
  </p>
  <p>
  <strong>Meio de contato:</strong>
    ${capitalize(contact.tipoContato)}
  </p>
  </br>

  <p>
  <strong>- Contato:</strong>
    ${capitalize(contact.nomeContato)}
  </p>
  <p>
  <strong>- Telefone:</strong>
    ${maskTel(contact.telefone)}
  </p>
  </br>
  `;
  infoTriagem.append(sectionContato);
}

function infoOnu(value) {
  //Select alarms
  const selectAlarm = document.querySelector('select[name="alarme"]');
  const selectValue = selectAlarm.selectedIndex;

  //Checkbox de alarms
  const alarmsCheck = document.querySelectorAll(
    '.alarms input[type="checkbox"]'
  );
  arrayAlarmsCheck = Array.from(alarmsCheck);
  let alarmsActive = [];

  //Input data
  const inputDate = document.querySelector('input[name="timealarm"]');
  let timeConvert = "";
  if (inputDate.value) {
    const time = new Date(inputDate.value);
    //Ajuste horários
    let optionsTime = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    //Conversão do horário
    timeConvert = time.toLocaleString("pt-BR", optionsTime);
  }

  //Validação
  if (selectValue === 1) {
    arrayAlarmsCheck.forEach((element) => {
      element.disabled = false;
      if (element.checked) {
        alarmsActive.push(element.value.toUpperCase());
      }
    });

    inputDate.disabled = false;
  } else {
    arrayAlarmsCheck.forEach((element) => {
      element.disabled = true;
    });

    inputDate.disabled = true;
    timeConvert = "";
    alarmsActive = "";
  }

  sectionOnu.innerHTML = `
    <p>
      <strong>- Sistema:</strong>
      ${value.sistema ? value.sistema.toUpperCase() : ""}
    </p>
    <p>
      <strong>- OLT:</strong>
      ${value.nomeOlt ? value.nomeOlt.toUpperCase() : ""}
    </p>
    <p>
      <strong>- ${
        value.typeOnu ? capitalize(value.typeOnu) : "ONU não informado"
      }:</strong>
      ${value.estadosOnu ? capitalize(value.estadosOnu) : ""}
    </p>
    <p>
      <strong>- Alarme(s) Constatado(s):</strong>
      ${
        alarmsActive
          ? alarmsActive.join(", ").concat(" - ", timeConvert)
          : "Sem alarmes constatados"
      }
    </p>
    <p>
      <strong>- SLOT:</strong>
      ${value.slot ? value.slot : ""}
      <strong>/ PON:</strong>
      ${value.pon ? value.pon : ""}
    </p>
    <p>
      <strong>- ONU ID:</strong>
      ${value.onuid ? value.onuid : ""}
    </p>
    <p>
      <strong>- Sinal:</strong>
      - ${value.sinal ? value.sinal : ""} dBm
    </p>
    <p>
      <strong>- TX:</strong>
      ${value.tx ? value.tx : ""} dBm
    </p>
    <p>
      <strong>- Cabo:</strong>
      ${value.cabo ? value.cabo : ""} Mbps
    </p>
    </br>
  `;
  infoTriagem.append(sectionOnu);
}

function infoRouter(value) {
  //Select Router
  const selectPppoe = document.querySelector('select[name="pppoe"]');
  const valuePppoe = selectPppoe.selectedIndex;

  const selectRemoto = document.querySelector('select[name="remoto"');
  const valueRemoto = selectRemoto.selectedIndex;

  const routerMarca = document.querySelector('input[name="marca"]');
  const routerModelo = document.querySelector('input[name="modelo"]');

  if (valuePppoe === 1) {
    selectRemoto.disabled = false;
  } else {
    selectRemoto.disabled = true;
    selectRemoto.value = "";
  }

  if (valueRemoto === 1) {
    routerMarca.disabled = false;
    routerModelo.disabled = false;
  } else {
    routerMarca.disabled = true;
    routerMarca.value = "";
    routerModelo.disabled = true;
    routerModelo.value = "";
  }

  sectionRouter.innerHTML = `
  <p>
  <strong>- PPPoe:</strong>
    ${capitalize(value.pppoe)}
  </p>

  <p>
  <strong>- Acesso Remoto:</strong>
    ${capitalize(value.remoto) ? 'Possui acesso' : ''}
  </p>

  <p>
  <strong>- Roteador:</strong>
    ${value.marca ? value.marca : ''}  ${value.modelo ? value.modelo : ''}
  </p>
  </br>
  `;

  infoTriagem.append(sectionRouter);
}

function infoAtendimento(value) {
  let linhas = value.tratativa.split('\n')
  let removeLineWhite = linhas.filter(linha => linha.trim())
  let lis = removeLineWhite.map((linha, i) => `
  <li class="tratativa${i+1}">
    ${linha}
  </li>
  `)
  let resultadoLis = lis.join('\n')

  console.log(removeLineWhite);

  sectionAtendimento.innerHTML = `
  <p>
  <strong>- Tratativa:</strong>
  ${resultadoLis}
  </p>
  </br>

  <p>
  <strong>- Possível Solução:</strong>
  ${capitalize(value.solucao)}
  </p>
  <p>
  <strong>- Última O.S:</strong>
  ${capitalize(value.ultimaos)}
  </p>
  `

  infoTriagem.append(sectionAtendimento);
}

atendimento.addEventListener("change", handleChange);