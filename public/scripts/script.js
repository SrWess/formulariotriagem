const atendimento = document.querySelector("#atendimento");
const btn = document.querySelector(".btn");
const results = document.querySelector(".results");

const dados = {};

const infoTriagem = document.querySelector(".infoTriagem");

const sectionContato = document.createElement("section");
const sectionOnu = document.createElement("section");

function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  dados[name] = value;

  infoContact(dados);
  infoOnu(dados);
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
    tel = ' '
  }

  return tel
};

function infoContact(contact) {
  sectionContato.innerHTML = `
  <span>
  <strong>Técnico:</strong>
    ${capitalize(contact.nomeTec)}
  </span>
  <span>
  <strong>Meio de contato:</strong>
    ${capitalize(contact.tipoContato)}
  </span>
  </br>

  <span>
  <strong>- Contato:</strong>
    ${capitalize(contact.nomeContato)}
  </span>
  <span>
  <strong>- Telefone:</strong>
    ${maskTel(contact.telefone)}
  </span>
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
    alarmsActive = ""
  }

  console.log(value.alarme);
  console.log(alarmsActive);
  sectionOnu.innerHTML = `
    <span>
      <strong>- Sistema:</strong>
      ${value.sistema ? capitalize(value.sistema): "Sistema não selecionado"}
    </span>
    <span>
      <strong>- OLT:</strong>
      ${value.nomeOlt ? capitalize(value.nomeOlt): "OLT não informada"}
    </span>
    <span>
      <strong>- ${value.typeOnu ? capitalize(value.typeOnu) : "ONU não informado"}:</strong>
      ${value.estadosOnu ? capitalize(value.estadosOnu) : "Não informado"}
    </span>
    <span>
      <strong>- Alarme(s) Constatado(s):</strong>
      ${alarmsActive ? alarmsActive.join(', ').concat(' - ', timeConvert) : 'Sem alarmes constatados'}
    </span>
    <span>
      <strong>- SLOT:</strong>
      ${value.slot}
      <strong>/ PON:</strong>
      ${value.pon}
    </span>
    <span>
      <strong>- ONU ID:</strong>
      ${value.onuid}
    </span>
    <span>
      <strong>- Sinal:</strong>
      ${value.sinal}
    </span>
    <span>
      <strong>- TX:</strong>
      ${value.tx}
    </span>
    <span>
      <strong>- Cabo:</strong>
      ${value.cabo}
    </span>
    </br>
  `
  infoTriagem.append(sectionOnu);

}

atendimento.addEventListener("change", handleChange);