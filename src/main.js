let noteslistRootElement = document.querySelector('.noteslist')
let notes = []
let editNoteId = null;


function renderElementsToScreen(){

    if(localStorage.getItem('notes')){
        notes=JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note=>{

            renderNoteToList(note, note.uniqueID)
        })
        

    }

}

document.querySelector('#deleteallnotes').addEventListener('click',()=>{
    document.querySelectorAll('.note').forEach(note=>{
        note.remove()
    })
    localStorage.clear()
})
document.querySelector('#createnewnotebutton').addEventListener('click',()=>{
    const title=document.querySelector('#createnotetitle').value.trim()
    const content=document.querySelector('#createnotecontent').value.trim()
    if (!title || !content){
        alert('Title and Content should not be empty');
        return;
    }

    let uniqueID = 'note' + Math.floor(Math.random()*1000)
    let note={
        title,
        content
        
    }
    if (editNoteId){
        notes = JSON.parse(localStorage.getItem('notes'))
        let noteIndex = notes.findIndex(note=> note.uniqueID==editNoteId)
        notes[noteIndex].title=title
        notes[noteIndex].content=content
        localStorage.setItem('notes', JSON.stringify(notes))
        document.querySelector('.' + editNoteId).remove()
        renderNoteToList(notes[noteIndex], editNoteId)
        editNoteId=null
        return
    }
    addNoteToLocalStorage(note, uniqueID)
    renderNoteToList(note, uniqueID)
    
})
function renderNoteToList(note, uniqueID){
    
    let noteDiv=document.createElement('div')
    noteDiv.classList.add('note', uniqueID)
    let noteTitle = document.createElement('h4')
    let noteContent = document.createElement('p')
    let noteDeleteButton = document.createElement('button')
    let noteEditButton = document.createElement('button')

    noteTitle.innerText = note.title
    noteContent.innerText=note.content
    noteDeleteButton.innerText = 'Delete Note'
    
    noteEditButton.innerText = 'Edit Note'
    

    noteEditButton.addEventListener('click',()=>{
        console.log('edit clicked', uniqueID)
        document.querySelector('#createnotetitle').value=note.title
        document.querySelector('#createnotecontent').value = note.content
        editNoteId = uniqueID
    })

    noteDeleteButton.addEventListener('click',()=>{
        
        removeElementsFromNotesList(uniqueID)
    })
    
    noteDiv.appendChild(noteTitle)
    noteDiv.appendChild(noteContent)
    noteDiv.appendChild(noteEditButton)
    noteDiv.appendChild(noteDeleteButton)

    noteslistRootElement.appendChild(noteDiv);
}

function addNoteToLocalStorage(note, uniqueID){
    note = {...note, uniqueID}
    
    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))
    

}
function removeElementsFromNotesList(id){
    console.log(id)
    document.querySelector('.' + id).remove();
    notes = JSON.parse(localStorage.getItem('notes'))
    let index = notes.findIndex(note=>note.uniqueID==id)
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))

}

renderElementsToScreen()

