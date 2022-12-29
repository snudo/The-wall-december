var reply_state_value;
document.addEventListener("click", function(event){
    (event.target && event.target.classList[1] == "post_reply_button") ? validatePostReply(event.target) : ""; /*This function validates the post and reply inputs*/
    (event.target && event.target.classList == "edit_button") ? editReplies(event.target) : ""; /*This function edits replies and posts*/
    (event.target && event.target.classList == "delete_button") ? event.target.closest(".delete_button_container").classList.add("show_delete_option") : "";
    (event.target && event.target.classList == "delete_button_no") ? event.target.closest(".delete_button_container").classList.remove("show_delete_option") : "";
    (event.target && event.target.classList == "delete_button_yes") ? deletePostsComments(event.target) : ""; /*This function deletes specific post and update the reply counts*/
});

/*
    *DOCU: This function counts the replies of specific post
    *Triggered: function deletePostsComments(selected_post_comment), validatePostReply(post_button)
    *Last Updated: December 29, 2022
    *Author: Stan Bernie Nudo
*/
function getPostCount(){
    let post_container = document.getElementById("post_list_container");
    (post_container.querySelectorAll(".post_item").length) ? post_container.classList.add("has_comments") : post_container.classList.remove("has_comments");
}

/*
    *DOCU: This function deletes specific post and update the reply counts
    *Triggered: (event.target && event.target.classList == "delete_button_yes")
    *Last Updated: December 29, 2022
    *Author: Stan Bernie Nudo
*/
function deletePostsComments(selected_post_comment){
    let delete_post_reply = selected_post_comment.closest(".post_item").querySelectorAll(".reply_thread");
    selected_post_comment.closest("li").remove();
    delete_post_reply[0].closest(".post_item").querySelectorAll(".comment_response")[0].textContent = delete_post_reply[0].querySelectorAll("li").length;
    getPostCount();
}

/*
    *DOCU: This function edits replies and posts
    *Triggered: (event.target && event.target.classList == "edit_button")
    *Last Updated: December 29, 2022
    *Author: Stan Bernie Nudo
*/
function editReplies(edit_button){
    let reply_container             = edit_button.closest(".post_item").querySelectorAll(".post_reply_input")[0];
    let reply_edit_container_value  = edit_button.closest(".response_container").previousElementSibling.textContent;

    reply_container.value                           = reply_edit_container_value;
    reply_container.nextElementSibling.textContent  = "Save";
    reply_container.focus();
    reply_state_value                               = edit_button.closest("li").id.toString();
}

/*
    *DOCU: This function validates the post and reply inputs
    *Triggered: (event.target && event.target.classList[1] == "post_reply_button")
    *Last Updated: December 29, 2022
    *Author: Stan Bernie Nudo
*/
function validatePostReply(post_button){
    let post_input    = post_button.previousElementSibling;
    let clone_post    = document.getElementById("post_clone").cloneNode(true);
    let post_content  = document.createElement("p"); 
    let post_date_id  = new Date().getTime();

    /*Error validation*/
    if(!post_input.value.length){
        post_input.closest(".post_reply_template").classList.add("error_input");
    }else{
        post_input.closest(".post_reply_template").classList.remove("error_input");
        post_content.textContent = post_input.value;
        clone_post.prepend(post_content);
        clone_post.id = post_date_id;

        if(post_button.getAttribute("id") == "post_button"){ /*If post will run this function*/
            clone_post.classList.add("post_item");
            document.getElementById("post_list_container").append(clone_post);
            getPostCount();
        }else if(reply_state_value){  /*If reply will run this condition*/
            document.getElementById(reply_state_value).querySelectorAll("p")[0].textContent = post_input.value;
            reply_state_value = "";
        }else{ /*Else if comment will run this condition*/
            clone_post.classList.add("reply_item");
            post_button.closest(".post_reply_template").nextElementSibling.append(clone_post);
            let response_count = post_button.closest(".post_reply_template").nextElementSibling.querySelectorAll("li").length;
            post_button.closest(".post_reply_template").previousElementSibling.querySelectorAll(".comment_response")[0].textContent = response_count;
        }

        post_input.value = ""; /*Clear posts and comments inputs*/
        post_button.textContent = "Comment"; /*Return comments button value*/
    }
}