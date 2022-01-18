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
            name: 'Michele',
            avatar: 'https://unsplash.it/50/50?image=11',
            visible: true,
            messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Hai portato a spasso il cane?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 16:15:22',
                    text: 'Tutto fatto!',
                    status: 'received'
                    }
                ],
            },
            {
            name: 'Fabio',
            avatar: 'https://unsplash.it/50/50?image=15',
            visible: true,
            messages: [
                    {
                    date: '20/03/2020 16:30:00',
                    text: 'Ciao come stai?',
                    status: 'sent'
                    },
                    {
                    date: '20/03/2020 16:30:55',
                    text: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                    },
                    {
                    date: '20/03/2020 16:35:00',
                    text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                    }
                ],
            },
            {
            name: 'Samuele',
            avatar: 'https://unsplash.it/50/50?image=13',
            visible: true,
            messages: [
                    {
                    date: '28/03/2020 10:10:40',
                    text: 'La Marianna va in campagna',
                    status: 'received'
                    },
                    {
                    date: '28/03/2020 10:20:10',
                    text: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                    },
                    {
                    date: '28/03/2020 16:15:22',
                    text: 'Ah scusa!',
                    status: 'received'
                    }
                ],
            },
            {
            name: 'Luisa',
            avatar: 'https://unsplash.it/50/50?image=16',
            visible: true,
            messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    text: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    text: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                    }
                ],
            },
        ]            
    }, 
    methods:{
        changeChat: function(UFIndex){
            this.introactive = false;
            this.refchat = UFIndex;
        },
        addMessage: function(){
            let date = new Date()
            // scusa in anticipo,Simone. 
            let newdate = (date.getDate() + '/' +  ((date.getMonth() + 1) ? "0"+ (date.getMonth() + 1):(date.getMonth() + 1)) + '/' + date.getFullYear()) + " " + date.getHours() + ":" + (date.getMinutes()<10 ? "0"+ date.getMinutes():date.getMinutes()) + ":" + date.getSeconds();
            
            this.contacts[this.refchat].messages.push(
                {
                    date: newdate,
                    text: this.inputchat,
                    status: 'sent'
                    }
            );
            setTimeout(() => {this.contacts[this.refchat].messages.push(
                {
                    date: newdate,
                    text: "ok",
                    status: 'received'
                    }
            );}, 1000);
            this.inputchat = ""
        },
        searchChat: function(){
            return this.contacts.filter((element) => element.name.toLowerCase().indexOf(this.searchinput)==0);
        },
        getSearchChat: function(){
             this.contacts.forEach((element, index) => {
                 console.log(element.visible);
                this.searchChat().includes(element) ? element.visible = true : element.visible = false;
                console.log(element.visible);
            })
        },
        paperPlaneActive: function(){
            
            this.inputchat != "" ? this.sendbuttonactive = true : this.sendbuttonactive = false;
        },
    },
  });
