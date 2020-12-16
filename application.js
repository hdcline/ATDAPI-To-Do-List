var getAllTasks = function () {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=243',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      //return(response);
      // response is a parsed JavaScript object instead of raw JSON
      $('.tasks tbody').children().remove();
      for (var i = 0; i < response.tasks.length; i++){
        console.log(response.tasks[i].id);
        var status = '';
        if (response.tasks[i].completed === false){
          status = 'Mark Complete';
        }
        else if (response.tasks[i].completed === true){
          status = 'Mark Active';
        }

        $('.tasks tbody').append(
          '<tr>' +
            '<td class="desc">' + response.tasks[i].content + '</td>' +
            '<td><button class="btn btn-light btn-sm status">' + status + '</button></td>' +
            '<td><button class="btn btn-light btn-sm remove" data-id="' + response.tasks[i].id + '">Remove</button></td>' +
          '</tr>');
      }

    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
      //return(errorMessage);
    }
  });
}


var addTask = function (content) {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=243',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: content
      }
    }),

    success: function (response, textStatus) {
      console.log(response);
    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
  //getAllTasks();
}


var deleteTask = function (id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=243',
    success: function (response, textStatus) {
      console.log(response);
    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}




//addTask();

$(document).ready(function () {
  //getAllTasks();

  //This is event propagation. It is so that html elements dynamically added to the DOM are passed the same event handlers.
  $(document).on('click', '.btn.remove', function (event) {
    //console.log(taskID);
    deleteTask($(this).data('id'));
    $(this).closest('tr').remove();
    // $(this).parent().parent().remove();
    // The above also works
  });

  var timeout;

  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal(0);
    }, 800);
  });
  //.on('input', function () {}) sets an handler function for the 'input' event, which is fired synchronously as the value of an input element changes.

  $('#addTask').on('submit', function (event) {
    event.preventDefault();
    var description = $(this).children('[name=description]').val();

    addTask(description);

    //$('.tasks tbody').children().remove();
    //getAllTasks();

    $(this).children('[name=description]').val('');
    getAllTasks();
  });
  getAllTasks();
});
