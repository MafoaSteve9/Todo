
  const form = document.querySelector('form');
  const input = document.getElementById('task');
  const list = document.getElementById('list');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const valeur = input.value.trim();
    if (valeur === '') return;
    console.log("Tâche ajouté");
    

    const li = document.createElement('li');
    li.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const texteTache = document.createElement('span');
    texteTache.textContent = valeur;

    checkbox.addEventListener('change', () => {
      texteTache.classList.toggle('checked');
    });

    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = '🗑️';
    boutonSupprimer.classList.add('delete-btn');

    boutonSupprimer.addEventListener('click', () => {
      const confirmation = confirm("Supprimer cette tâche ?");
      if (confirmation) {
        li.remove();
        console.log("Tâche supprimer ✔");
        
      }
    });

    li.appendChild(checkbox);
    li.appendChild(texteTache);
    li.appendChild(boutonSupprimer);

    list.appendChild(li);

    input.value = '';
  });
