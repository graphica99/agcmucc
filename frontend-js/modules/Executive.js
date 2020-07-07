import axios from 'axios'
export default class Executive {
  //Select all Dom elements
  constructor() {
    this.selectInput = document.getElementById("yearGroupSel");
    this.executiveSection = document.getElementById("executiveSection");
    this.header = document.getElementById("header");
    this.events();
  }

  events() {
    this.selectInput.addEventListener('change', (e)=>{
      e.preventDefault();
      let value = this.selectInput.value
      axios.post('/getExecutive',{yearGroup:value}).then((data)=>{
        if(data){
          this.executiveSection.style.display ='none';
          this.header.style.display = 'none';
        }
         this.showYearGroup(data.data);
      }).catch((e)=>console.log(e));
      // alert(this.selectInput.value);
    })
  }
  //methods

  showYearGroup(data){
    //  console.log(data.data)
    this.executiveSection.style.display = 'block'
    this.executiveSection.innerHTML = 
    `
      <div class="section_title text-center">
          <h2>All executives of the year ${this.selectInput.value} AGCM UCC</h2>
      </div>
    <div class="row mb_30" id="">
    ${data.map(data =>{
       return `
       <div class="col-md-3 col-sm-3" >
       <div class="team_item">
           <div class="team_img ">
               <img src="/executiveUploads/${data.image}" alt="${data.name}" style="width: 150px;
               height: 150px;
               border-radius: 50%;">
           </div>
           <div class="content">
               <h3>${data.name}</h3>
               <p>${data.portfolio}</p>
           </div>
       </div>
   </div>
       `
    }).join('')}
    </div>
    `
  }
}
