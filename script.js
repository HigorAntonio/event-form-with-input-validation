setUpCheckboxInput(".checkbox-container");
setUpForm();

function setUpCheckboxInput(checkboxContainerCssSelector) {
  const checkboxContainer = document.querySelector(
    checkboxContainerCssSelector
  );
  const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');

  function handleCheckboxIcon() {
    if (checkbox.checked) {
      checkboxContainer.classList.add("show-after");
      return;
    }
    checkboxContainer.classList.remove("show-after");
  }
  handleCheckboxIcon();

  checkbox.addEventListener("click", () => {
    handleCheckboxIcon();
  });
}

function setUpForm() {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const eventTitle = validateInput(
      "event-title",
      /^(?!\s*$)(?!.*\s{2,}).{8,}$/
    );
    const eventLink = validateInput(
      "event-link",
      /^http:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$/
    );
    const whatsappForContact = validateInput(
      "whatsapp-for-contact",
      /^\d{11}$/
    );
    const adminEmail = validateInput(
      "admin-email",
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    );
    const passwordForAccess = validateInput("password", /^.{8,}$/);
    const eventDate = validateInput(
      "event-date",
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
    );
    const eventBeginingHour = validateInput(
      "event-begining-hour",
      /^([01][0-9]|2[0-3]):([0-5][0-9])$/
    );
    const eventEndHour = validateInput(
      "event-end-hour",
      /^([01][0-9]|2[0-3]):([0-5][0-9])$/
    );

    const data = {
      eventInfo: {
        eventTitle,
        eventLink,
        whatsappForContact,
        extraInfo: document.getElementById("extra-info").value,
        category: document.getElementById("category").value,
      },
      privacy: {
        isEventPrivate: document.getElementById("is-event-private").checked,
        adminEmail,
        passwordForAccess,
      },
      dateAndTime: {
        eventDate,
        eventBeginingHour,
        eventEndHour,
      },
    };

    console.log("data:", JSON.stringify(data));
  });
}

function validateInput(inputId, validationRegEx) {
  const inputLabel = document.querySelector(`label[for="${inputId}"]`);
  const inputHint = inputLabel.querySelector("span");
  const input = document.getElementById(inputId);

  const isValid = validationRegEx.test(input.value);
  if (!isValid) {
    inputHint?.classList.add("invalidText");
    !inputHint && inputLabel.classList.add("invalidText");
    input.classList.add("invalidInput");
    return undefined;
  }
  inputHint?.classList.remove("invalidText");
  !inputHint && inputLabel.classList.remove("invalidText");
  input.classList.remove("invalidInput");
  return input.value;
}

/* Lista de RegEx para validação de campos:
- titulo do evento: /^(?!\s*$)(?!.*\s{2,}).{8,}$/
- link do evento: /^http:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}$/
- whatsapp: /^\d{11}$/
- email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
- password: /^.{8,}$/
- data do evento: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
- horário de inicio: /^([01][0-9]|2[0-3]):([0-5][0-9])$/
- horário de término: /^([01][0-9]|2[0-3]):([0-5][0-9])$/ */
