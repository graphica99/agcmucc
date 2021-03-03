import format from "date-format";
import axios from "axios";
export default class Comment {
  //select dom elements
  constructor() {
    this.commentArea = document.getElementById("comments-area");
    this.commentButton = document.getElementById("commentbtn");
    this.commentForm = document.getElementById("create-comment");
    this.commentMessage = document.getElementById("message");
    this.commentFirstName = document.getElementById("firstName");
    this.commentSecondName = document.getElementById("secondName");
    this.commentUserId = document.getElementById("userId");
    this.commentList = document.getElementById("commentList");
    this.postID = document.getElementById("postID");
    this.getCommentsLink = document.getElementById("getComments");
    // this.commentMessage.focus()
    this.chechIfCommentIsEmpty();
    this.events();
    // this.commentCount();
  }
 //events
  events() {
    this.commentForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      if(this.commentMessage == ''){
        alert('Please enter a comments')
      }else{
      axios
        .post(`/comment/${this.postID.value}`, {
          data: {
            postID: this.postID.value,
            firstName: this.commentFirstName.value,
            secondName: this.commentSecondName.value,
            message: this.commentMessage.value,
            userId: this.commentUserId.value,
          },
        })
        .then((data) => {
            console.log(data);
            // this.commentcount = '';
            // this.commentcount = 'response.data';
            // this.commentMessage.focus()
            this.commentList.insertAdjacentHTML('beforebegin',`  
            <div class="comment-list" id='commentList'>
            <div class="single-comment justify-content-between d-flex">
                <div class="user justify-content-between d-flex">
                    <div class="desc">
                        <h5><a href="#">${this.commentFirstName.value} ${this.commentSecondName.value} </a></h5>
                        <p class="date">${format.asString('yyyy-MM-dd | hh:mm', new Date())}</p>
                        <p class="comment">
                            ${this.commentMessage.value}
                        </p>
                    </div>
                </div>
            </div>
            </div>  
           `)
          this.commentArea.scrollIntoView(true);
          this.commentMessage.value = '';
        })
        .catch(() => {
          alert("not added");
        });
      }
    });


    // this.getCommentsLink.addEventListener('click',(e)=>{
    //   e.preventDefault()
    //   axios.get(`/loadAllComments/${this.postID.value}`).then((res)=>{
    //      console.log(res.data);
    //   }).catch((e)=>{
    //     console.log(e);
    //   })
    // })
  }

  //methods
  chechIfCommentIsEmpty(){
    let message = this.commentMessage;
    if(message == ' '){
      alert('Please enter a comment')
      this.commentMessage == ' ';
    }else{
      return true;
    }
  }
}

