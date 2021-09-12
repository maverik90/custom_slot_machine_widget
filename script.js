(function () {
    "use strict";
  
    const items = [
        "<img src='images/Gesellschafts-und-Sozialwissenschaften.svg' >",
        "<img src='images/Kunst-Design-und-Gestaltung.svg' >",
        "<img src='images/Ingenieurwissenschaften.svg' >",
        "<img src='images/Informatik.svg' >",
        "<img src='images/Medien-und-Kommunikation.svg' >",
        "<img src='images/Sprach-und-Kulturwissenschaften.svg' >",
        "<img src='images/Naturwissenschaf-en-und-Mathematik.svg' >",
        "<img src='images/Medizin-und-Pharmazie.svg' >",
        "<img src='images/WirtschaftManagement.svg' >",
        "<img src='images/Musik-Theater-Tanz-Buhne.svg' >",
        "<img src='images/Lehramt.svg' >",
        "<img src='images/Sport-Pflege-Gesundheit-Therapien.svg' >",
        "<img src='images/Touristik-Hotel-Event.svg' >",
        "<img src='images/Rechtswissenschaften.svg' >",
        "<img src='images/VerwaltungPolizei.svg' >",
        "<img src='images/Agrar-und-Forstwissenschaften-Okologie-Umwelt.svg' >",
    ];
    
    var leverelement = document.getElementById("lever");
    const doors = document.querySelectorAll(".door");
    let counter = 0;
    let spincount = 0;
    
    function lever_clicked() {
       var leverelement = document.getElementById("lever");
       leverelement.classList.add("clicked");
      setTimeout(resetlever, 500);
      //console.log('add');
    }
    
    document.querySelector(".info").innerHTML = items.join(" ");
    
    leverelement.addEventListener('click', ()=>{    
      lever_clicked();                                       
    });
    

    
    /*document.querySelector("#spinner").addEventListener("click", spin);*/
    document.querySelector("#lever").addEventListener("click", init);
    document.querySelector("#lever").addEventListener("click", spin);
    document.querySelector("#reseter").addEventListener("click", init);
    document.querySelector("#reseter").addEventListener("click", spin);
  
    function resetlever(){
       leverelement.classList.remove("clicked");
    }
    
    function ResetButton() { 
      alert('Excess Of Everything Is Bad.');
    } 
    
    let winner = [];
    
    async function spin() {
         spincount++;
        lever_clicked();
        //console.log(spincount);
        if(spincount == 4){
            ResetButton();
            spincount = 0;
            winner = [];
            return;
        }
      
      init(false, 1, 3, winner); 
      setTimeout(function(){ }, 3000);
      for (const door of doors) {
        const boxes = door.querySelector(".boxes");
        const duration = parseInt(boxes.style.transitionDuration);
        boxes.style.transform = "translateY(0)";
        await new Promise((resolve) => setTimeout(resolve, duration * 100));
      } 
    }


    
    function init(firstInit = true, groups = 1, duration = 1, winner = []) {
   
      let adjustedPool = [...items];
      
      let counter = winner.length - 3;
      
      for (const door of doors) {
        if (firstInit) {
          door.dataset.spinned = "0";
        } else if (door.dataset.spinned === "1") {
          return;
        }
  
        const boxes = door.querySelector(".boxes");
        const boxesClone = boxes.cloneNode(false);
  
        let pool = [];
        
        if(winner.length < 3){
          pool = ["?"];
        } else {
          pool = [winner[counter]];
        }      
        
        if (!firstInit) {
          const arr = [];
          for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
            arr.push(...adjustedPool);
          }
          pool.push(...shuffle(arr));
  
          boxesClone.addEventListener(
            "transitionstart",
            function () {
              door.dataset.spinned = "1";
              this.querySelectorAll(".box").forEach((box) => {
                box.style.filter = "blur(1px)";
              });
            },
            { once: true }
          );
  
          boxesClone.addEventListener(
            "transitionend",
            function () {
              this.querySelectorAll(".box").forEach((box, index) => {
                box.style.filter = "blur(0)";
                if (index > 0) this.removeChild(box);
              });
            },
            { once: true }
          );
        }
        // console.log(pool);
        
        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement("div");
          box.classList.add("box");
          box.style.width = door.clientWidth + "px";
          box.style.height = door.clientHeight + "px";
          box.innerHTML = pool[i];
          boxesClone.appendChild(box);
        }
        
        //console.log("Pool" + pool);
        
           let index = pool.length - 1;
        //console.log("REMOVED: " + pool[pool.length - 1]);
        winner.push(pool[index]);
        //console.log("Winner" + winner);
        if (index > -1) {
          adjustedPool.splice(adjustedPool.indexOf(pool[pool.length - 1]), 1);
        }
        
        boxesClone.style.transitionDuration = (duration > 0 ? duration : 1) + "s";
        boxesClone.style.transform = `translateY(-${
          door.clientHeight * (pool.length - 1)
        }px)`;
        door.replaceChild(boxesClone, boxes);
        // console.log(door);
        counter++;
      }
  
    }
  
    function shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    }

    window.onload = function() {
        counter = 6;
        document.getElementById("lever").click();
    };
    
    
  
  })();









