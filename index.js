//Made by Tuhin
//Visit https://tu.hin.life
//Contact me@mailtuhin.ml

const { Telegraf } = require('telegraf');
const request = require('request');
const { Markup } = require('telegraf');
const settings = require('./settings');
const bot = new Telegraf(settings.bot_api_key);
bot.start((ctx) => ctx.reply(settings.start_message, { parse_mode: "HTML" }));
bot.command('about', (ctx) => ctx.reply(settings.about_message, { parse_mode: "HTML" }));
bot.command('help', (ctx) => ctx.reply(settings.help_message, { parse_mode: "HTML" }));
bot.on('message', (ctx) => {

    //getting name and msg info
    var recmsg = ctx.message.text;
    var recfname = ctx.message.chat.first_name;
    if (recmsg == undefined) {
        ctx.reply("Sorry, You Are Sending File. Send Song's Name Or Jiosaavn's Link To Get Results.")
    } else {
        if ((recmsg.includes('https://www.jiosaavn.com/')) == true) {
            var options = {
                'method': 'GET',
                'url': settings.jiosaavn_api_url + 'link?query=' + recmsg
            };
            request(options, function(error, response) {
                if (error) {
                    ctx.reply("Sorry Something Went Wrong Make Sure You Are Sending Jiosaavn Song Link Neither Album Or Playlist Link.\nIf This Problem Occurs Again Contact My Master ::--> ""@David9010"".")
                } else {
                    if (response.body.includes(`{"result": "false"}`) == true) {
                        ctx.reply("Sorry This Jiosaavn Song Link Is Invalid.\nMake Sure You Are Sending Jiosaavn Song Link Neither Album Or Playlist Link.\nIf This Problem Occurs Again Contact My Master ::--> ""@David9010"".")
                    } else {
                        ctx.reply('<b><i>Sending you Appropriate Result 🎶</i></b>', { parse_mode: "HTML" })
                        var data = JSON.parse(response.body);
                        var songname = data.song;
                        console.log('Serving ' + songname + ' to ' + recfname);
                        var album = data.album;
                        var artist = data.primary_artists;
                        var id = data.id;
                        var dldlink = settings.musicder_url + "download/?id=" + id;
                        var caption = ("🎧 " + songname + "\n\n⭕ Artist : " + artist + "\n💢 Album : " + album);
                        ctx.reply(
                            caption,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songname, dldlink),
                            ]).extra(),
                        );
                    };
                };
            });

        } else {
            ctx.reply('<b><i>Sending you Appropriate Results ⭕</i></b>', { parse_mode: "HTML" })
            var formattedmsg = recmsg.replace(/ /gi, '+');
            var options = {
                'method': 'GET',
                'url': settings.jiosaavn_api_url + 'search?query=' + formattedmsg
            };
            request(options, function(error, response) {
                if (error) {
                    ctx.reply('Sorry, Nothing Found');
                } else {
                    //response get from api
                    var response = (response.body);
                    var data = JSON.parse(response);

                    var tempone = data[0];
                    var temptwo = data[1];
                    var tempthree = data[2];
                    var tempfour = data[3];
                    var tempfive = data[4];

                    // firstsong
                    if (tempone == undefined) {
                        ctx.reply('Sorry, Nothing Found');
                    } else {
                        var songnameone = data[0].title;
                        console.log('Serving ' + songnameone + ' to ' + recfname);
                        var albumone = data[0].album;
                        var artistone = data[0].more_info.singers;
                        var id_one = data[0].id;
                        var dldlinkone = settings.musicder_url + "download/?id=" + id_one;
                        var captionone = ("🎧 " + songnameone + "\n\n⭕ Artist : " + artistone + "\n💢 Album : " + albumone);
                        ctx.reply(
                            captionone,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songnameone, dldlinkone),
                            ]).extra(),
                        );
                    };

                    //second song
                    if (temptwo == undefined) {
                        console.log('Second Song Not Found');
                    } else {
                        var songnametwo = data[1].title;
                        console.log('Serving ' + songnametwo + ' to ' + recfname);
                        var albumtwo = data[1].album;
                        var artisttwo = data[1].more_info.singers;
                        var id_two = data[1].id;
                        var dldlinktwo = settings.musicder_url + "download/?id=" + id_two;
                        var captiontwo = ("🎧 " + songnametwo + "\n\n⭕ Artist : " + artisttwo + "\n💢 Album : " + albumtwo);
                        ctx.reply(
                            captiontwo,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songnametwo, dldlinktwo),
                            ]).extra(),
                        );
                    };
                    //third song
                    if (tempthree == undefined) {
                        console.log('Third Song Not Found');
                    } else {
                        var songnamethree = data[2].title;
                        console.log('Serving ' + songnamethree + ' to ' + recfname);
                        var albumthree = data[2].album;
                        var artistthree = data[2].more_info.singers;
                        var id_three = data[2].id;
                        var dldlinkthree = settings.musicder_url + "download/?id=" + id_three;
                        var captionthree = ("🎧 " + songnamethree + "\n\n⭕ Artist : " + artistthree + "\n💢 Album : " + albumthree);
                        ctx.reply(
                            captionthree,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songnamethree, dldlinkthree),
                            ]).extra(),
                        );
                    };
                    //fourth song
                    if (tempfour == undefined) {
                        console.log('Fourth Song Not Found');
                    } else {
                        var songnamefour = data[3].title;
                        console.log('Serving ' + songnamefour + ' to ' + recfname);
                        var albumfour = data[3].album;
                        var artistfour = data[3].more_info.singers;
                        var id_four = data[3].id;
                        var dldlinkfour = settings.musicder_url + "download/?id=" + id_four;
                        var captionfour = ("🎧 " + songnamefour + "\n\n⭕ Artist : " + artistfour + "\n💢 Album : " + albumfour);
                        ctx.reply(
                            captionfour,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songnamefour, dldlinkfour),
                            ]).extra(),
                        );
                    };
                    //fifth song
                    if (tempfive == undefined) {
                        console.log('Fifth Song Not Found');
                    } else {
                        var songnamefive = data[4].title;
                        console.log('Serving ' + songnamefive + ' to ' + recfname);
                        var albumfive = data[4].album;
                        var artistfive = data[4].more_info.singers;
                        var id_five = data[4].id;
                        var dldlinkfive = settings.musicder_url + "download/?id=" + id_five;
                        var captionfive = ("🎧 " + songnamefive + "\n\n⭕ Artist : " + artistfive + "\n💢 Album : " + albumfive);
                        ctx.reply(
                            captionfive,
                            Markup.inlineKeyboard([
                                Markup.urlButton('Download ' + songnamefive, dldlinkfive),
                            ]).extra(),
                        );
                    };
                };
            });
        };
    };
});

bot.launch()
