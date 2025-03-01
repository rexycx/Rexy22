module.exports = {
config: {
name: "ovhi",
version: "1.0",
author: "xovhi",
countDown: 5,
role: 0,
shortDescription: "no prefix",
longDescription: "no prefix",
category: "no prefix",
},

onStart: async function(){}, 
onChat: async function({ event, message, getLang }) {
if (event.body && event.body.toLowerCase() === "ayan") {
return message.reply({
body: " ──────────◊\n‣ 𝐁𝐨𝐭 & 𝐎𝐰𝐧𝐞𝐫 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧  \n\n‣ 𝐍𝐚𝐦𝐞: Ovhi                           ‣ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞:🕸️ SpideY 🕷️ 」",
attachment: await global.utils.getStreamFromURL("https://i.imgur.com/QI5RIpU.mp4")
});
}
}
}
