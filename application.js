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
      getAllTasks();
    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
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


var markComplete = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=243',
    success: function (response, textStatus) {
      console.log(response);
    },

    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var markActive = function (id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=243',
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
    deleteTask($(this).data('id'));
    $(this).closest('tr').remove();
    // $(this).parent().parent().remove();
    // The above also works
  });


  $('#addTask').on('submit', function (event) {
    event.preventDefault();
    var description = $(this).children('[name=description]').val();

    addTask(description);
    //getAllTasks();

    //$('.tasks tbody').children().remove();
    //getAllTasks();

    $(this).children('[name=description]').val('');
  });

  $(document).on('click', '.btn.status', function (event) {
    if($(this).text() === "Mark Complete"){
      markComplete($(this).parent().next().children().data('id'));
      $(this).text("Mark Active");
    }
    else if ($(this).text() === "Mark Active"){
      markActive($(this).parent().next().children().data('id'));
      $(this).text("Mark Complete");
    }

    // $(this).parent().parent().remove();
    // The above also works
  });
  getAllTasks();
});
