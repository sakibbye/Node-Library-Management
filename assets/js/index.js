$("#add_book").submit(function(event){
    alert("Book Added Successfully");
}) 

$("#update_book").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n,i){
        data[n['name']]=n['value'];
    })

    var request = {
        "url" : `http://localhost:3000/api/books/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Book Updated Successfully");
    })
})

if(window.location.pathname == "/dashboard"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/books/${id}`,
            "method" : "DELETE",
        }

        if(confirm("Delete this book?")){
            $.ajax(request).done(function(response){
                alert("Book Deleted");
                location.reload();
            })
        }
    })


}