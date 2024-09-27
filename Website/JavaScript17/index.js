const msgUserBtns = document.querySelectorAll('.message-user-btn');
const delUserBtns = document.querySelectorAll('.delete-user-btn');
const accountNames = document.querySelectorAll('.account-name');

const accounts = document.querySelectorAll('.account');

const sendMsgBtn = document.querySelector('.send-btn');
const cameraMsgBtn = document.querySelector('.camera-btn');
const fileMsgBtn = document.querySelector('.file-btn');
const userChatInput = document.querySelector('.account-chat-input');
const chats = document.querySelector('.account-chats-container');

const chatImg = document.querySelector('#user-chat-img');

const mediaContainer = document.querySelector('.media-container');
const mediaTitle = document.querySelector('.media-title');

sendMsgBtn.onclick = ()=>{
    sendMsg('user');
};

cameraMsgBtn.onclick = ()=>{
    sendMsg('receiver');
}

userChatInput.onkeydown = (e)=>{
    if (e.key == 'Enter') {
        sendMsg('user');
    };
};

fileMsgBtn.onclick = clickOnFileChooser;

function clickOnFileChooser () {
    fileChooser.click();
    sendMsgBtn.onclick = ()=>{
        let n = document.createElement('div');
        n.classList.value = 'user-chat-box sender-msg';
        n.innerHTML = `
            <video id='user-chat-vid' src='${mediaContainer.querySelector('#user-chat-vid').src}'></video>
            <span class='user-chat-text'>${userChatInput.value}</span>
        `;
        chats.appendChild(n);
        userChatInput.value = '';
        mediaContainer.style.display = 'none';
        mediaContainer.innerHTML = '';
        mediaTitle.textContent = '';
    }
    fileMsgBtn.onclick = retreiveFileData;
};

function retreiveFileData() {   
    let message = document.createElement('div');
    let msgContent = userChatInput.value;
    message.classList = 'user-chat-box sender-msg';
    message.innerHTML = `
        <div class='user-chat-vid'>
            <video src="videos/${fileChooser.files.item(0).name}" id="user-chat-vid" controls></video>
            <span class='user-chat-text'>${msgContent}</span>
        </div>
    `;
    userChatInput.value = '';
    mediaContainer.style.display = 'block';
    mediaContainer.innerHTML = `
        <video src="videos/${fileChooser.files.item(0).name}" id="user-chat-vid" controls></video>
        <div class='media-info'>
            <span class='media-title'>${fileChooser.files.item(0).name}</span>
            <span class='media-size'>${fileChooser.files.item(0).size}</span>
        </div>
    `;
    
    fileMsgBtn.onclick = clickOnFileChooser;
    // let message = document.createElement('div');
    // message.classList = 'user-chat-box sender-msg';
    // message.innerHTML = `
    //     <div class='user-chat-img'>
    //         <img src="images/${fileChooser.files.item(0).name}" id="user-chat-img">
    //         <span class='user-chat-text'>${fileChooser.files.item(0).name}</span>
    //     </div>
    // `;
    // chats.appendChild(message);
    // fileMsgBtn.onclick = clickOnFileChooser;
};

let fileChooser = document.createElement('input');
fileChooser.type = 'file';
fileChooser.className = 'file-chooser';
document.body.appendChild(fileChooser);

let onlineAccountsContainer = document.querySelector('.online-users');
let offlineAccountsContainer = document.querySelector('.offline-users');
let idleAccountsContainer = document.querySelector('.idle-users');


function sendMsg (msgSender) {
    const time = new Date();
    if (msgSender == 'user') {
        if (!userChatInput.value == '') {
            let userMsgContent = userChatInput.value;
            let newMsg = document.createElement('div');
            newMsg.classList.value = 'user-chat-box sender-msg';
            newMsg.innerHTML = `
            <span class='user-chat-text'>${userMsgContent}</span>
            <div class='user-chat-date-container'>
                <span class='user-chat-date'>${time}</span>
            </div>
            `;
            newMsg.style.animation = 'showMsgRight .1s forwards ease';
            chats.appendChild(newMsg);
            
            chats.scrollTo({top: chats.scrollHeight, behavior: 'smooth'});
            userChatInput.value = '';
        };
    } else {
        if (!userChatInput.value == '') {
            
            let userMsgContent = userChatInput.value;
            let newMsg = document.createElement('div');
            newMsg.classList.value = 'user-chat-box receiver-msg';
            newMsg.innerHTML = `
            <div class='user-chat-content>
                <span class='user-chat-text'>${userMsgContent}</span>
            </div>
            <div class='user-chat-date-container'>
                <span class='user-chat-date'>${time}</span>
            </div>
            `;
            newMsg.style.animation = 'showMsgLeft .1s forwards ease';
            chats.appendChild(newMsg);
            chats.scrollTo({top: chats.scrollHeight, behavior: 'smooth'});
            userChatInput.value = '';
        };
    }
};

function accountStateCheck() {
    accounts.forEach(account=>{
        accountInnerHTML = account.innerHTML.toLowerCase();
        if (accountInnerHTML.includes('online')) {
            account.classList.add('online');
            onlineAccountsContainer.appendChild(account);  
        }
        else if (accountInnerHTML.includes('offline')) {
            account.classList.add('offline');
            offlineAccountsContainer.appendChild(account);
        }
        else if (accountInnerHTML.includes('idle')) {
            account.classList.add('idle');
            idleAccountsContainer.appendChild(account);
        };
    });

};

let accountNamesList = [];

accountNames.forEach(accountName=>{
    accountImgSrc = accountName.parentNode.parentNode.querySelector('#account-img').src;
    accountNamesList.push(accountName);
    accountName.textContent = `Account ${accountNamesList.indexOf(accountName) + 1}`;
})

let timeUnits = 0;

msgUserBtns.forEach(msgUserBtn=>{
    let accountName = msgUserBtn.parentNode.parentNode.querySelector('.account-name').textContent;
    msgUserBtn.onclick = messageUser;
});

// delUserBtns.forEach(delUserBtn=>{
//     delUserBtn.onclick = delUser;
// });

let currentStatus = 'online';
let functionIndex = 0;

function messageUser (event) {

    functionIndex ++;
    if (functionIndex > 3) {
        functionIndex = 1;
    }

    let accountStatusIndicator = event.target.parentNode.parentNode.querySelector('#account-status-indicator');
    let accountStatusText = event.target.parentNode.parentNode.querySelector('.account-status-text');
    if (functionIndex == 1) {
        accountStatusText.textContent = 'Idle';
        accountStatusIndicator.style.animation = 'iconHide .3s ease forwards';
        setTimeout(()=>{
            accountStatusIndicator.style.translate = '0% 100%';
            accountStatusIndicator.style.animation = 'iconShow .3s ease forwards';
            accountStatusIndicator.style.color = 'gold';
            accountStatusIndicator.className = 'fa fa-moon';
        }, 300);
        
    } else if (functionIndex == 2) {
        accountStatusText.textContent = 'Online';
        accountStatusIndicator.style.animation = 'iconHide .3s ease forwards';
        setTimeout(()=>{
            accountStatusIndicator.style.translate = '0% 100%';
            accountStatusIndicator.style.animation = 'iconShow .3s ease forwards';
            accountStatusIndicator.style.color = 'mediumspringgreen';
            accountStatusIndicator.className = 'fa fa-circle';
        }, 300);
    } else if (functionIndex == 3) {
        accountStatusText.textContent = 'Offline';
        accountStatusIndicator.style.animation = 'iconHide .3s ease forwards';
        setTimeout(()=>{
            accountStatusIndicator.style.translate = '0% 100%';
            accountStatusIndicator.style.animation = 'iconShow .3s ease forwards';
            accountStatusIndicator.style.color = 'grey';
            accountStatusIndicator.className = 'fa fa-circle';
        }, 300);
    };


    let accountName = event.target.parentNode.parentNode.querySelector('.account-name');

    accountStateCheck();
};

let asideBtn = document.querySelector('.aside-btn');
let aside = document.querySelector('.aside');
let moved = false;
asideBtn.onclick = ()=>{
    if (!moved) {
        aside.style.translate = '0% 0%';
        moved = !moved;
    } else {
        aside.style.translate = '100% 0%';
        moved = !moved;
    }
}

accounts.forEach(account=>{
    account.onclick = ()=>{
        account.onclick = showChat;
    };
});

const accountChat = document.querySelector('.messager-container');

const closeChatBtn = document.querySelector('.close-chat-btn');

closeChatBtn.onclick = ()=>{
    accountChat.style.translate = '100% 0%';
}

function showChat (event) {

    

    let messagerAccountName = accountChat.querySelector('.messager-account').querySelector('.account-name');
    let messagerAccountPFP = accountChat.querySelector('.messager-account').querySelector('#account-img');
    let messagerAccountStatus = accountChat.querySelector('.messager-account').querySelector('.account-status-text');
    let messagerAccountStatusIndicator = accountChat.querySelector('.messager-account').querySelector('.account-status').querySelector('#account-chat-status-indicator');

    accountChat.style.translate = '100% 0%';
    setTimeout(() => {
        messagerAccountName.textContent = event.target.parentNode.querySelector('.account-name').textContent;

        messagerAccountPFP.src = event.target.parentNode.querySelector('#account-img').src;
        messagerAccountStatus.textContent = event.target.parentNode.querySelector('.account-status-text').textContent;

        accountChat.style.translate = '0% 0%';
        messagerAccountStatusIndicator.classList.value = event.target.parentNode.querySelector('#account-status-indicator').classList.value;
        messagerAccountStatusIndicator.style.color = window.getComputedStyle(event.target.parentNode.querySelector('#account-status-indicator')).getPropertyValue('color');
    }, 300);
};
// function delUser (event) {
//     let accountContainer = event.target.parentNode.parentNode.parentNode;
//     let targetAccount = event.target.parentNode.parentNode.parentNode.querySelector('.account');
//     if (accountContainer.classList.value.includes('online-users')) {
//         targetAccount.style.animation = 'accountHide .3s ease forwards';
//         setTimeout(()=>{
//             accountContainer.removeChild(targetAccount);
//         }, 300)
//     }
//     else if (accountContainer.classList.value.includes('offline-users')) {
//         targetAccount.style.animation = 'accountHide .3s ease forwards';
//         setTimeout(()=>{
//             accountContainer.removeChild(targetAccount);
//         }, 300)
//     }
//     else if (accountContainer.classList.value.includes('idle-users')){
//         targetAccount.style.animation = 'accountHide .3s ease forwards';
//         setTimeout(()=>{
//             accountContainer.removeChild(targetAccount);
//         }, 300)
//     }
// };
