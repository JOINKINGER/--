import { lib, game, ui, get, ai, _status } from "../../noname.js";
game.import("extension", function () {
    return {
        name: "唐包", content: function (config, pack) {
        },
        precontent: function () {
            const ExtName = this.name;
            function skill_audio_fixer(
                SkillObject,
                SkillName,
                SubSkillName = null
            ) {
                const SkillKey = SubSkillName || SkillName;
                if (typeof SkillObject[SkillKey].audio === "number") {
                    const AudioList = [];
                    for (let i = 1; i <= SkillObject[SkillKey].audio; i++) {
                        AudioList.push(
                            `../extension/${ExtName}/audio/${SkillName}${i}.mp3`
                        );
                    }
                    SkillObject[SkillKey].audio = AudioList;
                }
                if (SkillObject[SkillKey].subSkill) {
                    for (const i in SkillObject[SkillKey].subSkill) {
                        SkillObject[SkillKey].subSkill[i] = skill_audio_fixer(
                            SkillObject[SkillKey].subSkill,
                            `${SkillName}_${i}`,
                            i
                        );
                    }
                    return SkillObject[SkillKey];
                } else {
                    return SkillObject[SkillKey];
                }
            }
            function add_all_pack(
                PackName,
                PackInfo,
                PreContent = (lib, game, ui, get, ai, _status) => {
                    return;
                }
            ) {
                PackInfo.name = PackName;
                PackInfo.connect = true;
                for (const i in PackInfo.character) {
                    PackInfo.character[i][4].push(
                        `img:extension/${ExtName}/image/${i}.jpg`
                    );
                }
                for (const i in PackInfo.skill) {
                    PackInfo.skill[i] = skill_audio_fixer(PackInfo.skill, i);
                }
                game.import(
                    "character",
                    function (lib, game, ui, get, ai, _status) {
                        PreContent(lib, game, ui, get, ai, _status);
                        return PackInfo;
                    },
                    "card",
                    function (lib, game, ui, get, ai, _status) {
                        PreContent(lib, game, ui, get, ai, _status);
                        return PackInfo;
                    }
                );
            }
            const PackCharacter = this.package.character.character;
            const PackSkill = this.package.skill.skill;
            const PackCard = this.package.card.card;
            const PackTranslate = Object.assign(
                this.package.character.translate,
                this.package.skill.translate,
                this.package.card.translate,
            );
            add_all_pack(
                "tangbao",
                {
                    character: PackCharacter,
                    skill: PackSkill,
                    card: PackCard,
                    /* characterSort: {
                        SlimeMod: {
                            Mamono: ["史莱姆"],
                        },
                    }, */
                    translate: PackTranslate,
                },
                (lib, game, ui, get, ai, _status) => {
                    const faction_datas = {
                        Ren: {
                            color: "#CE8397",
                            translate: "人",
                        },
                    };
                    for (const i in faction_datas) {
                        lib.group.push(i);
                        lib.translate[i] = faction_datas[i].translate;
                        lib.translate[`${i}Color`] = faction_datas[i].color;
                    }
                }
            );
        },
        help: {}, config: {}, package: {
            character: {
                character: {
                    yvjingyi: ["male", "Ren", "4/4/0", ["luantang", "tongshi"], ["ext:唐包/image/yvjingyi.jpg", "die:ext:唐包/audio/yvjingyi.mp3"]],
                    hanxing: ["male", "Ren", "3/3/0", ["yvtang", "hanxing_shuhe", "hanxing_tianshu"], ["ext:唐包/image/hanxing.jpg", "die:ext:唐包/audio/hanxing.mp3"]],
                    jiangzhihuan: ["male", "Ren", "3/3/0", ["rutang", "shili"], ["ext:唐包/image/jiangzhihuan.jpg", "die:ext:唐包/audio/jiangzhihuan.mp3"]],
                    wangxi: ["male", "Ren", "2/4/0", ["qutang", "tangqu", "fenbian"], ["ext:唐包/image/wangxi.jpg", "die:ext:唐包/audio/wangxi.mp3"]],
                },
                translate: {
                    tangbao: "唐包",
                    Ren: "人",
                    yvjingyi: "于景一",
                    hanxing: "韩兴",
                    jiangzhihuan: "江志涣",
                    wangxi: "汪希",
                },
            },
            card: {
                card: {
                    onecard: {
                        type: "basic",
                        enable: false,
                        fullskin: true,
                        carPrompt: "无法使用。",
                        image: "ext:唐包/onecard.png",
                    },
                    twocard: {
                        type: "basic",
                        enable: false,
                        fullskin: true,
                        carPrompt: "无法使用。",
                        image: "ext:唐包/twocard.png",
                    },
                    threecard: {
                        type: "basic",
                        enable: false,
                        fullskin: true,
                        carPrompt: "无法使用。",
                        image: "ext:唐包/threecard.png",
                    },
                    fourcard: {
                        type: "basic",
                        enable: false,
                        fullskin: true,
                        carPrompt: "无法使用。",
                        image: "ext:唐包/fourcard.png",
                    },
                    fivecard: {
                        type: "basic",
                        enable: false,
                        fullskin: true,
                        carPrompt: "无法使用。",
                        image: "ext:唐包/fivecard.png",
                    },
                },
                translate: {
                    onecard: "一",
                    twocard: "二字",
                    threecard: "三字牌",
                    fourcard: "四字的牌",
                    fivecard: "五个字的牌",
                },
                list: [],
            },
            skill: {
                skill: {
                    luantang: {
                        forced: true,
                        frequent: true,
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "☯",
                        intro: {
                            content(storage, player) {
                                if (!player.storage.luantang) return "阳:当你使用一张牌后，弃置所有手牌，视为使用X张随机的基本牌或普通锦囊牌（X为弃置手牌数）。";
                                return "阴：当你使用一张牌后，弃置一张手牌，视为使用你选择的一张基本牌或普通锦囊牌。";
                            },
                        },
                        group: ["luantang_1", "luantang_2"],
                        subSkill: {
                            "1": {
                                forced: true,
                                frequent: true,
                                trigger: {
                                    player: "useCardAfter",
                                },
                                filter(event, player) {
                                    if (player.storage.luantang) return false;
                                    if (get.is.virtualCard(event.card)) return false;
                                    if (player.storage.lastcard == event.card) return false;
                                    if (player.countCards("h") <= 0) return false;
                                    return true;
                                },
                                content() {
                                    "step 0"
                                    player.changeZhuanhuanji("luantang");
                                    player.storage.lastcard = trigger.card;
                                    "step 1"
                                    var handcards = player.getCards("h");
                                    event.X = handcards.length;
                                    player.loseToDiscardpile(handcards);
                                    "step 2"
                                    var otherplayers = game.players.filter(i => i != player);
                                    for (let i = 1; i <= event.X; i++) {
                                        var a = Math.floor(Math.random() * 14) + 1;
                                        switch (a) {
                                            case 1:
                                                player.chooseUseTarget({ name: "sha" }, true);
                                                break;
                                            case 2:
                                                player.useCard({ name: "tao" }, player);
                                                break;
                                            case 3:
                                                player.useCard({ name: "jiu" }, player);
                                                break;
                                            case 4:
                                                player.chooseUseTarget({ name: "jiedao" }, true);//true和false代表是否可以取消
                                                break;
                                            case 5:
                                                player.chooseUseTarget({ name: "juedou" }, true);
                                                break;
                                            case 6:
                                                player.useCard({ name: "nanman" }, otherplayers);
                                                break;
                                            case 7:
                                                player.chooseUseTarget({ name: "shunshou" }, true);
                                                break;
                                            case 8:
                                                player.chooseUseTarget({ name: "guohe" }, true);
                                                break;
                                            case 9:
                                                player.useCard({ name: "taoyuan" }, game.players);
                                                break;
                                            case 10:
                                                player.useCard({ name: "wanjian" }, otherplayers);
                                                break;
                                            case 11:
                                                player.useCard({ name: "wugu" }, game.players);
                                                break;
                                            case 12:
                                                player.useCard({ name: "wuzhong" }, player);
                                                break;
                                            case 13:
                                                player.chooseUseTarget({ name: "huogong" }, true);
                                                break;
                                            case 14:
                                                player.chooseUseTarget({ name: "tiesuo" }, true);
                                                break;
                                        }
                                    }
                                },
                                sourceSkill: "luantang",
                            },
                            "2": {
                                forced: true,
                                frequent: true,
                                trigger: {
                                    player: "useCardAfter",
                                },
                                filter(event, player) {
                                    if (!player.storage.luantang) return false;
                                    if (get.is.virtualCard(event.card)) return false;
                                    if (player.storage.lastcard == event.card) return false;
                                    if (player.countCards("h") <= 0) return false;
                                    return true;
                                },
                                content() {
                                    "step 0"
                                    player.changeZhuanhuanji("luantang");
                                    player.storage.lastcard = trigger.card;
                                    "step 1"
                                    player.chooseToDiscard("h", true);
                                    "step 2"
                                    player.chooseVCardButton(["sha", "tao", "jiu", "jiedao", "juedou", "shunshou", "guohe", "nanman", "wanjian", "taoyuan", "wugu", "wuzhong", "huogong", "tiesuo"]);
                                    "step 3"
                                    var card = result.links[0][2];
                                    player.chooseUseTarget(card, true);
                                    "step 4"
                                    player.storage.luantang = false;
                                },
                                sourceSkill: "luantang",
                            },
                        },
                        "_priority": 0,
                    },
                    tongshi: {
                        limited: true,
                        usable: 1,
                        enable: "phaseUse",
                        content() {
                            "step 0"
                            player.awakenSkill("tongshi");
                            player.chooseTarget("给至多" + player.maxHp + "名角色增加“伪唐”", [0, player.maxHp]);
                            "step 1"
                            var players = result.targets;
                            for (var i = 0; i < players.length; i++) {
                                players[i].addSkill("weitang");
                            }
                        },
                        ai: {
                            order: 1,
                            result: {
                                player: 1,
                            },
                        },
                        mark: true,
                        intro: {
                            content: "limited",
                        },
                        skillAnimation: true,
                        init: (player, skill) => (player.storage[skill] = false),
                        "_priority": 0,
                    },
                    weitang: {
                        locked: true,
                        forced: true,
                        trigger: {
                            player: "useCardToBefore",
                        },
                        filter(event) {
                            if (!(get.type(event.card) == "basic")) return false;
                            //if (!(get.type(event.card) == "basic" || get.type(event.card) == "trick")) return false;
                            //if (event.targets.length != 1) return false;
                            return true;
                        },
                        content() {
                            trigger.cancel();
                            player.storage.weitanglastcard = trigger.card;
                            otherplayers = game.players.filter(i => i != player);
                            var a = Math.floor(Math.random() * 5) + 1;
                            //var a = Math.floor(Math.random() * 14) + 1;
                            switch (a) {
                                case 1:
                                    player.useCard({ name: "nanman" }, otherplayers);
                                    break;
                                case 2:
                                    player.useCard({ name: "taoyuan" }, game.players);
                                    break;
                                case 3:
                                    player.useCard({ name: "wanjian" }, otherplayers);
                                    break;
                                case 4:
                                    player.useCard({ name: "wugu" }, game.players);
                                    break;
                                case 5:
                                    player.chooseUseTarget({ name: "tiesuo" }, true);
                                    break;
                                /* case 1:
                                    player.chooseUseTarget({ name: "sha" }, true);
                                    break;
                                case 2:
                                    player.useCard({ name: "tao" }, player);
                                    break;
                                case 3:
                                    player.useCard({ name: "jiu" }, player);
                                    break;
                                case 4:
                                    player.chooseUseTarget({ name: "jiedao" }, true);//true和false代表是否可以取消
                                    break;
                                case 5:
                                    player.chooseUseTarget({ name: "juedou" }, true);
                                    break;
                                case 6:
                                    player.useCard({ name: "nanman" }, otherplayers);
                                    break;
                                case 7:
                                    player.chooseUseTarget({ name: "shunshou" }, true);
                                    break;
                                case 8:
                                    player.chooseUseTarget({ name: "guohe" }, true);
                                    break;
                                case 9:
                                    player.useCard({ name: "taoyuan" }, game.players);
                                    break;
                                case 10:
                                    player.useCard({ name: "wanjian" }, otherplayers);
                                    break;
                                case 11:
                                    player.useCard({ name: "wugu" }, game.players);
                                    break;
                                case 12:
                                    player.useCard({ name: "wuzhong" }, player);
                                    break;
                                case 13:
                                    player.chooseUseTarget({ name: "huogong" }, true);
                                    break;
                                case 14:
                                    player.chooseUseTarget({ name: "tiesuo" }, true);
                                    break; */
                            }
                        },
                        "_priority": 0,
                    },
                    yvtang: {
                        audio: 2,
                        forced: true,
                        locked: true,
                        mark: true,
                        marktext: "语",
                        intro: {
                            content(storage, player) {
                                var l = 0;
                                if (player.storage.lastNumber) l = player.storage.lastNumber;
                                return "上一张牌字数为" + l;
                            },
                        },
                        trigger: {
                            player: "useCardAfter",
                        },
                        content() {
                            "step 0"
                            if (player.storage.lastNumber == undefined) player.storage.lastNumber = 0;
                            var now = get.cardNameLength(trigger.card);
                            var number = Math.abs(player.storage.lastNumber - now);
                            if (!(player.storage.shuhe == undefined)) number += player.storage.shuhe;
                            player.storage.lastNumber = get.cardNameLength(trigger.card);
                            var card = get.cardPile(function (card) {
                                return get.cardNameLength(card) == number;
                            });
                            player.gain(card, "gain2");
                        },
                        "_priority": 0,
                    },
                    hanxing_shuhe: {
                        audio: 2,
                        frequent: true,
                        mark: true,
                        marktext: "合",
                        intro: {
                            content(storage, player) {
                                if (player.storage.shuhe == undefined) return "还没发动数合";
                                return "“语唐”中的X增加" + player.storage.shuhe;
                            },
                        },
                        trigger: {
                            player: "phaseBegin",
                        },
                        content() {
                            "step 0"
                            player.chooseBool("数合：是否失去体力？");
                            "step 1"
                            if (result.bool == false) {
                                player.storage.shuhe = 0;
                                event.finish();
                            }
                            else {
                                var list = [1, 2, 3, 4, 5];
                                player.chooseControl(list);
                            }
                            "step 2"
                            player.loseHp(result.control);
                            player.storage.shuhe = result.control;
                            "step 3"
                            player.updateMarks();
                        },
                        "_priority": 0,
                    },
                    hanxing_tianshu: {
                        audio: 2,
                        forced: true,
                        frequent: true,
                        trigger: {
                            player: ["phaseBegin", "loseAfter"],
                        },
                        init(player) {
                            player.storage.istianshu = false;
                        },
                        filter(event, player) {
                            if (event.type == "discard") {
                                var evt = event.getl(player);
                                for (var i = 0; i < evt.cards2.length; i++) {
                                    const array = ["onecard", "twocard", "threecard", "fourcard", "fivecard"];
                                    if (array.includes(get.name(evt.cards2[i]))) return true;
                                }
                                return false;
                            }
                            else if (player.phaseNumber == 1) return true;
                            return false;
                        },
                        content() {
                            "step 0"
                            if (trigger.type == "discard") {
                            }
                            else if (player.phaseNumber == 1 && !player.storage.istianshu) {
                                player.storage.istianshu = true;
                                var cards = [];
                                var suits = ["club", "spade", "heart", "diamond"];
                                //创造牌
                                for (var i = 1; i <= 4; i++) {
                                    cards.push(game.createCard2("onecard", suits[i % 4], i));
                                }
                                for (var i = 1; i <= 4; i++) {
                                    cards.push(game.createCard2("twocard", suits[i % 4], i));
                                }
                                for (var i = 1; i <= 4; i++) {
                                    cards.push(game.createCard2("threecard", suits[i % 4], i));
                                }
                                for (var i = 1; i <= 4; i++) {
                                    cards.push(game.createCard2("fourcard", suits[i % 4], i));
                                }
                                for (var i = 1; i <= 4; i++) {
                                    cards.push(game.createCard2("fivecard", suits[i % 4], i));
                                }
                                //猜测是用于洗牌
                                game.broadcastAll(function () {
                                    lib.inpile.add("onecard");
                                    lib.inpile.add("twocard");
                                    lib.inpile.add("threecard");
                                    lib.inpile.add("fourcard");
                                    lib.inpile.add("fivecard");
                                });
                                //不知道干什么用的
                                game.cardsGotoPile(cards, () => {
                                    return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
                                });
                                event.finish();
                            }
                            "step 1"
                            var cards = trigger.cards;
                            var getcards = [];
                            var array = ["onecard", "twocard", "threecard", "fourcard", "fivecard"];
                            for (var i = 0; i < cards.length; i++) {
                                if (array.includes(get.name(cards[i]))) {
                                    var c = get.cardPile(function (card) {
                                        return (get.cardNameLength(card) == get.cardNameLength(cards[i]) && !array.includes(get.name(card)) && !getcards.includes(card));
                                    });
                                    getcards.push(c);
                                }
                            }
                            player.gain(getcards, "gain2");
                        },
                        "_priority": 0,
                    },
                    rutang: {
                        forced: true,
                        locked: true,
                        trigger: {
                            global: "gameStart",
                        },
                        content() {
                            game.players.forEach(i => {
                                i.addSkill("tangwei");
                            });
                        },
                    },
                    shili: {
                        forced: true,
                        locked: true,
                        group: ["shili_1", "shili_2"],
                        subSkill: {
                            1: {
                                forced: true,
                                locked: true,
                                init(player) {
                                    player.storage.shiliUseCard = false;
                                },
                                trigger: {
                                    player: ["useCardBefore", "useCardAfter", "discardBefore"/* , "discardAfter" */],
                                },
                                filter(event, player) {
                                    var has = false;
                                    if (player.storage.shiliUseCard && event.name == "useCard") return true;
                                    for (var i of event.cards) {
                                        if (i.hasGaintag("理")) {
                                            if (!player.storage.shiliUseCard && event.name == "useCard") {
                                                player.storage.shiliUseCard = true;
                                                has = false;
                                                break;
                                            } else {
                                                has = true;
                                                break;
                                            }
                                        }
                                    }
                                    return has;
                                },
                                content() {
                                    "step 0"
                                    if (trigger.name == "useCard") {
                                        player.storage.shiliUseCard = false;
                                        event.goto(1);
                                    }
                                    if (trigger.name == "discard") {
                                        player.gainMaxHp();
                                        player.tempBanSkill("shili");
                                        event.finish();
                                    }
                                    "step 1"
                                    player.chooseVCardButton(["sha", "tao", "jiu"]);
                                    "step 2"
                                    var card = result.links[0][2];
                                    if (card == "sha") {
                                        player.chooseUseTarget(
                                            {
                                                name: "sha",
                                                isCard: true,
                                            },
                                            "请选择【杀】的目标",
                                            false,
                                        );
                                        event.finish();
                                    } else {
                                        player.useCard({ name: card }, player);
                                        event.finish();
                                    }
                                },
                                "_priority": 1,
                            },
                            2: {
                                forced: true,
                                locked: true,
                                trigger: {
                                    global: ["loseAfter", "cardsDiscardAfter", "loseAsyncAfter"],
                                },
                                filter(event, player) {
                                    if (event.cards.length == 1 && get.name(event.cards[0]) == "tiesuo") return false;
                                    if (event.name.indexOf("lose") == 0) {
                                        if (event.getlx === false || event.position != ui.discardPile) return false;
                                    } else {
                                        var evt = event.getParent();
                                        if (evt.relatedEvent && evt.relatedEvent.name == "useCard") return false;
                                    }
                                    for (var i of event.cards) {
                                        var owner = false;
                                        if (event.hs && event.hs.includes(i)) owner = event.player;
                                        var type = get.type(i, null, owner);
                                        if (type == "basic" || type == "trick") return true;
                                    }
                                    return false;
                                },
                                content() {
                                    for (var i of trigger.cards) {
                                        if (i.hasGaintag("理")) {
                                            event.finish();
                                        }
                                    }
                                    player.gain(trigger.cards, "gain2").gaintag.add("理");
                                },
                                "_priority": 0,
                            },
                        },
                    },
                    /* tangwei: {
                        trigger: {
                            player: "phaseBegin",
                        },
                        content() {
                            "step 0"
                            player.chooseControl(["1", "2"], function () {
                                if (Math.random() < 0.5) return "1";
                                return "2";
                            });
                            "step 1"
                            if (result.control == "1") {
                                player.chooseControl([]);
                            } else {
                                var skills = [];
                                for (var i in lib.skill) {
                                    if (i.indexOf("tang") == -1 && i.indexOf("shili") == -1) {
                                        skills.push(i);
                                    }
                                }
                                player.chooseControl(skills);
                            }
                            "step 2"
                            if (result.control == "shili") {
                                player.chooseToDiscard("h", true);
                            }
                        },
                        "_priority": 0,
                    }, */
                    qutang: {
                        locked: true,
                        forced: true,
                        zhuanhuanji: true,
                        mark: true,
                        marktext: "☯",
                        intro: {
                            content(storage, player) {
                                if (player.storage.qutang) return "阳:当你不因此技能即将受到伤害或流失体力时，取消之，回复一点体力。";
                                return "阴：当你不因此技能即将回复体力时，取消之，受到一点伤害。";
                            },
                        },
                        init(player, skill) {
                            player.storage.qutang = true;
                            player.storage.qutangLast = false;
                            player.storage.markQu = 0;
                            player.addSkill("qutang_qu");
                        },
                        trigger: {
                            player: ["damageBefore", "recoverBefore", "loseHpBefore"],
                        },
                        filter(event, player) {
                            if (player.storage.qutangLast) {
                                player.storage.qutangLast = false;
                                return false;
                            }
                            if (player.storage.qutang && event.name != "recover") return true;
                            if (!player.storage.qutang && event.name == "recover") return true;
                            return false;
                        },
                        content() {
                            if (player.storage.qutang) {
                                trigger.cancel();
                                player.storage.qutangLast = true;
                                player.recover();
                            } else {
                                trigger.cancel();
                                player.storage.qutangLast = true;
                                player.damage();
                            }
                            player.changeZhuanhuanji("qutang");
                        },
                        subSkill: {
                            qu: {
                                locked: true,
                                forced: true,
                                mark: true,
                                marktext: "趋",
                                intro: {
                                    content(storage, player) {
                                        return "一共有" + player.storage.markQu + "个“趋”标记";
                                    },
                                },
                                trigger: {
                                    player: ["damageAfter", "recoverAfter", "loseHpAfter"],
                                },
                                content() {
                                    player.storage.markQu += 1;
                                },
                            },
                        },
                    },
                    tangqu: {
                        init: function (player) {
                            if (!player.storage.tangqu) player.storage.tangqu = [1, 1, 2, 1];
                            //弃置info[0]个“趋”标记
                            //修改info[1]个目标
                            //弃置info[2]个“趋”标记
                            //增加或减少info[3]个目标
                        },
                        getInfo: function (player) {
                            if (!player.storage.tangqu) player.storage.tangqu = [1, 1, 2, 1];
                            return player.storage.tangqu;
                        },
                        mark: true,
                        intro: {
                            content: function (storage, player) {
                                var info = lib.skill.tangqu.getInfo(player);
                                return '<div class="text center"><span class=thundertext>蓝色：' + info[0] + "</span>　<span class=firetext>红色：" + info[1] + "</span><br><span class=greentext>绿色：" + info[2] + "</span>　<span class=yellowtext>黄色：" + info[3] + "</span></div>";
                            },
                        },
                        trigger: {
                            global: "useCard2",
                        },
                        filter(event, player) {
                            if (!(get.type(event.card) == "basic" || get.type(event.card) == "trick")) return false;
                            var bancards = ["shan", "jiedao", "wuxie"];
                            if (bancards.includes(get.name(event.card))) return false;
                            var info = lib.skill.tangqu.getInfo(player);
                            var numberMin = Math.min(info[0], info[2]);
                            if (player.storage.markQu < numberMin) return false;
                            return true;
                        },
                        content() {
                            "step 0"
                            var info = lib.skill.tangqu.getInfo(player);
                            var list = [];
                            event.chooselist = [];
                            if (player.storage.markQu >= info[0]) {
                                list.push("弃置<span class=thundertext>" + info[0] + "</span>个“趋”标记，修改<span class=firetext>" + info[1] + "</span>个目标");
                                event.chooselist.push(2);
                            }
                            if (player.storage.markQu >= info[2]) {
                                list.push("弃置<span class=greentext>" + info[2] + "</span>个“趋”标记，增加或减少<span class=yellowtext>" + info[3] + "</span>个目标");
                                event.chooselist.push(5);
                            }
                            player.chooseControl(list);
                            "step 1"
                            var info = lib.skill.tangqu.getInfo(player);
                            if (result.control != "cancel2") {
                                if (event.chooselist[result.index] == 2) {
                                    if (info[1] > 0) event.goto(2);
                                    else event.goto(8);
                                }
                                if (event.chooselist[result.index] == 5) {
                                    if (info[3] > 0) event.goto(5);
                                    else event.goto(8);
                                }
                            }
                            "step 2"    //修改info[1]个目标
                            var info = lib.skill.tangqu.getInfo(player);
                            player.storage.markQu -= info[0];
                            player.chooseTarget("先取消1个目标",
                                function (card, player, target) {
                                    var trigger = _status.event.getTrigger();
                                    return trigger.targets.includes(target);
                                },
                            );
                            "step 3"
                            if (result.bool) {
                                var target = result.targets[0];
                                trigger.targets.remove(target);
                                player.chooseTarget("再选择1个目标",
                                    function (card, player, target) {
                                        var trigger = _status.event.getTrigger();
                                        return !trigger.targets.includes(target);
                                    }
                                );
                            }
                            "step 4";
                            if (result.bool) {
                                var target = result.targets[0];
                                trigger.targets.add(target);
                            }
                            event.goto(8);
                            "step 5"    //增加或减少info[3]个目标
                            var info = lib.skill.tangqu.getInfo(player);
                            player.storage.markQu -= info[2];
                            var list = ["增加1个目标", "减少1个目标"];
                            player.chooseControl(list);
                            "step 6"
                            event.result = result.control;
                            if (result.control == "增加1个目标") {
                                player.chooseTarget("增加1个目标",
                                    function (card, player, target) {
                                        var trigger = _status.event.getTrigger();
                                        return !trigger.targets.includes(target);
                                    }
                                );
                            } else {
                                player.chooseTarget("减少1个目标",
                                    function (card, player, target) {
                                        var trigger = _status.event.getTrigger();
                                        return trigger.targets.includes(target);
                                    }
                                );
                            }
                            "step 7"
                            if (result.bool) {
                                var target = result.targets[0];
                                if (event.result == "增加1个目标") {
                                    trigger.targets.add(target);
                                } else {
                                    trigger.targets.remove(target);
                                }
                            }
                            "step 8"
                            var info = lib.skill.tangqu.getInfo(player);
                            if (info[0] == 0 && info[1] == 0 && info[2] == 0 && info[3] == 0) event.finish();
                            player
                                .chooseControl("<span class=thundertext>蓝色(" + info[0] + ")</span>", "<span class=firetext>红色(" + info[1] + ")</span>", "<span class=greentext>绿色(" + info[2] + ")</span>", "<span class=yellowtext>黄色(" + info[3] + ")</span>")
                                .set("prompt", "令〖唐趋〗中的一个非零数字-1")
                                .set("ai", function () {
                                    var player = _status.event.player,
                                        info = lib.skill.yuqi.getInfo(player);
                                    if (info[0] == 1) return 0;
                                    if (info[2] == 2) return 2;
                                    if (info[2] == 1) return 2;
                                    if (info[3] == 1) return 3;
                                    return 1;
                                });
                            "step 9"
                            var info = lib.skill.tangqu.getInfo(player);
                            if (info[result.index] > 0) info[result.index] -= 1;
                            else event.goto(8);
                        },
                    },
                    fenbian: {
                        juexingji: true,
                        forced: true,
                        trigger: {
                            global: "phaseJieshuBegin",
                        },
                        filter(event, player) {
                            if (!(player.storage.tangqu[0] == 0 && player.storage.tangqu[1] == 0 && player.storage.tangqu[2] == 0 && player.storage.tangqu[3] == 0)) return false;
                            return true;
                        },
                        content: function () {
                            player.removeSkill("tangqu");
                            player.removeSkill("fenbian");
                            player.addSkill("fenbian_zhishi");
                        },
                        subSkill: {
                            zhishi: {
                            },
                        },
                    },
                },
                translate: {
                    luantang: "乱唐",
                    "luantang_info": "转换技，当你使用一张牌后，阳：弃置所有手牌，视为使用X张随机的基本牌或普通锦囊牌（X为弃置手牌数）。阴：弃置一张手牌，视为使用你选择的一张基本牌或普通锦囊牌。",
                    tongshi: "统室",
                    "tongshi_info": "限定技，给至多X名角色增加“伪唐”。（X为你的体力上限）",
                    weitang: "伪唐",
                    "weitang_info": "锁定技，当你使用基本牌时，取消之，视为使用随机多目标锦囊牌。",
                    //锁定技，当你使用指定唯一目标的基本牌或普通锦囊牌时，取消之，视为使用随机的基本牌或普通锦囊牌。
                    yvtang: "语唐",
                    "yvtang_info": "锁定技，当你使用一张牌后，获得一张字数为X的牌。（X为这张牌与上一张牌的字数差值）",
                    hanxing_shuhe: "数合",
                    "hanxing_shuhe_info": "回合开始时，你可以选择失去Y点体力，若如此做，令“语唐”中的X增加Y直到你的下回合开始。",
                    hanxing_tianshu: "填数",
                    "hanxing_tianshu_info": "锁定技，你的第一个回合开始时，将1-5字牌各4张加入牌堆，称为“数牌”。当你弃置“数牌”时，获得一张字数相同的牌（不为“数牌”）。",
                    rutang: "乳唐",
                    "rutang_info": "锁定技，游戏开始时，给全场角色增加“唐危”。",
                    shili: "拾理",
                    "shili_info": "锁定技，你获得不因使用而进入弃牌堆的牌，称为“理”。当你使用“理”牌后，可以视为使用1张基本牌。当你弃置“理”牌后，增加1点体力上限，本技能失效直到回合结束。",
                    tangwei: "唐危",
                    "tangwei_info": "回合开始时，你选择一项：①选择1个名字带“唐”的技能失效直到回合结束②随机1个名字不带“唐”的技能失效直到回合结束。若选择的技能不带“唐”，你随机弃置1张手牌。",
                    qutang: "驱唐",
                    "qutang_info": "转换技，锁定技，当你不因此技能即将，阳：受到伤害或流失体力时，取消之，回复一点体力。阴：回复体力时，取消之，受到一点伤害。当你体力值改变后，获得1个“趋”标记。",
                    tangqu: "唐趋",
                    "tangqu_info": "当一名角色使用基本牌或普通锦囊牌时，你可以：弃置<span class=thundertext>1</span>个“趋”标记，修改<span class=firetext>1</span>个目标；弃置<span class=greentext>2</span>个“趋”标记，增加或减少<span class=yellowtext>1</span>个目标。若你如此做，你须令本技能中的一个数字-1（不得小于0）。",
                    fenbian: "奋变",
                    "fenbian_info": "觉醒技，每个结束阶段，当“唐趋”中的所有数字均为0时，你失去“唐趋”，获得“智识”。",
                    fenbian_zhishi: "智识",
                    "fenbian_zhishi_info": "你可以弃置一个“趋”标记，视为使用一张基本牌或普通锦囊牌。（每种牌名限一次）",
                },
                dynamicTranslate: {
                    tangqu(player) {
                        var info = lib.skill.tangqu.getInfo(player);
                        return "当一名角色使用基本牌或普通锦囊牌时，你可以：弃置<span class=thundertext>" + info[0] + "</span>个“趋”标记，修改<span class=firetext>" + info[1] + "</span>个目标；弃置<span class=greentext>" + info[2] + "</span>个“趋”标记，增加或减少<span class=yellowtext>" + info[3] + "</span>个目标。若你如此做，你须令本技能中的一个数字-1（不得小于0）。";
                    },
                },
            },
            intro: "",
            author: "joink",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": ["yvjingyi.jpg"], "card": [], "skill": [], "audio": [] }
    }
});
