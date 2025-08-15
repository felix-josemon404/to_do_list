const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');

form.addEventListener('submit',(e) => {
    e.preventDefault();

    addTask();
});

function addTask(){
    const taskText = input.value.trim();

    if(taskText!==''){
        const listItem = document.createElement('li');
        listItem.textContent =taskText;

        //click listenr to mark the task as completed
        listItem.addEventListener('click', () => {
            listItem.classList.toggle("completed");
        });

        //create a delet button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add('delete-btn');
        
        deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop the click event from propagating to the list item
      list.removeChild(listItem);
    });

    // Append the delete button to the list item and the list item to the list
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    input.value = ''; // Clear the input field after adding the task
  }
}
  
// Function to add a task and save it to local storage
function addTask() {
  const taskText = input.value.trim();

  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');
      saveToLocalStorage(); // Save changes when a task is completed/uncompleted
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      list.removeChild(listItem);
      saveToLocalStorage(); // Save changes when a task is deleted
    });

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    input.value = '';
    saveToLocalStorage(); // Save the new task to local storage
  }
}

// Function to save the current tasks to local storage
function saveToLocalStorage() {
  const tasks = Array.from(list.children).map(item => item.textContent.replace('x', '').trim());
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to load tasks from local storage when the page loads
function loadFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.forEach(taskText => {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');
        saveToLocalStorage();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');

      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        list.removeChild(listItem);
        saveToLocalStorage();
      });

      listItem.appendChild(deleteBtn);
      list.appendChild(listItem);
    });
  }
}

// Call the function to load tasks when the page first loads
loadFromLocalStorage();