var app = new Vue({
    el: '#app',
    data: {
        refchat: 0,
        introactive: true,
        bellactive: true,
        sendbuttonactive: false,
        inputchat: "",
        statusUF:"",
        searchinput: "",
        contacts: [
            {
            name: 'Matteo Pompei',
            avatar: 'https://unsplash.it/50/50?image=11',
            visible: true,
            messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    dropdownActive: false,
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    dropdownActive: false,
                    },
                    {
                    date: '10/01/2020 16:15:22',
                    text: 'Tutto fatto!',
                    status: 'received',
                    dropdownActive: false,
                    }
                ],
            },
            {
            name: 'Fabio Losa',
            avatar: 'https://unsplash.it/50/50?image=15',
            visible: true,
            messages: [
                    {
                    date: '20/03/2020 16:30:00',
                    text: 'Ciao come stai?',
                    status: 'sent',
                    dropdownActive: false,
                    },
                    {
                    date: '20/03/2020 16:30:55',
                    text: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    dropdownActive: false,
                    },
                    {
                    date: '20/03/2020 16:35:00',
                    text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                    dropdownActive: false,
                    }
                ],
            },
            {
            name: 'Marco Lotti',
            avatar: 'https://unsplash.it/50/50?image=13',
            visible: true,
            messages: [
                    {
                    date: '28/03/2020 10:10:40',
                    text: 'La Marianna va in campagna',
                    status: 'received',
                    dropdownActive: false,
                    },
                    {
                    date: '28/03/2020 10:20:10',
                    text: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    dropdownActive: false,
                    },
                    {
                    date: '28/03/2020 16:15:22',
                    text: 'Ah scusa!',
                    status: 'received',
                    dropdownActive: false,
                    }
                ],
            },
            {
            name: 'Simone Bruno',
            avatar: 'https://unsplash.it/50/50?image=16',
            visible: true,
            messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    dropdownActive: false,
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    dropdownActive: false,
                    }
                ],
            },
        ]            
    }, 
    methods:{
        // CAMBIA CHAT 
        changeChat: function(UFIndex){
            this.introactive = false;
            this.refchat = UFIndex;
            this.statusUF =  `Ultimo accesso alle ${this.contacts[this.refchat].messages.at(-1).date}`     
            // this.updateScroll()
        },
        // ADD MESSAGES 
        addMessage: function(){
            let date = new Date()
            // scusa in anticipo, Simone. 
            let newdate = (date.getDate() + '/' +  ((date.getMonth() + 1) ? "0"+ (date.getMonth() + 1):(date.getMonth() + 1)) + '/' + date.getFullYear()) + " " + date.getHours() + ":" + (date.getMinutes()<10 ? "0"+ date.getMinutes():date.getMinutes()) + ":" + date.getSeconds();
   
            if((this.inputchat != "") && (this.inputchat.trim().length !== 0 )){
            this.contacts[this.refchat].messages.push(
                {
                    date: newdate,
                    text: this.inputchat,
                    status: 'sent',
                    dropdownActive: false,
                }
            );
            // this.updateScroll()
            this.addBotMess(newdate)
            this.inputchat = ""
            this.paperPlaneActive()
        } else{
            this.inputchat = ""
            this.paperPlaneActive()
            return
        }
        },
        addBotMess: function(date){
            this.statusUF = "Sta scrivendo..."
            setTimeout(() => {this.contacts[this.refchat].messages.push(
                {
                    date: date,
                    text: "ok",
                    status: 'received',
                    dropdownActive: false,
                    }
            );
            // this.updateScroll()
            this.statusUF = `Online`
            setTimeout(() => {
                this.statusUF = `Ultimo accesso alle ${this.contacts[this.refchat].messages.at(-1).date}`
            },2000);
            
            }, 1000);
        },

        // scroll 
        updateScroll: function(){
            let scrollDiv =  document.querySelector(".focused-chat");
                scrollDiv.scrollTop = scrollDiv.scrollHeight;
        },
        // paper plane 
        paperPlaneActive: function(){
            this.inputchat != "" ? this.sendbuttonactive = true : this.sendbuttonactive = false;
        },

        // DROPDOWN E CANCELLA MESSAGGIO 
        dropDownshow: function(FIndex){
            if(this.contacts[this.refchat].messages[FIndex].dropdownActive == true){
                this.contacts[this.refchat].messages[FIndex].dropdownActive = false;
            }else{
                setTimeout(() => {
                    this.contacts[this.refchat].messages[FIndex].dropdownActive = !this.contacts[this.refchat].messages[FIndex].dropdownActive;
                }, 50);
            }
        },
        stopAllDropdown: function(){
            this.contacts[this.refchat].messages.forEach(element => {element.dropdownActive = false});
        },
        removeMessage: function(FIndex){
            this.contacts[this.refchat].messages.splice(FIndex, 1);
        },

        // BARRA DI RICERCA
        getSearchChat: function(){
            this.contacts.forEach((element, index) => {
               element.name.toLowerCase().includes(this.searchinput) ? element.visible = true : element.visible = false;
           });
       },
    },
    updated: function(){
        this.updateScroll()
    }
  });
