$( document ).ready( onReady );

function onReady(){
    console.log('in jq');
    // CLICK HANDLER FOR ADD TASK BUTTON
    $( '#newTaskButton' ).on( 'click', addTask );

    // DELETE BUTTON IS DYNAMICALLY CREATED, SO CHECK PARENT FOR CLICK EVENT
    $( '#taskOut' ).on( 'click', '.deleteButton', deleteTask );
    // COMPLETE BUTTON IS DYNAMICALLY CREATED, SO CHECK PARENT FOR CLICK EVENT
    $( '#taskOut' ).on( 'click', '.completeButton', completeTask ); 
}

//ADD A TASK TO LIST
function addTask(){
    console.log('add task button works')
    //GATHER INTO OBJECT TO SEND
    let taskToSend = {
        task: $( '#newTaskIn' ).val(),
        status: ""
    }
    //SEND OBJECT TO SERVER VIA POST
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: taskToSend
    }).then(function (response) {
        console.log('Response from server: ', response);
        refreshTaskList(); //GET REQUEST AFTER POST IS PERFORMED
    }).catch(function (error) {
        console.log('Error in POST function: ', error)
        alert('Unable to add task');
    });
}//end add Task

//GET REQUEST AFTER POST IS PERFORMED
function refreshTaskList() {
    console.log('in refreshTaskList')
    $( '#newTaskIn' ).val('')//CLEAR INPUT
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        appendTasks(response);//FUNCTION THAT APPENDS GET REQUEST RESPONSE
    }).catch(function (error) {
        console.log('Error in GET function: ', error);
    });
}
//FUNCTION THAT APPENDS GET REQUEST RESPONSE
function appendTasks(listOfTasks) {
    console.log("In appendTasks: ");
    $("#taskOut").empty();
    for (let i = 0; i < listOfTasks.length; i++) {
        let taskObject = listOfTasks[i];
        if (taskObject.status === false) {
            $("#taskOut").append(`
            <tr>
                <td>${taskObject.task}</td>
                <td>No</td>
                <td><button class="completeButton" data-id="${taskObject.id}">Task Completed</button></td>
                <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
            </tr>
            `);
        } else if (taskObject.status === true) {
            $("#taskOut").append(`
            <tr class="completedTask" data-id="${taskObject.id}">
                <td>${taskObject.task}</td>
                <td>Finished</td>
                <td>DONE!</td>
                <td><button class="deleteButton" data-index=${taskObject.id}>Delete</button></td>
            </tr>
            `);
        }
    }
    //AFTER THE FACT CLICK HANDLERS
    //$(".completeButton").on('click', completeTask);
    //$(".deleteButton").on('click', deleteTask);
}

//FUNCTION THAT RUNS DELETE REQUEST TO SERVER
function deleteTask(){
    console.log('in delete task', $( this ).data( 'index' ) )

    $.ajax({
        type: "DELETE",
        url: '/todo/' + $( this ).data( 'index' )
    }).then( function( response ){
        console.log( 'back from delete with:', response );
        refreshTaskList();
    }).catch( function( err ){
        console.log( err );
        alert( 'problem!' );
    })
}

//FUNCTION THAT RUNS PUT REQUEST TO SERVER WHEN COMPLETE BUTTON IS CLICKED
function completeTask (){
    
    console.log('in complete task', $( this ).data( 'id' ) )
    let id= $( this ).data( 'id' )
    $.ajax({
        type: 'PUT',
        url: '/todo/' + id,
    }).then( function( response ){
        console.log( 'back from PUT with:', response );
        refreshTaskList();
    }).catch( function( err ){
        console.log( err );
        alert( 'nope...' );
    })
}