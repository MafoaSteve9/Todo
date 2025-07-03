import { chargerSuggestions } from "./suggestion.js";

  const form = document.querySelector('form');
  const input = document.getElementById('task');
  const list = document.getElementById('list');


function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  if (!tasksJSON) return [];
  return JSON.parse(tasksJSON);
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('task');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.checked

  const texteTache = document.createElement('span');
  texteTache.textContent = task.text;
  if (task.checked) {
    texteTache.classList.add('checked');
  }
  
  checkbox.addEventListener('change', () => {
  texteTache.classList.toggle('checked');

  // Met à jour la tâche dans localStorage
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.text === task.text);
    if (index !== -1) {
      tasks[index].checked = checkbox.checked;
      saveTasks(tasks);
    }
  });

  const boutonSupprimer = document.createElement('button');
  boutonSupprimer.textContent = '🗑️';
  boutonSupprimer.classList.add('delete-btn');

  boutonSupprimer.addEventListener('click', () => {
  const confirmation = confirm("Supprimer cette tâche ?");
  if (confirmation) {
    li.remove();
    console.log("Tâche supprimée ✔");

        // Supprime la tâche dans localStorage
      const tasks = loadTasks();
      const filteredTasks = tasks.filter(t => t.text !== task.text);
      saveTasks(filteredTasks);
    }
  });

  li.appendChild(checkbox);
  li.appendChild(texteTache);
  li.appendChild(boutonSupprimer);

  return li;
}

window.addEventListener('load', async () => {
  let tasks = loadTasks();
  tasks.forEach(task => {
    const li = createTaskElement(task);
    list.appendChild(li);
  });

  const suggestions = await chargerSuggestions();

  suggestions.forEach(suggestion => {
    if (!tasks.some(task => task.text === suggestion.text)) {
      tasks.push(suggestion);
      const li = createTaskElement(suggestion);
      list.appendChild(li);
    }
  });

  saveTasks(tasks);
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const valeur = input.value.trim();
  if (valeur === '') return;

  const newTask = {
    text: valeur,
    checked: false,
  };

  const li = createTaskElement(newTask);
  list.appendChild(li);

  const tasks = loadTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  input.value = '';
});


