const { createApp } = Vue;
const DateTime = luxon.DateTime;

createApp({
    data() {
        return {
            counterModal: 0,
            currentIndex: 0,
            messagesIndex:0,
            newMsg:'',
            myUserName: 'Sidon',
            searchContacts : [],
            searchBarValue: '',

            contacts: [
                {
                    name: 'Michele',
                    avatar: './img/avatar_1.jpg',
                    visible: true,
                    description:'Carcolanno come se Carcola',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: './img/avatar_2.jpg',
                    visible: true,
                    description:'Forza Juve Sium',
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: './img/avatar_3.jpg',
                    visible: true,
                    description:'A Lezione',
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: './img/avatar_4.jpg',
                    visible: true,
                    description:'Si vis Pacem Para Bellum',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: './img/avatar_5.jpg',
                    visible: true,
                    description:'Foza Inda ',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: './img/avatar_6.jpg',
                    visible: true,
                    description:'Urlo del Sium',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: './img/avatar_7.jpg',
                    visible: true,
                    description:'A lavoro!',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: './img/avatar_8.jpg',
                    visible: true,
                    description:'MMVOL3',
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],

        }
    },
    methods: {

        autoMsg () {
            const autoMsgObj = {
                date: DateTime.now().toFormat('dd/mm/yyyy HH:MM:ss'),
                message: 'Ti rispondo dopo che sono a lezione...',
                status: 'received'
            };
            this.pushInMsgs.push(autoMsgObj);
        },
        sendMsg(){
            let newMsgTrimmed = this.newMsg.trim();

            if (newMsgTrimmed != '') {
                const newMsgObj = {
                    date: DateTime.now().toFormat('dd/mm/yyyy HH:MM:ss'),
                    message: newMsgTrimmed,
                    status: 'sent'
                };
                    this.pushInMsgs.push(newMsgObj);
                    this.newMsg = '';
            }
            
            setTimeout(this.autoMsg, 1500);
        },
        searchUser(){
            this.searchContacts = this.contacts.filter((contact) => {
                return contact.name.toLowerCase().includes(this.searchBarValue.toLowerCase());
            });
        },
        // CONTACT IL SINGOLO OGGETTO DI CONTACTS 
        getLastMessage (contact,maxChar) {    
            let stringMessage = '' 

            if (contact.messages.length - 1 < 0) {
                stringMessage = 'Il tuo ultimo messaggio con questo utente'
            }
            else {
                stringMessage = contact.messages[contact.messages.length - 1 ].message
            }

            return (stringMessage.length > maxChar) ? stringMessage.slice(0, maxChar) + '...' : stringMessage
        },
        counterModalReset(){
           return this.counterModal = 0
        },
        atClickCounterModal() {
            this.counterModal = 0
            this.counterModal++
        },
        msgDelete(i) {
            this.pushInMsgs.splice(i,1)
        },
        getLastDate(contact){
            let lastDate = '' 
            if (contact.messages.length - 1 < 0) {
                lastDate = ''
            }
            else {
                lastDate = contact.messages[contact.messages.length - 1 ].date
            }

            return lastDate
        }
    },
    computed: {
        currentContact: function() {
            return this.searchContacts[this.currentIndex];
        },
        pushInMsgs: function() {
            return this.searchContacts[this.currentIndex].messages;
        },
    },
    created() {
        this.searchContacts = this.contacts.filter(() => true);
    },
    mounted() {
        console.log('Vue Kappa');
    }
}).mount('#app');



















































































