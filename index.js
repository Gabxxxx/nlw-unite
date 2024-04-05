let participants = [
  {
    name: "Gabriel Vinícius",
    email: "gabriel@gmail.com",
    date: new Date(2024, 2, 22, 19, 20),
    dateCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    name: "João Silva",
    email: "joao@gmail.com",
    date: new Date(2024, 2, 20, 18, 30),
    dateCheckIn: new Date(2024, 2, 25, 21, 45)
  },
  {
    name: "Maria Oliveira",
    email: "maria@gmail.com",
    date: new Date(2024, 2, 19, 20, 15),
    dateCheckIn: null
  },
  {
    name: "Pedro Souza",
    email: "pedro@gmail.com",
    date: new Date(2024, 2, 18, 17, 45),
    dateCheckIn: new Date(2024, 2, 25, 20, 50)
  },
  {
    name: "Ana Santos",
    email: "ana@gmail.com",
    date: new Date(2024, 2, 17, 16, 40),
    dateCheckIn: null
  },
  {
    name: "Lucas Lima",
    email: "lucas@gmail.com",
    date: new Date(2024, 2, 16, 21, 10),
    dateCheckIn: new Date(2024, 2, 25, 19, 55)
  },
  {
    name: "Carla Costa",
    email: "carla@gmail.com",
    date: new Date(2024, 2, 15, 19, 55),
    dateCheckIn: new Date(2024, 2, 25, 19, 20)
  },
  {
    name: "Marcos Almeida",
    email: "marcos@gmail.com",
    date: new Date(2024, 2, 14, 18, 20),
    dateCheckIn: new Date(2024, 2, 25, 18, 45)
  },
  {
    name: "Juliana Pereira",
    email: "juliana@gmail.com",
    date: new Date(2024, 2, 13, 17, 30),
    dateCheckIn: new Date(2024, 2, 25, 18, 10)
  },
  {
    name: "Ricardo Fernandes",
    email: "ricardo@gmail.com",
    date: new Date(2024, 2, 12, 20, 45),
    dateCheckIn: new Date(2024, 2, 25, 17, 35)
  }
];

const createNewParticipant = (participant) => {
  const date = dayjs(Date.now())
  .to(participant.date);
  
  let dateCheckIn = dayjs(Date.now())
  .to(participant.dateCheckIn);

  if(participant.dateCheckIn == null) {
    dateCheckIn = `
      <button
        data-email="${participant.email}"
        onclick="checkIn(event)"
      >
        Confirm check-in
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
         ${participant.name}
       </strong>
       <small>
       ${participant.email}
       </small>
      </td>
      <td>${date}</td>
      <td>${dateCheckIn}</td>
    </tr>
    `
}

const updateList = (participants) => {

  let output = ""

  for(let participant of participants){
    output = output + createNewParticipant(participant);
    
  }
  document.querySelector('tbody').innerHTML = output;
}

updateList(participants);

const addParticipant = (event) => {

  event.preventDefault()

  const formData = new FormData(event.target) 

  const participant = {
    name: formData.get('name'),
    email: formData.get('email'),
    date: new Date(),
    dateCheckIn: null
  }

  // verificar se o participante já existe
  const participantExist = participants.find(
    (p) => p.email == participant.email
  )

  if(participantExist) {
    alert('Email já cadastrado!')
    return 
  }

  participants = [participant, ...participants]
  updateList(participants)

  // limpar o formulário
  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const checkIn = (event) => {
  //  confirmar se realmente quer um check-in
  const confirmationMessage = 'Are you sure you want to check in?';
  if(confirm(confirmationMessage) == false) {
    return 
  }


  // encontrar o participante dentro da lista
  const participant = participants.find(
    (p) => p.email == event.target.dataset.email
  )

  // atualizar o check-in do participante
  participant.dateCheckIn = new Date()

  // atualizar a lista de participantes
  updateList(participants)
}

