fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 𝗔  𝗬 𝗔 𝗡 ]"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "ArYan",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────❁";

      msg += `\n│𝗘𝗿𝗲𝗻 𝗛𝗘𝗟𝗣 𝗟𝗜𝗦𝗧\n╰─────────❁`; 

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭─────✰『  ${category.toUpperCase()}  』`;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `⭔${item}`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────✰`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n\n\n ▬▬▬▬▬▬▬▬▬▬▬▬ 📌 𝗧𝗼𝘁𝗮𝗹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: [${totalCommands}].\n ▬▬▬▬▬▬▬▬▬▬▬▬▬ \n\n`;
      msg += ``;
      msg += `\n╔════════════╗\n   𝗘𝗿𝗲𝗻 𝗬𝗲𝗮𝗴𝗲𝗿  \n╚════════════╝`; 

const helpListImages = [ "https://i.imgur.com/llH9EIj.mp4" ];


      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
  🔹 𝗖𝗼𝗺𝗺𝗮𝗻𝗱:  ${configCommand.name}
____
📌 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:  ${longDescription}
____
🆔 𝗔𝗹𝗶𝗮𝘀𝗲𝘀:  ${configCommand.aliases}
____
📎 𝗩𝗲𝗿𝘀𝗶𝗼𝗻:  ${configCommand.version || "1.0"}
____
👤 𝗥𝗼𝗹𝗲:   ${roleText}
____
⏳ 𝗖𝗼𝗼𝗹𝗱𝗼𝘄𝗻:  ${configCommand.countDown}
____
👨‍💻 𝗔𝘂𝘁𝗵𝗼𝗿:  ${author}
____
📖 𝗨𝘀𝗮𝗴𝗲:  ${usage}
____
⚠️ 𝗡𝗼𝘁𝗲: 𝗧𝗲𝘅𝘁 𝗶𝗻𝘀𝗶𝗱𝗲 <XXXXX> 𝗶𝘀 𝗰𝗵𝗮𝗻𝗴𝗲𝗮𝗯𝗹𝗲 & [a|b|c] 𝗺𝗲𝗮𝗻𝘀 'a' 𝗼𝗿 'b' 𝗼𝗿 'c'.
____`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return " 🌎 𝗔𝗹𝗹 𝗨𝘀𝗲𝗿𝘀";
    case 1:
      return " 👑 𝗚𝗿𝗼𝘂𝗽 𝗔𝗱𝗺𝗶𝗻𝘀";
    case 2:
      return " 🤖 𝗕𝗼𝘁 𝗔𝗱𝗺𝗶𝗻";
    default:
      return " ❓ 𝗨𝗻𝗸𝗻𝗼𝘄𝗻 𝗥𝗼𝗹𝗲";
  }
         }
