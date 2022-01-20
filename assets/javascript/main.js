var app = new Vue({
    el: '#app',
    data: {
        refchat: 0,
        introactive: true,
        bellactive: true,
        sendbuttonactive: false,
        inputchat: "",
        searchinput:'',
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
        changeChat: function(UFIndex){
            let scrollDiv =  document.querySelector(".focused-chat");
            this.introactive = false;
            this.refchat = UFIndex;
            setTimeout(() => {
                scrollDiv.scrollTop = scrollDiv.scrollHeight;
            }, 1);
            
            console.log(scrollDiv.scrollTop);
            console.log(scrollDiv.scrollHeight);
        },
        addMessage: function(){
            let date = new Date()
            // scusa in anticipo, Simone. 
            let newdate = (date.getDate() + '/' +  ((date.getMonth() + 1) ? "0"+ (date.getMonth() + 1):(date.getMonth() + 1)) + '/' + date.getFullYear()) + " " + date.getHours() + ":" + (date.getMinutes()<10 ? "0"+ date.getMinutes():date.getMinutes()) + ":" + date.getSeconds();
            
            this.contacts[this.refchat].messages.push(
                {
                    date: newdate,
                    text: this.inputchat,
                    status: 'sent',
                    dropdownActive: false,
                    }
            );
            setTimeout(() => {this.contacts[this.refchat].messages.push(
                {
                    date: newdate,
                    text: "ok",
                    status: 'received',
                    dropdownActive: false,
                    }
            );}, 1000);
            this.inputchat = ""
            this.paperPlaneActive()
            let scrollDiv =  document.querySelector(".focused-chat");
            setTimeout(() => {
                scrollDiv.scrollTop = scrollDiv.scrollHeight;
            }, 10);
        },
        removeMessage: function(FIndex){
            this.contacts[this.refchat].messages.splice(FIndex, 1);
        },
        getSearchChat: function(){
             this.contacts.forEach((element, index) => {
                element.name.toLowerCase().includes(this.searchinput) ? element.visible = true : element.visible = false;
            })
        },
        paperPlaneActive: function(){
            this.inputchat != "" ? this.sendbuttonactive = true : this.sendbuttonactive = false;
        },
        dropDownshow: function(FIndex){
            this.contacts[this.refchat].messages.forEach(element => {element.dropdownActive = false});
            setTimeout(() => {
                this.contacts[this.refchat].messages[FIndex].dropdownActive = !this.contacts[this.refchat].messages[FIndex].dropdownActive;
            }, 1);
        },
        stopAllDropdown: function(){
            this.contacts[this.refchat].messages.forEach(element => {element.dropdownActive = false});
        },
    },
  });
