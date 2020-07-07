import axios from 'axios';
import format from "date-format";
export default class Search {
  //DOM
  constructor() {
    this.insertHTML();
    this.searchInput = document.getElementById("search-input");
    this.overlay = document.querySelector(".search-overlay")
    this.inputField = document.querySelector("#live-search-field");
    this.closeoverlay = document.querySelector(".close-live-search");
    this.loaderIcon = document.querySelector(".circle-loader")
    this.resultArea = document.querySelector(".live-search-results")
    // this.searchValue = this.searchInput.value;
    // alert(this.searchInput.value)
    this.events();
  }

  //Events
  events() {
    this.searchInput.addEventListener("focus", (e) => {
      e.preventDefault()
      this.showOverlay()
    });

    this.closeoverlay.addEventListener('click',(e)=>{
        this.removeOverlay();
    })

    this.inputField.addEventListener('keyup',(e)=>{
          let value = this.inputField.value
          console.log(value)
        if(this.searchValue == ""){
            clearTimeout(this.typingWaitTimer)
            this.hideResultArea()
            this.hideLoaderIcon()
          }
        
          if(value != "" && value != this.previousValue ){
            //  alert('dsf')
            clearTimeout(this.typingWaitTimer);
            this.showLoader()
            this.hideResultArea()
            this.typingWaitTimer = setTimeout(()=> this.sendRequest() , 3000)
         }   
         this.previousValue = value; 
    })

  }

 sendRequest(){
    axios.post('/search',{searchData:this.inputField.value}).then((responds)=>{
        // console.log(responds.data);
        this.renderHTML(responds.data);
     }).catch(()=>{
        alert('axios is working');
     });
 }

 renderHTML(posts){
    if(posts.length){
    this.resultArea.innerHTML = `<div class="list-group-item active "><strong>Search Results</strong> (${posts.length > 1 ? `${posts.length}items found` : '1 item found'})</div> 
    ${posts.map(post=>{
     let postDate = new Date(post.date); 
     return `<a href="/blog-details/${post._id}" class="list-group-item list-group-item-action">
     <img class="avatar-tiny" src="/postUploads/${post.image}" alt='${post.title}'> <strong>${post.title}</strong>
     <span class="text-muted small">by ${post.arthur} on ${format.asString('yyyy-MM-dd | hh:mm', postDate)}</span>
   </a>`
    }).join('')}
  </div>`
    }else{
    this.resultArea.innerHTML = `<p alert alert-danger text-center shadow-sm >sorry, we couldnt find a result for this search</p>`
    }
    this.hideLoaderIcon();
    this.showResultArea();
} 

showResultArea(){
    this.resultArea.classList.add('live-search-results--visible');
}
  hideLoaderIcon(){
    this.loaderIcon.classList.remove('circle-loader--visible')
}
  showLoader(){
    this.loaderIcon.classList.add('circle-loader--visible');
}
  showOverlay(){
    this.overlay.classList.add('search-overlay--visible')
    setTimeout(()=> this.inputField.focus(),1000)
  }

  removeOverlay(){
    this.overlay.classList.remove('search-overlay--visible')
  }

  hideResultArea(){
    this.resultArea.classList.remove('live-search-results--visible');
  }
  insertHTML() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="search-overlay">
      <div class="search-overlay-top shadow-sm">
        <div class="container container--narrow">
          <label for="live-search-field" class="search-overlay-icon"><i class="fa fa-search"></i></label>
          <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">
          <span class="close-live-search"><i class="fa fa-times-circle"></i></span>
        </div>
      </div>
  
      <div class="search-overlay-bottom">
        <div class="container container--narrow py-3">
          <div class="circle-loader"></div>
          <div class="live-search-results ">
            <div class="list-group shadow-sm></div>
        </div>
      </div>
    </div>`
    );
  }
  //Methods
}


