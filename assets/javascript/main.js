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
            chatmenu: false,
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
            chatmenu: false,
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
            chatmenu: false,
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
            chatmenu: false,
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
            if(this.contacts[this.refchat].messages.length>0){
                this.statusUF =  `Ultimo accesso alle ${this.contacts[this.refchat].messages.at(-1).date}` 
            }    
        },
        // ADD MESSAGES 
        addMessage: function(){

            if((this.inputchat != "") && (this.inputchat.trim().length !== 0 )){
            this.contacts[this.refchat].messages.push(
                {
                    date: dayjs().format('DD/MM/YYYY') + " " + dayjs().format('HH:mm:ss') ,
                    text: this.inputchat,
                    status: 'sent',
                    dropdownActive: false,
                }
            );
            // this.updateScroll()
            this.addBotMess()
            this.inputchat = ""
            this.paperPlaneActive()
        } else{
            this.inputchat = ""
            this.paperPlaneActive()
            return
        }
        },
        addBotMess: function(){
            this.statusUF = "Sta scrivendo..."
            setTimeout(() => {this.contacts[this.refchat].messages.push(
                {
                    date: dayjs().format('DD/MM/YYYY') + " " + dayjs().format('HH:mm:ss'),
                    text: "ok",
                    status: 'received',
                    dropdownActive: false,
                    }
            );
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
            if (this.contacts.length>0){
            this.contacts[this.refchat].messages.forEach(element => {element.dropdownActive = false});

        }else{
            return
        }
        },
        removeMessage: function(FIndex){
            this.contacts[this.refchat].messages.splice(FIndex, 1);
        },
        // DROPDOWN E CANCELLA CHAT-MESSAGGI
        dropDownChatshow: function(){
            this.contacts[this.refchat].chatmenu = !this.contacts[this.refchat].chatmenu
        },
        removeMessages: function(){
            this.contacts[this.refchat].chatmenu = !this.contacts[this.refchat].chatmenu
            this.contacts[this.refchat].messages = []
        },
        removeChat: function(){
            this.contacts[this.refchat].chatmenu = !this.contacts[this.refchat].chatmenu
            if(this.refchat == (this.contacts.length -1) && (this.contacts.length > 1)){
                this.refchat = this.refchat -1
                this.contacts.pop()
                console.log(this.refchat);
            }else if(this.contacts.length == 1){
                this.introactive = true;
                this.contacts.pop()
                
            }else{
                this.contacts.splice(this.refchat, 1);
                
            }
            
        },
        // BARRA DI RICERCA
        getSearchChat: function(){
            this.contacts.forEach((element, index) => {
               element.name.toLowerCase().includes(this.searchinput) ? element.visible = true : element.visible = false;
           });
       },
    },
    updated: function(){
        if (this.contacts.length>0){
            this.updateScroll()
        }else{
            return
        }
    },
    created: function(){
        setTimeout(() => {
          document.getElementById("loading_screen").classList.add("inactive")
        },3000);
    },
  });
